import jwt from "jsonwebtoken";
import createError from "http-errors";
import { JWT_SECRET } from "../config/constants.js";

export default async function authRequired(req, _res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(createError(401, "Unauthorized"));
  }
  
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = { id: payload.sub, email: payload.email };
    return next();
  } catch (err) {
    return next(createError(401, "Unauthorized"));
  }
}