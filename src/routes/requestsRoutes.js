const express = require("express");
const requestRoute = express.Router();
const { userAuth } = require("../middlewares/Auth");
const connectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");

// POST - Connection Request API
requestRoute.post(
  "/request/send/:status/:userId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const status = req.params.status;
      const toUserId = req.params.userId;
      const FirstName = req.user.firstName;
      const LastName = req.user.lastName;

      // check whether passed status is valid
      const VALIDSTATUS = ["intrested", "ignored"];
      const isValidStatus = VALIDSTATUS.includes(status);
      if (!isValidStatus) {
        return res
          .status(404)
          .json({ message: "Invalid status type : " + status });
      }

      // check whether given toUserId is present in our DB.
      const isValidToUserId = await User.findById(toUserId);
      if (!isValidToUserId) {
        return res.status(404).json({ message: "User not found" });
      }

      // check to block if the user has already sent connection request to other user so that vice versa shouldn't happen
      const isConnectionRequestExists = await connectionRequestModel.findOne({
        $or: [
          { fromUserId: fromUserId, toUserId: toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (isConnectionRequestExists) {
        return res
          .status(404)
          .json({ message: "connection request already exists!" });
      }

      //handling request cannot be sent to the same user (fromUserId !== toUserId) or can be used in pre save method in schema
      // if(String(fromUserId) === String(toUserId)){
      //     return res.status(404).json("you cannot send connection request to you!")
      // }

      // find toUserId
      const toUser = await User.findById(toUserId);
      const toUserFirstName = toUser.firstName;
      const toUserLastName = toUser.lastName;
      const sendConnection = new connectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });

      const data = await sendConnection.save();

      res.json({
        message: `Hello! ${FirstName} ${LastName} you have ${status} on ${toUserFirstName} ${toUserLastName}`,
        data,
      });
    } catch (err) {
      res.status(404).send("ERR: " + err.message);
    }
  }
);

// POST - Review request API
requestRoute.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const ALLOWEDUSERSTATUS = ["accepted", "rejected"];
      const status = req.params.status;
      const requestId = req.params.requestId;

      const isValidUserStatus = ALLOWEDUSERSTATUS.includes(status);

      if (!isValidUserStatus) {
        return res.status(400).json({ message: "Entered Invalid " + status });
      }
      const connectionReq = await connectionRequestModel.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "intrested",
      });

      if (!connectionReq) {
        return res
          .status(400)
          .json({ message: "Invalid request id: " + requestId });
      }
      connectionReq.status = status;
      const statusUpdate = await connectionReq.save();
      res.json({ message: "Connection request " + status, statusUpdate });
    } catch (err) {
      res.status(404).send("ERR: " + err.message);
    }
  }
);

module.exports = requestRoute;
