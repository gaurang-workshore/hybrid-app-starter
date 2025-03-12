import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DataTable from "./DataTable";
import { LoadingStates } from "./LoadingStates";
import { Site } from "../types/types";

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
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Hello {user.firstName} 👋</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            variant="default"
            size="sm"
            onClick={onFetchSites}
            disabled={isLoading}
          >
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
