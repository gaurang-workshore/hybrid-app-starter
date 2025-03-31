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
      <div className="flex items-center gap-2 text-foreground-secondary align-middle justify-center mt-5 mb-5">
        <Loader2 className="h-5 w-5 items-center animate-spin text-foreground-secondary" />
        <span className="text-sm">Loadings...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error || "An error occurred"}</AlertDescription>
      </Alert>
    );
  }

  return null;
}
