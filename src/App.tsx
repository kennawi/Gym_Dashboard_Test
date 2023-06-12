import React from "react";
import ClassPreview from "./components/classes/ClassPreview";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import ClientDetails from "./components/clients/ClientDetails";
import ClientsPage from "./pages/ClientsPage";
import ClassesPage from "./pages/ClassesPage";
import Dashboard from "./pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/clients", element: <ClientsPage /> },
      { path: "/clients/:clientId", element: <ClientDetails /> },
      { path: "/classes", element: <ClassesPage /> },
      { path: "/classes/:classId", element: <ClassPreview /> },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
