type AnalyticsValue = string | number | boolean | undefined | null;

type AnalyticsParams = Record<string, AnalyticsValue>;

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

const cleanParams = (params: AnalyticsParams) =>
  Object.fromEntries(
    Object.entries(params).filter(([, value]) => {
      if (value === undefined || value === null) return false;
      if (typeof value === "string" && value.trim() === "") return false;
      return true;
    })
  );

const getPageParams = (): AnalyticsParams => {
  if (typeof window === "undefined") return {};

  const url = new URL(window.location.href);
  const attributionParams = UTM_KEYS.reduce<AnalyticsParams>((acc, key) => {
    const value = url.searchParams.get(key);
    if (value) acc[key] = value;
    return acc;
  }, {});

  const referrer = document.referrer ? new URL(document.referrer) : null;
  const isDebug = url.searchParams.has("debug_ga");

  return cleanParams({
    page_location: url.href,
    page_path: `${url.pathname}${url.hash}`,
    page_title: document.title,
    referrer_domain: referrer?.hostname,
    debug_mode: isDebug ? true : undefined,
    transport_type: "beacon",
    ...attributionParams,
  });
};

export const trackEvent = (eventName: string, params: AnalyticsParams = {}) => {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, cleanParams({
    ...getPageParams(),
    ...params,
  }));
};

export const trackCtaClick = (
  ctaName: string,
  ctaLocation: string,
  destination: string
) => {
  trackEvent("cta_click", {
    event_category: "engagement",
    cta_name: ctaName,
    cta_location: ctaLocation,
    destination,
  });
};

export const trackNavigationClick = (section: string) => {
  trackEvent("navigation_click", {
    event_category: "navigation",
    nav_section: section,
  });
};

export const trackSectionView = (section: string) => {
  trackEvent("section_view", {
    event_category: "engagement",
    section_name: section,
  });
};

export const trackPortfolioClick = (
  projectName: string,
  linkUrl: string,
  linkLocation: "desktop" | "mobile" | "dropdown"
) => {
  trackEvent("portfolio_click", {
    event_category: "portfolio",
    project_name: projectName,
    link_url: linkUrl,
    link_location: linkLocation,
  });

  trackEvent("select_content", {
    content_type: "portfolio_project",
    item_id: projectName,
    link_location: linkLocation,
  });
};

export const trackPortfolioDropdownOpen = (projectName: string) => {
  trackEvent("portfolio_dropdown_open", {
    event_category: "portfolio",
    project_name: projectName,
  });
};

export const trackContactFormOpen = () => {
  trackEvent("contact_form_open", {
    event_category: "lead",
    form_name: "contact_form",
  });
};

export const trackContactFormStart = (firstField: string) => {
  trackEvent("contact_form_start", {
    event_category: "lead",
    form_name: "contact_form",
    first_field: firstField,
  });
};

export const trackContactFormSubmit = () => {
  trackEvent("contact_form_submit", {
    event_category: "lead",
    form_name: "contact_form",
  });
};

export const trackContactFormValidationError = (fields: string[]) => {
  trackEvent("contact_form_validation_error", {
    event_category: "lead",
    form_name: "contact_form",
    error_fields: fields.join(","),
  });
};

export const trackContactFormSuccess = () => {
  trackEvent("generate_lead", {
    event_category: "lead",
    form_name: "contact_form",
    method: "contact_form",
  });

  trackEvent("contact_form_success", {
    event_category: "lead",
    form_name: "contact_form",
  });
};

export const trackContactFormError = (errorType: string) => {
  trackEvent("contact_form_error", {
    event_category: "lead",
    form_name: "contact_form",
    error_type: errorType,
  });
};

export const trackContactLinkClick = (
  contactMethod: string,
  linkLocation: string
) => {
  trackEvent("contact_link_click", {
    event_category: "lead",
    contact_method: contactMethod,
    link_location: linkLocation,
  });
};

export const trackSocialLinkClick = (network: string, linkLocation: string) => {
  trackEvent("social_link_click", {
    event_category: "social",
    social_network: network,
    link_location: linkLocation,
  });
};
