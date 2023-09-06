runeworks = typeof runeworks != 'undefined' ? runeworks : {}

runeworks.algorithms = (function() {
  let meta = {
    binarySearch: {
      name  : 'Binary search',
      inputs: {
        "array" : 'json',
        "target": 'string',
      },
      desc: 'A logarithmic time search algorithm for a target within a sorted array.',
      links: ["https://www.techiedelight.com/binary-search/"],
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
