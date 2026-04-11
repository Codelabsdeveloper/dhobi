import { Navigate, Route, Routes } from "react-router-dom";
import { AppShellLayout } from "./components/AppShellLayout";
import { BookingProvider } from "./context/BookingContext";
import { MarketingLandingPage } from "./pages/MarketingLandingPage";
import { LandingPage } from "./pages/LandingPage";
import { ServiceSelectionPage } from "./pages/ServiceSelectionPage";
import { BookingDetailsPage } from "./pages/BookingDetailsPage";
import { OrderSummaryPage } from "./pages/OrderSummaryPage";
import { WhatsAppConfirmPage } from "./pages/WhatsAppConfirmPage";

export default function App() {
  return (
    <BookingProvider>
      <Routes>
        <Route path="/" element={<MarketingLandingPage />} />
        <Route element={<AppShellLayout />}>
          <Route path="/home" element={<LandingPage />} />
          <Route path="/order/service" element={<ServiceSelectionPage />} />
          <Route path="/order/booking" element={<BookingDetailsPage />} />
          <Route path="/order/summary" element={<OrderSummaryPage />} />
          <Route path="/order/confirm" element={<WhatsAppConfirmPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BookingProvider>
  );
}
