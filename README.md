# the.types

[![Build Status](https://travis-ci.org/tanerdiler/types.js.svg?branch=master)](https://travis-ci.org/tanerdiler/types.js)
[![Coverage Status](https://coveralls.io/repos/github/tanerdiler/types.js/badge.svg)](https://coveralls.io/github/tanerdiler/types.js)

the.types has Set, Map, Array data structures.  

## What is the goal of this project?

This project allows you to have Map, Set and Array data structures with many functionalities. I had created these types for a project then I started to use them in many projects.

## Installation

```bash
$ npm install --save the.types
```

## Usage


```javascript
var theTypes = require('the.types');


// Map usage

var obj = {
  firstname: 'test_firstname',
  lastname: 'test_lastname'
};

var emptyMap = theTypes.map();
var theMap = theTypes.map(obj);

console.log(theMap.get('firstname'));
console.log(theMap.get('lastname'));

var valuesOfMap = theMap.values();
console.log(valuesOfMap.get(0)); // first value

var keysOfMap = theMap.keys();
console.log(keysOfMap.get(0)); // first key

var map = types.map();
map.put('key1', 'test1');
map.put('key2', 'test2');
theMap.putAll(map);

var map = types.map();
map.put('key1', 'test1');
map.put('key2', 'test2');
map.put('key3', 'test3');
console.log(map.join(":", ",")); //key1:test1,key2:test2,key3:test3

// Set usage

var set = theTypes.set();
set.put("test_1");
set.put("test_1");
set.put("test_2");
console.log(set.size()); // prints 2

var values = set.values();
values.get(0); // returns test_1
values.get(1); // returns test_2

set.frequencyOf("test_1"); // returns 2

// Array usage

var array = theTypes.array();
array.add("test1");
array.add("test2");
array.get(1); // returns test2
array.length(); // returns 2


var array = types.array();
array.add("test_1");
array.add("test_2");
array.add("test_3");
array.add("test_4");

var result = array.filter(function(index, item){
  var no = item.split("_")[1];
  return no%2==0;
});

result.length(); // returns 2


array.frequencies().frequencyOf("test_1"); // returns 1


var array = theType.array();
array.add("test_1");
array.add("stopper");
array.add("test_4");
var resultArray = new types.array();

array.iterate(function(index, item)
  {
    if(item === "stopper")
    {
      return false;
    }

    resultArray.add(item);
});

resultArray.length(); // returns 1
resultArray.get(0); // returns test_1


var intersections = array_1.intersections(array_2);
array_1.contains("test_3");
array_1.containsAny(array_2);
array_1.containsAll(array_2);

```
## Test

This module is well tested. You can run:

- `npm test` to run the tests under Node.js.

![Test results](https://github.com/tanerdiler/types.js/blob/master/test-results.png)

## License

[MIT](LICENSE)

