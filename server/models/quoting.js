import mongoose from "mongoose";

const { Schema, model } = mongoose;

const quotingSchema = new Schema({
  // could also be written as mongoose.Schema if mongoose wasnt destructured
  author: String,
  quote: String,
});

const quotingModel = model("quoting", quotingSchema); // "quoting" is the collection name in our DB

export default quotingModel;
