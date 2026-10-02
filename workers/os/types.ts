export const RADARS = [
  "SUPPLY",
  "DEMAND",
  "PAIN",
  "COMPETITION",
  "BEHAVIOR",
  "ECONOMIC",
  "REGULATORY",
  "FIRMOGRAPHIC",
] as const;

export type Radar = (typeof RADARS)[number];

export type SourceStatus =
  | "LIVE"
  | "MANUAL"
  | "REQUIRES_AUTH"
  | "LIMITED_ACCESS"
  | "DORMANT"
  | "BROKEN";

export interface SourceDefinition {
  id: string;
  radar: Radar;
  name: string;
  status: SourceStatus;
  cadence: string;
  access: string;
  url?: string;
  notes?: string;
}

export interface Signal {
  id: string;
  observedAt: string;
  sourceId: string;
  radar: Radar;
  segmentId?: string;
  type: string;
  subject: string;
  market?: string;
  payload?: Record<string, unknown>;
  confidence: number;
  evidenceUrl?: string;
}

export interface OpportunityInputs {
  demand: number;
  supply: number;
  pain: number;
  competition: number;
  acquisitionFit: number;
  dataQuality: number;
  automationFit: number;
}

export interface OpportunityProposal {
  id: string;
  segmentId: string;
  trigger: string;
  thesisSummary: string;
  inputs: OpportunityInputs;
  score: number;
  supportingSignalIds: string[];
  status: "PROPOSED";
}

export interface MarketSegmentFitness {
  segmentId: string;
  demand?: number;
  supply?: number;
  pain?: number;
  competition?: number;
  dataQuality?: number;
  acquisitionFit?: number;
  conversion?: number;
  retention?: number;
  operationalCost?: number;
  humanAttention?: number;
  evidenceN: number;
}

export type FitnessRecommendation =
  | "INSUFFICIENT_DATA"
  | "HOLD"
  | "EXPAND"
  | "MUTATE"
  | "FREEZE"
  | "KILL";

export interface FitnessResult {
  score: number | null;
  recommendation: FitnessRecommendation;
  reason: string;
  dimensionsUsed: string[];
}
