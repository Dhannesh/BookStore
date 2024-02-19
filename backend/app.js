import express from "express";
import "dotenv/config";
import { dbConnect } from "./db/dbConnect.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Welcome to Book Store Project");
});

const start = async () => {
  try {
    await dbConnect(process.env.MONGO_URI);
    console.log("database connected");
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
