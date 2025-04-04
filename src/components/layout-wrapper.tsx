"use client";

import { usePathname } from "next/navigation";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Pages where Sidebar & Header should NOT appear
  const noSidebarRoutes = ["/", "/login", "/signup"];
  const isDashboardLayout = !noSidebarRoutes.includes(pathname);

  return (
    <>
      {isDashboardLayout ? (
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <div className="flex-1">
            <AppHeader />
            {children}
          </div>
        </div>
      ) : (
        <div className="flex w-full justify-center items-center min-h-screen">
          {children}
        </div>
      )}
    </>
  );
}
