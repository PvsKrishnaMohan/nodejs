const express = require("express");
const requestRoute = express.Router();
const { userAuth } = require("../middlewares/Auth");
const connectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user")

// GET - Connection Request API
requestRoute.post(
  "/request/send/:status/:userId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const status = req.params.status;
      const toUserId = req.params.userId;

      // check whether passed status is valid
      const VALIDSTATUS = ["intrested", "ignored"];
      const isValidStatus = VALIDSTATUS.includes(status);
      if (!isValidStatus) {
        return res.status(404).json({ message: "Invalid status type : " + status });
      }
      const sendConnection = new connectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });

      // check whether given toUserId is present in our DB.
      const isValidToUserId = await User.findById(toUserId);
      if (!isValidToUserId) {
        return res.status(404).json({message : "User not found"});
      }

      // check to block if the user has already sent connection request to other user so that vice versa shouldn't happen
      const isConnectionRequestExists = await connectionRequestModel.findOne({
        $or : [
                {fromUserId: fromUserId, toUserId: toUserId},
                {fromUserId: toUserId, toUserId: fromUserId}
              ]
      })
      if(isConnectionRequestExists){
        return res.status(404).json({message : "connection request already exists!"})
      }

      //handling request cannot be sent to the same user (fromUserId !== toUserId) or can be used in pre save method in schema
      // if(String(fromUserId) === String(toUserId)){
      //     return res.status(404).json("you cannot send connection request to you!")
      // }

      const data = await sendConnection.save();

      res.json({
        message: "Your friend request connection has been sent successfully",
        data,
      });
    } catch (err) {
      res.status(404).send("ERR: " + err.message);
    }
  }
);

module.exports = requestRoute;