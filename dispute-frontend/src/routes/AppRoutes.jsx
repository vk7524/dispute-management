import { Routes, Route, Navigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";

import WorkQueue from "../pages/WorkQueue";
import InvoiceDetail from "../pages/InvoiceDetail";
import CreateDispute from "../pages/CreateDispute";
import DisputeDetail from "../pages/DisputeDetail";
import Login from "../pages/Login";

const AppRoutes = () => {
  const { accounts } = useMsal();

  return (
    <Routes>
      <Route
        path="/login"
        element={
          accounts.length > 0
            ? <Navigate to="/" replace />
            : <Login />
        }
      />

      <Route
        path="/"
        element={
          accounts.length > 0
            ? <WorkQueue />
            : <Navigate to="/login" replace />
        }
      />

      <Route
        path="/invoice/:id"
        element={
          accounts.length > 0
            ? <InvoiceDetail />
            : <Navigate to="/login" replace />
        }
      />

      <Route
        path="/create-dispute"
        element={
          accounts.length > 0
            ? <CreateDispute />
            : <Navigate to="/login" replace />
        }
      />

      <Route
        path="/disputes/:id"
        element={
          accounts.length > 0
            ? <DisputeDetail />
            : <Navigate to="/login" replace />
        }
      />
    </Routes>
  );
};

export default AppRoutes;