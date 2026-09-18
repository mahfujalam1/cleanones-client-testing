"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setMobileSidebarOpen } from "@/redux/slices/uiSlice";
import { Sidebar } from "./Sidebar";

export function MobileDrawer() {
  const dispatch = useAppDispatch();
  const mobileSidebarOpen = useAppSelector((state) => state.ui.mobileSidebarOpen);

  const handleClose = () => {
    dispatch(setMobileSidebarOpen(false));
  };

  return (
    <div
      aria-hidden={!mobileSidebarOpen}
      className={`fixed inset-0 z-50 flex lg:hidden ${mobileSidebarOpen ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <button
        type="button"
        aria-label="Close navigation"
        onClick={handleClose}
        className={`absolute inset-0 bg-slate-950/40 backdrop-blur-sm transition-opacity duration-500 ease-out ${mobileSidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      
      <div
        data-mobile-open={mobileSidebarOpen}
        className="client-mobile-sidebar-panel relative flex h-dvh w-[min(18rem,86vw)] flex-col overflow-hidden bg-white will-change-transform"
      >
        <Sidebar isMobile />
      </div>
      <style jsx global>{`
        .client-mobile-sidebar-panel {
          transform: translate3d(-100%, 0, 0);
          transition: transform 480ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .client-mobile-sidebar-panel[data-mobile-open="true"] {
          transform: translate3d(0, 0, 0);
        }
      `}</style>
    </div>
  );
}
