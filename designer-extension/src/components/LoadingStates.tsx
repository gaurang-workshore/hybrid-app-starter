import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

interface LoadingStatesProps {
  isLoading: boolean;
  isError: boolean;
  error?: string;
}

export function LoadingStates({
  isLoading,
  isError,
  error,
}: LoadingStatesProps) {
  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Loading...</span>
      </div>
    );
  }
  
  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          {error || "An error occurred"}
        </AlertDescription>
      </Alert>
    );
  }
  
  return null;
}