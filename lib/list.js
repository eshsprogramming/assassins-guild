/*
Map each element to a random other element
(in a circular topology)
*/
exports.generateList = function(arr){
  var out = {};
  var j = Math.floor(Math.random()*arr.length);
  var first, t = arr[j];
  first = t;
  arr.splice(j,1);
  while(arr.length){
    j = Math.floor(Math.random()*arr.length);
    out[t] = arr[j];
    t = arr[j];
    arr.splice(j,1);
  }
  out[t] = first;
  return out;
};