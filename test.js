var cod = require('./index');

var last = { D1: [
    { name: 'D-N-1', age: 12 },
    { name: 'D-N-2', age: 13 },
    { name: 'D-N-3', age: 14 }
  ] };
var now = {
  D1: [
    { name: 'D-N-0', age: -10 },
    { name: 'D-N-1', age: 12 },
    { name: 'D-N-2', age: 13 }
  ],
  D2:[
    { name: 'D-N2-5', age: 2.2 }
  ]};

var diff = cod.comparisonObject(last, now);

console.log(JSON.stringify(diff, null, 2));
cod.updateObjectFromDiff(last, diff);
console.log(JSON.stringify(last, null, 2));
