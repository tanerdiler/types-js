var chai        = require('chai');

chai.should();

describe( "map: holds key value pairs and has functions to manage map", function() {

    var types = require('./types');

    it( "size(): should return size as zero if map is empty", function() {
        var ddd = null;g
        types.map().size().should.equal(0);
    });

    it( "size(): should return size as two if map has two key/value pairs", function() {
        var obj = {
            firstname: 'test_firstname',
            lastname: 'test_lastname'
        };
        types.map(obj).size().should.equal(2);
    });

    it( "get(key): should return value mapped to key", function() {
        var obj = {
            firstname: 'test_firstname',
            lastname: 'test_lastname'
        };
        var map = types.map(obj);
        map.get('firstname').should.equal('test_firstname');
        map.get('lastname').should.equal('test_lastname');
    });

    it( "values(): should return list of values", function() {
        var map = types.map();
        map.put('key1', 'val1');
        map.put('key2', 'val2');
        map.put('key3', 'val3');
        map.put('key4', 'val4');
        map.put('key5', 'val5');
        var values = map.values();
        values.get(0).should.equals("val1");
        values.get(1).should.equals("val2");
        values.get(2).should.equals("val3");
        values.get(3).should.equals("val4");
        values.get(4).should.equals("val5");
    });

    it( "keys(): should return list of keys", function() {
        var map = types.map();
        map.put('key1', 'test1');
        map.put('key2', 'test2');
        map.put('key3', 'test3');
        map.put('key4', 'test4');
        map.put('key5', 'test5');
        map.keys().get(0).should.equals("key1");
        map.keys().get(1).should.equals("key2");
        map.keys().get(2).should.equals("key3");
        map.keys().get(3).should.equals("key4");
        map.keys().get(4).should.equals("key5");
    });

    it( "putAll(sourceMap): should add all key/value pairs of sourceMap into target map", function() {
        var map = types.map();
        map.put('key1', 'test1');
        map.put('key2', 'test2');
        map.put('key3', 'test3');
        map.put('key4', 'test4');
        map.put('key5', 'test5');

        var newMap = types.map();
        newMap.put('key0', 'test0');

        newMap.putAll(map);

        newMap.keys().get(1).should.equals("key1");
        newMap.keys().get(2).should.equals("key2");
        newMap.keys().get(3).should.equals("key3");
        newMap.keys().get(4).should.equals("key4");
        newMap.keys().get(5).should.equals("key5");
    });

    it( "putAll(sourceMap): should save current pairs of target map", function() {
        var map = types.map();
        map.put('key1', 'test1');

        var newMap = types.map();
        newMap.put('key0', 'test0');

        newMap.putAll(map);

        newMap.get("key0").should.equals("test0");
        newMap.get("key1").should.equals("test1");
    });

    it( "join(): should join key/value pairs with specified separators", function() {
        var map = types.map();
        map.put('key1', 'test1');
        map.put('key2', 'test2');
        map.put('key3', 'test3');
        map.put('key4', 'test4');
        map.put('key5', 'test5');
        map.join(":", ",").should.equal("key1:test1,key2:test2,key3:test3,key4:test4,key5:test5");
    });
});

describe( "set: a collection that contains no duplicate elements", function() {

    var types = require('./types');

    it( "size(): should return size as zero if set is empty", function() {
        var ddd = null;
        types.set().size().should.equal(0);
    });

    it( "put(item): should add item", function() {
        var set = types.set();
        set.put("test_1");
        set.put("test_2");
        set.size().should.equal(2);
    });

    it( "values(): should return list of items", function() {
        var set = types.set();
        set.put('key1');
        set.put('key2');
        set.put('key3');
        set.put('key4');
        set.put('key5');
        var values = set.values();
        values.get(0).should.equals("key1");
        values.get(1).should.equals("key2");
        values.get(2).should.equals("key3");
        values.get(3).should.equals("key4");
        values.get(4).should.equals("key5");
    });

    it( "frequenctOf(): should return how many times tried adding same item", function() {
        var set = types.set();
        set.put('key1');
        set.put('key2');
        set.put('key3');
        set.put('key4');
        set.put('key5');

        set.put('key1');
        set.put('key2');
        set.put('key3');
        set.put('key4');
        set.put('key5');

        set.put('key1');
        set.put('key3');
        set.put('key5');


        set.frequencyOf("key1").should.equals(3);
        set.frequencyOf("key2").should.equals(2);
        set.frequencyOf("key3").should.equals(3);
        set.frequencyOf("key4").should.equals(2);
        set.frequencyOf("key5").should.equals(3);

    });


});


describe( "array: is a wrapper of native array", function() {

    var types = require('./types');

    it( "add(item): should append item to the end of this array", function() {
        var array = types.array();
        array.add("test1");
        array.add("test2");
        array.get(1).should.equal("test2");
    });

    it( "get(index): should return item at specidied index", function() {
        var array = types.array();
        array.add("test_1");
        array.add("test_2");
        array.add("test_3");
        array.add("test_4");
        array.get(2).should.equal("test_3");
    });

    it( "length(): should return length of array", function() {
        var array = types.array();
        array.add("test_1");
        array.add("test_2");
        array.add("test_3");
        array.add("test_4");
        array.length().should.equal(4);
    });

    it( "filter(fnc): should filter items by running predicate function", function() {
        var array = types.array();

        array.add("test_1");
        array.add("test_2");
        array.add("test_3");
        array.add("test_4");
        var result = array.filter(function(index, item){
            var no = item.split("_")[1];
            return no%2==0;
        });
        result.length().should.equal(2);
    });

    it( "frequenctOf(): should return how many times tried adding same item", function() {
        var array = types.array();
        array.add("test_1");
        array.add("test_2");
        array.add("test_3");
        array.add("test_4");

        array.add("test_1");
        array.add("test_3");
        array.add("test_4");

        array.add("test_1");
        array.add("test_2");
        array.add("test_4");


        array.frequencies().frequencyOf("test_1").should.equals(3);
        array.frequencies().frequencyOf("test_2").should.equals(2);
        array.frequencies().frequencyOf("test_3").should.equals(2);
        array.frequencies().frequencyOf("test_4").should.equals(3);

    });

    it( "iterate(): should stop iterating when false was returned.", function() {
        var array = types.array();
        array.add("test_1");
        array.add("test_2");
        array.add("test_3");
        array.add("test_4");

        array.add("test_1");
        array.add("test_3");
        array.add("test_4");

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

        resultArray.frequencies().frequencyOf("test_1").should.equals(3);
        resultArray.frequencies().frequencyOf("test_2").should.equals(1);
        resultArray.frequencies().frequencyOf("test_3").should.equals(2);
        resultArray.frequencies().frequencyOf("test_4").should.equals(2);
    });

    it( "intersections(array): should find intersections", function() {
        var array_1 = types.array();
        array_1.add("test_1");
        array_1.add("test_2");
        array_1.add("test_3");
        array_1.add("test_4");

        var array_2 = types.array();
        array_2.add("test_1");
        array_2.add("test_3");
        array_2.add("test_6");
        array_2.add("test_8");

        var intersections = array_1.intersections(array_2);

        intersections.size().should.equals(2);
    });

    it( "contains(item): should return when source array has the item specified", function() {
        var array_1 = types.array();
        array_1.add("test_1");
        array_1.add("test_2");
        array_1.add("test_3");
        array_1.add("test_4");


        array_1.contains("test_3").should.equals(true);
    });

    it( "containsAny(array): should return true when source array has any item in target array", function() {
        var array_1 = types.array();
        array_1.add("test_1");
        array_1.add("test_2");
        array_1.add("test_3");
        array_1.add("test_4");

        var array_2 = types.array();
        array_2.add("test_6");
        array_2.add("test_7");
        array_2.add("test_3");
        array_2.add("test_8");

        array_1.containsAny(array_2).should.equals(true);
    });

    it( "containsAll(array): should return true when source array has all items in target array", function() {
        var array_1 = types.array();
        array_1.add("test_1");
        array_1.add("test_2");
        array_1.add("test_3");
        array_1.add("test_4");

        var array_2 = types.array();
        array_2.add("test_1");
        array_2.add("test_3");

        array_1.containsAll(array_2).should.equals(true);
    });

    it( "containsAll(array): should return false when source array hasn't a item in target array", function() {
        var array_1 = types.array();
        array_1.add("test_1");
        array_1.add("test_2");
        array_1.add("test_3");
        array_1.add("test_4");

        var array_2 = types.array();
        array_2.add("test_6");
        array_2.add("test_3");

        array_1.containsAll(array_2).should.equals(false);
    });



});
