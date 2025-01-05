const express = require("express");
const AuthRoute = express.Router();
const { validateRequestData } = require("../utils/validations");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// post data -  SIGNUP API
AuthRoute.post("/signup", async (req, res) => {
  try {
    validateRequestData(req);
    const { firstName, lastName, emailId, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const UserData = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });
    const savedData = await UserData.save();
    const token = await savedData.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });
    res.json({message : "User Added Successfully!", data : savedData});

  } catch (err) {
    res.status(400).send("something went wrong in saving the Data! " + err);
  }
});

// POST - Login API
AuthRoute.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials!");
    }
    // const isValidPassword = await bcrypt.compare(password, user.password)
    const isValidPassword = await user.validatePassword(password);
    if (isValidPassword) {
      //create a JWT token
      const token = await user.getJWT();
      // attach the JWT token and send back the cookie to the user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send(
        user
        // "Hello " +
        //   user.firstName +
        //   " " +
        //   user.lastName +
        //   ", Your Login is Successfull!"
      );
    } else {
      throw new Error("Invalid credentials!");
    }
  } catch (err) {
    res.status(400).send("ERR : " + err.message);
  }
});

// POST - Logout API
AuthRoute.post("/logout", async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
    });
    res.send("Logged Out Successfully!");
  } catch (err) {
    res.status(400).send("ERR : " + err.message);
  }
});

module.exports = AuthRoute;
