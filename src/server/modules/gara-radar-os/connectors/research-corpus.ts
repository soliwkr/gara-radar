import type { Radar, Signal } from "../types";
import type { ConnectorRunContext, SignalConnector } from "./types";

type ResearchRadar = Extract<Radar, "PAIN" | "COMPETITION" | "REGULATORY">;

export interface ResearchObservation {
  id: string;
  radar: ResearchRadar;
  sourceId: string;
  subject: string;
  evidenceUrl: string;
  observedAt: string;
  market?: string;
  confidence: number;
  payload?: Record<string, unknown>;
}

export interface ResearchCorpusSnapshot {
  observations: ResearchObservation[];
}

/**
 * Converts already-approved research observations into Signals.
 *
 * This connector does no crawling. URL discovery/fetching must happen in a
 * separate allowlisted acquisition layer that respects source terms, robots,
 * timeouts, size limits and SSRF protections.
 */
export class ResearchCorpusConnector
  implements SignalConnector<ResearchCorpusSnapshot>
{
  id = "RESEARCH-CORPUS";

  async collect(
    snapshot: ResearchCorpusSnapshot,
    context: ConnectorRunContext,
  ): Promise<Signal[]> {
    return snapshot.observations
      .filter(
        (observation) =>
          observation.subject.trim().length > 0 &&
          observation.evidenceUrl.startsWith("https://"),
      )
      .map(
        (observation): Signal => ({
          id: observation.id,
          observedAt: observation.observedAt || context.now,
          sourceId: observation.sourceId,
          radar: observation.radar,
          segmentId: context.segmentId,
          type:
            observation.radar === "PAIN"
              ? "pain_observation"
              : observation.radar === "COMPETITION"
                ? "competitor_observation"
                : "regulatory_source_change",
          subject: observation.subject.trim(),
          market: observation.market ?? "IT",
          confidence: Math.max(0, Math.min(1, observation.confidence)),
          evidenceUrl: observation.evidenceUrl,
          payload: observation.payload,
        }),
      );
  }
}
