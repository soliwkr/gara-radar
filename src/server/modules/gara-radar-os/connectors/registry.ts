import { KeywordMarketDemandConnector } from "./keyword-market";
import { ResearchCorpusConnector } from "./research-corpus";
import { SearchConsoleDemandConnector } from "./search-console";

export const connectorRegistry = {
  "SRC-GSC": new SearchConsoleDemandConnector(),
  "SRC-KEYWORD-MARKET": new KeywordMarketDemandConnector(),
  "RESEARCH-CORPUS": new ResearchCorpusConnector(),
} as const;

export type ConnectorId = keyof typeof connectorRegistry;
