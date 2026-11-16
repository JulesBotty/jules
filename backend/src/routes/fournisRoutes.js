import express from "express";
import { createFournis,
  getMyFournis,
  getMyonFournis,
  updateFournis,
  deleteFournis } from "../controllers/fournisController.js";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { createLeaveValidator, updateLeaveStatusValidator } from "../validators/leaveValidators.js";

const router = express.Router();

router.post(
  "/creer",
  protect,
 authorizeRoles("admin"),
  createLeaveValidator,
  //validateRequest,
  asyncHandler(createFournis)
);


router.get("/", protect,
 authorizeRoles("admin"),
 asyncHandler(getMyFournis)
 );


router.get("/onclient/:id",
   protect, 
   authorizeRoles("admin"),
   asyncHandler(getMyonFournis)
  );


router.put("/updateclient/:id",
  //  authorizeRoles("admin"), 
    protect, 
    asyncHandler(updateFournis)
);

router.delete("/:id", 
  asyncHandler(deleteFournis)
);


export default router;
