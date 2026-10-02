import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

export function PrivacyPage() {
  return (
    <div>
      <section className="border-b border-border py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-4">
          <Badge variant="secondary">Privacy</Badge>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.045em] md:text-6xl">Privacy e dati personali.</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Questa informativa descrive l’uso dei dati raccolti durante la beta di Gara Radar.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto max-w-4xl space-y-4 px-4">
          {[
            ['Titolare del trattamento', 'Internet Marketing Secrets di Christian Fioravanti · P.IVA 02996460594 · Formia (LT), Italia · privacy@gararadar.it.'],
            ['Dati raccolti', 'Email, attività dell’impresa, territorio, fascia indicativa dei lavori e dati tecnici essenziali necessari al funzionamento del servizio.'],
            ['Finalità', 'Gestire la richiesta beta, configurare il profilo iniziale, inviare comunicazioni strettamente collegate al servizio e migliorare il radar sulla base di utilizzo aggregato.'],
            ['Pagamenti e profilazione', 'La beta non attiva pagamenti automatici. Non vendiamo i dati personali raccolti tramite il modulo beta.'],
            ['Contatto privacy', 'privacy@gararadar.it'],
          ].map(([title, body]) => (
            <Card key={title}><CardContent className="p-6"><h2 className="text-lg font-semibold">{title}</h2><p className="mt-2 leading-7 text-muted-foreground">{body}</p></CardContent></Card>
          ))}
          <p className="text-sm text-muted-foreground">
            Per richieste relative ai dati personali: <a className="underline" href="mailto:privacy@gararadar.it">privacy@gararadar.it</a>.
          </p>

        </div>
      </section>
    </div>
  )
}
