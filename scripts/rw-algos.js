runeworks = typeof runeworks != 'undefined' ? runeworks : {}

runeworks.algos = (function() {
  let meta = {
    binarySearch: {
      name  : 'Binary search',
      inputs: {
        "array" : 'json',
        "target": 'string',
      },
    },
  }

  // Binary search
  let binarySearch = function(array, target, left, right) {
    // Define left/right
    if (typeof left  == 'undefined') { left  = 0 }
    if (typeof right == 'undefined') { right = array.length - 1}

    // Exhausted search space
    if (left > right) { return -1 }

    let mid = Math.floor((left + right) / 2)

    // Binary
    if (target == array[mid]) {
      return mid
    } else if (target < array[mid]) {
      return binarySearch(array, target, left, mid - 1)
    } else {
      return binarySearch(array, target, mid + 1, right)
    }
  }

  return {
    meta: meta,
    binarySearch: binarySearch,
  }
})()
