const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/auth");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Используем маршруты для авторизации
app.use("/api/auth", authRoutes);

// Стартуем сервер
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
