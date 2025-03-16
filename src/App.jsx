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
import { AuthProvider } from "./config/authContext.jsx";
import PublicRoute from "./config/publicRoute.jsx";
import ProtectedRoute from "./config/protectedRoute.jsx";
import ReportPage from "./pages/ReportPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import UserDetails from "./pages/UserDetails.jsx";
import SelectNewPro from "./pages/SelectNewPro.jsx";
import AddRole from "./pages/AddRole.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx"; // Import the 404 page
import ForgetPasswordPage from "./pages/ForgetPassword.jsx";
import CreatePasswordPage from "./pages/CreatePassword.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Route: Redirects to Dashboard if already logged in */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgetPasswordPage />} />
            <Route path="/reset-password" element={<CreatePasswordPage />} />
          </Route>
          {/* Protected Routes: Accessible only when authenticated */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="/dashboard" element={<ReportPage />} />
              <Route path="/my-profile" element={<MyProfile />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/sessions" element={<Sessions />} />
              <Route path="/sessions/about" element={<AboutPage />} />
              <Route
                path="/sessions/about/select-new-pro"
                element={<SelectNewPro />}
              />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/support" element={<SupportRequests />} />
              <Route path="/support/report" element={<ReportPage />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/users/details" element={<UserDetails />} />
              <Route path="/roles" element={<RoleManagement />} />
              <Route path="/roles/add-role" element={<AddRole />} />
              <Route path="/roles/admin" element={<AdminPage />} />
              <Route path="*" element={<NotFoundPage />} />{" "}
              {/* Use 404 page for wildcard route */}
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
