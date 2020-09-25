const validateObjectId = require("../middleware/validateObjectId");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { validateGenre, genreSchema } = require("../models/genre");
const admin = require("../middleware/admin");
const Genre = mongoose.model("genres", genreSchema);

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) {
    return res.status(400).send("Bad request!!! genre does not exist");
  }
  res.send(genre);
});
router.post("/", auth, async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const genre = new Genre({
    name: req.body.name,
  });
  const outCome = await genre.save();
  res.send(outCome);
});
router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    {
      new: true,
    }
  );
  if (!genre) {
    return res.status(404).send("The genre with the given id does not exist");
  }
  res.send(genre);
});
router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given id does not exist.");
  res.send(genre);
});
module.exports.Genre = Genre;
module.exports = router;
