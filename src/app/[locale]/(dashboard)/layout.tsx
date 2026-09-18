"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setActiveTab, setLogoutModalOpen } from "@/redux/slices/uiSlice";
import { logout } from "@/redux/slices/authSlice";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { MobileDrawer } from "@/components/layout/MobileDrawer";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { logoutUser } from "@/services/actions/auth";
import { getTranslation } from "@/utils/translations";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const dispatch = useAppDispatch();
  const { isAuthenticated, initialized } = useAppSelector((state) => state.auth);
  const logoutModalOpen = useAppSelector((state) => state.ui.logoutModalOpen);
  const sidebarCollapsed = useAppSelector((state) => state.ui.sidebarCollapsed);

  const locale = (params?.locale as string) || "en";
  const t = getTranslation(locale);

  
  useEffect(() => {
    if (initialized && !isAuthenticated) {
      router.replace(`/${locale}/login`);
    }
  }, [initialized, isAuthenticated, router, locale]);

  
  useEffect(() => {
    if (pathname) {
      let tab = "dashboard";
      if (pathname !== "/") {
        
        tab = pathname.split("/").filter(Boolean)[1] || "dashboard";
      }
      dispatch(setActiveTab(tab));
    }
  }, [pathname, dispatch]);

  const handleLogoutConfirm = async () => {
    dispatch(setLogoutModalOpen(false));
    localStorage.removeItem("cleanones-client-user");
    sessionStorage.removeItem("cleanones-client-user");
    dispatch(logout());
    try {
      await logoutUser();
    } catch {
      
    }
    window.location.href = `/${locale}/login`;
  };

  if (!initialized || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="flex h-dvh w-full flex-col overflow-hidden bg-[#f4f5f7]">
      <Topbar />
      <div className="flex min-h-0 min-w-0 flex-1 overflow-hidden">
        <aside className={`relative z-20 hidden h-full shrink-0 flex-col overflow-visible bg-white transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:flex ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
          <Sidebar />
        </aside>
        <main
          className="min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-contain bg-[#f4f5f7] p-3 sm:p-4 lg:p-5"
        >
          <div className="w-full lg:px-8">
            {children}
          </div>
        </main>
      </div>

      
      <MobileDrawer />

      
      <ConfirmationModal
        isOpen={logoutModalOpen}
        onClose={() => dispatch(setLogoutModalOpen(false))}
        onConfirm={handleLogoutConfirm}
        title={t.sidebar.signOut}
        message={t.sidebar.signOut}
        confirmText={t.sidebar.signOut}
        cancelText={t.common.cancel}
        danger
      />
    </div>
  );
}
