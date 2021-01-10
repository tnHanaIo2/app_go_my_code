const mongoose = require("mongoose");
require ("dotenv").config({ path: "./config/.env"});

const connectDB = async() => {
    const opt ={useNewUrlParser:true,useUnifiedTopology: true, dbName: "lub"}
    try{
       await mongoose.connect(process.env.MONGO_URL, opt);
       console.log("Database is connected");
    }  
    catch (error){
        console.log(error)         
    }
}

module.exports = connectDB;

// mongoose
// .connect(process.env.MONGO_URL, opt)
// .then(() => console.log("Database is connected"))
// .catch((err) => console.log(err))