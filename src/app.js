const express = require('express');
const app = express();



app.get("/colou?r",(req,res)=>{
    // console.log(req.query);
    console.log(req.params)
    res.send({"First_name": "krishna","Last_name":"mohan"})
})

app.post("/user",(req,res)=>{
    res.send("successfully sent post req!")
})

app.delete("/user",(req,res)=>{
    res.send("user deleted successfully!")
})

app.put("/user",(req,res)=>{
    res.send("data updated successfully!")
})

app.patch("/user",(req,res)=>{
    res.send("data patched!");
})
app.listen(5000,()=>{
    console.log("server listening from port 5000 successfully!")
})

