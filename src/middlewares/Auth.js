const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
  try {
    // Read the token from cookies.
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Please Login!")
    }
    // validate the token
    const validateToken = await jwt.verify(token, "DevTinder@479");
    const { _id } = validateToken;
    // find the user
    const userLoggedIn = await User.findById(_id);
    if (!userLoggedIn) {
      throw new Error("Invalid User/ user not found, please login again");
    }
    req.user = userLoggedIn;
    next();
  } catch (err) {
    res.status(404).send("Something went wrong! " + err);
  }
};

module.exports = {
  userAuth,
};
