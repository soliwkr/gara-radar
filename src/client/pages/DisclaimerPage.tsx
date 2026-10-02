import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

export function DisclaimerPage() {
  const items = [
    ['Servizio indipendente', 'Gara Radar non è ANAC, non è una stazione appaltante e non rappresenta gli enti che pubblicano le procedure mostrate.'],
    ['Requisiti e scadenze', 'SOA, requisiti tecnici, amministrativi, importi, rettifiche e scadenze devono essere verificati sulla documentazione ufficiale prima di agire.'],
    ['Nessun risultato garantito', 'Gara Radar non garantisce ammissibilità, aggiudicazione, risparmio, ricavi o altri risultati economici.'],
  ]
  return <div><section className="border-b border-border py-16 md:py-24"><div className="container mx-auto max-w-4xl px-4"><Badge variant="secondary">Disclaimer</Badge><h1 className="mt-5 text-4xl font-semibold tracking-[-0.045em] md:text-6xl">Prima il radar. Poi la fonte ufficiale.</h1><p className="mt-5 max-w-2xl text-lg text-muted-foreground">Gara Radar riduce il rumore informativo; non prende la decisione di partecipare al posto dell’impresa.</p></div></section><section className="py-16"><div className="container mx-auto max-w-4xl space-y-4 px-4">{items.map(([t,b])=><Card key={t}><CardContent className="p-6"><h2 className="text-lg font-semibold">{t}</h2><p className="mt-2 leading-7 text-muted-foreground">{b}</p></CardContent></Card>)}</div></section></div>
}
