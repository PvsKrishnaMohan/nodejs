const {Schema,model} = require("mongoose");

const userSchema = new Schema({
    firstName : {
        type  : String
    },
    lastName : {
        type : String
    },
    emailId : {
        type : String
    },
    password : {
        type : String
    },
    age : {
        type : Number
    },
    gender : {
        type : String
    }
})

module.exports = model("User", userSchema);



