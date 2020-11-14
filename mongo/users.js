const mongoose = require('mongoose')
const { Schema } = mongoose

mongoose.connect('mongodb://localhost/library', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new Schema({
  u_Type: {
    type: String
  },
  u_Name: {
    type: String
  },
  u_No: {
    type: Number,
    unique: true
  },
  u_Password: {
    type: String
  },
  b_limit: {
    type: Number
    // ??????????
  },
  b_Massage: {
    type: Array
  }
})
// const User = mongoose.model('User', userSchema)

module.exports = mongoose.model('User', userSchema)