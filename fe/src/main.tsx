import { createRoot } from "react-dom/client";

import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import DesktopGuard from "./components/guard/DesktopGuardComponent";
import App from "./App";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <DesktopGuard>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </DesktopGuard>
);