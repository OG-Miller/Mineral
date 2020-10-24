const mongoose = require("mongoose");
const Schema = mongoose.Schema;
  

const MineSchema = new Schema({
  title: String,
  body: Object,
  bookmarkLink: String,
  author: String,
  date:{
    type: Date, default: Date.now
  }
}, {
  timestamps:true

});

module.exports = Mine = mongoose.model("Mine", MineSchema);