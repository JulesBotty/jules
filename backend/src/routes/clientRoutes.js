import express from "express";
import { createClient,
  getMyCliens,
  getMyonClients,
  updateClients,
  deleteClient} from "../controllers/clientController.js";
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
  asyncHandler(createClient)
);


router.get("/", protect,
 //authorizeRoles("admin"),
 asyncHandler(getMyCliens)
 );


router.get("/onclient/:id",
   protect, 
   authorizeRoles("admin"),
   asyncHandler(getMyonClients)
  );


router.put("/updateclient/:id",
  //  authorizeRoles("admin"), 
    protect, 
    asyncHandler(updateClients)
);

router.delete("/:id", 
  asyncHandler(deleteClient)
);


export default router;
