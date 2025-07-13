import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDevTools } from "../hooks/useDevTools";
import { cn } from "@/lib/utils";

interface DevToolsProps {
  logout: () => void;
  setHasClickedFetch: (value: boolean) => void;
  className?: string;
}

export function DevTools({
  logout,
  setHasClickedFetch,
  className,
}: DevToolsProps) {
  const { clearSession, logStorage } = useDevTools({
    logout,
    setHasClickedFetch,
  });

  const handleClearClick = () => {
    clearSession();
    window.location.reload();
  };

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <Card className={cn("border-t border-border rounded-none", className)}>
      <CardHeader className="py-2">
        <CardTitle className="text-sm">Development Tools</CardTitle>
      </CardHeader>
      <CardContent className="py-2 flex gap-2">
        <Button variant="danger" size="sm" onClick={handleLogout}>
          Logout
        </Button>
        <Button variant="secondary" size="sm" onClick={handleClearClick}>
          Clear Session
        </Button>
        <Button variant="default" size="sm" onClick={logStorage}>
          Log Storage
        </Button>
      </CardContent>
    </Card>
  );
}
