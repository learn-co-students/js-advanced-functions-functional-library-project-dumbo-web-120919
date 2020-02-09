const fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    // COLLECTION FUNCTIONS

    each: function(collection, callback) {
      const newCollection = (collection instanceof Array) ? collection.slice() : Object.values(collection);

      for (let i = 0; i < newCollection.length; i++) {
        callback(newCollection[i]);
      };
      return collection;
    },

    map: function(collection, callback) {
      const newCollection = (collection instanceof Array) ? collection.slice() : Object.values(collection);

      let newArray = [];

      for (let i = 0; i < newCollection.length; i++) {
        newArray.push(callback(newCollection[i]));
      };
      return newArray;
    },

    reduce: function(collection, callback, acc) {
      let newCollection = collection.slice();

      if (!acc) {
        acc = collection[0];
        newCollection = collection.slice(1);
      };

      for (let i = 0; i < newCollection.length; i++) {
        acc = callback(acc, newCollection[i], newCollection);
      };

      return acc;
    },

    find: function(collection, predicate) {
      const newCollection = (collection instanceof Array) ? collection.slice() : Object.values(collection);

      for (let i = 0; i < newCollection.length; i++) {
        if (predicate(newCollection[i])) {
          return newCollection[i];
        };
      }
      return undefined;
    },

    filter: function(collection, predicate) {
      const newCollection = (collection instanceof Array) ? collection.slice() : Object.values(collection);

      let newArray = [];

      for (let i = 0; i < newCollection.length; i++) {
        if (predicate(newCollection[i])) {
          newArray.push(newCollection[i]);
        };
      }
      return newArray;
    },

    size: function(collection) {
      return (collection instanceof Array) ? collection.length : Object.keys(collection).length;
    },

    // ARRAY FUNCTIONS

    first: function(array, n=false) {
      return (n) ? array.slice(0, n) : array[0];
    },

    last: function(array, n=false) {
      return (n) ? array.slice(-n) : array[array.length-1];
    },
    
    compact: function(array) {
      let newArray = [];

      for (let i = 0; i < array.length; i++) {
        if (!!array[i] === true) {
          newArray.push(array[i]);
        };
      };

      return newArray;
    },

    sortBy: function(array, callback) {
      const newArray = [...array];
      return newArray.sort(function(a,b) {
        return callback(a) - callback(b);
      })
    },

    // big oof on these ones 

    unpack: function(receiver, arr) {
      for (let val of arr)
        receiver.push(val)
    },

    flatten: function(collection, shallow, newArr=[]) {
      if (!Array.isArray(collection)) return newArr.push(collection)
      if (shallow) {
        for (let val of collection)
          Array.isArray(val) ? this.unpack(newArr, val) : newArr.push(val)
      } else {
        for (let val of collection) {
          this.flatten(val, false, newArr)
        }
      }
      return newArr
    },

    uniqSorted: function(collection, iteratee) {
      const sorted = [collection[0]]
      for (let idx = 1; idx < collection.length; idx++) {
        if (sorted[idx-1] !== collection[idx])
          sorted.push(collection[idx])
      }
      return sorted
    },

    uniq: function(collection, sorted=false, iteratee=false) {
      if (sorted) {
        return fi.uniqSorted(collection, iteratee)
      } else if (!iteratee) {
        return Array.from(new Set(collection))
      } else {
        const modifiedVals = new Set()
        const uniqVals = new Set()
        for (let val of collection) {
          const moddedVal = iteratee(val)
          if (!modifiedVals.has(moddedVal)) {
            modifiedVals.add(moddedVal)
            uniqVals.add(val)
          }
        }
        return Array.from(uniqVals)
      }
    },

    // OBJECT FUNCTIONS

    keys: function(object) {
      return Object.keys(object);
    },

    values: function(object) {
      return Object.values(object);
    },

    functions: function(object) {
      let functionNames = [];
      let objectKeys = Object.keys(object);

      objectKeys.forEach( key => {
        if (typeof object[key] === "function") {
          functionNames.push(key);
        };
      })

      return functionNames.sort();
    }

  }
})()

fi.libraryMethod()
