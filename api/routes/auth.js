// import express from "express"
// import {myDB} from "../db/MyDB.js";
// import jwt from "jsonwebtoken";

// const router = express.Router();

// router.post("/register", async (req, res) => {
//     const newUser = req.body;
//     try {
//         await myDB.addUser(newUser);
//         res.status(200).send("Use created successfully.")
//     } catch (err){
//         res.status(500).json(err)
//     }
// })

// router.post("/login", async (req, res) => {
//     try {
//         const user = await myDB.getUser({"username": req.body.username});
//         if(!user) return res.status(404).json("User not found!")
//         if(user.password !== req.body.password){
//             return res.status(400).json("Wrong password or username!")
//         }
//         const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT);

//         const {password, isAdmin, ...otherDetails} = user;
//         res.cookie("access_token", token, {
//             httpOnly: true,
//         }).status(200).json({...otherDetails});
//     } catch (err){
//         res.status(500).json(err)
//     }
// })

// export default router

import express from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import { myDB } from "../db/MyDB.js";
import jwt from "jsonwebtoken";

const router = express.Router();

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        const user = await myDB.getUser({ username });

        if (!user) {
          return done(null, false, { message: "User not found!" });
        }

        if (user.password !== password) {
          return done(null, false, { message: "Wrong password or username!" });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await myDB.getUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

router.use(passport.initialize());
router.use(passport.session());

router.post("/register", async (req, res) => {
  const newUser = req.body;

  try {
    // Check if the username already exists
    const existingUser = await myDB.getUser({ username: newUser.username });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists." });
    }

    // Create the new user
    await myDB.addUser(newUser);
    res.status(200).send("User created successfully.");
    
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post("/login", passport.authenticate("local"), (req, res) => {
  // If authentication is successful, handle the response here
  const user = req.user;
  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT
  );

  const { password, isAdmin, ...otherDetails } = user;
  res
    .cookie("access_token", token, {
      httpOnly: true,
    })
    .status(200)
    .json({ ...otherDetails });
});

export default router;
