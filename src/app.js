const express = require('express');
const app = express();
const connectDB = require('./config/database');
const User = require('./models/user');

app.post("/postUser",async(req,res) => {
    const UserObj = {
        firstName : "Kajallove",
        lastName : "aggarwal",
        emailId : "kajal@gmail.com",
        password : "kajuKajal",
    }

    const UserData = new User(UserObj)
    try {
        await UserData.save();
        res.send('user Data posted Successfully!')
    } catch(err){
        res.status(400).send("something went wrong in saving the Data!")
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