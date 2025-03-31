import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CustomCode } from "../../../types/types";
import { useAuth } from "../../../hooks/useAuth";
import { useApplicationStatus } from "../../../hooks/useCustomCode/useApplicationStatus";
import { Globe, CheckCircle, Loader2, Code } from "lucide-react";

/**
 * Props for the SiteTab component
 * @property {Object} currentSite - Current Webflow site information
 * @property {CustomCode | null} selectedScript - Currently selected script to apply
 * @property {Function} onApplyCode - Callback function to apply script to site
 */
interface SiteTabProps {
  currentSite?: {
    id: string;
    name: string;
  } | null;
  selectedScript: CustomCode | null;
  onApplyCode: (
    targetType: "site",
    targetId: string,
    location: "header" | "footer",
    sessionToken: string
  ) => Promise<void>;
}

/**
 * SiteTab component handles the application of scripts at the site level.
 * It provides functionality to:
 * - View current script application status for the site
 * - Apply scripts to either the header or footer of the site
 */
export function SiteTab({
  currentSite,
  selectedScript,
  onApplyCode,
}: Omit<SiteTabProps, "applicationStatus">) {
  // Get authentication token for API calls
  const { sessionToken } = useAuth();
  // Local applying state
  const [localIsApplying, setLocalIsApplying] = useState(false);
  const [location, setLocation] = useState<"header" | "footer">("header");

  // Use React Query hook to manage script application status
  const {
    applicationStatus,
    isLoading: isStatusLoading,
    setApplying,
  } = useApplicationStatus(
    sessionToken,
    selectedScript?.id,
    currentSite?.id,
    [] // Empty array since we're checking site-level status (no page IDs needed)
  );

  // Show loading state while fetching application status
  if (!currentSite || isStatusLoading) {
    return (
      <div className="flex items-center justify-center h-32">
        <Loader2 className="h-5 w-5 animate-spin text-foreground-secondary" />
        <span className="ml-2 text-sm text-foreground-secondary">
          Loading site information...
        </span>
      </div>
    );
  }

  /**
   * Handles applying the selected script to the site
   */
  const handleApplyCode = async () => {
    if (!selectedScript || !currentSite) return;

    setLocalIsApplying(true);
    setApplying(true);

    try {
      await onApplyCode("site", currentSite.id, location, sessionToken);
    } catch (error) {
      console.error("Error applying code to site:", error);
    } finally {
      setLocalIsApplying(false);
      setApplying(false);
    }
  };

  // Get the application status for this specific site
  const siteStatus = applicationStatus[currentSite.id];

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="flex items-center gap-2 bg-background-tertiary rounded-md py-1.5 px-3">
          <Globe className="h-4 w-4 text-foreground-secondary" />
          <span className="text-sm text-foreground">{currentSite.name}</span>
        </div>
      </div>

      {/* Display current application status if script is applied */}
      {selectedScript && siteStatus?.isApplied && (
        <Card className="p-3 bg-background-tertiary border-green-border">
          <div className="flex items-center gap-2 text-sm text-foreground-secondary">
            <CheckCircle className="h-4 w-4 text-green-icon" />
            <span>Script currently applied to site</span>
            <Badge variant="outline" className="ml-auto">
              {siteStatus.location === "header" ? "Header" : "Footer"}
            </Badge>
          </div>
        </Card>
      )}

      {/* Script location selection */}
      <div className="mt-4 space-y-3">
        <div className="text-sm text-foreground-secondary">
          Script Location:
        </div>
        <div className="flex gap-2">
          <Button
            variant={location === "header" ? "default" : "outline"}
            size="sm"
            onClick={() => setLocation("header")}
            className="flex-1"
          >
            Header
          </Button>
          <Button
            variant={location === "footer" ? "default" : "outline"}
            size="sm"
            onClick={() => setLocation("footer")}
            className="flex-1"
          >
            Footer
          </Button>
        </div>
      </div>

      {/* Action buttons for applying script */}
      <Button
        className="w-full mt-4 flex items-center gap-2 justify-center"
        disabled={!selectedScript || localIsApplying}
        onClick={handleApplyCode}
      >
        {localIsApplying ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin mr-2" />
        ) : (
          <Code className="h-3.5 w-3.5 mr-2" />
        )}
        Apply Script to {currentSite.name}
      </Button>
    </div>
  );
}
