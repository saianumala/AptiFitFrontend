// src/layouts/DashboardLayout.tsx
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./sidebar/sidebarComponent";
import { useEffect } from "react";
import { DashboardHeader } from "./dashBoardHeader";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "@/customHooks/useAuth";
import { useSetRecoilState } from "recoil";
import {
  notificationsState,
  // selectedNotificationAtom,
  showNotificationsAtom,
} from "@/recoilStore/recoilAtoms";
import ChatWidget from "./chatWidget";

export function DashboardLayout() {
  const navigate = useNavigate();
  const setNotifications = useSetRecoilState(notificationsState);
  const setShowNotifications = useSetRecoilState(showNotificationsAtom);
  // const setSelectedNotification = useSetRecoilState(selectedNotificationAtom);
  const { isAuthenticated, loading, user } = useAuth();
  useEffect(() => {
    if (!loading && isAuthenticated) {
      if (user?.firstLogin) {
        navigate("/preferences");
        return;
      }
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.addEventListener("message", (event) => {
          if (event.data?.type === "OPEN_NOTIFICATIONS") {
            const payload = event.data.payload;
            console.log("payload", payload);
            console.log("event data", event.data);
            setNotifications((prevNotifications) => [
              ...prevNotifications,
              {
                title: payload.title,
                message: payload.body,
                id: uuidv4(),
                createdAt: new Date().toISOString(),
                read: false,
                type: "scheduled Notification",
              },
            ]); // Custom function to set your notifications
            setShowNotifications(true);

            // setOpenNotifications(true);     // Custom function to open your notification panel
          }
        });
      }
      // navigate("/");
    }
  }, [isAuthenticated, loading, user]);
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-6">
            <ChatWidget />
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
