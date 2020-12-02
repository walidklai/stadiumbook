const mongoose = require("mongoose");

const StadiumSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email:{
    type:String
  },
  image: {
    type: String,
    default: "defaultStadium.jpg",
  },
  area: {
    length: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    size: {
      type: Number,
    },
  },
  address: {
    governorate: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
  },
  description:{
    type:String
  },
  validated: {
    type: Boolean,
    required: true,
  },
});

module.exports = Stadium = mongoose.model("stadium", StadiumSchema);
