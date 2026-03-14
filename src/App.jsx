import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import CompetenciesPage from './pages/CompetenciesPage'
import InsightPage from './pages/InsightPage'
import InsightReaderPage from './pages/InsightReaderPage'

// Scroll to top on route change (except hash navigation)
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}

function Layout() {
  return (
    <div className="font-arabic">
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/competencies" element={<CompetenciesPage />} />
          <Route path="/insight" element={<InsightPage />} />
          <Route path="/insight/read/:kind/:itemId" element={<InsightReaderPage />} />
          <Route path="/insight/article/:itemId" element={<InsightReaderPage forcedKind="article" />} />
          <Route path="/insight/report/:itemId" element={<InsightReaderPage forcedKind="report" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}
