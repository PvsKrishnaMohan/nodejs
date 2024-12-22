const express = require('express');

const profileRoute = express.Router();
const { userAuth } = require("../middlewares/Auth");
const { validateEditProfileData } = require("../utils/validations");


// GET - Profile API
profileRoute.get("/profile/view", userAuth, async (req, res) => {
    try {
      const userLoggedIn = req.user;
      res.send(userLoggedIn);
    } catch (err) {
      res.status(404).send("ERR: " + err.message);
    }
  });

// PATCH - UPDATE USER API
profileRoute.patch("/profile/edit", userAuth, async(req,res) => {
    try {
        const validData = validateEditProfileData(req.body);
        if(!validData){
            throw new Error("Invalid data request!")
        }
        const loggedInUser  = req.user;
        Object.keys(req.body).forEach((key)=> loggedInUser[key] = req.body[key])
        await loggedInUser.save();
        res.send(`Hey ${loggedInUser.firstName}, your Profile updated successfully!`)
        
    }catch(err){
        res.status(404).send("ERR: " + err.message);
    }
})

module.exports = profileRoute;