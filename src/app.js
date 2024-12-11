const express = require('express');
const app = express();
const {adminAuth, userAuth} = require('./middlewares/adminAuth')

app.use("/admin", adminAuth);
app.get("/admin",(req,res) => {
    res.send("admin access !!!!!!!");
});

app.get("/admin/data",adminAuth, (req,res) => {
    res.send('Admin data sent succesfully!')
})

app.post("/adminLogin",(req,res) => {
    res.send('admin data posted')
})

app.get("/admin/payroll",adminAuth,(req,res) => {
    res.send("Admin payroll sent successfully!")
})

app.listen(5000,() => {
    console.log("server listening from port 5000 successfully!")
})