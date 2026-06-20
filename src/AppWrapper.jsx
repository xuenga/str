import { Routes, Route, useLocation } from "react-router-dom";
import App from "./App.jsx";
import QRCodePage from "./pages/QRCodePage.jsx";

export default function AppWrapper() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  if (searchParams.get("page") === "qrcode") {
    return <QRCodePage />;
  }

  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/loire" element={<App region="Loire" depCode="42" />} />
      <Route path="/haute-loire" element={<App region="Haute-Loire" depCode="43" />} />
      <Route path="/rhone" element={<App region="Rhône" depCode="69" />} />
      <Route path="/qrcode" element={<QRCodePage />} />
    </Routes>
  );
}
