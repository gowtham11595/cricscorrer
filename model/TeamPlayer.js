const mongoose = require("mongoose");

const TeamPlayerSchema = mongoose.Schema({
  teamName:{
    type:String,
    required: true
  },
   playerName:{
     type:String,
     required: true
   }
});

const TeamPlayer = module.exports = mongoose.model("TeamPlayer", TeamPlayerSchema);
