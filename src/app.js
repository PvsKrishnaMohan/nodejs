const express = require('express');
const app = express();



app.use("/about",(req,res)=>{
    res.send("hello, you are in about page")
})

app.use("/contact",(req,res)=>{
    res.send('hello, you are in contact page')
})

app.use("/projects",(req,res)=>{
    res.send('hello, you are in project page')
})
app.use("/", (req,res) =>{
    res.send('hello World! welcome to Home page')
})
app.listen(5000,()=>{
    console.log("server listening from port 5000 successfully!")
})

