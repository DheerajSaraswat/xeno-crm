// Example authentication middleware
module.exports = function (req, res, next) {
  // Dummy check: In real apps, check JWT or session/cookie
  if (req.headers["authorization"]) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
