const express = require("express");
const router = express.Router();
const Joi = require("joi");

const courses = [
  {
    id: 1,
    name: "john",
  },
  {
    id: 2,
    name: "judas",
  },
  {
    id: 3,
    name: "james",
  },
];
router.get("/", (req, res) => {
  res.send(courses);
});
router.get("/:id", (req, res) => {
  const course = courses.find((m) => m.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("Not found");
    return;
  }
  res.send(course);
});
router.post("/", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(courses);
});
router.put("/:id", (req, res) => {
  const course = courses.find((m) => m.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("Not Found!!!");
    return;
  }

  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  course.name = req.body.name;
  res.send(course);
});
router.delete("/:id", (req, res) => {
  const course = courses.find((m) => m.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("does not exist");
    return;
  }
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
  console.log(courses);
});
module.exports = router;
