import express from "express";
import AccountsController from "../controllers/accounts.controller.js";

const router = express.Router(); // Get access to express router

// router.route("/").get((req, res) => res.send("Hello from Tastyboo Accounts"));

router.route("/").get(AccountsController.apiGetAccounts);

export default router;
