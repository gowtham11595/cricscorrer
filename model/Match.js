const mongoose = require("mongoose");


const MatchSchema = mongoose.Schema({
  teamA:{
    type:String,
    required: true
  },
teamB:{
  type:String,
  required: true
},
status:{
  type: String
},
result:{
  type:String //team name who won or draw
},
toss:{
  type:String //teamName
},
date:{
  type:Date
},
matchName:{
  type:String
}
});

const Match = module.exports = mongoose.model("Match", MatchSchema);
