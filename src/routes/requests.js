const express = require("express");
const requestRoute = express.Router();
const { userAuth } = require("../middlewares/Auth");

// GET - Connection Request API
requestRoute.get("/getConnectionRequest", userAuth, (req, res) => {
    try {
      const user = req.user;
      res.send(
        user.firstName + " " + user.lastName + " sent the connection request!"
      );
    } catch (err) {
      res.status(404).send("ERR: " + err);
    }
  });

module.exports = requestRoute;