const FLOW_KEY = "valentine_flowStep";
const NO_CLICKS_KEY = "valentine_noClicks";

export type FlowStep = "invite" | "restaurants" | "flower";

export function getFlowStep(): FlowStep | null {
  try {
    const v = localStorage.getItem(FLOW_KEY);
    if (v === "invite" || v === "restaurants" || v === "flower") return v;
    return null;
  } catch {
    return null;
  }
}

export function setFlowStep(step: FlowStep): void {
  try {
    localStorage.setItem(FLOW_KEY, step);
  } catch {
    // ignore
  }
}

export function getNoButtonHoverCount(): number {
  try {
    const v = localStorage.getItem(NO_CLICKS_KEY);
    return v ? Math.max(0, parseInt(v, 10)) : 0;
  } catch {
    return 0;
  }
}

export function incrementNoButtonHoverCount(): number {
  const n = getNoButtonHoverCount() + 1;
  try {
    localStorage.setItem(NO_CLICKS_KEY, String(n));
  } catch {
    // ignore
  }
  return n;
}
