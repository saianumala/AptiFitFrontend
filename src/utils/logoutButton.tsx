// src/components/common/LogoutButton.tsx
import { toast } from "react-hot-toast";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
export function LogoutButton() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const logoutResponse = await fetch(
      `${import.meta.env.VITE_BACKENDURL}/api/user/logout`,
      {
        method: "POST",
        credentials: "include",
        // headers: {
        //   "Content-Type": "application/json",
        // },
      }
    );
    if (!logoutResponse.ok) {
      const logoutResponseJson = await logoutResponse.json();
      toast.error(logoutResponseJson.message);
      return;
    }
    const registration = await navigator.serviceWorker.getRegistration();
    const subscription = await registration?.pushManager.getSubscription();
    console.log(subscription);
    if (subscription) {
      await subscription.unsubscribe();
    }
    navigate("/landing");
    toast.success("Logged out successfully");
  };

  return (
    <button
      onClick={handleLogout}
      className="p-1 rounded-full text-gray-400  hover:text-blue-600 transition-colors"
      title="Logout"
    >
      <LogOut className="h-6 w-6" />
    </button>
  );
}
