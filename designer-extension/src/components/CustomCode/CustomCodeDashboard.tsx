import { useState, useEffect } from "react";
import {
  useScriptRegistration,
  useScriptSelection,
} from "../../hooks/useCustomCode";
import { ScriptRegistration, ScriptsList, SiteTab, PagesTab } from "./";
import { useAuth } from "../../hooks/useAuth";
import { useSites } from "../../hooks/useSites";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { FileCode } from "lucide-react";

/**
 * CustomCodeDashboard is the main component for managing custom code scripts in a Webflow site.
 * It provides functionality to:
 * - Register new scripts (hosted or inline)
 * - View and select from existing scripts
 * - Apply scripts to either the entire site or specific pages
 * - Manage script locations (header/footer)
 */
export function CustomCodeDashboard() {
  const { sessionToken } = useAuth();
  const {
    currentSite,
    isCurrentSiteLoading,
    isLoading: isSitesLoading,
  } = useSites(sessionToken, true);

  // Navigation state
  const [mainTab, setMainTab] = useState<"register" | "manage">("register");
  const [applicationTab, setApplicationTab] = useState("site");

  // Hook integrations for script management
  const {
    selectedScript,
    registeredScripts,
    fetchScripts,
    selectScript,
    applyScript,
  } = useScriptSelection();

  const { registerScript, isRegistering } = useScriptRegistration(
    sessionToken || "",
    currentSite?.id || ""
  );

  // Fetch scripts when switching to manage tab or when site/session changes
  useEffect(() => {
    if (mainTab === "manage" && currentSite?.id && sessionToken) {
      fetchScripts(currentSite.id, sessionToken);
    }
  }, [mainTab, currentSite?.id, sessionToken, fetchScripts]);

  // Show loading state while sites are being fetched
  if (isCurrentSiteLoading || isSitesLoading) {
    return (
      <div className="space-y-4 w-full">
        <div className="flex items-center gap-3 mb-4">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-6 w-48" />
        </div>
        <Card>
          <CardHeader className="pb-2">
            <Skeleton className="h-5 w-40" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show message if no current site is available
  if (!currentSite) {
    return (
      <Alert variant="destructive" className="w-full">
        <AlertDescription>
          Unable to load site information. Please make sure you're in a Webflow
          Designer session.
        </AlertDescription>
      </Alert>
    );
  }

  /**
   * Handles the registration of new custom code
   */
  const handleRegisterCode = async (code: string, isHosted: boolean) => {
    try {
      await registerScript(code, isHosted);
      await fetchScripts(currentSite?.id || "", sessionToken || "");

      // Switch to manage tab after successful registration
      setMainTab("manage");
    } catch (error) {
      console.error("Error registering code:", error);
    }
  };

  /**
   * Updates the currently selected script
   */
  const handleScriptSelect = (script: any) => {
    selectScript(script);
  };

  /**
   * Wrapper for applying scripts to site
   */
  const handleApplyToSite = (
    targetType: "site",
    targetId: string,
    location: "header" | "footer",
    sessionToken: string
  ) => {
    return applyScript({
      targetType,
      targetId,
      location,
      sessionToken,
    });
  };

  /**
   * Wrapper for applying scripts to pages
   */
  const handleApplyToPages = (
    targetType: "page",
    pageIds: string[],
    location: "header" | "footer"
  ) => {
    return applyScript({
      targetType,
      targetId: pageIds,
      location,
      sessionToken: sessionToken || "",
    });
  };

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-1 rounded-md bg-background-tertiary">
          <FileCode className="text-primary h-5 w-5" />
        </div>
        <h3 className="text-lg font-medium">Custom Code Manager</h3>
      </div>

      <Tabs
        defaultValue={mainTab}
        onValueChange={(value) => setMainTab(value as "register" | "manage")}
        className="w-full"
      >
        <TabsList className="mb-4 bg-background-secondary border border-border">
          <TabsTrigger value="register" className="flex items-center gap-2">
            <FileCode className="size-4" />
            Register Script
          </TabsTrigger>
          <TabsTrigger value="manage" className="flex items-center gap-2">
            <FileCode className="size-4" />
            Manage Scripts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="register" className="pt-2">
          <ScriptRegistration
            onRegister={handleRegisterCode}
            isRegistering={isRegistering}
          />
        </TabsContent>

        <TabsContent value="manage" className="space-y-4 pt-2">
          <ScriptsList
            scripts={registeredScripts}
            selectedScript={selectedScript}
            onScriptSelect={handleScriptSelect}
          />

          {registeredScripts.length > 0 && selectedScript && (
            <Card>
              <CardHeader className="pb-2 border-b border-border">
                <CardTitle className="text-sm">Apply Script</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs
                  defaultValue={applicationTab}
                  onValueChange={setApplicationTab}
                  className="w-full"
                >
                  <TabsList className="w-full bg-background-secondary border-b border-border rounded-none">
                    <TabsTrigger value="site" className="flex-1">
                      Apply to Site
                    </TabsTrigger>
                    <TabsTrigger value="pages" className="flex-1">
                      Apply to Pages
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="site" className="p-4">
                    <SiteTab
                      currentSite={currentSite}
                      selectedScript={selectedScript}
                      onApplyCode={handleApplyToSite}
                    />
                  </TabsContent>

                  <TabsContent value="pages" className="p-4">
                    <PagesTab
                      selectedScript={selectedScript}
                      onApplyCode={handleApplyToPages}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
