const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No authorization" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACESS_TOKEN)

    req.userId = decoded.userId
    next()
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid Token" });
  }
};
module.exports = verifyToken