import { Routes, Route, Navigate } from "react-router-dom";
import { getFlowStep } from "./lib/storage";
import InvitePage from "./pages/InvitePage";
import RestaurantsPage from "./pages/RestaurantsPage";
import FlowerPage from "./pages/FlowerPage";

function ProtectedRestaurants() {
  const step = getFlowStep();
  if (step !== "restaurants" && step !== "flower") return <Navigate to="/" replace />;
  return <RestaurantsPage />;
}

function ProtectedFlower() {
  const step = getFlowStep();
  if (step !== "flower") return <Navigate to="/restaurants" replace />;
  return <FlowerPage />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<InvitePage />} />
      <Route path="/restaurants" element={<ProtectedRestaurants />} />
      <Route path="/flower" element={<ProtectedFlower />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
