const mongoose = require('mongoose')
const { Schema } = mongoose

mongoose.connect('mongodb://localhost/library', { useNewUrlParser: true, useUnifiedTopology: true });

const adminSchema = new Schema({
  a_Type: {
    type: String
  },
  a_Name: {
    type: String
  },
  a_No: {
    type: Number
  },
  a_Password: {
    type: String
  },
  a_limit: {
    type: String
  }
})
// const Admin = mongoose.model('Admin', adminSchema)


module.exports = mongoose.model('Admin', adminSchema)
