var argv = require('minimist')(process.argv.slice(2));
var fs = require("fs");
var lib = require('./list.js');

var config = (JSON.parse(fs.readFileSync(argv.config || './config.json', 'utf8')));

if(argv._[0] === 'generate'){
  var csv = fs.readFileSync(argv.input || './input.csv', 'utf8');
  csv = csv.split('\n').slice(0,-2);
  var names = [], map = {},kills={},ids = {};
  for(var i = 0; i < csv.length; i++){
    csv[i] = csv[i].split(','); //split the csv
    
    names.push(csv[i][0]); //add the the name list (for generating the attack list)
    
    map[csv[i][0]] = csv[i].slice(1); //add all data to a dictionary by name
    
    kills[csv[i][2]] = 0; //assign kills for the nickname to 0
    
    j = Math.random()*10000 | 0;  //choose a random id not already taken
    while(ids[j]){
      j = Math.random()*10000 | 0;
    }
    ids[j] = csv[i][0];
  }
  list = lib.generateList(names);
  game = {list:list,kills:kills,people:map,ids:ids};
  
  fs.writeFile(argv.output || config.game || "./game.json", JSON.stringify(game));
}else
{
  var game  = (JSON.parse(fs.readFileSync(argv.output || config.game || "./game.json", 'utf8')));
  
  if(argv._[0] === 'list'){
    for(var assassin in game.list){
      console.log(assassin, "=>", game.list[assassin]);
    }
  }else if(argv._[0] === 'leaderboard'){
    for(var nickname in game.kills){
      console.log(nickname + ":", game.kills[nickname]);
    }
  }else if(argv._[0] === 'assignment'){
    if(argv._[1]){
      console.log(argv._[1] + '\'s target is', game.list[argv._[1]]);
    }else{
      console.log('No id provided; use "list" if you want to see all targets');
    }
  }else if(argv._[0] === 'kill'){
    
  }else{
    console.log('No command Specified');
  }
}
