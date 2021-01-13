const { User } = require("../models/User");
const bycrpt = require('bcrypt');
const jwt = require('jsonwebtoken');

  const register = async(req, res) =>{

      const { email, password} = req.body

      try{
           //check if the user already exists
          let user = await User.findOne({email})
          if(user)
          {
              return  res.status(400).json([{msg:"This user already exist"}])
          }
          user = new User({ email, password})

            //hash the password
          const salt = await bycrpt.genSalt(10);
          user.password = await bycrpt.hash(password, salt)

           res.send({ user})
        //  save the user in DB
         await user.save();

        //   Login the user (Token)
         const payload  = {
              userId: user._id
         }

         const token = "Bearer "+ jwt.sign(payload, process.env.SECRET, {expiresIn: "48h"});

         res.send({
             token,
             user:{
          
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
        //   1- Verify if the user Exists
          let user= await User.findOne({email});
          if(!user){
           return res.status(400).json({msg: "Youps! Bad Credentials! (email)"})
          }    

        //   2- Compare the paswword
           const isMatch = await bycrpt.compare(password, user.password)
           if(!isMatch){
              return res.status(400).json({msg: "Youps! Bad Credentials! (password)"})
           }   
         
     //      3- sign the user
          const payload  = {
              userId: user._id
         }

         const token = "Bearer "+jwt.sign(payload, process.env.SECRET, {expiresIn: "48h"});

         res.send({
             token,
             user:{
          
                 email: user.email,
                 _id: user.id,
                 role: user.role,
                 isAdmin: user.isAdmin,


             },
         }); 
      }
      catch(error){
          console.log(error)
      }
  }

  const authaurisation = (req, res) =>
  {
    res.send({mesg:"get the user authenticated"})
   res.send({user: req.user})
  }
  module.exports = {
      register,
      login, 
      authaurisation
  }


  // module.exports = {
  //   register:  asyncMiddelware(async (req, res) => {
  //     const { email, password, confirmPassword } = req.body;
  //     if (password !== confirmPassword) {
  //       return res
  //         .status(400)
  //         .json(`"invalid" Password and confirm password not equals`);
  //     }
  
  //     const foundUser = await User.findOne({ email });
  //     if (foundUser) {
  //       return res.status(400).json(`"exist" User already registered.`);
  //     }
  
  //     const newUser = new User({
  //       email,
  //       password
  //     });
  
  //     const user = await newUser.save();
  
  //     const token = `Bearer ${user.generateAuthToken()}`;
  
  //     return  res
  //       .header("authorization", token)
  //       .status(200)
  //       .json({ token });
  //   }),
  //   login: asyncMiddelware(async (req, res) => {
  //     const { email, password } = req.body;
  //     let user = await User.findOne({ email });
  //     if (!user)
  //       return res.status(400).json(`"invalid" email or password.`);
  
  //     const isValidPassword = await user.isValidPassword(password);
  //     if (!isValidPassword)
  //       return res.status(400).json(`"invalid" email or password.`);
  
  //     const token = `Bearer ${user.generateAuthToken()}`;
  //     res
  //       .header("authorization", token)
  //       .status(200)
  //       .json({ token });
  //   }),
  //   secret: async (req, res) => {
  //     res.status(200).json({ message: "secret page!!" });
  //   }
  // };