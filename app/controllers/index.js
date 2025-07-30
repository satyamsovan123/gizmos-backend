/**
 * @file This file contains the index of all controllers.
 * It re-exports all the controllers for easy import in other files.
 */

// Authentication Controllers
export { signin } from "./authenticationController/signin.controller.js";
export { signup } from "./authenticationController/signup.controller.js";

// Cart Controllers
export { getCart } from "./cartController/getCart.controller.js";
export { editCart } from "./cartController/editCart.controller.js";

// Order Controllers
export { createOrder } from "./orderController/createOrder.controller.js";
export { createSubscription } from "./orderController/createSubscription.controller.js";
export { editSubscription } from "./orderController/editSubscription.controller.js";
export { cancelSubscription } from "./orderController/cancelSubscription.controller.js";
export { getOrders } from "./orderController/getOrders.controller.js";
export { getOrder } from "./orderController/getOrder.controller.js";
export { refundOrder } from "./orderController/refundOrder.controller.js";
export { cancelOrder } from "./orderController/cancelOrder.controller.js";

// Payment Controllers
export { getPaymentLink } from "./paymentController/getPaymentLink.controller.js";

// User Controllers
export { getUser } from "./userController/getUser.controller.js";
export { editUser } from "./userController/editUser.controller.js";
export { editPassword } from "./userController/editPassword.controller.js";

// Product Controllers
export { getProducts } from "./productController/getProducts.controller.js";
export { getProduct } from "./productController/getProduct.controller.js";

export { createProduct } from "./productController/createProduct.controller.js";
export { editProduct } from "./productController/editProduct.controller.js";
export { deleteProduct } from "./productController/deleteProduct.controller.js";

// Discount Controllers
export { getDiscounts } from "./discountController/getDiscounts.controller.js";
export { createDiscount } from "./discountController/createDiscount.controller.js";
export { editDiscount } from "./discountController/editDiscount.controller.js";
export { deleteDiscount } from "./discountController/deleteDiscount.controller.js";
