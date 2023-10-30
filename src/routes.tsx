import { Route, Routes } from "react-router-dom";
import Submission from "./pages/Submission";
import Thanks from "./pages/Thanks";
import NotFound from "./pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Submission />} />
      <Route path="thanks" element={<Thanks />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
