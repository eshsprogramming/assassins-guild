var express = require('express');
var fs = require("fs");
var lib = require('./list.js');

var game = (JSON.parse(fs.readFileSync("./game.json", "utf8")));
var config = (JSON.parse(fs.readFileSync("./config.json", "utf8")));

var app = express();
app.use(require('body-parser').urlencoded());

app.get('/list',function(req,res){
  var out = '';
  for(var name in game.list){
    out += name + ' => ' + game.list[name] + '\n';
  }
  res.send(out.replace(/\n/g,'<br>'));
});
app.get('/leaderboard',function(req,res){
  var out = 'Name: Kills\n';
  for(var name in game.kills){
    out += name + ': ' + game.kills[name] + '\n';
  }
  res.send(out.replace(/\n/g,'<br>'));
});
app.post('/assignment',assignment);
app.get('/assignment',assignment);
app.get('/assignment/:name',assignment);
function assignment(req,res){
  res.send((req.param('name')||"")+
  "<br><form action=\"/assignment\" method=\"post\"><input type=\"text\" name=\"name\"><input type=\"submit\"><form>");
}

app.get('/',function(req,res){
  res.send('homepage');
});
app.listen(3000);