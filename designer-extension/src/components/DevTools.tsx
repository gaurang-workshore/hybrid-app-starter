import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDevTools } from "../hooks/useDevTools";

interface DevToolsProps {
  logout: () => void;
  setHasClickedFetch: (value: boolean) => void;
}

export function DevTools({ logout, setHasClickedFetch }: DevToolsProps) {
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
    <Card className="fixed bottom-0 left-0 right-0 border-t">
      <CardHeader className="py-2">
        <CardTitle className="text-sm">Development Tools</CardTitle>
      </CardHeader>
      <CardContent className="py-2 flex gap-2">
        <Button variant="outline" size="sm" onClick={handleLogout}>
          Logout
        </Button>
        <Button variant="outline" size="sm" onClick={handleClearClick}>
          Clear Session
        </Button>
        <Button variant="outline" size="sm" onClick={logStorage}>
          Log Storage
        </Button>
      </CardContent>
    </Card>
  );
}