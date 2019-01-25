const mongoose = require("mongoose");

const TeamSchema = mongoose.Schema({
  teamName:{
    type:String,
    required: true
  },
   t20Ranking:{
     type:Number,
     required: true
   },
  odiRanking:{
    type:Number,
    required: true
  },
  testRanking:{
    type:Number,
    required: true //Top-order batsman
  },
  image:{
  type:String
  }
});

const Team = module.exports = mongoose.model("Team", TeamSchema);
