const mongoose = require('mongoose');
const Joi = require('joi')
// const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
 email: {
  type: String,
  required: true
 
 },
 password: {
  type: String,
  required: true,
    min:5
 },
 role: {
  type: String,
  default: 'user',
  enum: ["user", "admin"]
 },
 accessToken: {
  type: String
 }
},
{ timestamps: true }
);

const User = mongoose.model('User', UserSchema);

function validateUser(user){
    const schema = Joi.object({
        name: Joi.string().required(),
        email:Joi.string().required(),
        password:Joi.string().min(5).required(),
        role:Joi.string().valid("user","admin")

    })
    return schema.validate(user)
}

function validateUpdateUser(user){
    const schema = Joi.object({
        name: Joi.string(),
        email:Joi.string(),
        role:Joi.string().valid("user","admin")

    })
    return schema.validate(user)
}


exports.User = User;
exports.validate = validateUser;
exports.validateUpdateUser =validateUpdateUser
