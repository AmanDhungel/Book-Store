import express, { response } from "express";
import { PORT, MONGOURL } from "./config.js";
import mongoose from "mongoose";
import  bookRoutes  from "./routes/bookRoutes.js";
import cors from 'cors';

const app = express();
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("<h1>This is Book Store Thank You!</h1>");
});

app.use('/books', bookRoutes);


mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log('connected successfully');
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
