import { Link } from 'react-router'
import { ArrowRight, Bell, CheckCircle, FileSearch, Funnel, Target } from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const phases = [
  ['1', 'Profilo impresa', 'Attività, territori, categorie tecniche e fascia economica. Non servono decine di impostazioni per partire.'],
  ['2', 'Raccolta', 'Le opportunità vengono raccolte da fonti pubbliche e registrate con riferimento alla fonte originale.'],
  ['3', 'Filtro', 'Territorio, categoria, importo e altri segnali riducono il rumore prima che una gara arrivi davanti a te.'],
  ['4', 'Scheda', 'Vedi le informazioni utili alla prima decisione e il motivo per cui la procedura è stata selezionata.'],
  ['5', 'Verifica', 'Apri sempre la fonte ufficiale prima di decidere se partecipare. Gara Radar non certifica l’ammissibilità.'],
  ['6', 'Alert', 'Le nuove opportunità coerenti con il profilo possono arrivare via alert, senza rifare ogni giorno la stessa ricerca.'],
]

export function HowItWorksPage() {
  return (
    <div>
      <section className="border-b border-border py-16 md:py-24">
        <div className="container mx-auto max-w-5xl px-4">
          <Badge variant="secondary">Come funziona</Badge>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.045em] md:text-6xl">
            Dalla pubblicazione della gara alla tua decisione, con meno passaggi inutili.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Gara Radar è un servizio di scouting e priorità. Ti aiuta a trovare prima le procedure
            da controllare; la verifica dei requisiti resta sempre sulla documentazione ufficiale.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto grid max-w-5xl gap-4 px-4 md:grid-cols-2">
          {phases.map(([n, title, body]) => (
            <Card key={n}>
              <CardContent className="p-6">
                <div className="text-xs font-semibold text-primary">0{n}</div>
                <h2 className="mt-4 text-xl font-semibold">{title}</h2>
                <p className="mt-2 leading-7 text-muted-foreground">{body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-muted/25 py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 className="text-3xl font-semibold tracking-tight">Cosa fa e cosa non fa</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold">Gara Radar ti aiuta a</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-2"><CheckCircle className="mt-0.5 size-4 text-primary" /> trovare procedure coerenti con il profilo;</li>
                <li className="flex gap-2"><CheckCircle className="mt-0.5 size-4 text-primary" /> vedere subito scadenza, importo, area e categoria;</li>
                <li className="flex gap-2"><CheckCircle className="mt-0.5 size-4 text-primary" /> salvare e ricevere alert su nuove opportunità;</li>
                <li className="flex gap-2"><CheckCircle className="mt-0.5 size-4 text-primary" /> raggiungere rapidamente la fonte ufficiale.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Gara Radar non sostituisce</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>• la lettura del disciplinare e degli allegati;</li>
                <li>• la verifica di SOA, requisiti tecnici o amministrativi;</li>
                <li>• il supporto legale, amministrativo o di un ufficio gare;</li>
                <li>• una decisione dell’impresa sulla partecipazione.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="grid gap-4 md:grid-cols-4">
            {[
              [Target, 'Profilo'],
              [Funnel, 'Filtro'],
              [FileSearch, 'Scheda'],
              [Bell, 'Alert'],
            ].map(([Icon, label]) => {
              const C = Icon as typeof Target
              return (
                <div key={String(label)} className="rounded-xl border border-border p-5 text-center">
                  <C className="mx-auto size-6 text-primary" />
                  <div className="mt-3 text-sm font-semibold">{String(label)}</div>
                </div>
              )
            })}
          </div>
          <div className="mt-10 text-center">
            <Button size="lg" render={<Link to="/beta" />}>
              Richiedi accesso alla beta
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
