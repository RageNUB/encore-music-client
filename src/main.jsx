import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes.jsx";
import AuthProvider from "./providers/AuthProvider";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <div>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <React.StrictMode>
            <RouterProvider router={router}></RouterProvider>
          </React.StrictMode>
        </HelmetProvider>
      </QueryClientProvider>
    </AuthProvider>
  </div>
);
