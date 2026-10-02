import { ArrowRight, CheckCircle, ShieldCheck } from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const PAYMENT_LINK = 'https://buy.stripe.com/3cI7sL9UA1MNcbj50wgjC00'

export function SubscribePage() {
  return (
    <div className="container mx-auto grid max-w-5xl gap-10 px-4 py-16 md:grid-cols-[.9fr_1.1fr] md:py-24">
      <div>
        <Badge variant="secondary">Founding Radar</Badge>
        <h1 className="mt-5 text-4xl font-semibold tracking-[-0.045em] md:text-5xl">
          Continua a ricevere le opportunità che vale la pena controllare.
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">
          €9,90 al mese, cancellabile. Prima di pagare, assicurati che le opportunità già viste nel radar siano del tipo che la tua impresa valuterebbe davvero.
        </p>
        <div className="mt-7 flex gap-3 rounded-xl border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />
          Gara Radar non certifica ammissibilità o requisiti. La fonte ufficiale resta sempre il riferimento finale.
        </div>
      </div>

      <Card className="border-primary/40">
        <CardContent className="p-7">
          <div className="text-sm font-medium text-muted-foreground">Founding Radar</div>
          <div className="mt-3 text-5xl font-semibold tracking-tight">
            €9,90<span className="text-base font-normal text-muted-foreground">/mese</span>
          </div>
          <div className="mt-6 space-y-3 text-sm">
            {[
              'Un profilo impresa',
              'Un territorio principale',
              'Opportunità filtrate',
              'Fonti ufficiali',
              'Alert ricorrenti',
              'Cancellazione dal portale Stripe',
            ].map((item) => (
              <div key={item} className="flex gap-2">
                <CheckCircle className="mt-0.5 size-4 text-primary" />
                {item}
              </div>
            ))}
          </div>
          <Button
            className="mt-7 w-full"
            size="lg"
            render={<a href={PAYMENT_LINK} />}
          >
            Vai al pagamento sicuro
            <ArrowRight className="ml-2 size-4" />
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Checkout ospitato da Stripe. Nessun addebito parte dal modulo beta.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
