const express = require('express');
const app = express();
const connectDB = require('./config/database');
const User = require('./models/user');

app.use(express.json())

// post data signup API
app.post("/signup",async(req,res) => {
    // console.log(req.body)
    const UserObj = new User(req.body);
    const UserData = new User(UserObj);

    try {
        await UserData.save();
        res.send('user Data posted Successfully!')
    } catch(err){
        res.status(400).send("something went wrong in saving the Data!")
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
        res.status(400).send("something went wrong in retriving the Data!");
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
        res.status(400).send("something went wrong in deleting the Data!");
    }
})

//update API
app.patch("/updateUser",async(req,res)=>{
    const userTobeUpdated = req.body.UserId;
    const reqBody = req.body;
    console.log(reqBody)
    try{
        const updatedUser = await User.findByIdAndUpdate( userTobeUpdated,reqBody);
        res.send("user has been updated successfully!")
    }catch(err){
        console.error(err); // Log the error for debugging
        res.status(500).send("Something went wrong in updating the data!")
    }
})
connectDB().then(() => {
    console.log('Connected to MongoDB..')
    app.listen(5000,() => {
        console.log("server listening from port 5000 successfully!")
    })
}).catch((err) => {
    console.error("Error in connecting DB...")
})