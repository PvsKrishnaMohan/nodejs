const {Schema,model} = require("mongoose");
const validator = require("validator")

const userSchema = new Schema({
    firstName : {
        type  : String,
        required : true,
        minLength: 3,
        maxLength : 50,
        trim : true
    },
    lastName : {
        type : String,
    },
    emailId : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid Email Address...")
            }
        }
    },
    password : {
        type : String,
        required : true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a strong password!...")
            }
        }
    },
    age : {
        type : Number,
        min: 18
    },
    gender : {
        type : String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("entered gender is not valid..")
            }
        }
    },
    photoUrl : {
        type : String,
        default : "https://tse4.mm.bing.net/th?id=OIP.w-l6olXGBKESPlVMwS7v3AHaHa&pid=Api&P=0&h=180",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Enter a strong password!...")
            }
        }
    },
    about : {
        type : String,
        default : "This is a default about text content"
    },
    skills : {
        type : [String]
    }
},{
    timestamps : true
})

module.exports = model("User", userSchema);




