const express = require("express");
const router = express.Router();
const { Customer, validateCustomer } = require("../models/customer");
const auth = require("../middleware/auth");
router.get("/", auth, async (req, res) => {
  const customer = await Customer.find().sort("name");
  res.send(customer);
});
router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) {
    return res.status(404).send("customer does not exist");
  }
  res.send(customer);
});
router.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) {
    return res.status(404).send(error.details[0].message);
  }
  const customers = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  const newCustomer = await customers.save();
  res.send(newCustomer);
});
router.put("/:id", auth, async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) {
    return res.status(404).send(error.details[0].message);
  }
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      isGold: req.body.isGold,
      name: req.body.name,
      phone: req.body.phone,
    },
    {
      new: true,
    }
  );
  const updatedCustomer = customer.save();
  res.send(updatedCustomer);
});

module.exports = router;
