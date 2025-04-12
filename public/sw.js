self.addEventListener("push", function (event) {
  const data = event.data?.json();

  const title = data?.title || "New Notification";
  const options = {
    body: data?.body || "",
    icon: "aptifit.png",
    data: data,
  };
  console.log(data);
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  console.log(event);
  const payload = event.notification.data || {};

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          // Send a message to the React app
          client.postMessage({
            type: "OPEN_NOTIFICATIONS",
            payload: payload,
          });

          if ("focus" in client) return client.focus();
        }

        // If no window is open, open a new one
        if (clients.openWindow) {
          return clients.openWindow("/");
        }
      })
  );
});

// Optional: handle install or activate if needed
self.addEventListener("install", function (event) {
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(self.clients.claim());
});
