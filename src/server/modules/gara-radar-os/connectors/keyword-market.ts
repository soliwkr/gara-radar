import { classifyDemandIntent } from "../demand-intent";
import type { Signal } from "../types";
import type { ConnectorRunContext, SignalConnector } from "./types";

export interface KeywordMarketRow {
  keyword: string;
  locale: string;
  monthlySearchVolume?: number;
  cpcEur?: number;
  competition?: number;
  trendIndex?: number;
  source: string;
}

export interface KeywordMarketSnapshot {
  observedAt: string;
  rows: KeywordMarketRow[];
}

export class KeywordMarketDemandConnector
  implements SignalConnector<KeywordMarketSnapshot>
{
  id = "SRC-KEYWORD-MARKET";

  async collect(
    snapshot: KeywordMarketSnapshot,
    context: ConnectorRunContext,
  ): Promise<Signal[]> {
    return snapshot.rows
      .filter((row) => row.keyword.trim().length > 0)
      .map((row, index): Signal => ({
        id: [
          "kw",
          snapshot.observedAt.slice(0, 10),
          String(index),
          row.keyword.trim().toLowerCase(),
        ].join(":"),
        observedAt: snapshot.observedAt || context.now,
        sourceId: this.id,
        radar: "DEMAND",
        segmentId: context.segmentId,
        type: "keyword_market_observation",
        subject: row.keyword.trim(),
        market: row.locale,
        confidence: 1,
        payload: {
          monthlySearchVolume: row.monthlySearchVolume ?? null,
          cpcEur: row.cpcEur ?? null,
          competition: row.competition ?? null,
          trendIndex: row.trendIndex ?? null,
          provider: row.source,
          intent: classifyDemandIntent(row.keyword),
        },
      }));
  }
}
