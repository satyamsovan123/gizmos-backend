import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { API_RESPONSE } from "../../constants/index.js";

/**
 * Generates tokens for the user.
 * @param {Object} user - The user object.
 * @returns {Promise<void>}
 * @throws {Error} - If there is an error generating the tokens.
 */
function generateTokens(user) {
  try {
    let tokens = {
      accessToken: jwt.sign(user, process.env.JWT_ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.JWT_ACCESS_TOKEN_SECRET_EXPIRES_IN,
      }),
      refreshToken: jwt.sign(user, process.env.JWT_REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.JWT_REFRESH_TOKEN_SECRET_EXPIRES_IN,
      }),
    };
    return tokens;
  } catch (error) {
    throw new Error(API_RESPONSE.AUTHENTICATION.TOKEN_GENERATION_FAILURE);
  }
}

/**
 * Hashes the given text using bcrypt.
 * @param {string} text - The text to hash.
 * @returns {Promise<string>} - The hashed text.
 * @throws {Error} - If there is an error during hashing.
 */
async function hashText(text) {
  try {
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
    return await bcrypt.hash(text, salt);
  } catch (error) {
    throw new Error(API_RESPONSE.AUTHENTICATION.ENCRYPTION_FAILURE);
  }
}

/**
 * Compares a text with a hashed value.
 * @param {string} text - The text to compare.
 * @param {string} hash - The hashed value to compare against.
 * @returns {Promise<boolean>} - True if the text matches the hash, false otherwise.
 * @throws {Error} - If there is an error during comparison.
 */
async function compareTextAndHash(text, hash) {
  try {
    return await bcrypt.compare(text, hash);
  } catch (error) {
    throw new Error(API_RESPONSE.AUTHENTICATION.ENCRYPTION_FAILURE);
  }
}

export { generateTokens, hashText, compareTextAndHash };
