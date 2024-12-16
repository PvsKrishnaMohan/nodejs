const APIURL = 'mongodb+srv://NodeJsDev:MongoDb@devtinder.wvns7.mongodb.net/devTinder';

const mongoose = require('mongoose');

const connectDB = async ()=>{
   await mongoose.connect(APIURL);
} 

module.exports = connectDB;