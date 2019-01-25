//Import modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose  =require("mongoose");
const cors = require("cors");

// initialize our express app
const app = express();
const route = require("./route/routes");
let port = 5050;

mongoose.connect("mongodb://localhost:27017/cric");

mongoose.connection.on("connected",()=>{
    console.log("Mongoose conneted at port 27017");
});

mongoose.connection.on("error",(error)=>{
    console.log("Error "+error);
});

app.use(cors());
app.use(bodyParser.json());

app.use("/api",route);

/*app.get('/test', function (req, res) {
  res.send('Hello World!');
    const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'cric';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err) {
  //assert.equal(null, err);
  console.log("Connected successfully to server");
  const db = client.db(dbName);
    var callback1;
insertDocuments(db,function() {
    client.close();
  });
  client.close();
});
});*/


const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
//    assert.equal(err, null);
//    assert.equal(3, result.result.n);
//    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}






app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
