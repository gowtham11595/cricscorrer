const mongoose = require("mongoose");


const PlayerSchema = mongoose.Schema({
  fullName:{
    type:String,
    required: true
  },
placeOfBirth:{
  type:String,
  required: true
},
dOB:{
  type: Date,
},
playingRole:{
  type:String,
  required: true //Top-order batsman
},
battingStyle:{
  type:String, //Right-hand bat
  required: true
},
bowlingStyle:{
  type:String, //Right-arm offbreak
  required: true
},
image:{
type:String
},
active:{
  type:Boolean
},
team:{
  type:String,
  required: true
},
totalMatches:{
type:Number
},
totalRuns:{
type:Number
},
totalWickets:{
type:Number
}
});

const Player = module.exports = mongoose.model("Player", PlayerSchema);
