var argv = require('minimist')(process.argv.slice(2));
var fs = require("fs");
var lib = require('./list.js');

var config = (JSON.parse(fs.readFileSync(argv.config || './config.json', 'utf8')));


if(argv._[0] === 'generate'){
  var csv = fs.readFileSync(argv.input || './input.csv', 'utf8');
  csv = csv.split('\n').slice(0,-2);
  var names = [], map = {},kills={};
  for(var i = 0; i < csv.length; i++){
    csv[i] = csv[i].split(',');
    names.push(csv[i][0]);
    map[csv[i][0]] = csv[i].slice(1);
    kills[csv[i][2]] = 0;
  }
  list = lib.generateList(names);
  game = {list:list,kills:kills,people:map};
  console.log(game);
}