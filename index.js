import express from "express";
import dotenv from "dotenv";
// import Auth from './model/Auth.js'
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import freelance from "./model/Auth.js";
import bids from "./model/bids.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/register", async (req, res) => {
  const data = req.body;
  try {
    const hashed = await bcrypt.hash(data.password, 10);
    const addUser = await new freelance({
      name: data.name,
      email: data.email,
      password: hashed,
    });
    const result = await addUser.save();
    console.log(data);
    console.log("Succesfully");
    res.json(data);
  } catch (error) {
    console.log("something went wrong>>>>> " + error);
  }
});

app.post("/bidding", async (req, res) => {
  const data = req.body;
  console.log(req.body);
  // res.json(req.body);
  console.log(req.body.id)
  console.log(data.id)
  try {
    const result = await bids.updateOne(
    {
      _id: new mongoose.Types.ObjectId(data.id)
    },
    { $push: { option: {data} } },

    console.log("Success")
  );
  } catch (err) {
    res.json({"message": "Something went wrong"})
    console.log(err)
  }
});

app.get('/applicants', async (req, res) => {
  const value = req.params
  console.log(value)
  const data = await bids.find()
  console.log(data)
  res.json(data)
})

app.post('/confirm', async (req, res) => {
  const data = req.body
  console.log(data)
  const find = await bids.findById(req.body.id)
  console.log(find)
  if(req.body.confirmData === find.secrete){
    res.json({message: "Successful"})
  }else{
    res.json({message: "It's a wrong secrete code"})
  }
})

app.post("/login", async (req, res) => {
  try {
    const data = req.body;
    if (!data.email || data.password) {
      res.status(401).json("fill in the empty spaces");
    }
    const hashed = await bcrypt.hash(data.password, 10);
    const result = await freelance.findOne({
      email: req.body.email,
      password: bcrypt.compare(req.password, hashed),
    });
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(403).json("Something went wrong");
  }

  // const {email, password} = req.body;
  // const encryptedPassword = await bcrypt.hash(password, 10);
  // res.json(encryptedPassword)
});

app.post("/post", async (req, res) => {
  const data = req.body;
  res.json("It's working");
  console.log(data);
  const data2 = await new bids(data);
  const result = await data2.save();
});

app.get("/bids", async (req, res) => {
  try {
    const data = await bids.find();
    console.log(data);
    res.json(data);
  } catch (err) {
    res.json(err);
    console.log("something went wrong " + err);
  }
});

app.listen(process.env.PORT, async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Server is running on port ${process.env.PORT}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
});
