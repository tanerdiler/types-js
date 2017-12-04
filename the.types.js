'use strict';

var _ = require('absent');

var TheMap = function (object) {

    var self = this;

    if (_.isNull(object)) {
        object = {};
    }

    this.get = function (key) {
        return object[key];
    }

    this.put = function (key, value) {
        object[key] = value;
        return this;
    }

    this.iterate = function (fnc) {
        for (var key in object) {
            if (!object.hasOwnProperty(key)) {
                continue;
            }
            var cont = fnc(key, object[key]);
            if (cont === true) {
                continue;
            }
            else if (cont === false) {
                break;
            }
        }
    }

    this.size = function () {
        var size = 0;
        this.iterate(function (key, value) {
            size++;
        });
        return size;
    }

    this.keys = function () {
        var array = new TheArray();
        this.iterate(function (key, value) {
            array.add(key);
        });
        return array;
    }

    this.values = function () {
        var array = new TheArray();
        this.iterate(function (key, value) {
            array.add(value);
        });
        return array;
    }

    this.putAll = function (theMap) {
        theMap.iterate(function (key, value) {
            self.put(key, value);
        });
        return this;
    }

    this.join = function (keyValueDelimiter, pairDelimiter) {
        var queryParams = '';
        var separator = '';
        this.iterate(function (key, value) {
            queryParams += separator + key + keyValueDelimiter + value ;
            separator = pairDelimiter;
        });
        return queryParams;
    }
}

var TheSet = function () {

    var map = new TheMap();

    this.size = function () {
        return map.size();
    }

    this.put = function (item) {
        if (_.isNull(map.get(item))) {
            map.put(item, 1);
        } else {
            map.put(item, map.get(item) + 1);
        }
        return this;
    }

    this.frequencyOf = function (item) {
        return map.get(item);
    }

    this.values = function () {
        return map.keys();
    }
}

var TheArray = function (native_array) {
    var self = this;

    if (_.isNull(native_array)) {
        native_array = [];
    }

    this.get = function (index) {
        return native_array[index];
    }

    this.add = function (item) {
        native_array.push(item);
    }

    this.length = function () {
        return native_array.length;
    }

    this.iterate = function (fnc) {
        for (var index = 0; index < native_array.length; index++) {
            var cont = fnc(index, native_array[index]);

            if (_.isNull(cont) || cont === true) {
                continue;
            }
            else if (cont === false) {
                break;
            }
        }
    }

    this.frequencies = function () {
        var frequencies = new TheSet();
        this.iterate(function (index, item) {
            frequencies.put(item);
        });
        return frequencies;
    }

    this.filter = function (fnc) {
        var result = new TheArray();
        this.iterate(function (index, item) {
            if (fnc(index, item)) {
                result.add(item);
            }
        });
        return result;
    }

    this.intersections = function (theArray) {
        var intersections = new TheSet();
        this.iterate(function (index, item) {
            if (theArray.contains(item)) {
                intersections.put(item);
            }
        });
        return intersections;
    }

    this.contains = function (targetItem) {
        var found = false;
        this.iterate(function (index, item) {
            if (item === targetItem) {
                found = true;
                return false;
            }
        });
        return found;
    }

    this.containsAny = function (theArray) {
        var found = false;
        theArray.iterate(function (index, item) {
            if (self.contains(item)) {
                found = true;
                return false; // not iterate anymore
            }
        });
        return found;
    }

    this.containsAll = function (theArray) {
        var found = true;
        theArray.iterate(function (index, item) {
            if (_.not(self.contains(item))) {
                found = false;
            }
        });
        return found;
    }

	this.join = function (delimiter) {
        var joinedStr = '';
        var separator = '';
        this.iterate(function (index, value) {
            joinedStr += separator + value ;
            separator = delimiter;
        });
        return joinedStr;
    }
}

module.exports = {

    map: function(map){
        if (_.isNull(map)) {
            return new TheMap({});
        }
        else {
            return new TheMap(map);
        }
    },
    set: function()
    {
        return new TheSet();
    },
    array: function(native_array)
    {
        return new TheArray(native_array);
    }
}
