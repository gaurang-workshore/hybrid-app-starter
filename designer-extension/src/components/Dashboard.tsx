import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DataTable from "./DataTable";
import { LoadingStates } from "./LoadingStates";
import { Site } from "../types/types";
import { LayoutGrid, RefreshCw } from "lucide-react";

interface DashboardProps {
  user: { firstName: string };
  sites: Site[];
  isLoading: boolean;
  isError: boolean;
  error: string;
  onFetchSites: () => void;
}

export function Dashboard({
  user,
  sites,
  isLoading,
  isError,
  error,
  onFetchSites,
}: DashboardProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center mb-1">
        <div className="flex items-center gap-3">
          <div className="p-1 rounded-md bg-background-tertiary">
            <LayoutGrid className="text-primary h-5 w-5" />
          </div>
          <h3 className="text-l font-medium">Dashboard</h3>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-1">
          <CardTitle className="text-base">Hello {user.firstName} 👋</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-foreground-secondary mb-2">
            View your authorized Webflow sites and access various tools to
            enhance your Webflow experience.
          </p>

          <Button
            variant="default"
            size="sm"
            onClick={onFetchSites}
            disabled={isLoading}
            className="gap-2 items-center"
          >
            <RefreshCw
              className={`h-3 w-3 ${isLoading ? "animate-spin" : ""}`}
            />
            {isLoading ? "Loading Sites..." : "List Authorized Sites"}
          </Button>

          <div className="mt-4">
            <LoadingStates
              isLoading={isLoading}
              isError={isError}
              error={error}
            />
          </div>
        </CardContent>
      </Card>

      {!isLoading && !isError && sites && sites.length > 0 && (
        <DataTable data={sites} />
      )}
    </div>
  );
}
