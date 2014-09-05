/*
Map each element to a random other element
(in a circular topology)
*/
exports.generateList = function(arr){
  var out = [];
  var j = Math.floor(Math.random()*arr.length);
  var first, t = arr[j];
  first = t;
  arr.splice(j,1);
  while(arr.length){
    j = Math.floor(Math.random()*arr.length);
    out.push([t,arr[j]]);
    t = arr[j];
    arr.splice(j,1);
  }
  out.push([t,first]);
  return out;
};

exports.list2str = function(arr){
  var out = '';
  for(var i = 0; i < arr.length; i++){
    out += arr[i][0] + ',' + arr[i][1] + '\n';
  }
  return out;
};

exports.sort = function(arr){ //sort list
  if(arr.length === 1){
    return arr;
  }
  var a = exports.sort(arr.slice(0,Math.floor(arr.length/2)));
  var b = exports.sort(arr.slice(Math.floor(arr.length/2)));
  return exports.merge(a,b);
};

exports.merge = function(arr,arr2){ //merge to sorted lists
  var out = [];
  while(arr.length && arr2.length){
    if(cmp(arr[0],arr2[0]) < 0){
      out.push(arr.shift());
    }else{
      out.push(arr2.shift());
    }
  }
  var temp;
  if(arr.length){
    temp = arr;
  }else{
    temp = arr2;
  }
  while(temp.length){
    out.push(temp.shift());
  }
  return out;
};

function cmp(a,b){
  return (a[0] < b[0])?-1:(a[0] === b[0])?0:1;
}
