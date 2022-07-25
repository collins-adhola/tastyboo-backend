import express from "express";
import cors from "cors";
// import accounts from "./api/accounts.route.js";
// import transactions from "./api/transactions.route.js";
import customers from "./api/customers.route.js";
// import hero from "./api/hero.route.js";

//server
const app = express();

// Dependecies- to enable server to read and accept JSON in the request body
app.use(cors());
app.use(express.json());

//routes
// app.use("/api/v1/hero", hero);
// app.use("/api/v1/accounts", accounts);
// app.use("/api/v1/transactions", transactions);
app.use("/api/v1/customers", customers);
app.use("*", (req, res) => {
  res.status(404).json({ error: "cannot find for tastyboo" });
});

export default app;
