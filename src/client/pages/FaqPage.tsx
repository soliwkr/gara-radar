import { Link } from 'react-router'
import { ArrowRight } from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const faqs = [
  ['Da dove arrivano le gare?', 'Da fonti pubbliche e piattaforme di e-procurement. Quando una procedura è mostrata come verificata, la scheda rimanda alla fonte utilizzata.'],
  ['Gara Radar mi dice se posso partecipare?', 'No. Ti segnala la potenziale rilevanza della procedura. Requisiti amministrativi, tecnici, SOA e condizioni di partecipazione devono essere verificati sui documenti ufficiali.'],
  ['Sostituisce un ufficio gare?', 'No. Riduce il lavoro di scouting e prima selezione. Non prepara documentazione amministrativa, offerta tecnica o pareri legali nella beta attuale.'],
  ['Posso scegliere zona e importi?', 'Il profilo beta raccoglie attività e territorio. I filtri economici e di categoria vengono progressivamente attivati sulla base della qualità dei dati disponibili.'],
  ['Perché partite solo da alcuni settori?', 'Per evitare una copertura ampia ma poco utile. Preferiamo misurare precisione e frequenza delle opportunità su pochi segmenti prima di estendere il servizio.'],
  ['Quanto costa?', 'La beta è gratuita. Il prezzo di lancio previsto parte da €9,90/mese per un profilo essenziale; non ci sono addebiti automatici dalla beta.'],
]

export function FaqPage() {
  return (
    <div>
      <section className="border-b border-border py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-4">
          <Badge variant="secondary">FAQ</Badge>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.045em] md:text-6xl">Domande prima di entrare.</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Il servizio è in beta: qui teniamo separate le cose che fa già da quelle che arriveranno dopo.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto max-w-4xl space-y-4 px-4">
          {faqs.map(([q, a]) => (
            <Card key={q}>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold">{q}</h2>
                <p className="mt-2 leading-7 text-muted-foreground">{a}</p>
              </CardContent>
            </Card>
          ))}
          <div className="pt-6 text-center">
            <Button size="lg" render={<Link to="/beta" />}>
              Richiedi accesso <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
