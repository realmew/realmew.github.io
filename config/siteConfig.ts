// Site-wide configuration
export const siteConfig = {
  // Global lock state - set to true to lock all pages except publicPaths
  isLocked: false,
  
  // Pages that should always be accessible (even when locked)
  publicPaths: ['/', '/events'],
  
  // Description for locked pages
  lockMessage: "This page is currently locked.",
  lockSubMessage: "Only the Home and Events pages are accessible."
};
