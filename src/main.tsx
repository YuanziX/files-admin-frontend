import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./hooks/use-auth.tsx";
import ApolloWithAuthProvider from "./utils/apolloClient.tsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster richColors />
    <AuthProvider>
      <ApolloWithAuthProvider>
        <App />
      </ApolloWithAuthProvider>
    </AuthProvider>
  </StrictMode>
);
