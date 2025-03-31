import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Code, Link } from "lucide-react";
import CodeEditor from "@uiw/react-textarea-code-editor";

/**
 * Props interface for the ScriptRegistration component
 * @property {Function} onRegister - Callback function to handle script registration
 * @property {boolean} isRegistering - Loading state indicating if registration is in progress
 */
interface ScriptRegistrationProps {
  onRegister: (code: string, isHosted: boolean) => Promise<void>;
  isRegistering: boolean;
}

/**
 * ScriptRegistration component provides an interface for registering new custom code scripts.
 * It supports two types of script registration:
 * 1. Inline JavaScript - Direct code input
 * 2. Hosted Script - External JavaScript file URL
 */
export function ScriptRegistration({
  onRegister,
  isRegistering,
}: ScriptRegistrationProps) {
  // State for managing code input and script type
  const [codeInput, setCodeInput] = useState<string>("");
  const [scriptType, setScriptType] = useState<string>("inline");
  const [error, setError] = useState<string | null>(null);

  /**
   * Validates the input before submission
   */
  const validateInput = (): boolean => {
    setError(null);

    if (!codeInput.trim()) {
      setError("Please enter code or a URL");
      return false;
    }

    if (scriptType === "hosted") {
      try {
        new URL(codeInput);
      } catch {
        setError("Please enter a valid URL for hosted scripts");
        return false;
      }
    }

    return true;
  };

  /**
   * Handles the submission of new script registration
   */
  const handleSubmit = async () => {
    if (!validateInput()) return;

    try {
      await onRegister(codeInput, scriptType === "hosted");
      setCodeInput("");
      setError(null);
    } catch (err) {
      setError("Failed to register script. Please try again.");
      console.error("Script registration error:", err);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">
          Register a new script to your Webflow Site
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs
          value={scriptType}
          onValueChange={setScriptType}
          className="w-full mb-2"
        >
          <TabsList className="w-full bg-background-tertiary grid grid-cols-2">
            <TabsTrigger value="inline" className="flex items-center gap-1">
              <Code className="h-3.5 w-3.5" />
              Inline JavaScript
            </TabsTrigger>
            <TabsTrigger value="hosted" className="flex items-center gap-1">
              <Link className="h-3.5 w-3.5" />
              Hosted Script URL
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {error && (
          <Alert variant="destructive" className="my-2">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="min-h-[200px] border border-border rounded-md overflow-hidden">
          <CodeEditor
            value={codeInput}
            language={scriptType === "inline" ? "js" : "text"}
            placeholder={
              scriptType === "hosted"
                ? "Enter the URL to your JavaScript file (e.g., https://example.com/script.js)"
                : "// Add your JavaScript code here\nconsole.log('Hello, World!');"
            }
            onChange={(e) => setCodeInput(e.target.value)}
            padding={15}
            style={{
              fontSize: 12,
              backgroundColor: "#1E1E1E",
              fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
              minHeight: "200px",
              borderRadius: 4,
            }}
          />
        </div>

        <div className="flex justify-end">
          <Button
            variant="default"
            className="flex items-center gap-2"
            size="sm"
            onClick={handleSubmit}
            disabled={!codeInput.trim() || isRegistering}
          >
            {isRegistering ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Registering...
              </>
            ) : (
              "Register Script"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
