import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

interface AppBreadcrumbsProps {
  className?: string;
}

export function AppBreadcrumbs({ className }: AppBreadcrumbsProps) {
  const location = useLocation();

  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment !== "");

  const breadcrumbItems = [
    { label: "Dashboard", path: "/" },
    ...pathSegments.map((segment, index) => {
      const formattedLabel = segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      const path = `/${pathSegments.slice(0, index + 1).join("/")}`;

      return { label: formattedLabel, path };
    }),
  ];

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <BreadcrumbItem key={item.path}>
            {index === breadcrumbItems.length - 1 ? (
              <BreadcrumbPage>{item.label}</BreadcrumbPage>
            ) : (
              <BreadcrumbLink asChild>
                <Link to={item.path}>{item.label}</Link>
              </BreadcrumbLink>
            )}

            {index < breadcrumbItems.length - 1 && (
              <ChevronRight className="h-3.5 w-3.5 mx-1 text-foreground-tertiary" />
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
