import { Hono } from "hono";
import { createRequestHandler } from "react-router";
import { SOURCE_REGISTRY } from "./os/source-registry";

type Bindings = {
  GR_CONTROL?: KVNamespace;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/api/health", (c) =>
  c.json({
    ok: true,
    service: "gara-radar",
  }),
);

app.get("/api/os/status", async (c) => {
  let experiment: unknown = null;
  let latestDecision: unknown = null;

  if (c.env.GR_CONTROL) {
    const [experimentRaw, decisionRaw] = await Promise.all([
      c.env.GR_CONTROL.get("experiment:EXP-001"),
      c.env.GR_CONTROL.get("decision:latest"),
    ]);

    if (experimentRaw) {
      try {
        experiment = JSON.parse(experimentRaw);
      } catch {
        experiment = { error: "invalid experiment state" };
      }
    }

    if (decisionRaw) {
      try {
        latestDecision = JSON.parse(decisionRaw);
      } catch {
        latestDecision = { error: "invalid decision state" };
      }
    }
  }

  return c.json({
    ok: true,
    os: "gara-radar-os",
    version: 1,
    autonomyLevel: 2,
    radars: [
      "SUPPLY",
      "DEMAND",
      "PAIN",
      "COMPETITION",
      "BEHAVIOR",
      "ECONOMIC",
      "REGULATORY",
      "FIRMOGRAPHIC",
    ],
    sources: SOURCE_REGISTRY.map((source) => ({
      id: source.id,
      radar: source.radar,
      name: source.name,
      status: source.status,
      cadence: source.cadence,
    })),
    experiment,
    latestDecision,
  });
});

app.get("*", (c) => {
  const requestHandler = createRequestHandler(
    () => import("virtual:react-router/server-build"),
    import.meta.env.MODE,
  );

  return requestHandler(c.req.raw, {
    cloudflare: { env: c.env, ctx: c.executionCtx },
  });
});

export default app;
