const User = require("../models/user");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => {
      res.status(500).send({ message: "Произошла ошибка" });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({
          message: "Переданы некорректные данные при создании пользователя",
        });
        return;
      }
      if (err.name === "CastError") {
        res
          .status(404)
          .send({ message: "Пользователь с указанным _id не найден" });
        return;
      } else {
        res.status(500).send({ message: "Произошла ошибка" });
        return;
      }
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      if (err.name === "CastError") {
        res
          .status(404)
          .send({ message: "Пользователь по указанному _id не найден" });
        return;
      } else {
        res.status(500).send({ message: "Произошла ошибка" });
        return;
      }
    });
};

module.exports.patchProfile = (req, res) => {
  const { name, about } = req.body;

  if (
    name.length < 2 ||
    about.length < 2 ||
    name.length > 30 ||
    about.length > 30
  ) {
    res.status(400).send({
      message: "Переданы некорректные данные при обновлении пользователя",
    });
    return;
  }

  User.findByIdAndUpdate(req.user._id, { $set: { name, about } }, { new: true })
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({
          message: "Переданы некорректные данные при обновлении профиля",
        });
        return;
      }
      if (err.name === "CastError") {
        res
          .status(404)
          .send({ message: "Пользователь с указанным _id не найден" });
        return;
      } else {
        res.status(500).send({ message: "Произошла ошибка" });
        return;
      }
    });
};

module.exports.pacthAratar = (req, res) => {
  const newAvatar = req.body.avatar;

  User.findByIdAndUpdate(
    req.user._id,
    { $set: { avatar: newAvatar } },
    { new: true }
  )
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({
          message: "Переданы некорректные данные при обновлении профиля",
        });
        return;
      }
      if (err.name === "CastError") {
        res
          .status(404)
          .send({ message: "Пользователь с указанным _id не найден" });
        return;
      } else {
        res.status(500).send({ message: "Произошла ошибка" });
        return;
      }
    });
};
