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
  game = {list:list,kills:kills,map:map,ids:ids};
  
  fs.writeFile(argv.game || config.game || "./game.json", JSON.stringify(game));
}else
{
  var game  = (JSON.parse(fs.readFileSync(argv.game || config.game || "./game.json", 'utf8')));
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
      if(game.ids[argv._[1]]){
        console.log(game.ids[argv._[1]] + '\'s target is', game.list[game.ids[argv._[1]]]);
      }else{
        console.log('Id doesn\'t exist');
      }
    }else{
      console.log('No id provided; use "list" if you want to see all targets');
    }
  }else if(argv._[0] === 'kill'){
    if(argv._[1]){
      if(game.list[argv._[1]]){
        console.log(argv._[1], 'killed', game.list[argv._[1]]+'? (y/n)');
        var done = function(str){
          process.stdin.pause();
          console.log(str[0]);
          if(str[0] === 'y'){
            game.kills[game.map[argv._[1]][1]]++;
            var t = game.list[argv._[1]];
            game.list[argv._[1]] = game.list[game.list[argv._[1]]];
            console.log('Deleting ',t,'=>',game.list[t]);
            delete game.list[t];
            fs.writeFile(argv.game || config.game || "./game.json", JSON.stringify(game));
          }
        };
        
        process.stdin.resume();
        process.stdin.setEncoding('utf8');
        var util = require('util');
        var tmp = '';

        process.stdin.on('data', function (text) { // I should be using the new stdin
          tmp += text;
          if (text[text.length-1] === '\n') {
            done(tmp);
          }
        });
      }else{
        console.log(argv._[1],'is already dead. They couldn\'t kill anybody');
      }
    }else{
      console.log('No assassin name');
    }
  }else{
    console.log('No command Specified');
  }
}