import express from "express";
import {
  createLeave,
  getAnalytics,
  getManagerAnalytics,
  getMyLeaves,
  getMyLeavesa,
  getMyLeaveSummary,
  getMyonLeaves,
  getReviewQueue,
  updateLeaves,
  updateLeaveStatus
} from "../controllers/leaveController.js";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { createLeaveValidator, updateLeaveStatusValidator } from "../validators/leaveValidators.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorizeRoles("employee"),
  createLeaveValidator,
  validateRequest,
  asyncHandler(createLeave)
);

router.get("/my", protect, authorizeRoles("employee"), asyncHandler(getMyLeaves));
//router.get("/myas", protect, authorizeRoles("employee"), asyncHandler(getMyLeavesa));

router.get("/mya", protect, asyncHandler(getMyLeavesa));

router.get("/onleave/:id",
   protect, 
   asyncHandler(getMyonLeaves)
  );

router.get("/analytics", protect, asyncHandler(getAnalytics));

router.put("/updateleave/:id", protect, asyncHandler(updateLeaves));
router.get("/summary/my", protect, authorizeRoles("employee"), asyncHandler(getMyLeaveSummary));
router.get("/review-queue", protect, authorizeRoles("manager"), asyncHandler(getReviewQueue));
router.get("/analytics/manager", protect, authorizeRoles("manager"), asyncHandler(getManagerAnalytics));

router.patch(
  "/:id/status",
  protect,
  authorizeRoles("manager"),
  updateLeaveStatusValidator,
  validateRequest,
  asyncHandler(updateLeaveStatus)
);

export default router;
