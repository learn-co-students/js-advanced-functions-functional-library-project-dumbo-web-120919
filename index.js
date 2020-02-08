
const fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: function(collection, callback) {

      let collectionCopy = Array.isArray(collection) ? collection.slice() : Object.values(collection)

        for (let i = 0; i < collectionCopy.length; i++) {
          callback(collectionCopy[i])
        }

        return collection
    },

    map: function(collection, callback) {
      // if collection is an object, convert it into an array of values
      if (!Array.isArray(collection)) {
        collection = Object.values(collection)
      }

      let result = []

      for (let i = 0; i < collection.length; i++) {
        result.push(callback(collection[i]))
      }

      return result
    },

    reduce: function(collection, callback, acc) {
      // make a copy of the original array bc we cannot mutate it
      let collectionCopy = collection.slice()

      // if accumulator is not assigned, assign it as the first element of the array
      // and start the collection accumulation at second element
      if (!acc) {
        acc = collectionCopy[0]
        collectionCopy = collectionCopy.slice(1)
      }

      // with each successive step it should be accumulate the return value of callback
      // callback is passed three arguments: 
      // (1) the acc, 
      // (2) the current value in our iteration (the element in the array), 
      // (3) a reference to the entire collection
      for (let i = 0; i < collectionCopy.length; i++) {
        acc = callback(acc, collectionCopy[i], collectionCopy)
      }

      return acc

    },

    find: function(collection, predicate) {
      // if collection is an object, convert it into an array of values
      if (!Array.isArray(collection)) {
        collection = Object.values(collection)
      }

      for (let i = 0; i < collection.length; i++) {
        if (predicate(collection[i])) {
          return collection[i]
        }
      }

    },

    filter: function(collection, predicate) {
      // if collection is an object, convert it into an array of values
      if (!Array.isArray(collection)) {
        collection = Object.values(collection)
      }
      
      let result = []

      for (let i = 0; i < collection.length; i++) {
        if (predicate(collection[i])) {
          result.push(collection[i])
        }
      }

      return result

    },

    size: function(collection) {
      // if collection is an object, convert it into an array of values
      if (!Array.isArray(collection)) {
        collection = Object.values(collection)
      }
      return collection.length

    },

    first: function(array, n) {
      if (n) {
        return array.slice(0, n)
      } else {
        return array[0]
      }
    },

    last: function(array, n) {
      if (n) {
        return array.slice(array.length - n, array.length)
      } else {
        return array[array.length - 1]
      }
    },

    compact: function(array) {
      let result = []

      for (let i = 0; i < array.length; i++) {
        if (array[i]) {
          result.push(array[i])
        }
      }

      return result
    },

    sortBy: function(array, callback) {

      let newArr = [...array]

      return newArr.sort(function(a, b) {
        return callback(a) - callback(b)
      })

    },

    flatten: function(nestedArr, shallow, newArr = []) {

      if (!Array.isArray(nestedArr)) {
        return newArr.push(nestedArr)
      }

      if (shallow) {
        for (let element of nestedArr) {
          if (Array.isArray(element)) {
            newArr.push(...element)
          } else {
            newArr.push(element)
          }
        } 
        } else {
          for (let element of nestedArr) {
            this.flatten(element, false, newArr)
          }
        }

        return newArr

    },

    uniq: function(collection, sorted = false, callback = false) {
      // Case #1: collection is sorted && there's no callback function to transform the collection
      if (sorted) {
        // initialize sorted collection with 1st element of the original collection
        let sortedArr = [collection[0]]
        for (let i = 0; i < collection.length; i++) {
          // if there's no matching element found in the sorted collection, push that element in the sorted collection 
          if (sortedArr[i - 1] !== collection[i]) {
            sortedArr.push(collection[i])
          }
        }

        return sortedArr

      } 
      // Case #2: collection is NOT sorted && there's no callback function to transform the collection
      else if (!callback) {
        //// TODAY I LEARNED:
        // Set objects are collection of values && each value in the Set has to be unique
        return [...new Set(collection)]

      } 
      // Others
      else {
        // create a new set to store all non-transformed unique values
        let uniqVals = new Set()
        // create another new set to store all transformed unique values
        let modifiedVals = new Set()

        for (let value of collection) {
          // transform the value in the collection by calling the callback fn
          let transformedVal = callback(value)
          // if the transformed value is not in modifiedVal set...
          if (!modifiedVals.has(transformedVal)) {
            // ...add the transformed value to modifiedVal set, so there won't be duplicate values
            modifiedVals.add(transformedVal)
            // ...add the original (non-transformed) value to non-transformed set
            uniqVals.add(value)
          }

        }

        return [...uniqVals]

      }
    },

    keys: function(obj) {
      let keysArr = []

      for (let key in obj) {
        keysArr.push(key)
      }

      return keysArr
    },

    values: function(obj) {
      let valsArr = []

      for (let key in obj) {
        valsArr.push(obj[key])
      }

      return valsArr

    },

    functions: function(obj) {
      let functionNamesArr = []

      for (let key in obj) {
        if (typeof obj[key] === 'function') {
          functionNamesArr.push(key)
        }

      }

      return functionNamesArr
    }

  }
})()

fi.libraryMethod()
