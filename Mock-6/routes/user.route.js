const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { userModel } = require("../models/user.model");

const userRouter = express.Router();

userRouter.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.find({ email });
    if (user.length > 0) {
      res.send("user already registered");
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          res.status(201).json({ message: err.message });
        } else {
          const userdetails = new userModel({ name, email, password: hash });
          await userdetails.save();
          res.status(201).json({ msg: "user registered sucessfully" });
        }
      });
    }
  } catch (error) {
    res.status(201).json({ message: err.message });
  }
});

// login
userRouter.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.find({ email });
    if (user.length > 0) {
      const decode = await bcrypt.compare(password, user[0].password);
      if (decode) {
        const token = jwt.sign({ email: user[0].email }, "masai", {
          expiresIn: "1h",
        });
        res.status(201).json({ msg: "login sucess", token });
      } else {
        res.status(201).json({ msg: "Details not match" });
      }
    } else {
      res.status(201).json({ msg: "plaese login first" });
    }
  } catch (error) {
    res.status(201).json({ message: err.message });
  }
});

module.exports = {
  userRouter,
};
