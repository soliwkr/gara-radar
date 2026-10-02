import type { Signal } from "../types";

export interface ConnectorRunContext {
  now: string;
  segmentId?: string;
}

export interface SignalConnector<TConfig = unknown> {
  id: string;
  collect(config: TConfig, context: ConnectorRunContext): Promise<Signal[]>;
}
