import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

export function CookiePage() {
  const items = [
    ['Cookie pubblicitari', 'Il sito pubblico beta non imposta intenzionalmente cookie pubblicitari o di remarketing.'],
    ['Metriche tecniche', 'Possiamo registrare conteggi tecnici e di utilizzo essenziali, come visualizzazioni di pagina, click su fonti e invii del modulo beta, per capire se il servizio funziona. Queste metriche non vengono vendute a inserzionisti.'],
    ['Cambiamenti futuri', 'Se verranno introdotti strumenti che richiedono consenso o cookie non essenziali, questa pagina e l’interfaccia di consenso verranno aggiornate prima dell’attivazione.'],
  ]
  return <div><section className="border-b border-border py-16 md:py-24"><div className="container mx-auto max-w-4xl px-4"><Badge variant="secondary">Cookie</Badge><h1 className="mt-5 text-4xl font-semibold tracking-[-0.045em] md:text-6xl">Cookie e tecnologie tecniche.</h1><p className="mt-5 max-w-2xl text-lg text-muted-foreground">La beta pubblica è costruita per funzionare con il minimo indispensabile di tracciamento.</p></div></section><section className="py-16"><div className="container mx-auto max-w-4xl space-y-4 px-4">{items.map(([t,b])=><Card key={t}><CardContent className="p-6"><h2 className="text-lg font-semibold">{t}</h2><p className="mt-2 leading-7 text-muted-foreground">{b}</p></CardContent></Card>)}<p className="text-sm text-muted-foreground">Contatto privacy: <a className="underline" href="mailto:privacy@gararadar.it">privacy@gararadar.it</a></p></div></section></div>
}
