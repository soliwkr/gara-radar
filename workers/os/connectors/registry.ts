import { SearchConsoleDemandConnector } from "./search-console";

export const connectorRegistry = {
  "SRC-GSC": new SearchConsoleDemandConnector(),
} as const;

export type ConnectorId = keyof typeof connectorRegistry;
