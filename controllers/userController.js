const {User, validate, validateUpdateUser} = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const omit = require("lodash/omit");

require("dotenv").config();
// const { roles } = require('../roles')



exports.createUser = async (req,res)=>{
    console.log(req.body)
    const { error, value:userReq } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    const {email,password} = userReq

    let user = await User.findOne({email});
    if(user) return res.status(400).send("Email already registered")

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    const newUser = new User({
        ...userReq,
        password:hashedPassword
    })

    // const accessToken = jwt.sign({userId:newUser._id}, process.env.JWT_SECRET)
    // newUser.accessToken = accessToken;
    await newUser.save();
    res.status(200).send(newUser)
}

exports.login = async (req, res) => {
    console.log(req.body);

    const { email, password } = req.body;
  
   
  
    let user = await User.findOne({ email });
    if (!user) return res.status(400).send("Invalid email or password");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send("Invalid email or password");

    const accessToken = jwt.sign({userId:user._id, role:user.role}, process.env.JWT_SECRET,{expiresIn: "1d"})

    user = {
        ...omit(user.toJSON(), ["password", "__v"]),
        accessToken,
      };
    
   
    res.send(user)
  };


  exports.getAllUsers = async (req, res) => {
    const users = await User.find();
    res.send(users);
   

  };
  
  exports.getUserById = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(400).send("User with given ID not found");
  
    res.send(user);
  };

  exports.updateUser = async (req, res) => {
    const { error, value: updateReq } = validateUpdateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    console.log(updateReq, "updatereq");
  
    const user = await User.findById(req.params.id);
    if (!user) return res.status(400).send("User with given id not found");
  
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { ...updateReq },
      { new: true }
    );
  
    res.send(updatedUser);
  };
  
  exports.deleteUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(400).send("User with given ID not found");
  
    const deletedUser = await User.findByIdAndRemove(req.params.id);
    res.send({
        message:"Successfully deleted",
        data:deletedUser
    });
  };

