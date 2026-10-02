import type { Signal } from "../types";
import type { ConnectorRunContext, SignalConnector } from "./types";

export interface SearchConsoleQueryRow {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number | null;
}

export interface SearchConsoleSnapshot {
  siteUrl: string;
  startDate: string;
  endDate: string;
  rows: SearchConsoleQueryRow[];
}

/**
 * Pure normalizer for official Google Search Console query data.
 *
 * Authentication and HTTP transport intentionally live outside this connector:
 * credentials must never be committed or embedded in generated code. The runtime
 * hands this connector an already-fetched SearchConsoleSnapshot.
 */
export class SearchConsoleDemandConnector
  implements SignalConnector<SearchConsoleSnapshot>
{
  id = "SRC-GSC";

  async collect(
    snapshot: SearchConsoleSnapshot,
    context: ConnectorRunContext,
  ): Promise<Signal[]> {
    return snapshot.rows
      .filter((row) => row.query.trim().length > 0)
      .map((row, index): Signal => ({
        id: [
          "gsc",
          snapshot.startDate,
          snapshot.endDate,
          String(index),
          row.query.trim().toLowerCase(),
        ].join(":"),
        observedAt: context.now,
        sourceId: this.id,
        radar: "DEMAND",
        segmentId: context.segmentId,
        type: "search_query_performance",
        subject: row.query.trim(),
        market: "IT",
        confidence: 1,
        evidenceUrl: snapshot.siteUrl,
        payload: {
          clicks: row.clicks,
          impressions: row.impressions,
          ctr: row.ctr,
          position: row.position,
          startDate: snapshot.startDate,
          endDate: snapshot.endDate,
        },
      }));
  }
}
