const express = require("express");
const { MongoClient } = require("mongodb");

require("dotenv").config();
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

//middle ware
app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("CarPackage");
    const carCollection = database.collection("cars");

    // get cars api
    app.get("/cars", async (req, res) => {
      const cursor = carCollection.find({});
      const cars = await cursor.toArray();
      res.send(cars);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("ecom  is running");
});

app.listen(port, () => {
  console.log("server running at port", port);
});
