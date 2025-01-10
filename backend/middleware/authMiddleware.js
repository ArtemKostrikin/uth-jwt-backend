const jwt = require("jsonwebtoken");
const config = require("../config");

const authMiddleware = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "Нет токена, авторизация отклонена" });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded.id; // Сохраняем ID пользователя из токена в запросе
    next();
  } catch (err) {
    res.status(400).json({ msg: "Неверный токен" });
  }
};

module.exports = authMiddleware;
