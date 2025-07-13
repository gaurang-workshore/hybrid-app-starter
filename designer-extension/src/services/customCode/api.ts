const base_url = import.meta.env.VITE_NEXTJS_API_URL;
import { ScriptRegistrationRequest, CodeApplication } from "../../types/types";

export const customCodeApi = {
  // Register a new script
  registerScript: async (params: ScriptRegistrationRequest, token: string) => {
    const response = await fetch(`${base_url}/api/custom-code/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });
    return response.json();
  },

  // Get list of registered scripts
  getScripts: async (siteId: string, token: string) => {
    const response = await fetch(
      `${base_url}/api/custom-code/register?siteId=${siteId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.json();
  },

  // Apply script to site or page
  applyScript: async (params: CodeApplication, token: string) => {
    const response = await fetch(`${base_url}/api/custom-code/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });
    console.log(params);
    return response.json();
  },

  // Get status for site
  getSiteStatus: async (siteId: string, token: string) => {
    const response = await fetch(
      `${base_url}/api/custom-code/status?targetType=site&targetId=${siteId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.json();
  },

  // Get status for pages
  getPagesStatus: async (pageIds: string[], token: string) => {
    const response = await fetch(
      `${base_url}/api/custom-code/status?targetType=page&targetIds=${pageIds.join(
        ","
      )}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.json();
  },

  // Get batch status request
  getBatchStatus: async (
    siteId: string,
    pageIds: string[] = [],
    token: string
  ) => {
    try {
      // Validate siteId
      if (!siteId || siteId === "page") {
        console.warn("Invalid siteId provided to getBatchStatus:", siteId);
        return {};
      }

      // If no pageIds provided, just get site status
      if (!pageIds || pageIds.length === 0) {
        const siteStatus = await customCodeApi.getSiteStatus(siteId, token);
        return siteStatus.result || {};
      }

      const batchSize = 5;
      const pagesBatches = [];

      for (let i = 0; i < pageIds.length; i += batchSize) {
        pagesBatches.push(pageIds.slice(i, i + batchSize));
      }

      // Get site status
      const siteStatus = await customCodeApi.getSiteStatus(siteId, token);

      // Get pages status in batches
      const pagesStatus = { result: {} };
      for (const batch of pagesBatches) {
        const batchStatus = await customCodeApi.getPagesStatus(batch, token);
        pagesStatus.result = { ...pagesStatus.result, ...batchStatus.result };
      }

      return {
        ...siteStatus.result,
        ...pagesStatus.result,
      };
    } catch (error) {
      console.error(
        "Error in getBatchStatus:",
        { siteId, pageIdsLength: pageIds?.length },
        error
      );
      return {};
    }
  },
};

// Export wrappers for compatibility with existing code
export const getScriptApplicationStatus = async (
  sessionToken: string,
  _scriptId: string, // Prefix with underscore to indicate unused
  targetIds: string[]
): Promise<
  Record<string, { isApplied: boolean; location?: "header" | "footer" }>
> => {
  if (targetIds.length === 0) return {};

  // Assume first ID is site ID if only one target, otherwise pass all targets as page IDs
  if (targetIds.length === 1) {
    return customCodeApi.getBatchStatus(targetIds[0], [], sessionToken);
  } else {
    // First ID is assumed to be site ID, rest are page IDs
    const [siteId, ...pageIds] = targetIds;
    return customCodeApi.getBatchStatus(siteId, pageIds, sessionToken);
  }
};

export const applyScriptToTarget = async (
  sessionToken: string,
  scriptId: string,
  targetType: "site" | "page",
  targetId: string,
  location: "header" | "footer"
): Promise<void> => {
  const params: CodeApplication = {
    scriptId,
    targetType,
    targetId,
    location,
  };

  await customCodeApi.applyScript(params, sessionToken);
};

export const fetchScripts = async (sessionToken: string, siteId: string) => {
  const response = await customCodeApi.getScripts(siteId, sessionToken);
  return response.result || [];
};

export default customCodeApi;
