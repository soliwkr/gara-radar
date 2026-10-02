import { useQuery } from '@tanstack/react-query'
import {
  Pulse,
  ArrowClockwise,
  ChartBar,
  Database,
  Eye,
  Gauge,
  Lightning,
  Warning,
} from '@phosphor-icons/react'
import { apiClient } from '@/client/lib/api-client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PageContainer } from '@/components/ui/page-container'
import { PageHeader } from '@/components/ui/page-header'
import { Spinner } from '@/components/ui/spinner'

interface Source {
  id: string
  radar: string
  name: string
  status: string
  cadence: string
  access: string
  url: string | null
  lastCollectedAt: string | null
  lastError: string | null
}

interface Segment {
  id: string
  trade: string
  territory: string
  marketFitness: number | null
  evidenceN: number
  status: string
}

interface Experiment {
  id: string
  hypothesis: string
  lever: string
  status: string
  primaryMetric: string
  minimumSamples: number
}

interface HumanAction {
  id: string
  type: string
  system: string
  reason: string
  status: string
  referenceUrl: string | null
}

interface Signal {
  id: string
  radar: string
  type: string
  subject: string
  market: string | null
  observedAt: string
  confidence: number
}

interface Overview {
  generatedAt: string
  sourceStatus: Record<string, number>
  counts: {
    sources: number
    signals: number
    segments: number
    opportunities: number
    experiments: number
    humanActions: number
  }
  sources: Source[]
  segments: Segment[]
  experiments: Experiment[]
  humanActions: HumanAction[]
  recentSignals: Signal[]
}

const statusTone: Record<string, string> = {
  LIVE: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  MANUAL: 'bg-amber-500/10 text-amber-700 dark:text-amber-300',
  REQUIRES_AUTH: 'bg-orange-500/10 text-orange-700 dark:text-orange-300',
  LIMITED_ACCESS: 'bg-violet-500/10 text-violet-700 dark:text-violet-300',
  DORMANT: 'bg-muted text-muted-foreground',
  BROKEN: 'bg-destructive/10 text-destructive',
}

function StatusPill({ value }: { value: string }) {
  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${statusTone[value] ?? 'bg-muted text-muted-foreground'}`}>
      {value.replaceAll('_', ' ')}
    </span>
  )
}

export function ControlRoomPage() {
  const overview = useQuery({
    queryKey: ['gara-radar-os', 'overview'],
    queryFn: () => apiClient.get<Overview>('/api/gara-radar-os/overview'),
    refetchInterval: 30_000,
  })

  if (overview.isLoading) {
    return (
      <PageContainer type="hub">
        <PageHeader title="Gara Radar Control Room" subtitle="Loading market observatory…" />
        <div className="flex h-48 items-center justify-center">
          <Spinner size="lg" />
        </div>
      </PageContainer>
    )
  }

  if (overview.isError || !overview.data) {
    return (
      <PageContainer type="hub">
        <PageHeader title="Gara Radar Control Room" subtitle="The cockpit could not read its D1 state." />
        <Card>
          <CardContent className="flex items-center gap-3 p-6 text-sm text-destructive">
            <Warning className="size-5" />
            D1 schema or Control Room API is not ready yet. This migration branch will not replace production until this is green.
          </CardContent>
        </Card>
      </PageContainer>
    )
  }

  const data = overview.data
  const liveSources = data.sources.filter((source) => source.status === 'LIVE').length

  const stats = [
    { label: 'Live sources', value: `${liveSources}/${data.counts.sources}`, icon: Database },
    { label: 'Signals', value: data.counts.signals, icon: Pulse },
    { label: 'Segments', value: data.counts.segments, icon: Gauge },
    { label: 'Opportunities', value: data.counts.opportunities, icon: Lightning },
    { label: 'Experiments', value: data.counts.experiments, icon: ChartBar },
    { label: 'Needs you', value: data.counts.humanActions, icon: Eye },
  ]

  return (
    <PageContainer type="hub">
      <PageHeader
        title="Gara Radar Control Room"
        subtitle="Supply + demand + pain + competition + behavior + economics. Evidence first, side effects second."
        trailing={
          <Button size="sm" variant="outline" onClick={() => overview.refetch()}>
            <ArrowClockwise className="mr-1.5 size-4" />
            Refresh
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
        {stats.map(({ label, value, icon: Icon }) => (
          <Card key={label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{label}</span>
                <Icon className="size-4 text-muted-foreground" />
              </div>
              <div className="mt-2 text-2xl font-semibold tabular-nums">{value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.35fr_.65fr]">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Radar sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y rounded-lg border">
              {data.sources.map((source) => (
                <div key={source.id} className="grid gap-2 p-3 md:grid-cols-[130px_1fr_auto] md:items-center">
                  <div className="text-xs font-medium text-muted-foreground">{source.radar}</div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{source.name}</div>
                    <div className="truncate text-xs text-muted-foreground">{source.cadence} · {source.access}</div>
                  </div>
                  <StatusPill value={source.status} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">What needs you</CardTitle>
          </CardHeader>
          <CardContent>
            {data.humanActions.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nothing is waiting for human approval.</p>
            ) : (
              <div className="space-y-2">
                {data.humanActions.map((action) => (
                  <div key={action.id} className="rounded-lg border p-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-sm font-medium">{action.system}</div>
                      <StatusPill value={action.status} />
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{action.reason}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent signals</CardTitle>
          </CardHeader>
          <CardContent>
            {data.recentSignals.length === 0 ? (
              <p className="text-sm text-muted-foreground">No D1 signals yet. The collectors are still being migrated.</p>
            ) : (
              <div className="space-y-2">
                {data.recentSignals.map((signal) => (
                  <div key={signal.id} className="rounded-lg border p-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-medium text-muted-foreground">{signal.radar}</span>
                      <span className="text-[11px] text-muted-foreground">· {signal.type}</span>
                    </div>
                    <div className="mt-1 text-sm">{signal.subject}</div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Market segments</CardTitle>
          </CardHeader>
          <CardContent>
            {data.segments.length === 0 ? (
              <p className="text-sm text-muted-foreground">No segment has enough migrated evidence yet.</p>
            ) : (
              <div className="space-y-2">
                {data.segments.map((segment) => (
                  <div key={segment.id} className="flex items-center justify-between gap-4 rounded-lg border p-3">
                    <div>
                      <div className="text-sm font-medium">{segment.trade}</div>
                      <div className="text-xs text-muted-foreground">{segment.territory} · n={segment.evidenceN}</div>
                    </div>
                    <div className="text-right">
                      <StatusPill value={segment.status} />
                      <div className="mt-1 text-xs tabular-nums text-muted-foreground">
                        fitness {segment.marketFitness == null ? '—' : segment.marketFitness.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}
