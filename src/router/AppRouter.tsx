import { BrowserRouter, Route, Routes } from "react-router";
import VisitaScreen from "../presentation/screens/VisitaScreen";

export const AppRouter = () => (
  <BrowserRouter basename="/infovisita">
    <Routes>
      <Route path="/" element={<VisitaScreen />} />
    </Routes>
  </BrowserRouter>
);
