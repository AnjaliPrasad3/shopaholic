import express from "express";
const router = express.Router();
import { 
    getProducts, 
    newProduct, 
    getProductDetails, 
    updateProduct, 
    deleteProduct,
    createProductReview,
    getProductReviews,
    deleteReview,
    canUserReview, } from "../controllers/productControllers.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";


router.route("/products").get(getProducts);

router.route("/admin/products").post(isAuthenticatedUser, authorizeRoles("admin"),newProduct);

router.route("/products/:id").get(getProductDetails);

router.route("/admin/products/:id").put(isAuthenticatedUser, authorizeRoles("admin"),updateProduct);
router.route("/admin/products/:id").delete(isAuthenticatedUser, authorizeRoles("admin"),deleteProduct);

router
.route("/reviews")
.get(isAuthenticatedUser, getProductReviews)
.put(isAuthenticatedUser, createProductReview);

router
.route("/admin/reviews")
.delete(isAuthenticatedUser, authorizeRoles("admin"), deleteReview);

router.route("/can_review").get(isAuthenticatedUser, canUserReview);

export default router;