import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Code2, FileCode, PlusCircle } from "lucide-react";
import { ScriptRegistration, ScriptsList, SiteTab, PagesTab } from "./";
import { useAuth } from "../../hooks/useAuth";
import { CustomCode } from "../../types/types";
import { useSites } from "../../hooks/useSites";
import {
  useScriptRegistration,
  useScriptSelection,
} from "../../hooks/useCustomCode";

export function CustomCodeDashboard() {
  const { sessionToken } = useAuth();
  const {
    currentSite,
    isCurrentSiteLoading,
    isLoading: isSitesLoading,
  } = useSites(sessionToken, true);

  // Tab state
  const [activeTab, setActiveTab] = useState<"register" | "manage">("register");
  const [applicationTab, setApplicationTab] = useState<"site" | "pages">(
    "site"
  );

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
    if (activeTab === "manage" && currentSite?.id && sessionToken) {
      fetchScripts(currentSite.id, sessionToken);
    }
  }, [activeTab, currentSite?.id, sessionToken, fetchScripts]);

  // Show loading state while sites are being fetched
  if (isCurrentSiteLoading || isSitesLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="animate-spin text-primary" />
        <span className="ml-2 text-foreground-secondary">
          Loading site information...
        </span>
      </div>
    );
  }

  // Show message if no current site is available
  if (!currentSite) {
    return (
      <Card>
        <CardContent className="py-6">
          <div className="text-center text-foreground-secondary">
            Unable to load site information. Please make sure you're in a
            Webflow Designer session.
          </div>
        </CardContent>
      </Card>
    );
  }

  const handleRegisterCode = async (code: string, isHosted: boolean) => {
    try {
      await registerScript(code, isHosted);
      await fetchScripts(currentSite?.id || "", sessionToken || "");
    } catch (error) {
      console.error("Error registering code:", error);
    }
  };

  const handleScriptSelect = (script: CustomCode) => {
    selectScript(script);
  };

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
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-md bg-background-tertiary">
            <FileCode className="text-primary" />
          </div>
          <h1 className="text-xl font-medium">Custom Code Manager</h1>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(value: string) =>
          setActiveTab(value as "register" | "manage")
        }
        className="w-full"
      >
        <TabsList className="mb-6 w-full bg-background-secondary p-1">
          <TabsTrigger
            value="register"
            className="flex items-center gap-2 px-4 py-2"
          >
            <PlusCircle />
            Register Script
          </TabsTrigger>
          <TabsTrigger
            value="manage"
            className="flex items-center gap-2 px-4 py-2"
          >
            <Code2 />
            Manage Scripts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="register" className="mt-0">
          <ScriptRegistration
            onRegister={handleRegisterCode}
            isRegistering={isRegistering}
          />
        </TabsContent>

        <TabsContent value="manage" className="mt-0">
          <Card className="mb-6">
            <CardContent className="pt-6">
              <ScriptsList
                scripts={registeredScripts}
                selectedScript={selectedScript}
                onScriptSelect={handleScriptSelect}
              />
            </CardContent>
          </Card>

          {registeredScripts.length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Script Application</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs
                  value={applicationTab}
                  onValueChange={(value: string) =>
                    setApplicationTab(value as "site" | "pages")
                  }
                >
                  <TabsList className="mb-4 px-6 pt-6">
                    <TabsTrigger value="site">Apply to Site</TabsTrigger>
                    <TabsTrigger value="pages">Apply to Pages</TabsTrigger>
                  </TabsList>

                  <TabsContent value="site" className="mt-0 px-6 pb-6">
                    <SiteTab
                      currentSite={currentSite}
                      selectedScript={selectedScript}
                      onApplyCode={handleApplyToSite}
                    />
                  </TabsContent>

                  <TabsContent value="pages" className="mt-0 px-6 pb-6">
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
