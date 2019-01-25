const mongoose = require("mongoose");


const MatchDetailsSchema = mongoose.Schema({
 matchName:{
    type:String,
    required: true
  },
teamAPlayers:{
  type:Array,
},
teamABatting:{
  type:Array,
  required: true
},
teamABowling:{
  type:Array,
  required: true
},
teamABowlingWickets:{
  type:String //team name who won or draw
},
teamBPlayers:{
type:Array,
},
teamBBatting:{
  type:Array,
  required: true
},
teamBBowling:{
  type:Array,
  required: true
},
teamBBowlingWickets:{
  type:String //team name who won or draw
}
});

const MatchDetails = module.exports = mongoose.model("MatchDetails", MatchDetailsSchema);
