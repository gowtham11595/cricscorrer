const express = require("express");
const router = express.Router();
const multer = require("multer");
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded())
app.use(bodyParser.urlencoded({
  extended: true
}));
var Schema = mongoose.Schema;
var fs = require('fs');

const Player = require("../model/Player");
const Team = require("../model/Team");
const TeamPlayer = require("../model/TeamPlayer");
const Match = require("../model/Match");
const MatchDetails = require("../model/MatchDetails");

/*creation of player*/
router.post("/player",(req,res,next)=>{

  var data =  req.body.image;
  const split = data.split(','); // or whatever is appropriate here. this will work for the example given
  const base64string = split[1];
  const buffer = Buffer.from(base64string, 'base64');
  console.log("Total matches="+req.body.tm);

  var player = new Player({
    fullName:req.body.fullName,
    placeOfBirth:req.body.placeOfBirth,
    dOB:req.body.dOB,
    playingRole:req.body.playingRole,
    battingStyle:req.body.battingStyle,
    bowlingStyle:req.body.bowlingStyle,
    image: req.body.image,
    team:req.body.team,
    active:true,
    totalMatches:req.body.tm,
    totalRuns:req.body.tr,
    totalWickets:req.body.tw
  });

  player.save((err,play)=>{
    if(err){
      res.json(err);
    } else{
        res.json({msg:"Player created"});
    }

  });
});

router.get('/player/:playerName', function(request, response, next) {
  var playerName   = request.params.playerName;
  console.log("Username="+playerName);

  Player.find({fullName:playerName})
   .then((doc)=>{
      console.log(doc);
      response.status(200).send(doc);
   })
  .catch((err)=>{
      console.log(err);
      return response.status(500).send(err);
  });
});

/*For creation of team*/
router.post("/team",(req,res,next)=>{
  console.log("body="+JSON.stringify(req.body));

  var data =  req.body.image;
  console.log("constdata="+data+"--");
  const split = data.split(','); // or whatever is appropriate here. this will work for the example given
  const base64string = split[1];
  const buffer = Buffer.from(base64string, 'base64');

  var team = new Team({
    teamName:req.body.teamName,
    t20Ranking:req.body.t20Ranking,
    odiRanking:req.body.odiRanking,
    testRanking:req.body.testRanking,
    image: req.body.image
  });

  console.log("team = "+JSON.stringify(team));
  team.save((err,play)=>{
    if(err){
      res.json(err);
    } else{
        res.json({msg:"Team created"});
    }

  });
});

/*Get team*/
router.get('/team/:teamName', function(request, response, next) {
  var teamName   = request.params.teamName;
  console.log("Username="+teamName);

  Team.find({teamName:teamName})
   .then((doc)=>{
      console.log(doc);
      response.status(200).send(doc);
   })
  .catch((err)=>{
      console.log(err);
      return response.status(500).send(err);
  });
});

/****** For Team Player*****/

router.post("/teamPlayer",(req,res,next)=>{
  console.log("body="+JSON.stringify(req.body));

  var teamPlayer = new TeamPlayer({
    teamName:req.body.teamName,
    playerName:req.body.playerName
  });

  console.log("team = "+JSON.stringify(teamPlayer));
  teamPlayer.save((err,play)=>{
    if(err){
      res.json(err);
    } else{
        res.json({msg:"Team Player created"});
    }

  });
});

/*Get team*/
router.get('/teamPlayer/:teamName', function(request, response, next) {
  var teamName   = request.params.teamName;
  console.log("Username="+teamName);

  TeamPlayer.find({teamName:teamName})
   .then((doc)=>{
      console.log(doc);
      response.status(200).send(doc);
   })
  .catch((err)=>{
      console.log(err);
      return response.status(500).send(err);
  });
});

/*Get All teams*/
router.get('/getTeams', function(request, response, next) {
  Team.find({})
   .then((doc)=>{
      console.log(doc);
      response.status(200).send(doc);
   })
  .catch((err)=>{
      console.log(err);
      return response.status(500).send(err);
  });
});

router.get('/getTeamDetails/:teamName', function(request, response, next) {
    var teamName   = request.params.teamName;
    console.log("Team Name = "+teamName);
    var players = [];
    var returnJson = {};
  Player.find({team:teamName})
   .then((docs)=>{

      docs.forEach(function(doc) {
        players.push(doc.fullName);
      });
      returnJson.players = players;
      return Team.find({
        teamName:teamName
   }).then(notifications => {
     notifications.players = players;
     returnJson.team = notifications;
     console.log("team="+returnJson);
     response.json({success: true, returnJson});
   });

returnJson.players = players;
      Team.find({teamName:teamName},
        function(error,doc){
             returnJson.teamName = doc.teamName;
             returnJson.t20Ranking = doc.t20Ranking;
             returnJson.odiRanking = doc.odiRanking;
             returnJson.testRanking = doc.testRanking;
             returnJson.image = doc.image;
             doc.players = players;
             //console.log("Team name= "+doc.teamName);
          response.json(doc);
        }

      )
   })
  .catch((err)=>{
      console.log(err);
      return response.status(500).send(err);
  });
});


router.post("/match",(req,res,next)=>{
  console.log("body="+JSON.stringify(req.body));
var matchName =req.body.teamA+ req.body.teamB+req.body.date;
  var match = new Match({
    teamA:req.body.teamA,
    teamB:req.body.teamB,
    result:req.body.result,
    toss:req.body.toss,
    date:req.body.date,
    matchName:matchName
  });

  console.log("Match = "+JSON.stringify(match));
  match.save((err,play)=>{
    if(err){
      res.json(err);
    } else{
        res.json({msg:"Match created"});
    }
  });
});

/*Get matches*/
router.get('/matches', function(request, response, next) {

  Match.find({})
   .then((doc)=>{
      console.log(doc);
      response.status(200).send(doc);
   })
  .catch((err)=>{
      console.log(err);
      return response.status(500).send(err);
  });
});


/*Get match Details*/
router.get('/matchDetails/:matchName', function(request, response, next) {
  var matchName   = request.params.matchName;
  console.log("Match Name = "+matchName);
  MatchDetails.find({matchName:matchName})
   .then((doc)=>{
      console.log(doc);
      response.status(200).send(doc);
   })
  .catch((err)=>{
      console.log(err);
      return response.status(500).send(err);
  });
});

router.post("/matchDetails",(req,res,next)=>{
  console.log("body="+JSON.stringify(req.body));

  var matchDetails = new MatchDetails({
    matchName:req.body.matchName,
    teamABatting:req.body.teamABatting,
    teamABowling:req.body.teamABowling,
    teamABowlingWickets:req.body.teamABowlingWickets,
    teamBPlayers:req.body.teamBPlayers,
    teamBBatting:req.body.teamBBowling,
    teamBBowlingWickets:req.body.teamBBowlingWickets
  });

  console.log("Match = "+JSON.stringify(matchDetails));
  matchDetails.save((err,play)=>{
    if(err){
      res.json(err);
    } else{
        res.json({msg:"Match Details created"});
    }

  });
});


module.exports=router;
