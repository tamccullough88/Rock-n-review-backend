const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre('save', async function(next){
    const user = this;
    if (!user.isModified('password')) return next();
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
 });

 userSchema.methods.isValidPassword = async function(password){
    return await bcrypt.compare(password, this.password);
  };

  const userData = mongoose.model("User", userSchema);
  module.exports = userData;