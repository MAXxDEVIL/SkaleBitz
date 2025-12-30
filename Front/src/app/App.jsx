import { Navigate, Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import Login from "../pages/Login";
import InvestorDashboard from "../pages/InvestorDashboard";
import InvestorDealDetail from "../pages/InvestorDealDetail";
import InvestorDeals from "../pages/InvestorDeals";
import MSMEWizard from "../pages/MSMEWizard";
import OpsQueue from "../pages/OpsQueue";
import Deals from "../pages/src_pages_Deals";
import Logs from "../pages/src_pages_Logs";
import OpsTaskDetail from "../pages/src_pages_OpsTaskDetail";
import CashflowHistory from "../pages/src_pages_CashflowHistory";
import RiskReports from "../pages/src_pages_RiskReports";
import Contact from "../pages/Contact";
import Terms from "../pages/Terms";
import Privacy from "../pages/Privacy";
import Support from "../pages/Support";
import ResetPassword from "../pages/ResetPassword";
import ResetPasswordConfirm from "../pages/ResetPasswordConfirm";
import DealInvestors from "../pages/DealInvestors";
import Settings from "../pages/Settings";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import MsmeDashboard from "../pages/MsmeDashboard";
import ProfilePage from "../pages/ProfilePage";
import BalanceTopUp from "../pages/BalanceTopUp";
import RequireAuth from "../components/RequireAuth";
import useAuth from "../hooks/useAuth";

function ProfileRedirect() {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated || !user?.id) {
    return <Navigate to="/login" replace />;
  }
  return <Navigate to={`/profile/${user.id}`} replace />;
}

function InvestorDashboardRedirect() {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated || !user?.id) {
    return <Navigate to="/login" replace />;
  }
  return <Navigate to={`/dashboard/${user.id}`} replace />;
}

function RoleProtected({ allow, children }) {
  const { user } = useAuth();
  const investorDashboardPath = user?.id
    ? `/dashboard/${user.id}`
    : "/dashboard";
  const fallback =
    user?.accountType === "msme"
      ? "/msme/dashboard"
      : user?.accountType === "investor"
      ? investorDashboardPath
      : "/";

  if (allow && user?.accountType !== allow) {
    return <Navigate to={fallback} replace />;
  }
  return children;
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProfileRedirect />} />
        <Route
          path="/profile/:userId"
          element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <RoleProtected allow="investor">
                <InvestorDashboardRedirect />
              </RoleProtected>
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard/:userId"
          element={
            <RequireAuth>
              <RoleProtected allow="investor">
                <InvestorDashboard />
              </RoleProtected>
            </RequireAuth>
          }
        />
        <Route
          path="/investor/deals"
          element={
            <RequireAuth>
              <RoleProtected allow="investor">
                <InvestorDeals />
              </RoleProtected>
            </RequireAuth>
          }
        />
        <Route
          path="/balance"
          element={
            <RequireAuth>
              <RoleProtected allow="investor">
                <BalanceTopUp />
              </RoleProtected>
            </RequireAuth>
          }
        />
        <Route
          path="/deals"
          element={
            <RequireAuth>
              <Deals />
            </RequireAuth>
          }
        />
        <Route
          path="/deals/:dealId"
          element={
            <RequireAuth>
              <InvestorDealDetail />
            </RequireAuth>
          }
        />
        <Route
          path="/deals/:dealId/cashflows"
          element={
            <RequireAuth>
              <CashflowHistory />
            </RequireAuth>
          }
        />
        <Route
          path="/deals/:dealId/investors"
          element={
            <RequireAuth>
              <RoleProtected allow="msme">
                <DealInvestors />
              </RoleProtected>
            </RequireAuth>
          }
        />
        <Route
          path="/logs"
          element={
            <RequireAuth>
              <Logs />
            </RequireAuth>
          }
        />
        <Route
          path="/investor/logs"
          element={
            <RequireAuth>
              <RoleProtected allow="investor">
                <Logs />
              </RoleProtected>
            </RequireAuth>
          }
        />
        <Route
          path="/risk-reports"
          element={
            <RequireAuth>
              <RiskReports />
            </RequireAuth>
          }
        />
        <Route
          path="/ops"
          element={
            <RequireAuth>
              <OpsQueue />
            </RequireAuth>
          }
        />
        <Route
          path="/ops/tasks/:taskId"
          element={
            <RequireAuth>
              <OpsTaskDetail />
            </RequireAuth>
          }
        />
        <Route
          path="/msme/dashboard"
          element={
            <RequireAuth>
              <RoleProtected allow="msme">
                <MsmeDashboard />
              </RoleProtected>
            </RequireAuth>
          }
        />
        <Route
          path="/msme/dashboard/:dealId"
          element={
            <RequireAuth>
              <RoleProtected allow="msme">
                <MsmeDashboard />
              </RoleProtected>
            </RequireAuth>
          }
        />
        <Route
          path="/msme/wizard"
          element={
            <RequireAuth>
              <RoleProtected allow="msme">
                <MSMEWizard />
              </RoleProtected>
            </RequireAuth>
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/support" element={<Support />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/reset/confirm" element={<ResetPasswordConfirm />} />
        <Route
          path="/settings"
          element={
            <RequireAuth>
              <Settings />
            </RequireAuth>
          }
        />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
