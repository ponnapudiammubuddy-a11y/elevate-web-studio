// Google Analytics 4 Event Tracking Utility
// Works with Google Tag Manager dataLayer

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

type EventParams = Record<string, string | number | boolean | undefined>;

/**
 * Push an event to the GTM dataLayer for GA4 tracking
 */
export const trackEvent = (
  eventName: string,
  eventParams?: EventParams
): void => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventParams,
    });
  }
};

/**
 * Track button click events
 */
export const trackButtonClick = (
  buttonName: string,
  buttonLocation?: string,
  additionalParams?: EventParams
): void => {
  trackEvent('button_click', {
    button_name: buttonName,
    button_location: buttonLocation,
    ...additionalParams,
  });
};

/**
 * Track form submission events
 */
export const trackFormSubmission = (
  formName: string,
  formLocation?: string,
  additionalParams?: EventParams
): void => {
  trackEvent('form_submission', {
    form_name: formName,
    form_location: formLocation,
    ...additionalParams,
  });
};

/**
 * Track form start events (when user begins filling)
 */
export const trackFormStart = (
  formName: string,
  formLocation?: string
): void => {
  trackEvent('form_start', {
    form_name: formName,
    form_location: formLocation,
  });
};

/**
 * Track CTA click events
 */
export const trackCTAClick = (
  ctaName: string,
  ctaLocation: string,
  destination?: string
): void => {
  trackEvent('cta_click', {
    cta_name: ctaName,
    cta_location: ctaLocation,
    cta_destination: destination,
  });
};

/**
 * Track modal open events
 */
export const trackModalOpen = (modalName: string): void => {
  trackEvent('modal_open', {
    modal_name: modalName,
  });
};

/**
 * Track modal close events
 */
export const trackModalClose = (modalName: string): void => {
  trackEvent('modal_close', {
    modal_name: modalName,
  });
};

/**
 * Track navigation events
 */
export const trackNavigation = (
  linkName: string,
  destination: string
): void => {
  trackEvent('navigation_click', {
    link_name: linkName,
    link_destination: destination,
  });
};

/**
 * Track page view events (for SPA navigation)
 */
export const trackPageView = (
  pagePath: string,
  pageTitle?: string
): void => {
  trackEvent('page_view', {
    page_path: pagePath,
    page_title: pageTitle,
  });
};

/**
 * Track scroll depth events
 */
export const trackScrollDepth = (
  depth: number,
  pagePath: string
): void => {
  trackEvent('scroll_depth', {
    scroll_depth_percentage: depth,
    page_path: pagePath,
  });
};
