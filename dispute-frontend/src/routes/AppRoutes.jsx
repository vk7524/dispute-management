import { Routes, Route } from "react-router-dom";

import WorkQueue from "../pages/WorkQueue";
import InvoiceDetail from "../pages/InvoiceDetail";
import CreateDispute from "../pages/CreateDispute";
import DisputeDetail from "../pages/DisputeDetail";

const AppRoutes = () => {
  return (
    <Routes>

      {/* Work Queue */}
      <Route
        path="/"
        element={<WorkQueue />}
      />

      {/* Invoice Detail */}
      <Route
        path="/invoice/:id"
        element={<InvoiceDetail />}
      />

      {/* Create Dispute */}
      <Route
        path="/create-dispute"
        element={<CreateDispute />}
      />

      {/* Dispute Detail */}
      <Route
        path="/disputes/:id"
        element={<DisputeDetail />}
      />

    </Routes>
  );
};

export default AppRoutes;