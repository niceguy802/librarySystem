const mongoose = require('mongoose')
const { Schema } = mongoose
const moment=require('moment')
 
mongoose.connect('mongodb://localhost/library', { useNewUrlParser: true, useUnifiedTopology: true });

const logSchema = new Schema({
  a_No: {
    type: String
  },
  a_Name: {
    type: String
  },
  u_No: {
    type: String,
    default: '/'
  },
  b_No: { 
    type: String,
    default: '/'
  },
  oper_Content: {
    type: String 
  },
  oper_Time: {
    type: Date,
    get: v => moment(v).format('YYYY-MM-DD HH:mm')
  }
})
// const Log = mongoose.model('Log', logSchema)


module.exports = mongoose.model('Log', logSchema)
