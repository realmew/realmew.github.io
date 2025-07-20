// Site-wide configuration
export const siteConfig = {
  // Global lock state - set to false to unlock all pages
  isLocked: true,
  
  // Pages that should always be accessible (even when locked)
  publicPaths: ['/', '/events'],
  
  // Description for locked pages
  lockMessage: "This page is currently locked.",
  lockSubMessage: "Only the Home and Events pages are accessible."
};
