import { Link } from 'react-router'
import { ArrowRight, Buildings, Lightning, MapPin, Wrench } from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export function SectorsPage() {
  return (
    <div>
      <section className="border-b border-border py-16 md:py-24">
        <div className="container mx-auto max-w-5xl px-4">
          <Badge variant="secondary">Per chi</Badge>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.045em] md:text-6xl">
            Partiamo dalle imprese tecniche che non vogliono vivere dentro i portali gare.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            La beta iniziale è costruita attorno a impianti e manutenzione tecnica nel Lazio. La
            copertura cresce per segmenti, non per riempire una lista di categorie.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto grid max-w-5xl gap-4 px-4 md:grid-cols-3">
          <Sector icon={Lightning} title="Impianti elettrici" body="Manutenzione, adeguamenti, quadri, illuminazione e categorie tecniche correlate." state="Beta attiva" />
          <Sector icon={Wrench} title="Manutenzione tecnica" body="Servizi e lavori impiantistici con opportunità ricorrenti e territorialmente filtrabili." state="Beta attiva" />
          <Sector icon={Buildings} title="Altri comparti" body="Pulizie, HVAC, edilizia specializzata e altri verticali entrano solo dopo verifica di domanda e supply." state="In valutazione" />
        </div>
      </section>

      <section className="border-y border-border bg-muted/25 py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <MapPin className="size-7 text-primary" />
              <h2 className="mt-4 text-3xl font-semibold tracking-tight">Il territorio viene prima.</h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                Una gara interessante a 500 km può essere inutile. Gara Radar nasce con il
                territorio nel profilo, non come filtro aggiunto alla fine.
              </p>
            </div>
            <Card>
              <CardContent className="p-6">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Copertura beta</div>
                <div className="mt-3 text-2xl font-semibold">Lazio</div>
                <div className="mt-1 text-sm text-muted-foreground">Roma · Latina · Frosinone · Rieti · Viterbo</div>
                <div className="mt-6 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Espansione</div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Nuove regioni vengono aggiunte quando fonti, volume e qualità dei match sono sufficienti.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 text-center">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="text-3xl font-semibold tracking-tight">Il tuo settore non è ancora coperto?</h2>
          <p className="mt-4 text-muted-foreground">Lasciaci il profilo: ci serve anche per decidere quali verticali aprire dopo.</p>
          <Button className="mt-7" size="lg" render={<Link to="/beta" />}>
            Segnala il mio settore <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>
      </section>
    </div>
  )
}

function Sector({ icon: Icon, title, body, state }: { icon: typeof Lightning; title: string; body: string; state: string }) {
  return (
    <Card>
      <CardContent className="p-6">
        <Icon className="size-7 text-primary" />
        <h2 className="mt-5 text-xl font-semibold">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
        <Badge variant="outline" className="mt-5">{state}</Badge>
      </CardContent>
    </Card>
  )
}
