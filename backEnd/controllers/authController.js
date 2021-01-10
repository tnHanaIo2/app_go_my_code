const User = require ('../models/User');
const bycrpt = require ('bcrypt');
const jwt = require ('jsonwebtoken');


const register = async(req, res) =>{

    const {name, lastName, email, password} = req.body

    try{
        //check if the user already exists
        let user = await User.findOne({email})
        if(user)
        {
            return  res.status(400).json([{msg:"This user already exist"}])
        }
        user = new User({name, lastName, email, password})

        // hash the password
        const salt = await bycrpt.genSalt(10);
        user.password = await bycrpt.hash(password, salt)

       // res.send({ user})
       //save the user in DB
       await user.save();

       // Login the user (Token)
       const payload  = {
            userId: user._id
       }

       const token = "Bearer "+ jwt.sign(payload, process.env.SECRET, {expiresIn: "48h"});

       res.send({
           token,
           user:{
               name: user.name,
               lastName: user.lastName,
               email: user.email,
               _id: user.id,
           },
       }); 
    }
    catch (error) {

        console.log(error)

    }

}
 
const login = async (req,res) => {

    const {email, password} = req.body
      
    try{
        //1- Verify if the user Exists
        let user= await User.findOne({email});
        if(!user){
         return res.status(400).json({msg: "Youps! Bad Credentials! (email)"})
        }    

        //2- Compare the paswword
         const isMatch = await bycrpt.compare(password, user.password)
         if(!isMatch){
            return res.status(400).json({msg: "Youps! Bad Credentials! (password)"})
         }   
         
        //3- sign the user
        const payload  = {
            userId: user._id
       }

       const token = "Bearer "+jwt.sign(payload, process.env.SECRET, {expiresIn: "48h"});

       res.send({
           token,
           user:{
               name: user.name,
               lastName: user.lastName,
               email: user.email,
               _id: user.id,
           },
       }); 
    }
    catch(error){
        console.log(error)
    }
}

const authaurisation = (req, res) =>
{
 //res.send({mesg:"get the user authenticated"})
 res.send({user: req.user})
}
module.exports = {
    register,
    login, 
    authaurisation
}