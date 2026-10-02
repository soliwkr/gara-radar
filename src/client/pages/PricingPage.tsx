import { Link } from 'react-router'
import { ArrowRight, CheckCircle } from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export function PricingPage() {
  return (
    <div>
      <section className="border-b border-border py-16 md:py-24">
        <div className="container mx-auto max-w-5xl px-4 text-center">
          <Badge variant="secondary">Prezzi</Badge>
          <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.045em] md:text-6xl">
            Provalo prima di pagarlo.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            La beta è gratuita. Prima di attivare qualsiasi piano a pagamento comunicheremo
            chiaramente prezzo, funzionalità e data di decorrenza.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="grid gap-5 md:grid-cols-2">
            <Card className="border-primary/40">
              <CardContent className="p-7">
                <Badge>Beta</Badge>
                <div className="mt-5 text-4xl font-semibold">€0</div>
                <p className="mt-2 text-muted-foreground">Per la fase di validazione.</p>
                <ul className="mt-6 space-y-3 text-sm">
                  {['Profilo impresa', 'Radar del segmento beta', 'Fonti ufficiali in evidenza', 'Alert progressivamente attivati'].map((x) => (
                    <li key={x} className="flex gap-2"><CheckCircle className="mt-0.5 size-4 text-primary" /> {x}</li>
                  ))}
                </ul>
                <Button className="mt-7 w-full" render={<Link to="/beta" />}>
                  Entra nella beta <ArrowRight className="ml-2 size-4" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-7">
                <Badge variant="outline">Founding Radar</Badge>
                <div className="mt-5 text-4xl font-semibold">da €9,90<span className="text-base font-normal text-muted-foreground">/mese</span></div>
                <p className="mt-2 text-muted-foreground">
                  Per chi ha già visto valore nel radar e vuole continuare a ricevere opportunità filtrate. Nessun addebito automatico dalla beta.
                </p>
                <ul className="mt-6 space-y-3 text-sm">
                  {['Categoria / attività', 'Territorio', 'Preferiti', 'Alert ricorrenti'].map((x) => (
                    <li key={x} className="flex gap-2"><CheckCircle className="mt-0.5 size-4 text-primary" /> {x}</li>
                  ))}
                </ul>
                <Button className="mt-7 w-full" variant="outline" render={<Link to="/abbonati" />}>
                  Attiva Founding Radar <ArrowRight className="ml-2 size-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            I dettagli commerciali possono cambiare durante la beta. Ogni variazione verrà comunicata prima dell’attivazione di un piano.
          </p>
        </div>
      </section>
    </div>
  )
}
