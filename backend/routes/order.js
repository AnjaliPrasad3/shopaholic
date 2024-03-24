import express from "express";
import { allOrders, deleteOrder, getOrderDetails, myOrders, newOrder, updateOrders } from "../controllers/orderControllers.js";
const router = express.Router();
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";

router.route("/orders/new").post(isAuthenticatedUser, newOrder);
router.route("/orders/:id").get(isAuthenticatedUser, getOrderDetails);
router.route("/me/orders").get(isAuthenticatedUser, myOrders);

router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), allOrders);
router
.route("/admin/orders/:id")
.put(isAuthenticatedUser, authorizeRoles("admin"), updateOrders)
.delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

export default router;