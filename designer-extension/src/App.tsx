import { useEffect, useState, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppLayout } from "./components/AppLayout";
import { CustomCodeDashboard } from "./components/CustomCode/CustomCodeDashboard";
import { AuthScreen } from "./components/AuthScreen";
import { Dashboard } from "./components/Dashboard";
import { useAuth } from "./hooks/useAuth";
import { useSites } from "./hooks/useSites";
import "./App.css";
import { ElementsDashboard } from "./components/Elements/ElementsDashboard";

function AppContent() {
  const [hasClickedFetch, setHasClickedFetch] = useState(false);
  const { user, sessionToken, exchangeAndVerifyIdToken } = useAuth();
  const { sites, isLoading, isError, error, fetchSites } = useSites(
    sessionToken,
    hasClickedFetch
  );

  const hasCheckedToken = useRef(false);

  useEffect(() => {
    webflow.setExtensionSize("large");

    if (!hasCheckedToken.current) {
      const storedUser = localStorage.getItem("wf_hybrid_user");
      const wasExplicitlyLoggedOut = localStorage.getItem(
        "explicitly_logged_out"
      );

      if (storedUser && !wasExplicitlyLoggedOut) {
        exchangeAndVerifyIdToken();
      }
      hasCheckedToken.current = true;
    }

    const handleAuthComplete = async (event: MessageEvent) => {
      if (event.data === "authComplete") {
        localStorage.removeItem("explicitly_logged_out");
        await exchangeAndVerifyIdToken();
      }
    };

    window.addEventListener("message", handleAuthComplete);
    return () => {
      window.removeEventListener("message", handleAuthComplete);
      hasCheckedToken.current = false;
    };
  }, [exchangeAndVerifyIdToken]);

  const handleFetchSites = () => {
    setHasClickedFetch(true);
    fetchSites();
  };

  return (
    <BrowserRouter>
      {sessionToken ? (
        <AppLayout>
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  user={user}
                  sites={sites}
                  isLoading={isLoading}
                  isError={isError}
                  error={error?.message || ""}
                  onFetchSites={handleFetchSites}
                />
              }
            />
            <Route path="/custom-code" element={<CustomCodeDashboard />} />
            <Route path="/elements" element={<ElementsDashboard />} />
          </Routes>
        </AppLayout>
      ) : (
        <AuthScreen onAuth={() => {}} />
      )}
    </BrowserRouter>
  );
}

function App() {
  return <AppContent />;
}

export default App;
