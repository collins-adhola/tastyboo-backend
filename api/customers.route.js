import express from "express";
import CustomersController from "../controllers/customers.controller.js";

const router = express.Router(); // Get access to express router

//router.route("/").get((req, res) => res.send("Hello from Tastyboo customers"));

router.route("/").get(CustomersController.apiGetCustomers);

export default router;
