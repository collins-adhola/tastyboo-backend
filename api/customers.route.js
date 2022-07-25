import express from "express";
import customersController from "../controllers/customers.controller.js";

const router = express.Router(); // Get access to express router

// router.route("/").get((req, res) => res.send("Hello from Tastyboo customers"));
router.route("/").get(customersController.apiGetCustomers);
export default router;
