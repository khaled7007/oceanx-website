# OceanX — موقع الأعمال (RTL)

موقع **OceanX Business Solutions** بالعربية، اتجاه RTL، مبني بـ React وVite وTailwind CSS.

**Live:** [oceanx-steel.vercel.app](https://oceanx-steel.vercel.app)

---

## English

Arabic RTL marketing site for OceanX: competencies, practices, insights (articles & reports), news, jobs, and contact. Serverless `/api/article` proxies and normalizes content from `insight.oceanx.sa` (see `api/article.js` and `lib/insightContent.js`). In dev, the same behavior is served by a Vite middleware (`vite.config.js`).

### Requirements

- Node.js 18+ (recommended)

### Commands

```bash
npm ci
npm run dev      # http://localhost:5173
npm run build
npm run preview  # local preview of production build
```

### Stack

React 18 · React Router 7 · Vite 5 · Tailwind 3 · Framer Motion · `marked` + `node-html-parser` for insight content

### Deploy

Configured for [Vercel](https://vercel.com) (`vercel.json`: SPA fallback + API routes).

---

المستودع: [github.com/khaled7007/oceanx-website](https://github.com/khaled7007/oceanx-website)
