import express, { response } from "express";
const app = express();
import mongoose from "mongoose";
import quotingModel from "./models/quoting.js";
import cors from "cors";

app.use(express.json()); //express.json() is a method built in express to recognize the incoming Request Object as a JSON Object. This method is called as a middleware in your application using the code: app.use(express.json());
app.use(cors());
// app.use(express.urlencoded({ extended: false }));

mongoose.connect(
  "mongodb+srv://danielhabila:dcrkJBxkNWWotJYx@cluster0.teaczby.mongodb.net/qdiary?retryWrites=true&w=majority"
);

app.get("/getQuotes", (request, response) => {
  quotingModel.find({}, (err, result) => {
    //the curly braces within the find method means return everything from quotingModel
    if (err) {
      response.json(err);
    } else {
      response.json(result);
    }
  });
});

app.post("/insert", async (request, response) => {
  // We are using both request and response in the .post method. We use the REQUEST here cos we can pass info from the frontend to the backend by tapping into the .body object found in the REQUEST
  const user = request.body;
  const quote1 = new quotingModel(user);
  // await quote1.save();

  response.send(user); // this returns the info from the backend to the frontend
});

app.listen(3001, () => {
  console.log("server is running great");
});
