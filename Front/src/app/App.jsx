import { Navigate, Route, Routes } from 'react-router-dom';
import Landing from '../pages/Landing';
import NotFound from '../pages/NotFound';
import Register from '../pages/Register';
import Login from '../pages/Login';
import InvestorDashboard from '../pages/InvestorDashboard';
import InvestorDealDetail from '../pages/InvestorDealDetail';
import MSMEWizard from '../pages/MSMEWizard';
import OpsQueue from '../pages/OpsQueue';
import Deals from '../pages/src_pages_Deals';
import Logs from '../pages/src_pages_Logs';
import OpsTaskDetail from '../pages/src_pages_OpsTaskDetail';
import CashflowHistory from '../pages/src_pages_CashflowHistory';
import RiskReports from '../pages/src_pages_RiskReports';
import Contact from '../pages/Contact';
import Terms from '../pages/Terms';
import Privacy from '../pages/Privacy';
import Support from '../pages/Support';
import ResetPassword from '../pages/ResetPassword';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import MsmeDashboard from '../pages/MsmeDashboard';
import ProfilePage from '../pages/ProfilePage';
import RequireAuth from '../components/RequireAuth';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<RequireAuth><ProfilePage /></RequireAuth>} />
        <Route path="/dashboard" element={<RequireAuth><InvestorDashboard /></RequireAuth>} />
        <Route path="/deals" element={<RequireAuth><Deals /></RequireAuth>} />
        <Route path="/deals/:dealId" element={<RequireAuth><InvestorDealDetail /></RequireAuth>} />
        <Route path="/deals/:dealId/cashflows" element={<RequireAuth><CashflowHistory /></RequireAuth>} />
        <Route path="/logs" element={<RequireAuth><Logs /></RequireAuth>} />
        <Route path="/risk-reports" element={<RequireAuth><RiskReports /></RequireAuth>} />
        <Route path="/ops" element={<RequireAuth><OpsQueue /></RequireAuth>} />
        <Route path="/ops/tasks/:taskId" element={<RequireAuth><OpsTaskDetail /></RequireAuth>} />
        <Route path="/msme/dashboard" element={<RequireAuth><MsmeDashboard /></RequireAuth>} />
        <Route path="/msme/wizard" element={<RequireAuth><MSMEWizard /></RequireAuth>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/support" element={<Support />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
export default App;