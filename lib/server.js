var express = require('express');
var fs = require("fs");
var lib = require('./list.js');

var game = (JSON.parse(fs.readFileSync("./game.json", "utf8")));
var config = (JSON.parse(fs.readFileSync("./config.json", "utf8")));

var app = express();
app.get('/list',function(req,res){
  var out = '';
  for(var name in game.list){
    out += name + ' -> ' + game.list[name] + '\n';
  }
  res.send(out.replace(/\n/g,'<br>'));
});
app.get('/leaderboard',function(req,res){
  res.send('leaderboard');
});
app.post('/assignment',function(req,res){
  res.send('assignment');
});
app.get('/assignment',function(req,res){
  res.send('assignment');
});
app.get('/',function(req,res){
  res.send('homepage');
});
app.listen(3000);