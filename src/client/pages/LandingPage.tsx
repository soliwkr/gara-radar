import { Link } from 'react-router'
import {
  ArrowRight,
  Bell,
  CheckCircle,
  Clock,
  Crosshair,
  MagnifyingGlass,
  Funnel,
  MapPin,
  ShieldCheck,
  Sparkle,
  Target,
} from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const opportunities = [
  {
    title: 'Manutenzione e adeguamento impianti elettrici — sedi Consiglio di Stato',
    buyer: 'Consiglio di Stato',
    area: 'Roma',
    amount: '€ 627.000',
    deadline: '3 ottobre 2026 · 13:00',
    category: 'OS30',
    source:
      'https://cds-appalti.maggiolicloud.it/PortaleAppalti/it/homepage.wp?actionPath=%2FExtStr2%2Fdo%2FFrontEnd%2FBandi%2Fview.action&codice=G00048&currentFrame=7',
    note: 'Impianti elettrici · Lazio · procedura in corso',
  },
  {
    title: 'Multiservizio tecnologico per gli impianti delle Aziende Sanitarie del Lazio',
    buyer: 'Regione Lazio',
    area: 'Lazio · 10 lotti',
    amount: '€ 2,01 mld',
    deadline: '29 ottobre 2026 · 16:00',
    category: 'CPV 50711000-2',
    source:
      'https://centraleacquisti.regione.lazio.it/bandi-e-strumenti-di-acquisto/bandi-di-gara-in-scadenza/dettaglio-bando?id_doc=11979619&tipo_doc=BANDO_GARA_PORTALE',
    note: 'Grande procedura: rilevante soprattutto per RTI/subappalto',
  },
]

const steps = [
  {
    n: '01',
    title: 'Imposti il profilo',
    body: 'Attività, territori, categorie e fascia economica. Parti con poche regole chiare, non con cinquanta filtri.',
    icon: Target,
  },
  {
    n: '02',
    title: 'Il radar elimina rumore',
    body: 'Le procedure vengono organizzate e confrontate con il tuo profilo. Quello che non è pertinente scende di priorità.',
    icon: Funnel,
  },
  {
    n: '03',
    title: 'Capisci subito cosa aprire',
    body: 'Importo, scadenza, area, categoria e motivo della rilevanza sono davanti. La fonte ufficiale resta sempre a un click.',
    icon: MagnifyingGlass,
  },
  {
    n: '04',
    title: 'Ricevi gli aggiornamenti',
    body: 'Salvi ciò che interessa e ricevi alert mirati. Meno tempo a cercare, più tempo a decidere.',
    icon: Bell,
  },
]

const principles = [
  {
    icon: ShieldCheck,
    title: 'La fonte resta visibile',
    body: 'Gara Radar non sostituisce il disciplinare. Ogni opportunità verificata rimanda alla pubblicazione ufficiale.',
  },
  {
    icon: Crosshair,
    title: 'Rilevanza, non volume',
    body: 'Il valore non è mostrarti più bandi. È ridurre quelli che non meritano neppure di essere aperti.',
  },
  {
    icon: Clock,
    title: 'Scadenze davanti',
    body: 'Le finestre utili vengono messe in evidenza perché un bando trovato tardi vale poco.',
  },
]

export function LandingPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
        <div className="container relative mx-auto max-w-6xl px-4 py-20 md:py-28">
          <div className="max-w-4xl">
            <Badge variant="secondary" className="mb-6">
              Beta operativa · Impianti e lavori tecnici · Lazio
            </Badge>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.055em] sm:text-6xl md:text-7xl">
              Meno bandi da leggere.
              <span className="block text-muted-foreground">Più gare da valutare.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
              Gara Radar organizza le procedure pubbliche, le filtra sul profilo della tua impresa
              e ti mostra subito importo, scadenza, territorio e motivo della rilevanza.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" render={<Link to="/beta" />}>
                Richiedi accesso
                <ArrowRight className="ml-2 size-4" />
              </Button>
              <Button size="lg" variant="outline" render={<a href="#radar" />}>
                Guarda il radar
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <CheckCircle className="size-4 text-primary" /> Fonti verificabili
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="size-4 text-primary" /> Nessun addebito in beta
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="size-4 text-primary" /> Requisiti sempre da verificare
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="radar" className="border-b border-border py-16 md:py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                Radar pubblico
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                Guarda prima i dati che contano.
              </h2>
              <p className="mt-3 text-muted-foreground">
                Queste opportunità spiegano il formato del prodotto. Le procedure marcate come
                verificate rimandano alla fonte pubblica utilizzata.
              </p>
            </div>
            <Button variant="outline" render={<Link to="/come-funziona" />}>
              Come selezioniamo
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {opportunities.map((opportunity) => (
              <Card key={opportunity.title} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <Badge>Verificata</Badge>
                    <span className="text-sm font-medium text-muted-foreground">
                      Scade {opportunity.deadline}
                    </span>
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold tracking-tight">
                    {opportunity.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {opportunity.buyer} · {opportunity.area}
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    <Metric label="Importo" value={opportunity.amount} />
                    <Metric label="Area" value={opportunity.area} />
                    <Metric label="Categoria" value={opportunity.category} />
                  </div>

                  <div className="mt-5 rounded-xl border border-border bg-muted/40 p-4 text-sm">
                    <span className="font-medium">Perché è nel radar: </span>
                    <span className="text-muted-foreground">{opportunity.note}</span>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Button render={<a href={opportunity.source} target="_blank" rel="noreferrer" />}>
                      Apri fonte ufficiale
                      <ArrowRight className="ml-2 size-4" />
                    </Button>
                    <Button variant="outline" render={<Link to="/beta" />}>
                      Ricevi opportunità simili
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/25 py-16 md:py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                Il problema
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                Trovare bandi non basta.
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                Il lavoro vero è capire quali procedure meritano attenzione prima di aprire decine
                di portali, allegati e disciplinari.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {principles.map((item) => (
                <Card key={item.title} className="h-full">
                  <CardContent className="p-5">
                    <item.icon className="size-6 text-primary" />
                    <h3 className="mt-4 font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border py-16 md:py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Come funziona
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Un filtro operativo, non un altro portale da controllare.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <Card key={step.n}>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <step.icon className="size-6 text-primary" />
                    <span className="text-xs font-semibold text-muted-foreground">{step.n}</span>
                  </div>
                  <h3 className="mt-7 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8">
            <Button variant="outline" render={<Link to="/come-funziona" />}>
              Vedi il processo completo
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-foreground py-16 text-background md:py-20">
        <div className="container mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div>
            <Badge variant="secondary">Partenza controllata</Badge>
            <h2 className="mt-5 max-w-2xl text-3xl font-semibold tracking-tight md:text-5xl">
              Prima facciamo bene un segmento. Poi allarghiamo.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-background/70">
              La beta parte da impianti e lavori tecnici nel Lazio. Nuovi settori e territori
              entrano solo quando le fonti e il volume delle opportunità sono abbastanza solidi.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="secondary" render={<Link to="/settori" />}>
                Vedi i settori
              </Button>
              <Button
                variant="outline"
                className="border-background/20 bg-transparent text-background hover:bg-background/10 hover:text-background"
                render={<Link to="/prezzi" />}
              >
                Prezzi e beta
              </Button>
            </div>
          </div>

          <div className="grid gap-3">
            <DarkFeature icon={MapPin} title="Territorio" body="Parti dalle aree in cui lavori davvero." />
            <DarkFeature icon={Target} title="Profilo" body="Attività, categorie e fascia di opportunità." />
            <DarkFeature icon={Sparkle} title="Priorità" body="Una spiegazione sintetica del perché vale la pena aprire una gara." />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
            Vuoi vedere solo le opportunità che vale la pena controllare?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            Entra nella beta, indicaci cosa fai e dove lavori. Nessun addebito durante la fase beta.
          </p>
          <div className="mt-8">
            <Button size="lg" render={<Link to="/beta" />}>
              Attiva il tuo radar
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-muted/30 p-3">
      <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 text-sm font-semibold">{value}</div>
    </div>
  )
}

function DarkFeature({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof MapPin
  title: string
  body: string
}) {
  return (
    <div className="rounded-2xl border border-background/15 bg-background/5 p-5">
      <Icon className="size-5 text-primary" />
      <div className="mt-3 font-semibold">{title}</div>
      <div className="mt-1 text-sm text-background/65">{body}</div>
    </div>
  )
}
