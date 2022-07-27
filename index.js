import mongoose from "mongoose";
import app from "./server.js";
import mongodb from "mongodb"; // to access database
import dotenv from "dotenv"; // to access enviroment variables
import morgan from "morgan";
import CustomersDA0 from "./dao/customersDAO.js";

app.use(morgan("tiny"));
// tiny provides minmal out put for http request

// dotenv.config({ path: "./.env" });
dotenv.config();

const DB = process.env.MONGODB_URL;

mongoose
  .connect(DB, {
    useNewUrlPasrser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    writeConcern: {
      j: true,
    },
  })
  .then(() => console.log("TASTYBOO DB connection successful"));

// 4) Start server
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`App Running on port ${port}...`);
});

// ****************** NON MONGOOSE CONNECTION***********************
/*
async function main() {
  dotenv.config(); // to load the variables

  const client = new mongodb.MongoClient(process.env.MONGODB_URL); //  create an instance of mongo client and pass the variables
  const port = process.env.PORT || 8000; // retrieve port from the enviroment variable or use 8000 if cannot find it.

  try {
    // Connect to MongoDB cluster
    await client.connect(); // connect to database. returns a promise. block with await until connected.
    await CustomersDA0.injectDB(client); // before connecting to database and just before server starts we call injectDB to get initial reference to the movies collection in the database
    console.log("I have connected to the database but not yet started server")
    app.listen(port, () => {
      // app.listen starts the server and listens. The call back is the is excuted
      console.log(`The tastyboo server is running on port:` + port);
    });
  } catch (e) {
    console.error(e);
    
    process.exit(1);
  }
  
}
main().catch(console.error); // main() is called and error consoled
// main()connects to the our MangoDB cluster and calls functions that access the datbase

*/
