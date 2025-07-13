import { Button } from "@/components/ui/button";
import { Save, Copy } from "lucide-react";

/**
 * Props for the ElementTreeToolbar component
 * @property {Function} onSave - Handler for saving the element tree
 * @property {Function} onCopy - Handler for copying the element tree to clipboard
 */
interface ElementTreeToolbarProps {
  onSave?: () => void;
  onCopy?: () => void;
}

/**
 * ElementTreeToolbar provides UI controls for exporting and copying element tree data
 */
export function ElementTreeToolbar({
  onSave,
  onCopy,
}: ElementTreeToolbarProps) {
  return (
    <div className="flex items-center gap-2 mb-4 justify-center">
      <Button size="sm" onClick={onSave} variant="default" className="gap-2">
        <Save className="h-3 w-3 text-primary-foreground" />
        Save Structure
      </Button>

      <Button size="sm" onClick={onCopy} variant="secondary" className="gap-2">
        <Copy className="h-3 w-3 text-secondary-foreground" />
        Copy to Clipboard
      </Button>
    </div>
  );
}
