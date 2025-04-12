// src/components/common/DashboardHeader.tsx
import { useAuth } from "@/customHooks/useAuth";
import { Link } from "react-router-dom";
import { SearchBar } from "./searchBar";
import { Notifications } from "./notification";
import { UserAvatar } from "./userAvatar";
import { LogoutButton } from "@/utils/logoutButton";
// import { useAuth } from '../../hooks/useAuth';
// import { UserAvatar } from './UserAvatar';
// import { Notifications } from './Notifications';
// import { SearchBar } from './SearchBar';
// import { LogoutButton } from './LogoutButton';

export function DashboardHeader() {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left section - Search bar */}
        <div className="flex-1 max-w-md">
          <SearchBar />
        </div>

        {/* Right section - User controls */}
        <div className="ml-4 flex items-center space-x-4 ">
          <Notifications />

          <div className="flex-shrink-0 flex items-center hover:text-blue-600 transition-colors">
            <Link to="/profile" className="flex items-center space-x-2 ">
              <UserAvatar
                name={user?.fullName || "User"}
                // @ts-ignore
                avatarUrl={user?.avatar}
              />
              {/* <span className="hidden md:inline font-medium">{"Profile"}</span> */}
            </Link>
          </div>

          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
