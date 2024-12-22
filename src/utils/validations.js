const validator = require("validator")

const validateRequestData = (req) => {
    const {firstName, lastName, emailId, password} = req.body;
    if(!firstName || !lastName){
        throw new Error("Entered Name is not Valid!");
    }else if(!validator.isEmail(emailId)){
        throw new Error("Entered Email is not Valid!");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Entered password is not strong!");
    }
}

const validateEditProfileData = (req) => {
    const ALLOWEDDATAFIELDS = [
        "firstName",
        "lastName",
        "age",
        "photoUrl",
        "about",
        "skills",
        "gender"
      ];
      const isUpdateAllowed = Object.keys(req).every((key) =>
        ALLOWEDDATAFIELDS.includes(key)
      );
      if (!isUpdateAllowed) {
        throw new Error("cannot update the field");
      }
      return isUpdateAllowed
}
module.exports = {
    validateRequestData,
    validateEditProfileData
}