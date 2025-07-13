import { useState } from "react";
import { customCodeApi } from "../../services/customCode";
import { CustomCode, ScriptRegistrationRequest } from "../../types/types";

/**
 * Hook for managing script registration in Webflow
 * @param sessionToken - The user's authentication token
 * @param siteId - The target Webflow site ID
 * @returns {Object} Object containing:
 *   - registerScript: Function to register a new script
 *   - isRegistering: Loading state for registration
 */
export function useScriptRegistration(sessionToken: string, siteId: string) {
  // Track registration state
  const [isRegistering, setIsRegistering] = useState(false);

  /**
   * Register a new script with Webflow
   * @param code - The script content or URL
   * @param isHosted - Whether this is a hosted script (URL) or inline code
   * @returns {Promise<CustomCode>} The registered script result from Webflow
   */
  const registerScript = async (
    code: string,
    isHosted: boolean
  ): Promise<CustomCode | undefined> => {
    if (!sessionToken || !siteId) return;

    setIsRegistering(true);
    try {
      // Use a basic alphanumeric name with a timestamp to ensure uniqueness
      const scriptName = `Script${Math.floor(Math.random() * 1000000)}`;

      const scriptData: any = {
        displayName: scriptName,
        version: "1.0.0",
      };

      // Add the appropriate property based on whether it's hosted or inline
      if (isHosted) {
        scriptData.hostedLocation = code;
      } else {
        scriptData.sourceCode = code;
      }

      const request: ScriptRegistrationRequest = {
        siteId,
        isHosted,
        scriptData,
      };

      const result = await customCodeApi.registerScript(request, sessionToken);

      return result?.result;
    } catch (error) {
      console.error("Error registering script:", error);
      throw error;
    } finally {
      setIsRegistering(false);
    }
  };

  return {
    registerScript,
    isRegistering,
  };
}
