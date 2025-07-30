/**
 * @file This file re-exports all middlewares from the middlewares directory.
 * It serves as a "barrel file" for cleaner imports.
 */
export { errorResponseHandler } from "./errorResponse.middleware.js";
export { accessTokenAndRoleHandler } from "./accessToken.middleware.js";
