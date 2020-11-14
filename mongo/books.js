const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.connect("mongodb://localhost/library", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const bookSchema = new Schema({
  b_Name: {
    type: String,
  },
  b_Author: {
    type: String,
  },
  b_Type: {
    type: String,
  },
  b_pulic: {
    type: String,
  },
  b_Price: {
    type: String,
  },

  b_No: {
    type: Number,
  },
  b_Num: {
    type: Number,
  },
  b_Rest: {
    type: Number,
  },
});
// const Book = mongoose.model('Book', bookSchema)

/*module.exports=mongoose.model('Library',studentsSchema)*/
module.exports = mongoose.model("Book", bookSchema);
