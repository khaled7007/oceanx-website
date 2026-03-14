import { parse } from 'node-html-parser'

const DEFAULT_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml',
  'Accept-Language': 'ar,en;q=0.9',
}
const NOISY_TOKENS =
  /(et_pb_|_builder_version|custom_padding|global_colors_info|module_id=|background_size|background_position|background_repeat|min_height=|custom_margin=)/i

function normalizeInsightUrl({ slug, url }) {
  if (typeof url === 'string' && url.length > 0) {
    const parsed = new URL(url)
    if (parsed.hostname !== 'insight.oceanx.sa') {
      return { status: 400, error: 'Only insight.oceanx.sa URLs are allowed' }
    }

    // Keep Arabic path segments readable to avoid upstream 403 on encoded paths.
    const decodedPath = (() => {
      try {
        return decodeURIComponent(parsed.pathname)
      } catch {
        return parsed.pathname
      }
    })()
    const normalizedPath = decodedPath.endsWith('/') ? decodedPath : `${decodedPath}/`

    return { status: 200, targetUrl: `https://insight.oceanx.sa${normalizedPath}${parsed.search}` }
  }

  if (typeof slug === 'string' && slug.length > 0) {
    const decodedSlug = (() => {
      try {
        return decodeURIComponent(slug)
      } catch {
        return slug
      }
    })()
    const cleanSlug = decodedSlug.replace(/^\/+|\/+$/g, '')
    return { status: 200, targetUrl: `https://insight.oceanx.sa/${cleanSlug}/` }
  }

  return { status: 400, error: 'Missing slug or url' }
}

function extractContentFromHtml(html) {
  const root = parse(html)

  const textModules = root.querySelectorAll('.et_pb_text_inner')
  if (textModules.length > 0) {
    return textModules.map((node) => node.innerHTML).join('\n')
  }

  const entry = root.querySelector('.entry-content, .post-content, article .post-content')
  if (entry) return entry.innerHTML

  return null
}

function extractContentFromRest(renderedHtml) {
  let html = renderedHtml

  // If content contains Divi shortcodes, keep only text module bodies.
  if (html.includes('[et_pb_text')) {
    const modules = []
    const re = /\[et_pb_text[^\]]*]([\s\S]*?)\[\/et_pb_text]/g
    let match
    while ((match = re.exec(html)) !== null) {
      modules.push(match[1])
    }
    if (modules.length > 0) {
      html = modules.join('\n')
    }
  }

  // Remove residual shortcode tags.
  html = html.replace(/\[[^\]]*]/g, '')

  const root = parse(`<div>${html}</div>`)
  const container = root.querySelector('div')
  if (!container) return null

  // Remove noisy Divi attribute dumps that can appear as plain text lines.
  container.querySelectorAll('p,div,span,section').forEach((node) => {
    const text = node.text.trim()
    if (!text) return
    if (NOISY_TOKENS.test(text)) node.remove()
  })

  const cleaned = container.innerHTML
    .replace(/<p>\s*<\/p>/g, '')
    .replace(/<div>\s*<\/div>/g, '')
    .trim()

  return cleaned.length > 0 ? cleaned : null
}

async function fetchInsightContentFromRest(targetUrl) {
  const parsed = new URL(targetUrl)
  const slug = decodeURIComponent(parsed.pathname).replace(/^\/+|\/+$/g, '')
  if (!slug) return { status: 404, error: 'Content not found in page' }

  const restUrl = `https://insight.oceanx.sa/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_fields=content.rendered`
  const response = await fetch(restUrl, {
    headers: {
      ...DEFAULT_HEADERS,
      Accept: 'application/json',
    },
    redirect: 'follow',
  })

  if (!response.ok) {
    return { status: response.status, error: `REST returned ${response.status}` }
  }

  const payload = await response.json()
  const renderedHtml = payload?.[0]?.content?.rendered
  if (typeof renderedHtml !== 'string') {
    return { status: 404, error: 'Content not found in page' }
  }

  const content = extractContentFromRest(renderedHtml)
  if (!content) {
    return { status: 404, error: 'Content not found in page' }
  }

  return { status: 200, content }
}

export async function fetchInsightContent({ slug, url }) {
  try {
    const normalized = normalizeInsightUrl({ slug, url })
    if (normalized.status !== 200) {
      return { status: normalized.status, error: normalized.error }
    }

    const response = await fetch(normalized.targetUrl, {
      headers: DEFAULT_HEADERS,
      redirect: 'follow',
    })

    if (response.ok) {
      const html = await response.text()
      const content = extractContentFromHtml(html)
      if (content && content.trim().length > 0) {
        return { status: 200, content }
      }
    }

    // Fallback when rendered page is blocked or missing parseable content.
    const restFallback = await fetchInsightContentFromRest(normalized.targetUrl)
    if (restFallback.status === 200) {
      return restFallback
    }

    if (response.ok) {
      return restFallback
    }

    return { status: response.status, error: `WP returned ${response.status}` }
  } catch (error) {
    return { status: 500, error: 'Server error', detail: error.message }
  }
}
