export type DemandIntent =
  | "EXPLICIT_TENDER"
  | "PROBLEM"
  | "PROCESS"
  | "ELIGIBILITY"
  | "COMMERCIAL"
  | "EDUCATIONAL"
  | "PAIN"
  | "UNKNOWN";

const RULES: Array<{ intent: DemandIntent; patterns: RegExp[] }> = [
  {
    intent: "ELIGIBILITY",
    patterns: [
      /\bsoa\b/i,
      /requisit/i,
      /posso partecip/i,
      /chi può partecip/i,
      /senza soa/i,
      /sotto soglia/i,
    ],
  },
  {
    intent: "PROCESS",
    patterns: [
      /come partecip/i,
      /come funziona/i,
      /presentare offert/i,
      /iscriversi.*gara/i,
      /documenti.*gara/i,
    ],
  },
  {
    intent: "EXPLICIT_TENDER",
    patterns: [
      /\bgare? pubblic/i,
      /\bappalt/i,
      /\bband[oi]\b/i,
      /\bgare?\b.*(elettric|impiant|puliz|hvac|climat|edil)/i,
    ],
  },
  {
    intent: "PROBLEM",
    patterns: [
      /trovare.*lavor/i,
      /nuovi lavori/i,
      /nuovi cantieri/i,
      /lavorare.*comune/i,
      /trovare.*client/i,
    ],
  },
  {
    intent: "COMMERCIAL",
    patterns: [
      /software.*gare/i,
      /servizio.*gare/i,
      /piattaforma.*gare/i,
      /abbonamento.*gare/i,
      /alert.*gare/i,
    ],
  },
  {
    intent: "PAIN",
    patterns: [
      /troppo complicat/i,
      /non capisco/i,
      /difficile.*gara/i,
      /troppe gare/i,
      /gare irrilevanti/i,
      /gare scadute/i,
    ],
  },
  {
    intent: "EDUCATIONAL",
    patterns: [
      /cosa sono.*gare/i,
      /cosa sono.*appalt/i,
      /guida.*gare/i,
      /spiegazione.*appalt/i,
    ],
  },
];

export function classifyDemandIntent(query: string): DemandIntent {
  const normalized = query.trim();

  for (const rule of RULES) {
    if (rule.patterns.some((pattern) => pattern.test(normalized))) {
      return rule.intent;
    }
  }

  return "UNKNOWN";
}
