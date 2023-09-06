runeworks = typeof runeworks != 'undefined' ? runeworks : {}

runeworks.algos = (function() {

  // Binary search
  let binarySearch = function(space, left, right, target) {
    // Exhausted search space
    if (left > right) { return -1 }

    let mid = Math.floor((left + right) / 2)

    // Binary
    if (target == space[mid]) {
      return mid
    } else if (target < space[mid]) {
      return binarySearch(space, left, mid - 1, target)
    } else {
      return binarySearch(space, mid + 1, right, target)
    }
  }


  return {
    binarySearch: binarySearch,
  }
})()
