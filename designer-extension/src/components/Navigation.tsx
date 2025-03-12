import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Menu, LayoutDashboard, Code, Layers } from "lucide-react";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      text: "Dashboard",
      icon: <LayoutDashboard className="h-7 w-7 mr-2" />,
      path: "/",
    },
    {
      text: "Custom Code",
      icon: <Code className="h-7 w-7 mr-2" />,
      path: "/custom-code",
    },
    {
      text: "Elements",
      icon: <Layers className="h-7 w-7 mr-2" />,
      path: "/elements",
    },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 p-2 z-50">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            className="flex items-center justify-center bg-transparent hover:bg-background-tertiary h-5 w-5 rounded-[4px] border-none"
            aria-label="Open navigation menu"
          >
            <Menu className="h-3 w-3" />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 px-3 py-3">
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Webflow Hybrid App menu</SheetDescription>

          <div className="py-4">
            <div className="space-y-3">
              {menuItems.map((item) => (
                <Button
                  key={item.path}
                  variant={
                    location.pathname === item.path ? "default" : "ghost"
                  }
                  className="w-full justify-start h-7 text-sm"
                  onClick={() => handleNavigation(item.path)}
                >
                  {item.icon}
                  {item.text}
                </Button>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
