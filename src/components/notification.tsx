import { useState } from "react";
import {
  notificationsState,
  selectedNotificationAtom,
  showNotificationsAtom,
} from "@/recoilStore/recoilAtoms";
import { BellIcon, X } from "lucide-react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useAuth } from "@/customHooks/useAuth";

export interface Notification {
  id: string;
  userId?: string;
  title: string;
  message: string;
  type?: string;
  referenceId?: string;
  actions?: any | null;
  read: boolean;
  createdAt: string;
  updatedAt?: string;
}

export function Notifications() {
  const [showNotifications, setShowNotifications] = useRecoilState(
    showNotificationsAtom
  );
  const [selectedNotification, setSelectedNotification] = useRecoilState(
    selectedNotificationAtom
  );
  // Get notifications from Recoil state
  const notifications = useRecoilValue(notificationsState);
  const setNotifications = useSetRecoilState(notificationsState);
  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setSelectedNotification(null); // Reset selected notification when toggling panel
  };

  const handleNotificationClick = async (notification: Notification) => {
    setSelectedNotification(notification);
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_BACKENDURL}/api/notifications/read/${
          notification.id
        }`,
        {
          credentials: "include",
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // const notificationResponse = await resp.json();

      if (!resp.ok) {
        throw new Error("Failed to mark notification as read");
      }

      // Update local state after successful API call
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === notification?.id
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const closeDetails = () => {
    setSelectedNotification(null);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggleNotifications}
        className="p-1 rounded-full hover:cursor-pointer text-gray-400 hover:text-blue-600 relative"
      >
        <BellIcon className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification panel */}
      {showNotifications && !selectedNotification && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50 overflow-hidden border border-gray-200">
          <div className="p-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-medium text-gray-700">Notifications</h3>
            <button
              onClick={toggleNotifications}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No notifications
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {notifications.map((notification) => (
                  <li
                    key={notification.id}
                    // @ts-ignore
                    onClick={() => handleNotificationClick(notification)}
                    className={`p-3 hover:bg-gray-50 cursor-pointer ${
                      !notification.read ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="flex justify-between">
                      <p className="font-medium text-sm text-gray-800">
                        {notification.title}
                      </p>
                      <span className="text-xs text-gray-500">
                        {new Date(notification.createdAt!).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {notification.message}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Notification details */}
      {showNotifications && selectedNotification && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50 overflow-hidden border border-gray-200">
          <div className="p-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-medium text-gray-700">Notification Details</h3>
            <button
              onClick={closeDetails}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="p-4">
            <h4 className="font-medium text-gray-800 mb-2">
              {selectedNotification.title}
            </h4>
            <p className="text-sm text-gray-600 mb-3">
              {selectedNotification.message}
            </p>

            <div className="space-y-2 text-xs text-gray-500">
              <div className="flex justify-between">
                <span>Type:</span>
                <span className="font-medium">{selectedNotification.type}</span>
              </div>
              <div className="flex justify-between">
                <span>Created:</span>
                <span className="font-medium">
                  {new Date(selectedNotification.createdAt!).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Updated:</span>
                <span className="font-medium">
                  {new Date(selectedNotification.updatedAt!).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="font-medium text-gray-500">Read</span>
              </div>
            </div>

            {selectedNotification.actions && (
              <div className="mt-4 pt-3 border-t border-gray-100">
                <h5 className="text-sm font-medium text-gray-700 mb-2">
                  Actions
                </h5>
                <pre className="text-xs bg-gray-50 p-2 rounded overflow-x-auto">
                  {JSON.stringify(selectedNotification.actions, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
