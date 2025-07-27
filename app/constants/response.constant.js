const SERVER_ERROR_RESPONSE = {
  TOO_MANY_REQUESTS: "Too many requests.",
  INTERNAL_SERVER_ERROR: "Internal server error.",
  NOT_FOUND: "Resource not found.",
};

const API_RESPONSE = {
  API_OPERATIONAL: "API is operational.",

  FIELD_IS_INVALID: "Field is invalid.",
  FIELD_IS_EMPTY: "Field cannot be empty.",
  FIELD_IS_REQUIRED: "Field is required.",

  INVALID_DATA: "Data is invalid.",
  EXTRA_FIELDS_NOT_ALLOWED: "Please do not provide any extra data.",

  AUTHENTICATION: {
    SIGN_IN_SUCCESS: "Signin successful.",
    SIGN_IN_FAILURE: "Signin failed. Please check your credentials.",
    SIGN_UP_SUCCESS: "Signup successful.",
    SIGN_UP_FAILURE: "Signup failed. Please try again.",
    PASSWORD_RESET_SUCCESS: "Password changed successful.",
    PASSWORD_RESET_FAILURE: "Password change failed. Please try again.",
    TOKEN_INVALID: "Token is invalid.",
  },

  CART: {
    CART_FETCH_SUCCESS: "Cart fetched successfully.",
    CART_FETCH_FAILURE: "Failed to fetch cart. Please try again.",
    CART_UPDATE_SUCCESS: "Cart updated successfully.",
    CART_UPDATE_FAILURE: "Cart update failed. Please try again.",
  },

  DISCOUNT: {
    DISCOUNT_APPLIED_SUCCESS: "Discount applied successfully.",
    DISCOUNT_APPLIED_FAILURE: "Failed to apply discount. Please try again.",
    DISCOUNT_INVALID: "Discount code is invalid.",
    DISCOUNT_CREATED: "Discount created successfully.",
    DISCOUNT_CREATION_FAILED: "Failed to create discount. Please try again.",
    DISCOUNT_UPDATE_SUCCESS: "Discount updated successfully.",
    DISCOUNT_UPDATE_FAILURE: "Failed to update discount. Please try again.",
  },

  USER: {
    USER_PROFILE_FETCH_SUCCESS: "User profile fetched successfully.",
    USER_PROFILE_FETCH_FAILURE:
      "Failed to fetch user profile. Please try again.",
    USER_PROFILE_UPDATE_SUCCESS: "User profile updated successfully.",
    USER_PROFILE_UPDATE_FAILURE:
      "Failed to update user profile. Please try again.",
  },

  PRODUCT: {
    PRODUCT_FETCH_SUCCESS: "Product details fetched successfully.",
    PRODUCT_FETCH_FAILURE: "Failed to fetch product details. Please try again.",
    PRODUCT_LIST_FETCH_SUCCESS: "Product list fetched successfully.",
    PRODUCT_LIST_FETCH_FAILURE:
      "Failed to fetch product list. Please try again.",
    PRODUCT_CREATION_SUCCESS: "Product created successfully.",
    PRODUCT_CREATION_FAILURE: "Failed to create product. Please try again.",
    PRODUCT_UPDATE_SUCCESS: "Product updated successfully.",
    PRODUCT_UPDATE_FAILURE: "Failed to update product. Please try again.",
    PRODUCT_DELETION_SUCCESS: "Product deleted successfully.",
    PRODUCT_DELETION_FAILURE: "Failed to delete product. Please try again.",
  },

  ORDER: {
    ORDER_PLACED_SUCCESS: "Order placed successfully.",
    ORDER_PLACED_FAILURE: "Failed to place order. Please try again.",
    ORDER_FETCH_SUCCESS: "Order details fetched successfully.",
    ORDER_FETCH_FAILURE: "Failed to fetch order details. Please try again.",
    ORDER_LIST_FETCH_SUCCESS: "Order list fetched successfully.",
    ORDER_LIST_FETCH_FAILURE: "Failed to fetch order list. Please try again.",
    ORDER_CANCELLED_SUCCESS: "Order cancelled successfully.",
    ORDER_CANCELLED_FAILURE: "Failed to cancel order. Please try again.",
    ORDER_REFUNDED_SUCCESS: "Order refunded successfully.",
    ORDER_REFUNDED_FAILURE: "Failed to refund order. Please try again.",

    SUBSCRIPTION_CREATED: "Subscription created successfully.",
    SUBSCRIPTION_CREATION_FAILED:
      "Failed to create subscription. Please try again.",
    SUBSCRIPTION_UPDATED: "Subscription updated successfully.",
    SUBSCRIPTION_UPDATE_FAILED:
      "Failed to update subscription. Please try again.",
  },

  PAYMENT: {
    PAYMENT_SUCCESS: "Payment processed successfully.",
    PAYMENT_FAILURE: "Payment processing failed. Please try again.",

    GET_PAYMENT_LINK_SUCCESS: "Payment link retrieved successfully.",
    GET_PAYMENT_LINK_FAILURE:
      "Failed to retrieve payment link. Please try again.",
    PAYMENT_LINK_INVALID: "Payment link is invalid.",
  },
};

export { SERVER_ERROR_RESPONSE, API_RESPONSE };
