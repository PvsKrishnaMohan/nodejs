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

const validateChangePasswordProfileData = (req) => {
    const ALLOWEDDATAFIELDS = ["password"];
    const { password } = req;
    const isAllowedDataField = Object.keys(req).every((key) =>
        ALLOWEDDATAFIELDS.includes(key)
    );
    console.log(isAllowedDataField,'pp')
    if(!isAllowedDataField){
        throw new Error("cannot change the password");
    }
    if(!validator.isStrongPassword(password)){
        throw new Error("Entered password is not strong!");
    }

    return isAllowedDataField;
}
module.exports = {
    validateRequestData,
    validateEditProfileData,
    validateChangePasswordProfileData
}