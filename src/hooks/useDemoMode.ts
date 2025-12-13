export function useDemoMode(): boolean {
  // Check environment variable (for local testing)
  if (import.meta.env.VITE_DEMO_MODE === 'true') {
    return true;
  }
  // Check hostname for demo subdomain (handles both demo. and www.demo.)
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    return hostname.startsWith('demo.') || hostname.startsWith('www.demo.');
  }
  return false;
}
