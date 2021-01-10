const express = require ("express");

const app = express ();
//Middelware
app.use(express.json())


const connectDB = require('./config/connectDB');
const logger = require("./middelwares/logger");
app.use("/api/auth", logger)
const passport = require("passport");
app.use(passport.initialize());

//Cnx the DB
connectDB();

const authRouter= require('./routes/authRouter')

app.use("/api/auth", authRouter);

const PORT= 4000 || process.env.PORT

app.listen(PORT, (err) => err ? console.error(err) 
                              : console.log(`My app listening at http://localhost:${PORT}`))