import type {
  FitnessResult,
  MarketSegmentFitness,
  OpportunityInputs,
} from "./types";

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

export function opportunityScore(input: OpportunityInputs): number {
  const demand = clamp01(input.demand);
  const supply = clamp01(input.supply);
  const pain = clamp01(input.pain);
  const competition = clamp01(input.competition);
  const acquisitionFit = clamp01(input.acquisitionFit);
  const dataQuality = clamp01(input.dataQuality);
  const automationFit = clamp01(input.automationFit);

  return Number(
    (
      0.18 * demand +
      0.18 * supply +
      0.14 * pain +
      0.14 * acquisitionFit +
      0.12 * dataQuality +
      0.16 * automationFit +
      0.08 * (1 - competition)
    ).toFixed(4),
  );
}

export function evaluateMarketFitness(
  segment: MarketSegmentFitness,
): FitnessResult {
  const required: Array<keyof MarketSegmentFitness> = [
    "demand",
    "supply",
    "dataQuality",
    "acquisitionFit",
  ];

  const missing = required.filter(
    (key) => typeof segment[key] !== "number",
  );

  if (segment.evidenceN < 20 || missing.length > 0) {
    return {
      score: null,
      recommendation: "INSUFFICIENT_DATA",
      reason:
        segment.evidenceN < 20
          ? `Need at least 20 observations; have ${segment.evidenceN}.`
          : `Missing required dimensions: ${missing.join(", ")}.`,
      dimensionsUsed: [],
    };
  }

  const demand = clamp01(segment.demand!);
  const supply = clamp01(segment.supply!);
  const pain = clamp01(segment.pain ?? 0.5);
  const dataQuality = clamp01(segment.dataQuality!);
  const acquisition = clamp01(segment.acquisitionFit!);
  const conversion = clamp01(segment.conversion ?? 0.5);
  const retention = clamp01(segment.retention ?? 0.5);
  const competitionPenalty = clamp01(segment.competition ?? 0.5);
  const operationalPenalty = clamp01(segment.operationalCost ?? 0.5);
  const humanPenalty = clamp01(segment.humanAttention ?? 0.5);

  const numerator =
    demand *
    supply *
    Math.max(0.2, pain) *
    dataQuality *
    acquisition *
    Math.max(0.2, conversion) *
    Math.max(0.2, retention);

  const denominator =
    1 +
    0.35 * competitionPenalty +
    0.35 * operationalPenalty +
    0.3 * humanPenalty;

  const score = Number(Math.pow(numerator, 1 / 7) / denominator);
  const rounded = Number(score.toFixed(4));

  let recommendation: FitnessResult["recommendation"] = "HOLD";
  if (rounded >= 0.62 && segment.evidenceN >= 100) recommendation = "EXPAND";
  else if (rounded < 0.28 && segment.evidenceN >= 100) recommendation = "FREEZE";
  else if (rounded < 0.4) recommendation = "MUTATE";

  return {
    score: rounded,
    recommendation,
    reason: `Deterministic fitness from ${segment.evidenceN} observations.`,
    dimensionsUsed: [
      "demand",
      "supply",
      "pain",
      "dataQuality",
      "acquisitionFit",
      "conversion",
      "retention",
      "competition",
      "operationalCost",
      "humanAttention",
    ],
  };
}
