# comparison-object-diff
Depth compares object differences, generates discrepancy results, and allows updates of old objects through this result. The main purpose is to save traffic and achieve part update of data.
深度比较对象差异, 生成差异结果, 并允许通过此结果来对旧对象进行更新, 主要目的是节约流量, 实现数据的局部更新.

## Installation 安装
`npm i --save comparison-object-diff`

## Functions available 可用函数: 
 - [`comparisonObject(objOld, objNew)`](#comparisonobject)
 returns the difference of the last object and new objects. 返回旧对象和新对象之间的差异

 - [`updateObjectFromDiff(objOld, diff)`](#updateobjectfromdiff)
 use difference objects to update old objects. 使用差异对象更新旧对象.
 
 
## Usage 使用:

### `comparisonObject`:
```js
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

console.log(comparisonObject(last, now)); // =>
/*
{
  "change": {
    "D1": {
      "0": {
        "name": "D-N-0",
        "age": -10
      },
      "1": {
        "name": "D-N-1",
        "age": 12
      },
      "2": {
        "name": "D-N-2",
        "age": 13
      }
    }
  },
  "add": {
    "D2": [
      {
        "name": "D-N2-5",
        "age": 2.2
      }
    ]
  },
  "del": {}
}
*/
```

### `updateObjectFromDiff`:
```js
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
updateObjectFromDiff(last, diff);

console.log(last); // =>
/*
{
  "D1": [
    {
      "name": "D-N-0",
      "age": -10
    },
    {
      "name": "D-N-1",
      "age": 12
    },
    {
      "name": "D-N-2",
      "age": 13
    }
  ],
  "D2": [
    {
      "name": "D-N2-5",
      "age": 2.2
    }
  ]
}
*/
```
