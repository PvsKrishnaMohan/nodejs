const express = require("express");
const userRoute = express.Router();
const { userAuth } = require("../middlewares/Auth");
const connectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");
const USERSAFE_DATA = "firstName lastName photoUrl about skills";
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
      .populate("fromUserId", USERSAFE_DATA)
      .populate("toUserId", USERSAFE_DATA);
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

// GET user FEED
// user should see all users except
// 1. his own profile
// 2. user he sent connection request
// 3. user which he ignored
// 4. already connected user
// 5. other user ignored this user.

userRoute.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page -1 ) * limit;

    // find all connection requests (sent + received)
    const connectionRequests = await connectionRequestModel
      .find({
        $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
      })
      .select("fromUserId toUserId");

    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    }).select(USERSAFE_DATA).skip(skip).limit(limit);

    res.send(users);
  } catch (err) {
    res.status(400).json({ message: "ERR : " + err });
  }
});

module.exports = userRoute;
