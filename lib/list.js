/*
Map each element to a random other element
(in a circular topology)
*/
function genList(arr){
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
  out.push(t,first);
  return out;
}

function sort(arr){ //sort list
  if(arr.length === 1){
    return arr;
  }
  var a = sort(arr.slice(0,Math.floor(arr.length/2)));
  var b = sort(arr.slice(Math.floor(arr.length/2)));
  return merge(a,b);
}
function merge(arr,arr2){ //merge to sorted lists
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
}

function cmp(a,b){
  return a - b;
}
