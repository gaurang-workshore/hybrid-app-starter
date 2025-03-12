import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "../hooks/useAuth";
import { LogIn } from "lucide-react";

export function AuthScreen({ onAuth }: { onAuth: () => void }) {
  const base_url = import.meta.env.VITE_NEXTJS_API_URL;
  const { user } = useAuth();

  const openAuthScreen = () => {
    console.log("Opening auth window...");
    const authWindow = window.open(
      `${base_url}/api/auth/authorize?state=webflow_designer`,
      "_blank",
      "width=600,height=600"
    );

    const checkWindow = setInterval(() => {
      if (authWindow?.closed) {
        console.log("Auth window closed");
        clearInterval(checkWindow);
        onAuth();
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-[4px] bg-primary">
            <LogIn className="h-5 w-5 text-white" />
          </div>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-base">
              {user?.firstName
                ? `Welcome back ${user.firstName} 👋`
                : "Hello Stranger 👋"}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4 text-sm text-foreground-secondary">
              Please authorize this app to access your Webflow sites
            </p>
            <Button variant="default" size="sm" onClick={openAuthScreen}>
              Authorize App
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
