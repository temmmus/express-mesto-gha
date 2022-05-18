const Card = require("../models/card");

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports.createCard = (req, res) => {
  const owner = req.user._id;
  const likes = [];
  const { name, link } = req.body;

  Card.create({ name, link, owner, likes })
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({
          message: "Переданы некорректные данные при создании карточки",
        });
        return;
      } else {
        res.status(500).send({ message: "Произошла ошибка" });
        return;
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((cards) => {
      if (cards === null) {
        res
          .status(404)
          .send({ message: "Передан несуществующий _id карточки" });
        return;
      } else {
        res.send({ data: cards });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({
          message: "Переданы некорректные данные при создании карточки",
        });
        return;
      } else {
        res.status(500).send({ message: "Произошла ошибка" });
        return;
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((cards) => {
      if (cards === null) {
        res
          .status(404)
          .send({ message: "Передан несуществующий _id карточки" });
        return;
      } else {
        res.send({ data: cards });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({
          message: "Переданы некорректные данные при создании карточки",
        });
        return;
      } else {
        res.status(500).send({ message: "Произошла ошибка" });
        return;
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findOneAndRemove({ _id: req.params.cardId })
    .then((cards) => {
      if (cards === null) {
        res
          .status(404)
          .send({ message: "Передан несуществующий _id карточки" });
        return;
      } else {
        res.send({ data: cards });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res
          .status(400)
          .send({
            message: "Переданы некорректные данные при создании карточки",
          });
        return;
      } else {
        res.status(500).send({ message: "Произошла ошибка" });
        return;
      }
    });
};
