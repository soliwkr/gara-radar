import { opportunityScore } from "./scoring";
import type { OpportunityInputs, OpportunityProposal, Signal } from "./types";

const DEMAND_SIDE = new Set(["DEMAND", "PAIN", "BEHAVIOR"]);

export interface MineOpportunityArgs {
  id: string;
  segmentId: string;
  trigger: string;
  thesisSummary: string;
  signals: Signal[];
  inputs: OpportunityInputs;
}

/**
 * Guardrail: an opportunity cannot be proposed from a single noisy source.
 * It needs:
 * - >= 5 supporting observations
 * - SUPPLY evidence
 * - at least one demand-side radar (DEMAND, PAIN or BEHAVIOR)
 * - >= 3 distinct radar families total
 */
export function mineOpportunity(
  args: MineOpportunityArgs,
): OpportunityProposal | null {
  const radars = new Set(args.signals.map((signal) => signal.radar));
  const hasSupply = radars.has("SUPPLY");
  const hasDemandSide = [...radars].some((radar) => DEMAND_SIDE.has(radar));

  if (
    args.signals.length < 5 ||
    !hasSupply ||
    !hasDemandSide ||
    radars.size < 3
  ) {
    return null;
  }

  return {
    id: args.id,
    segmentId: args.segmentId,
    trigger: args.trigger,
    thesisSummary: args.thesisSummary,
    inputs: args.inputs,
    score: opportunityScore(args.inputs),
    supportingSignalIds: args.signals.map((signal) => signal.id),
    status: "PROPOSED",
  };
}
