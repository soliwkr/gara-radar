import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Outlet } from 'react-router'
import { PublicLayout } from '@/client/layouts/PublicLayout'
import { LandingPage } from '@/client/pages/LandingPage'
import { HowItWorksPage } from '@/client/pages/HowItWorksPage'
import { SectorsPage } from '@/client/pages/SectorsPage'
import { PricingPage } from '@/client/pages/PricingPage'
import { FaqPage } from '@/client/pages/FaqPage'
import { BetaPage } from '@/client/pages/BetaPage'
import '@/marketing/marketing.css'

function PublicShell() {
  return <PublicLayout />
}

function NotFound() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-4xl font-semibold">Pagina non trovata.</h1>
      <a className="mt-6 inline-block text-primary underline" href="/">Torna a Gara Radar</a>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicShell />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/come-funziona" element={<HowItWorksPage />} />
          <Route path="/settori" element={<SectorsPage />} />
          <Route path="/prezzi" element={<PricingPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/beta" element={<BetaPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

void Outlet

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
