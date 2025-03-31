import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { customCodeApi } from "../../services/customCode";
import { ApplicationStatus, ScriptStatus } from "../../types/types";

// Maximum number of pages to request at once
const MAX_PAGES_PER_REQUEST = 10;

// Helper to generate a consistent query key
export const getApplicationStatusKey = (
  scriptId?: string | null,
  siteId?: string | null,
  pageIds: string[] = []
) => {
  const stablePageKey = pageIds.slice().sort().join(",");
  return ["applicationStatus", scriptId, siteId, stablePageKey];
};

/**
 * Hook for managing and tracking the application status of scripts
 * @param sessionToken - The user's authentication token
 * @param scriptId - The ID of the script to track
 * @param siteId - The Webflow site ID to check
 * @param pageIds - Optional array of page IDs to check status for
 */
export function useApplicationStatus(
  sessionToken?: string | null,
  scriptId?: string | null,
  siteId?: string | null,
  pageIds: string[] = []
) {
  const queryClient = useQueryClient();
  const [isApplying, setIsApplying] = useState(false);
  const queryKey = getApplicationStatusKey(scriptId, siteId, pageIds);

  const {
    data: applicationStatus = {},
    isLoading,
    error,
    refetch: fetchStatus,
  } = useQuery({
    queryKey,
    queryFn: async () => {
      if (!sessionToken || !scriptId || !siteId) {
        return {};
      }

      // Get any existing cached data
      const existingData =
        queryClient.getQueryData<ApplicationStatus>(queryKey) || {};

      // Find which pages we need to fetch (don't have cached data for)
      const pagesToFetch = pageIds.filter((pageId) => !existingData[pageId]);

      if (pagesToFetch.length === 0 && Object.keys(existingData).length > 0) {
        return existingData;
      }

      // Split pages into chunks to avoid overwhelming the server
      const chunks = [];
      for (let i = 0; i < pagesToFetch.length; i += MAX_PAGES_PER_REQUEST) {
        chunks.push(pagesToFetch.slice(i, i + MAX_PAGES_PER_REQUEST));
      }

      const newStatus: ApplicationStatus = { ...existingData };

      // Process each chunk sequentially to avoid rate limits
      try {
        // First get site status if needed
        if (!newStatus[siteId]) {
          const siteStatus = await customCodeApi.getBatchStatus(
            siteId,
            [],
            sessionToken
          );

          // Process and format the status response for site
          Object.entries(siteStatus as Record<string, ScriptStatus>).forEach(
            ([id, scripts]) => {
              if (id === siteId) {
                newStatus[id] = {
                  isApplied: Boolean(scripts[scriptId]),
                  location: scripts[scriptId]?.location,
                };
              }
            }
          );
        }

        // Then process each page chunk
        for (const chunk of chunks) {
          const status = await customCodeApi.getBatchStatus(
            siteId,
            chunk,
            sessionToken
          );

          // Process and format the status response for pages
          Object.entries(status as Record<string, ScriptStatus>).forEach(
            ([pageId, scripts]) => {
              newStatus[pageId] = {
                isApplied: Boolean(scripts[scriptId]),
                location: scripts[scriptId]?.location,
              };
            }
          );

          // If there are more chunks, add a small delay
          if (chunks.length > 1) {
            await new Promise((resolve) => setTimeout(resolve, 100));
          }
        }

        return newStatus;
      } catch (error) {
        console.error("Error fetching application status:", error);
        return newStatus;
      }
    },
    enabled: Boolean(sessionToken && scriptId && siteId),
    staleTime: 60 * 1000, // Consider data fresh for 1 minute
    gcTime: 5 * 60 * 1000, // Keep unused data in cache for 5 minutes
  });

  return {
    applicationStatus,
    isLoading,
    error,
    fetchStatus,
    isApplying,
    setApplying: setIsApplying,
  };
}
