const { genreSchema } = require("./genre");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");

const Movie = mongoose.model(
  "movies",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      minlenght: 5,
      trim: true,
      maxlenght: 100,
    },
    genre: {
      type: genreSchema,
      required: true,
    },
    numberInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },
    dailyRentalRate: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },
  })
);

function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().required().min(5).max(50),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required(),
  });
  return schema.validate(movie);
}

module.exports.validate = validateMovie;
module.exports.Movie = Movie;
