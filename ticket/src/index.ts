import "express-async-errors";
import mongoose from "mongoose";

import { app } from "./app";

const port = 3000;

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT Key Must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Mongo Db");
  } catch (error) {
    console.error(error);
  }
};

app.listen(port, () => {
  console.log(`Listening on port number ${port}`);
});

start();
