import { FormEvent, useState } from 'react'
import { CheckCircle, ShieldCheck } from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function BetaPage() {
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    setState('sending')

    const response = await fetch('/api/public/beta', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email: String(form.get('email') ?? '').trim(),
        trade: String(form.get('trade') ?? '').trim(),
        territory: String(form.get('territory') ?? '').trim(),
        amountRange: String(form.get('amountRange') ?? '').trim(),
      }),
    }).catch(() => null)

    setState(response?.ok ? 'done' : 'error')
  }

  if (state === 'done') {
    return (
      <div className="container mx-auto flex min-h-[65vh] max-w-2xl items-center px-4 py-16">
        <Card className="w-full">
          <CardContent className="p-8 text-center">
            <CheckCircle className="mx-auto size-10 text-primary" />
            <h1 className="mt-5 text-3xl font-semibold">Profilo ricevuto.</h1>
            <p className="mt-3 text-muted-foreground">
              Sei nella beta. Useremo attività e territorio per costruire il tuo primo radar; nessun addebito viene attivato.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto grid max-w-5xl gap-10 px-4 py-16 md:grid-cols-[.8fr_1.2fr] md:py-24">
      <div>
        <Badge variant="secondary">Accesso beta</Badge>
        <h1 className="mt-5 text-4xl font-semibold tracking-[-0.045em] md:text-5xl">Costruiamo il radar sul tuo lavoro.</h1>
        <p className="mt-5 leading-7 text-muted-foreground">
          Ci bastano quattro informazioni. Non serve registrare un account completo per entrare nella beta.
        </p>
        <div className="mt-7 flex gap-3 rounded-xl border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />
          <p>
            I dati servono esclusivamente a gestire la richiesta beta e configurare il profilo iniziale. Prima del lancio commerciale pubblicheremo i dettagli completi del titolare e dell’informativa privacy.
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6 md:p-8">
          <form onSubmit={submit} className="space-y-5">
            <Field label="Email" name="email" type="email" placeholder="nome@azienda.it" />
            <Field label="Che lavoro fate?" name="trade" placeholder="Es. impianti elettrici" />
            <Field label="Dove lavorate?" name="territory" placeholder="Es. Roma, Latina, Lazio" />
            <div className="space-y-2">
              <Label htmlFor="amountRange">Fascia di lavori che vi interessa</Label>
              <select
                id="amountRange"
                name="amountRange"
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                defaultValue=""
              >
                <option value="" disabled>Seleziona</option>
                <option>Fino a €50.000</option>
                <option>€50.000 – €150.000</option>
                <option>€150.000 – €500.000</option>
                <option>Oltre €500.000</option>
                <option>Dipende dalla gara</option>
              </select>
            </div>

            <label className="flex items-start gap-2 text-xs leading-5 text-muted-foreground">
              <input className="mt-1" required type="checkbox" />
              <span>
                Confermo di voler essere ricontattato per l’accesso beta e di aver letto la nota sul trattamento dati riportata in questa pagina.
              </span>
            </label>

            <Button className="w-full" size="lg" disabled={state === 'sending'}>
              {state === 'sending' ? 'Invio…' : 'Richiedi accesso'}
            </Button>

            {state === 'error' && (
              <p className="text-sm text-destructive">
                Non siamo riusciti a salvare la richiesta. Riprova tra poco.
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

function Field({
  label,
  name,
  type = 'text',
  placeholder,
}: {
  label: string
  name: string
  type?: string
  placeholder: string
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type={type} required placeholder={placeholder} />
    </div>
  )
}
