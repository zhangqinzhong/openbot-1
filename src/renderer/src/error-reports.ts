import type { AppInfo, CentralAuthUser } from "@openbot/contracts/ipc";
import type { FailureProperties } from "@openbot/telemetry";

// Failure reports are removed. These functions keep the call sites and the web preference, and send
// nothing.

let enabled = false;
/** The web analytics preference. The key keeps its first name, so stored choices stay. */
export const WEB_PREFERENCE = "openbot:web:error-reports-enabled";

export function configureDesktopReports(
  _info: AppInfo,
  tracking: boolean,
  _user: Pick<CentralAuthUser, "id" | "email"> | null,
): void {
  configureErrorReports(tracking);
}

export function configureErrorReports(tracking: boolean, _accountId: string | null = null): void {
  enabled = tracking;
}

export function webReportsEnabled(): boolean {
  try {
    const stored = localStorage.getItem(WEB_PREFERENCE);
    return stored === null || stored === "true";
  } catch {
    return false;
  }
}

export function configureWebReports(_user: Pick<CentralAuthUser, "id" | "email"> | null): void {
  configureErrorReports(webReportsEnabled());
}

export function setWebReportsEnabled(value: boolean): boolean {
  try {
    localStorage.setItem(WEB_PREFERENCE, String(value));
    configureErrorReports(value);
  } catch {
    configureErrorReports(false);
  }
  return enabled;
}

export function reportNotification(_properties: FailureProperties): void {}

export function reportErrorBanner(_error: unknown, _operation: FailureProperties["operation"] = "other"): void {}
