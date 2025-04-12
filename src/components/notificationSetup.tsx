import React, { useEffect } from "react";
import { registerServiceWorker } from "../serviceWorker";
import { subscribeUser } from "../pushNotification";

const NotificationSetup: React.FC = () => {
  useEffect(() => {
    async function setupPush() {
      const registration = await registerServiceWorker();
      if (registration) {
        await subscribeUser(registration);
      }
    }

    setupPush().catch(console.error);
  }, []);

  return null; // No UI needed
};

export default NotificationSetup;
