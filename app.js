const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const process = require("process");

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/mestodb", {
  // useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

app.use((req, res, next) => {
  req.user = {
    _id: "6282b10a4c452403cfd5fc1c",
  };

  next();
});

app.use("/users", require("./routes/users"));
app.use("/cards", require("./routes/cards"));

app.use(express.static(path.join(__dirname, "public")));

process.on("uncaughtException", (err, origin) => {
  console.log(
    `${origin} ${err.name} c текстом ${err.message} не была обработана. Обратите внимание!`
  );
});

app.listen(PORT, () => {
  console.log("Поехали!");
});
