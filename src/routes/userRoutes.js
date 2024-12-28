const express = require("express");
const userRoute = express.Router();
const { userAuth } = require("../middlewares/Auth");
const connectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");

// GET User requests received
userRoute.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const userLoggedIn = req.user;
    const requestsReceived = await connectionRequestModel
      .find({
        toUserId: userLoggedIn._id,
        status: "intrested",
      })
      .populate("fromUserId", "firstName lastName photoUrl about skills");
    res
      .status(200)
      .json({ message: "data fetched successfully", data: requestsReceived });
  } catch (err) {
    res.status(400).json({ message: "ERR : " + err });
  }
});

// GET User connections
userRoute.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectedUsers = await connectionRequestModel
      .find({
        $or: [
          { fromUserId: loggedInUser._id, status: "accepted" },
          { toUserId: loggedInUser._id, status: "accepted" },
        ],
      })
      .populate("fromUserId", "firstName lastName photoUrl about skills")
      .populate("toUserId", "firstName lastName photoUrl about skills");
    const safeData = connectedUsers.map((user) => {
      if (user.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return user.toUserId;
      } else {
        return user.fromUserId;
      }
    });
    res.json(safeData);
  } catch (err) {
    res.status(400).json({ message: "ERR : " + err });
  }
});

module.exports = userRoute;