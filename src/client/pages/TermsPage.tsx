import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

export function TermsPage() {
  const items = [
    ['Uso del servizio', 'Le informazioni servono ad accelerare la ricerca e la prima valutazione. Prima di qualsiasi decisione di partecipazione devono essere consultati bando, disciplinare, allegati e fonte ufficiale.'],
    ['Accuratezza', 'Durante la beta possiamo correggere, aggiornare o rimuovere dati e funzionalità. Una gara può cambiare, essere rettificata, prorogata o revocata dalla stazione appaltante.'],
    ['Nessuna garanzia di esito', 'La presenza di un’opportunità nel radar non implica ammissibilità, convenienza, aggiudicazione o possesso dei requisiti.'],
  ]
  return <div><section className="border-b border-border py-16 md:py-24"><div className="container mx-auto max-w-4xl px-4"><Badge variant="secondary">Termini</Badge><h1 className="mt-5 text-4xl font-semibold tracking-[-0.045em] md:text-6xl">Termini di utilizzo della beta.</h1><p className="mt-5 max-w-2xl text-lg text-muted-foreground">Gara Radar è un servizio informativo in fase beta per scouting e prima selezione di opportunità negli appalti pubblici.</p></div></section><section className="py-16"><div className="container mx-auto max-w-4xl space-y-4 px-4">{items.map(([t,b])=><Card key={t}><CardContent className="p-6"><h2 className="text-lg font-semibold">{t}</h2><p className="mt-2 leading-7 text-muted-foreground">{b}</p></CardContent></Card>)}<p className="text-sm text-muted-foreground">Privacy: <a className="underline" href="mailto:privacy@gararadar.it">privacy@gararadar.it</a></p></div></section></div>
}
