const express = require('express');
const app = express();

app.use("/user",

    (req,res,next) => {
        console.log("1st handler request");
        next();
    },
    (req,res,next) => {
        console.log("2nd handler request");
        next()
    },
    (req,res,next) => {
        console.log("3rd req handler");
        next()
    },
    (req,res)=>{
        res.send("Hello from 4th req handler -user");
        console.log("response sent!!!")
    }
)

app.listen(5000,()=>{
    console.log("server listening from port 5000 successfully!")
})

