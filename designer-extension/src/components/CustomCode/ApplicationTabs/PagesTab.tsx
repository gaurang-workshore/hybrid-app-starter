import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { CustomCode } from "../../../types/types";
import { useAuth } from "../../../hooks/useAuth";
import { useApplicationStatus } from "../../../hooks/useCustomCode/useApplicationStatus";
import { usePages } from "../../../hooks/usePages";
import { useSites } from "../../../hooks/useSites";
import { Code, CheckCircle, Loader2, Search, FileX } from "lucide-react";

/**
 * Props for the PagesTab component
 * @property {CustomCode | null} selectedScript - Currently selected script to apply
 * @property {Function} onApplyCode - Callback function to apply script to pages
 */
interface PagesTabProps {
  selectedScript: CustomCode | null;
  onApplyCode: (
    targetType: "page",
    pageIds: string[],
    location: "header" | "footer"
  ) => Promise<void>;
}

/**
 * PagesTab component handles the application of scripts to individual pages.
 * It provides functionality to:
 * - View and search through all pages in the site
 * - Select multiple pages at once
 * - Apply scripts to selected pages
 */
export function PagesTab({ selectedScript, onApplyCode }: PagesTabProps) {
  const { sessionToken } = useAuth();
  // Track which pages are selected for script application
  const [selectedPages, setSelectedPages] = useState<string[]>([]);
  // Search term for filtering pages
  const [searchTerm, setSearchTerm] = useState("");
  // Local applying state
  const [localIsApplying, setLocalIsApplying] = useState(false);

  // Get the current site using React Query
  const { sites } = useSites(sessionToken, true);
  const currentSite = sites[0]; // Using first site in the list

  // Fetch pages data using React Query
  const { data: pages = [], isLoading: isPagesLoading } = usePages(
    currentSite?.id
  );

  // Fetch application status for all pages using React Query
  const {
    applicationStatus,
    isLoading: isStatusLoading,
    setApplying,
  } = useApplicationStatus(
    sessionToken,
    selectedScript?.id,
    currentSite?.id,
    pages.map((p) => p.id)
  );

  // Filter pages based on search term
  const filteredPages = pages.filter((page) =>
    page.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /**
   * Handles selecting/deselecting all visible pages
   */
  const handleSelectAll = () => {
    if (selectedPages.length === filteredPages.length) {
      setSelectedPages([]);
    } else {
      setSelectedPages(filteredPages.map((page) => page.id));
    }
  };

  /**
   * Handles toggling selection of a single page
   */
  const handleTogglePage = (pageId: string) => {
    setSelectedPages((prev) =>
      prev.includes(pageId)
        ? prev.filter((id) => id !== pageId)
        : [...prev, pageId]
    );
  };

  /**
   * Handles applying the script to all selected pages
   */
  const handleApplyCode = async (location: "header" | "footer") => {
    if (!selectedScript || selectedPages.length === 0) return;

    setLocalIsApplying(true);
    setApplying(true);

    try {
      await onApplyCode("page", selectedPages, location);
      // Status will automatically update via React Query's cache invalidation
    } catch (error) {
      console.error("Error applying code to pages:", error);
    } finally {
      setLocalIsApplying(false);
      setApplying(false);
    }
  };

  // Show loading state while fetching pages or status
  if (isPagesLoading || isStatusLoading) {
    return (
      <div className="flex items-center justify-center h-32">
        <Loader2 className="h-5 w-5 animate-spin text-foreground-secondary" />
        <span className="ml-2 text-sm text-foreground-secondary">
          Loading pages...
        </span>
      </div>
    );
  }

  if (pages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-32 text-center gap-2">
        <FileX className="h-8 w-8 text-foreground-secondary opacity-50" />
        <span className="text-sm text-foreground-secondary">
          No pages found in this site
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-secondary" />
          <Input
            placeholder="Search pages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleSelectAll}
          className="whitespace-nowrap"
        >
          {selectedPages.length === filteredPages.length
            ? "Deselect All"
            : "Select All"}
        </Button>
      </div>

      <div className="border border-border rounded-md overflow-hidden">
        <ScrollArea className="h-[250px]">
          <div className="divide-y divide-border">
            {filteredPages.map((page) => (
              <div
                key={page.id}
                className="flex items-center py-2 px-3 hover:bg-background-tertiary"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Checkbox
                    id={`page-${page.id}`}
                    checked={selectedPages.includes(page.id)}
                    onCheckedChange={() => handleTogglePage(page.id)}
                  />
                  <label
                    htmlFor={`page-${page.id}`}
                    className="flex-1 cursor-pointer min-w-0"
                  >
                    <div className="font-medium text-sm truncate">
                      {page.name}
                    </div>
                    <div className="text-xs text-foreground-secondary truncate">
                      {page.url}
                    </div>
                  </label>
                </div>

                {selectedScript && applicationStatus[page.id]?.isApplied && (
                  <div className="flex items-center gap-1 ml-4">
                    <CheckCircle className="h-3.5 w-3.5 text-green-icon" />
                    <Badge variant="outline" className="text-xs">
                      {applicationStatus[page.id].location === "header"
                        ? "Header"
                        : "Footer"}
                    </Badge>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-foreground-secondary">
          {selectedPages.length} page{selectedPages.length !== 1 ? "s" : ""}{" "}
          selected
        </div>
        <div className="flex gap-2">
          <Button
            variant="default"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => handleApplyCode("header")}
            disabled={
              selectedPages.length === 0 || !selectedScript || localIsApplying
            }
          >
            {localIsApplying ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Code className="h-3.5 w-3.5" />
            )}
            Apply to Header
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => handleApplyCode("footer")}
            disabled={
              selectedPages.length === 0 || !selectedScript || localIsApplying
            }
          >
            {localIsApplying ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Code className="h-3.5 w-3.5" />
            )}
            Apply to Footer
          </Button>
        </div>
      </div>
    </div>
  );
}
