(() => {
  if (!window.logger) return;

  window.logger.info('page:loaded', {
    path: window.location.pathname,
    referrer: document.referrer || null,
    userAgent: navigator.userAgent,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
  });

  window.addEventListener('error', (event) => {
    window.logger.error('uncaught:error', {
      errorMessage: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    });
  });

  window.addEventListener('unhandledrejection', (event) => {
    window.logger.error('uncaught:rejection', {
      reason: String(event.reason),
    });
  });
})();
