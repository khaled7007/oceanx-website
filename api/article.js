export default async function handler(req, res) {
  const { slug } = req.query

  if (!slug) {
    return res.status(400).json({ error: 'Missing slug' })
  }

  try {
    const response = await fetch(`https://insight.oceanx.sa/${encodeURIComponent(slug)}/`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'ar,en;q=0.9',
      },
      redirect: 'follow',
    })

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch article' })
    }

    const html = await response.text()

    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
    res.status(200).send(html)
  } catch (err) {
    res.status(500).json({ error: 'Server error', detail: err.message })
  }
}
