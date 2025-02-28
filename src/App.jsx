import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./components/layout/MainLayout/DashboardLayout.jsx";
import Sessions from "./pages/Sessions.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Analytics from "./pages/Analytics.jsx";
import Subscriptions from "./pages/Subscriptions.jsx";
import Notifications from "./pages/Notifications.jsx";
import SupportRequests from "./pages/SupportRequests.jsx";
import Transactions from "./pages/Transactions.jsx";
import UserManagement from "./pages/UserManagement.jsx";
import RoleManagement from "./pages/RoleManagement.jsx";
import LoginPage from "./pages/Login.jsx";
// import ReportPage from "./pages/ReportPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route index element={<Navigate replace to={"dashboard"} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/report" element={<ReportPage />} /> */}
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/support" element={<SupportRequests />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="roles" element={<RoleManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
