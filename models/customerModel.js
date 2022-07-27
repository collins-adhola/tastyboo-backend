import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter customer or business name"],
    unique: true,
  },
  address: {
    type: String,
  },
  Telephone: {
    type: Number,
    unique: true,
  },
  total_orders: {
    type: Number,
  },
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;

// const testCustomer = new Ustomer({
//   name: "Gnda and sons",
//   address: " William Street",
//   Telephone: 999,
//   total_order: 500000,
// });

// testCustomer
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => console.log("ERROR💥💥:", err));
