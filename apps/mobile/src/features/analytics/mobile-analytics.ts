import { MobileAnalytics } from "./analytics-core";

// Product analytics is removed: no client is made and nothing is sent.
export const mobileAnalytics = new MobileAnalytics(() => null);
