import { Outlet } from "react-router";
import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import AuthLeftSidePanel from "../../component/auth/AuthLeftSidePanelComponent";
import { LogoComponent } from "../../component/ui/LogoComponent";

export default function AuthLayoutPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;

      setIsMobile(mobile);

      setSidebarOpen(!mobile);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="flex w-full h-screen overflow-hidden bg-primary-700">
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:relative z-40
          h-screen
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Mobile Close Button */}
        {isMobile && (
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute top-4 right-4 z-50 bg-white/10 p-2 rounded-lg text-white"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        )}

        <AuthLeftSidePanel />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        {isMobile && (
          <header className="flex items-center justify-between px-4 py-4 bg-gradient-secondary border-b border-white/10">
            <div className="w-12 h-12">
              <LogoComponent className="rounded-lg size-15" />
            </div>
            <h3 className="sm:text-sm">Beyond Chat. Beyond AI.</h3>
          </header>
        )}

        {/* Page Content */}
        <div className="flex-1 flex items-center justify-center p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
