const express = require('express');
const app = express();
const connectDB = require('./config/database');
const User = require('./models/user');
const {validateRequestData} = require('./utils/validations');
const bcrypt = require('bcrypt');

app.use(express.json())

// post data signup API
app.post("/signup",async(req,res) => {
    try {
        validateRequestData(req);
        const {firstName, lastName, emailId, password} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        const UserData = new User({
            firstName,
            lastName,
            emailId,
            password:hashedPassword
        });
        await UserData.save();
        res.send('user Data posted Successfully!')
    } catch(err){
        res.status(400).send("something went wrong in saving the Data! " + err)
    } 
})

// Login API
app.post("/login",async (req,res)=>{
    try {
        const {emailId, password} = req.body;
        const isValidEmail = await User.findOne({emailId : emailId});
        if(!isValidEmail){
            throw new Error("Invalid credentials!");
        }
        const isValidPassword = await bcrypt.compare(password, isValidEmail.password)
        if(isValidPassword){
            res.send("Login Successfull!")
        }else {
            throw new Error("Invalid credentials!")
        }

    } catch(err){
        res.status(400).send("ERR : "+ err.message)
    }
})

// get data of the user using filter (eg: filtering by emailId)

app.get("/getuser", async (req,res) => {
    try {
        const filteredData = await User.find({emailId : req.body.emailId })
        if (filteredData.length === 0 ){
            res.status(404).send("User not found!")
        }else{
            res.send(filteredData)
        }
    }catch(err){
        res.status(400).send("something went wrong in retriving the Data! " +err);
    }
})

// user feed API
app.get("/feed", async(req,res) => {
    const respFeed = await User.find({});
    if(respFeed.length ===0 ){
        res.status(400).send("No data has been found!");
    }else{
        res.send(respFeed);
    }
})

app.delete("/deleteUser", async(req,res)=>{
    const deletedUserId = req.body.UserId
    //const deletedUserId = req.body._id;
    try{
        await User.findByIdAndDelete({_id : deletedUserId})
        res.send("user has successfully deleted!")       
    }catch(err){
        res.status(400).send("something went wrong in deleting the Data! " + err);
    }
})

//update API
app.patch("/updateUser/:UserId",async(req,res)=>{
    const userTobeUpdated = req.params.UserId;
    const reqBody = req.body;
    // console.log(reqBody)
    try{
        const ALLOWEDDATAFIELDS = ["firstName","lastName","password","age","photoUrl","about","skills"];
        const isUpdateAllowed = Object.keys(reqBody).every((key)=> ALLOWEDDATAFIELDS.includes(key));
        if(!isUpdateAllowed){
            throw new Error("cannot update the field")
        }
        if(reqBody?.skills > 0) {
            throw new Error("Max skills allowed to enter is 10")
        }
        const updatedUser = await User.findByIdAndUpdate( userTobeUpdated,reqBody,{
            returnDocument:'after',
            runValidators:true});
        res.send("user has been updated successfully!")
    }catch(err){
        console.error(err); // Log the error for debugging
        res.status(500).send("Something went wrong in updating the data! " + err.message)
    }
})
connectDB().then(() => {
    console.log('Connected to MongoDB..')
    app.listen(5000,() => {
        console.log("server listening from port 5000 successfully!")
    })
}).catch((err) => {
    console.error("Error in connecting DB... " + err)
})