import { useState, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  applyScriptToTarget,
  fetchScripts,
} from "../../services/customCode/api";
import { CustomCode } from "../../types/types";

/**
 * Custom hook for script selection and application
 * Manages the selected script state and provides methods
 * to apply scripts to sites or pages
 */
export function useScriptSelection() {
  const [selectedScript, setSelectedScript] = useState<CustomCode | null>(null);
  const [registeredScripts, setRegisteredScripts] = useState<CustomCode[]>([]);
  const queryClient = useQueryClient();

  /**
   * Fetches the list of registered scripts
   */
  const fetchAllScripts = useCallback(
    async (siteId: string, sessionToken: string) => {
      try {
        const scripts = await fetchScripts(sessionToken, siteId);
        setRegisteredScripts(scripts);
        return scripts;
      } catch (error) {
        console.error("Error fetching scripts:", error);
        return [];
      }
    },
    []
  );

  /**
   * Selects a script for management
   */
  const selectScript = useCallback((script: CustomCode) => {
    setSelectedScript(script);
  }, []);

  /**
   * Applies a script to a target (site or pages)
   */
  const applyScript = useCallback(
    async ({
      targetType,
      targetId,
      location,
      sessionToken,
    }: {
      targetType: "site" | "page";
      targetId: string | string[];
      location: "header" | "footer";
      sessionToken: string;
    }) => {
      if (!selectedScript) return;

      try {
        // Process single ID or array of IDs
        const ids = Array.isArray(targetId) ? targetId : [targetId];

        // Apply script to each target
        for (const id of ids) {
          await applyScriptToTarget(
            sessionToken,
            selectedScript.id,
            targetType,
            id,
            location
          );
        }

        // Invalidate the status query to trigger a refetch
        queryClient.invalidateQueries({
          queryKey: ["scriptApplicationStatus"],
        });
      } catch (error) {
        console.error("Error applying script:", error);
        throw error;
      }
    },
    [selectedScript, queryClient]
  );

  return {
    selectedScript,
    registeredScripts,
    fetchScripts: fetchAllScripts,
    selectScript,
    applyScript,
  };
}
