import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "../hooks/useAuth";

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
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl">
            {user.firstName
              ? `Welcome back ${user.firstName} 👋`
              : "Hello Stranger 👋"}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">
            Please authorize this app to access your Webflow sites
          </p>
          <Button onClick={openAuthScreen}>Authorize App</Button>
        </CardContent>
      </Card>
    </div>
  );
}
