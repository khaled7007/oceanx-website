import { parse } from 'node-html-parser'

export default async function handler(req, res) {
  const { slug, url } = req.query

  if (!slug && !url) {
    return res.status(400).json({ error: 'Missing slug or url' })
  }

  try {
    let wpUrl = ''
    if (typeof url === 'string' && url.length > 0) {
      const parsedUrl = new URL(url)
      if (parsedUrl.hostname !== 'insight.oceanx.sa') {
        return res.status(400).json({ error: 'Only insight.oceanx.sa URLs are allowed' })
      }
      wpUrl = parsedUrl.toString()
    } else {
      wpUrl = `https://insight.oceanx.sa/${slug}/`
    }

    const response = await fetch(wpUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'ar,en;q=0.9',
      },
      redirect: 'follow',
    })

    if (!response.ok) {
      return res.status(response.status).json({ error: `WP returned ${response.status}` })
    }

    const html = await response.text()
    const root = parse(html)

    // Extract Divi text module content
    const textModules = root.querySelectorAll('.et_pb_text_inner')
    if (textModules.length > 0) {
      const content = textModules.map(el => el.innerHTML).join('\n')
      res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
      return res.status(200).json({ content })
    }

    // Fallback: standard WP entry-content
    const entry = root.querySelector('.entry-content, .post-content')
    if (entry) {
      res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
      return res.status(200).json({ content: entry.innerHTML })
    }

    return res.status(404).json({ error: 'Content not found in page' })
  } catch (err) {
    return res.status(500).json({ error: 'Server error', detail: err.message })
  }
}
