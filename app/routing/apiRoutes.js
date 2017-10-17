
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    port: 8080,
    user: "spencercharest",
    password: "FuggitLexiconBayblades2",
    database: "friendFinder"
});

module.exports = function(app){

  app.get('/api/friends', function (req, res) {
    connection.query('SELECT * FROM friends', function(err, response){
      if(err) throw err;
      res.send(response);
    });
  });

  app.post('/api/friends', function (req, res) {
    var friend = req.body;
    newFriendScoreArr = [];
    newFriendScoreArr.push(
      friend.question1,
      friend.question2,
      friend.question3,
      friend.question4,
      friend.question5,
      friend.question6,
      friend.question7,
      friend.question8,
      friend.question9,
      friend.question10
    );
    var newFriendScore = 0
    for (var i = 0; i < newFriendScoreArr.length; i++) {
      newFriendScore += parseInt(newFriendScoreArr[i]);
    }

    connection.query('SELECT *  FROM friends',
      function(err, response){
        if(err) throw err;
        var friendLikelihood = 500;
        var match;
        for (var i = 0; i < response.length; i++) {
          friendScoreArr = [];
          friendScore = 0;
          friendScoreArr.push(
            response[i].question1,
            response[i].question2,
            response[i].question3,
            response[i].question4,
            response[i].question5,
            response[i].question6,
            response[i].question7,
            response[i].question8,
            response[i].question9,
            response[i].question10
          );
          var friendScore = 0;
          for (var j = 0; j < friendScoreArr.length; j++) {
            friendScore += parseInt(friendScoreArr[j]);
          }
          var compatibility = newFriendScore - friendScore;
          compatibility = Math.abs(compatibility);
          if (similarity < friendLikelihood) {
            friendLikelihood = compatibility;
            match = response[i];
          }
        }
        res.send(match);
        connection.query('INSERT INTO friends SET ?', friend,
          function(err){
            if(err) throw err;
        });
      });
  });
};