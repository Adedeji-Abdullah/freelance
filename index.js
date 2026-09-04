import express from "express";
import dotenv from "dotenv";
// import Auth from './model/Auth.js'
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import freelance from "./model/Auth.js";
import bids from "./model/bids.js";
import profile from "./model/profile.js";
import jwt from "jsonwebtoken"
import { isReturnStatement } from "typescript";
import multer from 'multer'
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, 'public', 'uploads', 'profilePictures');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/register", async (req, res) => {
  const data = req.body;
  const {name, email, password} = req.body
  const payload = { name, email, password }
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
    
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN)
    res.json({name: data.name});
    console.log(accessToken)
    // res.json(accessToken)
  } catch (error) {
    console.log("something went wrong>>>>> " + error);
    res.json(error)
  }
});

app.get('/authorization/:accessToken', (req, res) => {
   const { accessToken } = req.params
   console.log(accessToken)
   try {
    const verification = jwt.verify(accessToken, process.env.ACCESS_TOKEN)
    if (verification) {
      res.json({message: "success"})
    }
   } catch (err) {
    res.status(401).json({message: "unsuccessful"})
   }
})

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
    res.json({message: "Successful", data: find.option})
  }else{
    res.json({message: "It's a wrong secrete code"})
  }
})

app.post("/login", async (req, res) => {
  try {
    const data = req.body;
    const { email, password } = req.body
    const payload = { email, password }
    if (!data.email || !data.password) {
      res.status(401).json("fill in the empty spaces");
    }

    const hashed = await bcrypt.hash(data.password, 10);
    const result = await freelance.findOne({
      email: req.body.email,
    });
    console.log(result)
    const compared = await bcrypt.compare(req.body.password, result.password)
    console.log(compared)
    if(compared == false) return
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN)
    // res.json(accessToken)
    console.log(accessToken)
    res.json({result: result, accessToken: accessToken});
  } catch (error) {
    console.log(error);
    res.status(403).json("Something went wrong");
  }

  // const {email, password} = req.body;
  // const encryptedPassword = await bcrypt.hash(password, 10);
  // res.json(encryptedPassword)
});

app.post("/post", async (req, res) => {
  try {
    const data = req.body;
    
    // If profile ID is provided, fetch the profile and embed it
    let bidData = { ...data };
    
    if (data.profileId) {
      try {
        const profileDoc = await profile.findById(data.profileId);
        if (profileDoc) {
          bidData.profile = {
            firstname: profileDoc.firstname,
            lastname: profileDoc.lastname,
            email: profileDoc.email,
            category: profileDoc.category,
            group: profileDoc.group,
            bio: profileDoc.bio,
            profilePicture: profileDoc.profilePicture,
            profilePictureUrl: profileDoc.profilePictureUrl
          };
        }
      } catch (profileErr) {
        console.log("Could not fetch profile:", profileErr);
        // Continue without profile if fetch fails
      }
    }
    
    const newBid = new bids(bidData);
    const result = await newBid.save();
    
    res.json({
      success: true,
      message: "Bid created successfully",
      data: result
    });
    console.log("Bid created with profile:", result);
  } catch (err) {
    console.error("Error creating bid:", err);
    res.status(500).json({
      success: false,
      message: "Error creating bid",
      error: err.message
    });
  }
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

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Accept only image files
  const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// app.post('/api/profile/:id', async () => {
//   const id = req.params
//   const data = await freelance.findById(id)
//   console.log("search by id >>>>>" + data)
// })

app.post('/api/profile3/:id', upload.single('profilePicture'), async (req, res) => {
  try {
    const data = req.body;
    const id = req.params
    
    // Build profile object
    // const filter = await freelance.findById(id)
    // console.log(filter)
    const profileData = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      category: data.category,
      group: data.group,
      bio: data.bio
    };

    // If file was uploaded, add it to profile data
    if (req.file) {
      profileData.profilePicture = req.file.filename;
      profileData.profilePictureUrl = `/uploads/profilePictures/${req.file.filename}`;
    } else {
      console.log("error file")
    }

    console.log("ID", id)
    console.log("TYPEOF ID:", typeof id)

    const result = await freelance.updateOne(
    {
      _id: new mongoose.Types.ObjectId(id.id)
    },
    { $push: { profile: {data} } },

    console.log("Success")
  );
  console.log("this is result" + result)
  const info = await freelance.findOne({
    _id: new mongoose.Types.ObjectId(id.id)
  })
    // const result = await newProfile.save();
    
    console.log('Profile created:', result);
    res.json({
      success: true,
      message: 'Profile created successfully',
      data: info
    });
  } catch (err) {
    console.error('Error creating profile:', err);
    res.status(500).json({
      success: false,
      message: 'Error creating profile',
      error: err.message
    });
  }
});

app.get('/api/getting-profile/:id', async (req, res) => {
  const id = req.params.id
  console.log(id)
  const data = await freelance.findById(id)
  // console.log("this is data " + data)
  console.log("This is the profile " + JSON.stringify(data.profile[data.profile.length - 1]))
  // console.log("This is the profile length " + data.profile.length)
  // console.log("this is the one found by id" + data.profile.splice(-1).data)
  res.json(JSON.stringify(data.profile[data.profile.length - 1]))
})


// Update existing profile
app.put('/api/profile2/:id', upload.single('profilePicture'), async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // Build update object
    const updateData = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      category: data.category,
      group: data.group,
      bio: data.bio,
      updatedAt: new Date()
    };

    // If file was uploaded, add it to update data
    if (req.file) {
      updateData.profilePicture = req.file.filename;
      updateData.profilePictureUrl = `/uploads/profilePictures/${req.file.filename}`;
    }

    const result = await profile.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    console.log('Profile updated:', result);
    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: result
    });
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: err.message
    });
  }
});

// Get profile by ID
app.get('/api/profile/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await profile.findById(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching profile',
      error: err.message
    });
  }
});

const authorization = (req, res, next) => {
    const params = req.params
    if(!params){
      res.json(401) 
      return
    }
    const verificaton = jwt.verify(params, process.env.ACCESS_TOKEN)
    if(!verificaton){
      res.json(403) 
      return
    }
    next()
}

app.listen(process.env.PORT, async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Server is running on port ${process.env.PORT}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
});
