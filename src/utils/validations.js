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

module.exports = {
    validateRequestData
}