import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  collapsed?: boolean;
}

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ className, collapsed = false, children, ...props }, ref) => (
    <aside
      ref={ref}
      data-collapsed={collapsed}
      className={cn(
        "group fixed inset-y-0 left-0 z-30 flex flex-col border-r border-border bg-background text-foreground transition-all duration-300",
        collapsed ? "w-10" : "w-64",
        className
      )}
      {...props}
    >
      {children}
    </aside>
  )
);
Sidebar.displayName = "Sidebar";

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-14 items-center border-b border-border px-4",
      className
    )}
    {...props}
  />
));
SidebarHeader.displayName = "SidebarHeader";

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex-1 overflow-auto", className)} {...props} />
));
SidebarContent.displayName = "SidebarContent";

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("border-t border-border p-4", className)}
    {...props}
  />
));
SidebarFooter.displayName = "SidebarFooter";

const sidebarNavVariants = cva("flex flex-col gap-1 px-2", {
  variants: {
    collapsed: {
      true: "items-center",
      false: "",
    },
  },
  defaultVariants: {
    collapsed: false,
  },
});

interface SidebarNavProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarNavVariants> {}

const SidebarNav = React.forwardRef<HTMLDivElement, SidebarNavProps>(
  ({ className, collapsed, ...props }, ref) => (
    <nav
      ref={ref}
      className={cn(sidebarNavVariants({ collapsed }), className)}
      {...props}
    />
  )
);
SidebarNav.displayName = "SidebarNav";

const sidebarNavItemVariants = cva(
  "flex items-center gap-3 rounded-sm p-2 text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "text-foreground-secondary hover:bg-background-tertiary hover:text-foreground",
        active: "bg-blue-border/10 text-blue hover:bg-blue-border/20",
      },
      collapsed: {
        true: "justify-center p-2",
        false: "justify-start",
      },
    },
    defaultVariants: {
      variant: "default",
      collapsed: false,
    },
  }
);

interface SidebarNavItemProps
  extends React.HTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof sidebarNavItemVariants> {
  href?: string;
  icon?: React.ReactNode;
  label: string;
}

const SidebarNavItem = React.forwardRef<HTMLAnchorElement, SidebarNavItemProps>(
  ({ className, variant, collapsed, icon, label, href, ...props }, ref) => (
    <a
      ref={ref}
      href={href}
      className={cn(sidebarNavItemVariants({ variant, collapsed }), className)}
      {...props}
    >
      {icon}
      {!collapsed && <span>{label}</span>}
      {collapsed && <span className="sr-only">{label}</span>}
    </a>
  )
);
SidebarNavItem.displayName = "SidebarNavItem";

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarNav,
  SidebarNavItem,
};
