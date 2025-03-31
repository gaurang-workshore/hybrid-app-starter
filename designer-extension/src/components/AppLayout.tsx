import { ReactNode, useState, useEffect } from "react";
import { AppSidebar } from "./Sidebar";
import { AppBreadcrumbs } from "./Breadcrumbs";
import { DevTools } from "./DevTools";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "./theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PanelLeft, Menu } from "lucide-react";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { logout } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarCollapsed(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground flex flex-col">
          <div className="flex h-full">
            <AppSidebar
              collapsed={isSidebarCollapsed}
              mobileOpen={isMobileOpen}
              onMobileToggle={toggleMobile}
            />

            <div
              className={cn(
                "transition-all duration-300 flex-1",
                isSidebarCollapsed ? "md:ml-10" : "md:ml-64"
              )}
            >
              {/* Header with Breadcrumbs */}
              <header className="sticky top-0 z-30 h-14 border-b border-border bg-background px-4 flex items-center ">
                <button
                  onClick={toggleSidebar}
                  className="mr-3 hidden md:flex items-center justify-center h-6 w-6 rounded-sm hover:bg-background-tertiary"
                  aria-label="Toggle sidebar"
                >
                  <PanelLeft className="text-foreground-secondary p-1" />
                </button>

                <button
                  onClick={toggleMobile}
                  className="mr-3 md:hidden flex items-center justify-center h-8 w-8 rounded-sm hover:bg-background-tertiary"
                  aria-label="Toggle mobile menu"
                >
                  <Menu className="text-foreground-secondary" />
                </button>

                <div className="flex-1">
                  <AppBreadcrumbs />
                </div>
              </header>

              {/* Main Content */}
              <main className="p-4 pb-24">{children}</main>
            </div>
          </div>

          {/* Development Tools */}
          <div
            className={cn(
              "fixed bottom-0 left-0 right-0 z-40",
              isSidebarCollapsed ? "md:ml-10" : "md:ml-64"
            )}
          >
            <DevTools logout={logout} setHasClickedFetch={() => {}} />
          </div>
        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
}
