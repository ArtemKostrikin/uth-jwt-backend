const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");

// Регистрация нового пользователя
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  // Проверка данных
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Все поля обязательны для заполнения" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword],
      (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Ошибка при регистрации пользователя" });
        }
        res
          .status(201)
          .json({ message: "Пользователь успешно зарегистрирован" });
      }
    );
  } catch (err) {
    res.status(500).json({ error: "Ошибка при хэшировании пароля" });
  }
};

// Логин пользователя
exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Все поля обязательны для заполнения" });
  }

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err || results.length === 0) {
        return res.status(404).json({ error: "Пользователь не найден" });
      }

      const user = results[0];

      // Сравнение пароля
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Неверный пароль" });
      }

      // Генерация JWT
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({ message: "Авторизация прошла успешно", token });
    }
  );
};
