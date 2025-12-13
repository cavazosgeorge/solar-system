export function useDemoMode(): boolean {
  // Check environment variable (for local testing)
  if (import.meta.env.VITE_DEMO_MODE === 'true') {
    return true;
  }
  // Check hostname for demo subdomain
  if (typeof window !== 'undefined') {
    return window.location.hostname.startsWith('demo.');
  }
  return false;
}
