import { useState, useEffect, useCallback, useRef } from "react";
import { useElementMapper } from "../../hooks/useElementMapper";
import { ElementMapping } from "../../types/element-mapping";
import { ElementTreeViewer } from "./ElementTreeViewer";
import { ElementTreeToolbar } from "./ElementTreeToolbar";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

/**
 * Elements Dashboard provides a visual representation of the selected Webflow element
 * and its style properties, allowing for inspection and export
 */
export function ElementsDashboard() {
  const [elementTree, setElementTree] = useState<ElementMapping | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Start as false
  const { mapElement } = useElementMapper();
  const currentElementId = useRef<string | null>(null);
  const isMappingInProgress = useRef(false);
  const timeoutRef = useRef<number | null>(null);

  // Helper function for element mapping
  const handleElementMapping = useCallback(
    async (element: any | null) => {
      if (!element) {
        return null;
      }

      try {
        return await mapElement(element);
      } catch (error) {
        console.error("Error mapping element:", error);
        return null;
      }
    },
    [mapElement]
  );

  // Update element tree when element changes
  const updateElementTree = useCallback(
    async (element: any | null) => {
      // Clear any previous timeouts
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      // Don't update if already mapping or if it's the same element
      if (isMappingInProgress.current) {
        return;
      }

      if (element?.id === currentElementId.current) {
        return;
      }

      try {
        isMappingInProgress.current = true;
        setIsLoading(true);

        // Set safety timeout to prevent infinite loading
        timeoutRef.current = window.setTimeout(() => {
          console.warn("Element mapping took too long - resetting state");
          setIsLoading(false);
          isMappingInProgress.current = false;
        }, 10000); // 10 second timeout

        if (!element) {
          currentElementId.current = null;
          setElementTree(null);
          setIsLoading(false);
          return;
        }

        currentElementId.current = element.id;
        const mappedTree = await handleElementMapping(element);

        if (mappedTree) {
          setElementTree(mappedTree);
        } else {
          setElementTree(null);
        }
      } catch (error) {
        console.error("Error updating element tree:", error);
        setElementTree(null);
      } finally {
        if (timeoutRef.current) {
          window.clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        isMappingInProgress.current = false;
        setIsLoading(false);
      }
    },
    [handleElementMapping]
  );

  // Initial setup and cleanup
  useEffect(() => {
    // Create a stable reference to the callback
    const stableUpdateElementTree = updateElementTree;

    // Initial element fetch
    let isMounted = true;
    const fetchInitialElement = async () => {
      try {
        const element = await webflow.getSelectedElement();
        if (isMounted) {
          stableUpdateElementTree(element);
        }
      } catch (error) {
        console.error("Error fetching initial element:", error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchInitialElement();

    // Subscribe to element selection changes
    let unsubscribe: any;
    try {
      unsubscribe = webflow.subscribe("selectedelement", (element) => {
        if (isMounted) {
          stableUpdateElementTree(element);
        }
      });
    } catch (error) {
      console.error("Error subscribing to element changes:", error);
    }

    return () => {
      isMounted = false;
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, []); // Empty dependency array to prevent re-subscribing

  // Handle saving element tree as JSON
  const handleSaveTree = () => {
    if (!elementTree) return;

    const json = JSON.stringify(elementTree, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "element-tree.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Handle copying element tree to clipboard
  const handleCopyTree = () => {
    if (!elementTree) return;

    const json = JSON.stringify(elementTree, null, 2);
    navigator.clipboard.writeText(json);
  };

  return (
    <div className="space-y-4 p-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Elements & Styles Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <ElementTreeToolbar onSave={handleSaveTree} onCopy={handleCopyTree} />

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-blue-text" />
            </div>
          ) : elementTree ? (
            <ElementTreeViewer tree={elementTree} />
          ) : (
            <Alert variant="default" className="mt-4">
              <AlertDescription>
                Select an element in the Webflow Designer to view its details
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
