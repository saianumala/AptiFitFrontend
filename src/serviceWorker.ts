let registration: ServiceWorkerRegistration | null = null;
export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if ("serviceWorker" in navigator) {
    try {
      if (!registration) {
        registration = await navigator.serviceWorker.register("/sw.js");
      }
      return registration;
    } catch (error) {
      console.error("Service Worker registration failed:", error);
    }
  }
  return null;
}
