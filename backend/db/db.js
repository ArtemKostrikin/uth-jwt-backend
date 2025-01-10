const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Замените на свой логин
  password: "1234", // Замените на свой пароль
  database: "praticedb", // Укажите название вашей базы данных
});

db.connect((err) => {
  if (err) {
    console.error("Ошибка подключения к базе данных: ", err);
  } else {
    console.log("Подключено к базе данных MySQL");
  }
});

module.exports = db;
