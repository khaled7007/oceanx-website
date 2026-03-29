import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import CompetenciesPage from './pages/CompetenciesPage'
import InsightPage from './pages/InsightPage'
import InsightReaderPage from './pages/InsightReaderPage'
import PracticePage from './pages/PracticePage'
import NewsPage from './pages/NewsPage'
import JobsPage from './pages/JobsPage'
import ContactPage from './pages/ContactPage'

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
          <Route path="/about" element={<AboutPage />} />
          <Route path="/competencies" element={<CompetenciesPage />} />
          <Route path="/insight" element={<InsightPage />} />
          <Route path="/insight/read/:kind/:itemId" element={<InsightReaderPage />} />
          <Route path="/insight/article/:itemId" element={<InsightReaderPage forcedKind="article" />} />
          <Route path="/insight/report/:itemId" element={<InsightReaderPage forcedKind="report" />} />
          <Route path="/practices/innovation" element={<PracticePage />} />
          <Route path="/practices/organization" element={<PracticePage />} />
          <Route path="/practices/finance" element={<PracticePage />} />
          <Route path="/practices/market-research" element={<PracticePage />} />
          <Route path="/practices" element={<Navigate to="/practices/innovation" replace />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/contact" element={<ContactPage />} />
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
