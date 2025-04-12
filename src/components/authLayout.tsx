// src/layouts/AuthLayout.tsx
import { Outlet } from "react-router-dom";
import { AuthHeader } from "./authHeader";

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AuthHeader />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
