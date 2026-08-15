/**
 * Analytics Utility
 * Ready for future Facebook Pixel/GTM integrations.
 * Current implementation logs to console in development.
 */
export const trackEvent = (eventName: string, data?: Record<string, unknown>) => {
  // Console logging for demo verification
  console.log(`[Analytics Event Tracker]: ${eventName}`, data);

  // Future integration placeholder:
  // if (typeof window !== "undefined" && (window as any).fbq) {
  //   (window as any).fbq("track", eventName, data);
  // }
};
