import { Outlet, Link } from 'react-router'
import { Target, ArrowRight } from '@phosphor-icons/react'
import { AppShell } from '@/components/ui/app-shell'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/client/components/theme-toggle'

function PublicHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="container mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid size-8 place-items-center rounded-full bg-foreground text-background">
            <Target className="size-4" />
          </span>
          <span>Gara Radar</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <Link className="hover:text-foreground" to="/come-funziona">Come funziona</Link>
          <Link className="hover:text-foreground" to="/settori">Per chi</Link>
          <Link className="hover:text-foreground" to="/prezzi">Prezzi</Link>
          <Link className="hover:text-foreground" to="/faq">FAQ</Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button render={<Link to="/beta" />}>
            Richiedi accesso
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}

function PublicFooter() {
  return (
    <footer className="border-t border-border">
      <div className="container mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[1.2fr_.8fr]">
        <div>
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <Target className="size-5" /> Gara Radar
          </Link>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
            Servizio indipendente di scouting e prima selezione di opportunità negli appalti pubblici.
            Gara Radar non è ANAC, non è una stazione appaltante e non sostituisce la documentazione ufficiale.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Contatto privacy: <a className="underline hover:text-foreground" href="mailto:privacy@gararadar.it">privacy@gararadar.it</a>
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div className="space-y-2">
            <div className="font-medium">Prodotto</div>
            <Link className="block text-muted-foreground hover:text-foreground" to="/come-funziona">Come funziona</Link>
            <Link className="block text-muted-foreground hover:text-foreground" to="/settori">Settori</Link>
            <Link className="block text-muted-foreground hover:text-foreground" to="/prezzi">Prezzi</Link>
          </div>
          <div className="space-y-2">
            <div className="font-medium">Legale</div>
            <Link className="block text-muted-foreground hover:text-foreground" to="/privacy">Privacy</Link>
            <Link className="block text-muted-foreground hover:text-foreground" to="/termini">Termini</Link>
            <Link className="block text-muted-foreground hover:text-foreground" to="/cookie">Cookie</Link>
            <Link className="block text-muted-foreground hover:text-foreground" to="/disclaimer">Disclaimer</Link>
            <a className="block text-muted-foreground hover:text-foreground" href="mailto:privacy@gararadar.it">Contatto privacy</a>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>Gara Radar · Beta 2026</span>
          <span>Servizio indipendente · Nessuna promessa di ammissibilità o aggiudicazione</span>
        </div>
      </div>
    </footer>
  )
}

export function PublicLayout() {
  return (
    <AppShell
      header={<PublicHeader />}
      footer={<PublicFooter />}
      contentMaxWidth="full"
      contentPadding={false}
    >
      <Outlet />
    </AppShell>
  )
}
