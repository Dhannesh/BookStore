import express from "express";
import "dotenv/config";
import { dbConnect } from "./db/dbConnect.js";
import { Book } from "./model/bookModel.js";
import { StatusCodes } from "http-status-codes";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Welcome to Book Store Project");
});

app.post("/books", async (req, res) => {
  try {
    await Book.create(req.body);
    res.status(StatusCodes.CREATED).json({ msg: "Book added" });
  } catch (error) {
    console.log(error);
  }
});

app.get("/books", async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(StatusCodes.OK).json({ count: books.length, books });
  } catch (error) {
    console.log(error);
  }
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
