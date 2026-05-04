export const requireAdmin = (req, res, next) => {
  if (!req.membership || req.membership.role !== "ADMIN") {
    return res.status(403).json({ message: "Admin only" });
  }
  next();
};