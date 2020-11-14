const mongoose = require('mongoose')
const { Schema } = mongoose

mongoose.connect('mongodb://localhost/library', { useNewUrlParser: true, useUnifiedTopology: true });

const book_itemSchema = new Schema({
  b_No: {
    type: Number
  },
  b_Type: {
    type: String
  },
  b_Name: {
    type: String
  },
  b_Author: {
    type: String
  },
  b_pulic: {
    type: String
  },
  b_Price: {
    type: Number
  }
})
// const Book_item = mongoose.model('Book_item', book_itemSchema)



module.exports = mongoose.model('Book_item', book_itemSchema)
