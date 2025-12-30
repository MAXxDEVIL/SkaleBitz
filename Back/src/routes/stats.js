import { Router } from "express";
import {
  getOverviewStats,
  getMsmeUtilization,
  getInvestorDashboard,
  getInvestorDeals,
  getInvestorLogs,
} from "../controllers/statsController.js";
import authRequired from "../middleware/authRequired.js";

const router = Router();

router.get("/overview", getOverviewStats);
router.get("/msme/utilization", authRequired, getMsmeUtilization);
router.get("/investor-dashboard", authRequired, getInvestorDashboard);
router.get("/investor/deals", authRequired, getInvestorDeals);
router.get("/investor/logs", authRequired, getInvestorLogs);

export default router;