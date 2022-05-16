const User = require("../models/user");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  // console.log(req.body);
  User.create({ name, about, avatar })
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};
