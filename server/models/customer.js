const mongoose = require("mongoose");
const Joi = require("joi");

const customerSchema = new mongoose.Schema({
  isGold: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 15,
  },
});

const Customer = mongoose.model("customers", customerSchema);
function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().required().min(5).max(50),
    isGold: Joi.boolean(),
    phone: Joi.string().min(5).max(15),
  });
  return schema.validate(customer);
}

exports.validateCustomer = validateCustomer;

exports.customerSchema = customerSchema;
module.exports.Customer = Customer;
