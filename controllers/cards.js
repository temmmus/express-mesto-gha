const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ServerError = require('../errors/server-err');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => next(new ServerError('Произошла ошибка')));
};

module.exports.createCard = (req, res, next) => {
  const owner = req.user._id;
  const likes = [];
  const { name, link } = req.body;

  Card.create({
    name, link, owner, likes,
  })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      } else {
        next(new ServerError('Произошла ошибка'));
      }
    });
};

module.exports.getCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card === null) {
        next(new NotFoundError('Карточка по указанному id не найден'));
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError('Карточка по указанному id не найден'));
      } else {
        next(new ServerError('Произошла ошибка'));
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        next(new NotFoundError('Карточка по указанному id не найден'));
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      } else {
        next(new ServerError('Произошла ошибка'));
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        next(new NotFoundError('Карточка по указанному id не найден'));
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      } else {
        next(new ServerError('Произошла ошибка'));
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findOneAndRemove({ _id: req.params.cardId })
    .then((card) => {
      if (card === null) {
        next(new NotFoundError('Карточка по указанному id не найден'));
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      } else {
        next(new ServerError('Произошла ошибка'));
      }
    });
};
