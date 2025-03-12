import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutGrid, Code2, Layers, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarNav,
  SidebarNavItem,
} from "@/components/ui/sidebar";

interface AppSidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onMobileToggle: () => void;
}

export function AppSidebar({
  collapsed,
  mobileOpen,
  onMobileToggle,
}: AppSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const menuItems = [
    {
      text: "Dashboard",
      icon: <LayoutGrid size={15} />,
      path: "/",
    },
    {
      text: "Custom Code",
      icon: <Code2 size={15} />,
      path: "/custom-code",
    },
    {
      text: "Elements",
      icon: <Layers size={15} />,
      path: "/elements",
    },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    if (window.innerWidth < 768) {
      onMobileToggle();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={onMobileToggle}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        className={cn(
          "transition-transform duration-300 z-50",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <SidebarHeader>
          <div className="flex items-center space-x-2 overflow-hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-[4px] bg-background-tertiary text-foreground shrink-0">
              <Code2 className="p-1" />
            </div>
            {!collapsed && (
              <div className="flex flex-col truncate text-left">
                <span className="text-sm font-medium leading-none">
                  Webflow Utility App
                </span>
                <span className="text-xs text-foreground-secondary mt-1">
                  {user?.firstName || "Extension"}
                </span>
              </div>
            )}

            {/* Mobile Close Button */}
            <button
              className="md:hidden ml-auto text-foreground-secondary hover:text-foreground"
              onClick={onMobileToggle}
            >
              <X />
            </button>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <div className="mt-1 mb-2 px-4">
            <div className="text-xs uppercase font-medium text-foreground-tertiary tracking-wider">
              {!collapsed && "Menu"}
            </div>
          </div>
          <SidebarNav collapsed={collapsed}>
            {menuItems.map((item) => (
              <SidebarNavItem
                key={item.path}
                icon={item.icon}
                label={item.text}
                variant={location.pathname === item.path ? "active" : "default"}
                collapsed={collapsed}
                onClick={() => handleNavigation(item.path)}
              />
            ))}
          </SidebarNav>
        </SidebarContent>
      </Sidebar>
    </>
  );
}
