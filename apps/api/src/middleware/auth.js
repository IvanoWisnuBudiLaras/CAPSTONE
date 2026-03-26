// @ts-check
import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET ?? "dev_secret";

export function authenticate(req, res, next) {
  const token = req.cookies?.access_token;
  if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    req.user = jwt.verify(token, ACCESS_SECRET);
    next();
  } catch {
    return res.status(401).json({ success: false, message: "Token invalid" });
  }
}

export function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
    next();
  };
}