const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "Acceso denegado. Token no proporcionado." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp - now < 300) {
      const newToken = jwt.sign(
        { id: decoded.id, email: decoded.email, role: decoded.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.header("Authorization", `Bearer ${newToken}`);
    }

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expirado. Inicie sesión nuevamente." });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Token inválido." });
    } else {
      return res.status(500).json({ error: "Error en la autenticación." });
    }
  }
};

module.exports = authMiddleware;