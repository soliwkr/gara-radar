import { Link } from 'react-router'
import { CheckCircle } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const PORTAL = 'https://billing.stripe.com/p/login/3cI7sL9UA1MNcbj50wgjC00'

export function ThanksPage() {
  return (
    <div className="container mx-auto flex min-h-[65vh] max-w-2xl items-center px-4 py-16">
      <Card className="w-full">
        <CardContent className="p-8 text-center">
          <CheckCircle className="mx-auto size-11 text-primary" />
          <h1 className="mt-5 text-3xl font-semibold">Founding Radar è attivo.</h1>
          <p className="mt-3 text-muted-foreground">
            Stripe ci notifica il pagamento e aggiorna lo stato dell’abbonamento. L’attivazione può richiedere qualche secondo.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button render={<Link to="/gare" />}>Torna al radar</Button>
            <Button variant="outline" render={<a href={PORTAL} />}>Gestisci abbonamento</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
