import { CustomCode } from "../../types/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FileCode } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Props interface for the ScriptsList component
 * @property {CustomCode[]} scripts - Array of registered custom code scripts
 * @property {CustomCode | null} selectedScript - Currently selected script
 * @property {Function} onScriptSelect - Callback function when a script is selected
 */
interface ScriptsListProps {
  scripts: CustomCode[];
  selectedScript: CustomCode | null;
  onScriptSelect: (script: CustomCode) => void;
}

/**
 * ScriptsList component displays a list of registered custom code scripts.
 * It allows users to:
 * - View all registered scripts
 * - Select a script for management
 * - See script details (name, version)
 */
export function ScriptsList({
  scripts,
  selectedScript,
  onScriptSelect,
}: ScriptsListProps) {
  if (scripts.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Registered Scripts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-foreground-secondary py-4 px-2 text-center">
            No scripts registered yet. Create a new script with the Register
            Script tab.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2 border-b border-border">
        <CardTitle className="text-base flex items-center gap-2">
          <FileCode className="h-4 w-4 text-primary" />
          Registered Scripts
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 divide-y divide-border">
        {scripts?.map((script) => (
          <div
            key={script.id}
            className={cn(
              "flex flex-col p-3 cursor-pointer transition-colors",
              selectedScript?.id === script.id
                ? "bg-background-tertiary"
                : "hover:bg-background-secondary"
            )}
            onClick={() => onScriptSelect(script)}
          >
            <div className="flex justify-between items-center">
              <span className="font-medium text-sm">
                {script.displayName || "Unnamed Script"}
              </span>
              <span className="text-xs text-foreground-secondary bg-background-tertiary px-2 py-0.5 rounded">
                v{script.version}
              </span>
            </div>
            <div className="flex items-center gap-1 mt-1 text-xs text-foreground-secondary">
              <Calendar className="h-3 w-3" />
              <span>
                Created: {new Date(script.createdOn || "").toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
