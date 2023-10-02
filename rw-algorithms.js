runeworks = typeof runeworks != 'undefined' ? runeworks : {}

runeworks.algorithms = (function() {
  let meta = {
    binarySearch: {
      name  : 'Binary search',
      inputs: {
        "array" : 'json',
        "target": 'string',
      },
      desc  : 'A logarithmic time search algorithm for a target within a sorted array.',
      links : ["https://www.techiedelight.com/binary-search/"],
    },
    astar: {
      name  : 'A-Star',
      inputs: {

      },
      desc  : 'A-Star pathfinding algorithm',
      links : ["https://codepen.io/jakeland/pen/Gjpwpm"],
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

  // A-Star search
  let wrappedAStar = function() {
    class C {
      constructor(x, y, z) {
        this.x = x
        this.y = y
        this.z = z ? z : 0
      }
    }
    class Node {
      constructor(id, size, x, y, traversable) {
        var F;
        var parent;
        this.inPath      = false
        this.getGCost    = this.getValueG
        this.getHCost    = this.getH
        this.size        = size
        this.x           = x
        this.y           = y
        this.traversable = traversable
        this.id          = id
      }
      toggleTraversable() {
        this.traversable = !this.traversable
      }
      getF() {
        return this.getH() + this.getG()
      }
      getH() {
        let en = {x: end.x, y: end.y}
        return getDistance(this, en)
      }
      getG() {
        let st = {x: end.x, y: end.y}
        return getDistance(this, st)
      }
    }

  }

  /*


class PathFindingAlg {
  constructor(grid, startNode, endNode) {
    this.grid = grid;
    this.startNode = gridPointsByPos[startNode.x][startNode.y];
    this.endNode = gridPointsByPos[endNode.x][endNode.y];
    this.currentNode = null;

    this.openSet = [];
    this.closedset = [];
  }
  findPath() {
    openSet.clear();
    closedSet.clear();

    var grid = this.grid; //the grid we're working with

    var currentNode = this.startNode; // the currentNode, defaults to start node for now

    var endNode = gridPoints[this.endNode]; //the target node
    var startNode = gridPoints[this.startNode];

    var tempArray;

    var newMovementCost; //the new movement cost to neighbor

    openSet.add(gridPoints[currentNode]);
    console.log('begin');
    while (openSet.size > 0) {
      tempArray = Array.from(openSet);

      currentNode = tempArray[0];

      for (var i = 1; i < tempArray.length; i++) {
        //this if statement is solely to build the starting walls.
        if (tempArray[i].getValueF() < currentNode.getValueF() || tempArray[i].getValueF() == currentNode.getValueF() && tempArray[i].getValueH() < currentNode.getValueH()) {
          currentNode = tempArray[i]; //sets the currentNode to openSetI if it has a lower F value, or an = F value with a lower HCost.

        }
      }

      //exits for loop with either lowest F value or combined H value and F value

      openSet.delete(currentNode);

      currentNode.drawClosedNode();

      closedSet.add(currentNode);

      //might need to put this after getNighbors.... then replace closedSet.hasIn(neighborNode with currentNode
      if (currentNode.id == startNode.id) {
        currentNode.drawNode();
      }
      if (currentNode.id == endNode.id) {
        currentNode.drawNode();
      }
      if (currentNode.walkable == false) {
        currentNode.drawNode();
      }

      if (currentNode.id == endNode.id) {
        retracePath(startNode, endNode);
        //hit the last point, exit's the loop.

        return; //exits loop
      }
      getNeighbors(currentNode).forEach(function(neighbor) {

        var neighborNode = gridPoints[neighbor];
        var neighborH = neighborNode.getHCost();
        var neighborG = neighborNode.getGCost();

        var currentG = currentNode.getGCost();
        var currentH = currentNode.getHCost();

        if (!neighborNode.walkable || closedSet.has(neighborNode)) {

          return; //acts as a continue, no need to continue if the wall was already checked.

        }

        newMovementCost = currentG + (getDistance(currentNode, neighborNode));

        if (newMovementCost < neighborG || !openSet.has(neighborNode)) {

          neighborNode.gCost = newMovementCost;
          neighborNode.hCost = neighborH;
          neighborNode.parent = currentNode;

          if (!openSet.has(neighborNode)) {
            //push the neighborNode to the openSet, to check against other open values
            openSet.add(neighborNode);

            neighborNode.drawOpenNode();

          }
        }

      })
    }

  }

}

class Grid {
  constructor(width, height, posx, posy, gridPoints) {
    this.width = width;
    this.height = height;
    this.posx = posx;
    this.posy = posy;
    this.gridPoints = gridPoints;

  }

  createGrid() {
    var tempNode;
    var countNodes = 0;
    gctx.beginPath();
    gctx.lineWidth = "1";
    gctx.strokeStyle = "black";
    gctx.rect(0, 0, this.width, this.height);
    gctx.stroke();

    for (var i = 0; i < this.width; i += NODESIZE) {
      gridPointsByPos[i] = [];

      for (var j = 0; j < this.height; j += NODESIZE) {
        gridPointsByPos[i][j] = countNodes;
        //here's the problem , need to set the walkability of the node without always being true...
        tempNode = new Node(countNodes, NODESIZE, i, j, true);
        if (countNodes === 53 || countNodes === 93 || countNodes === 133 || countNodes === 173 || countNodes === 213 || countNodes === 253 || countNodes === 293 || countNodes === 333) {
          tempNode.walkable = false;

        }
        if (wallSet.has(countNodes)) {
          console.log("wallSet had countNodes!")
          tempNode.walkable = false;
        }

        tempNode.drawNode();
        tempNode.F = tempNode.getValueF();
        gridPoints.push(tempNode);

        countNodes++;

      }
    }

  }
}
//the grid will be the exact size of the canvas
//the top left corner of the grid will be located at point 0,0 to fill the canvas
var grid = new Grid(CANVAS_WIDTH, CANVAS_HEIGHT, 0, 0);
grid.createGrid();

var myPath = new PathFindingAlg(grid, startPoint, endPoint);
//distance from a node to  another node
function getDistance(nodeA, nodeB) {
  var distX = Math.abs(nodeA.posx - nodeB.posx);
  var distY = Math.abs(nodeA.posy - nodeB.posy);

  if (distX > distY) {
    return ((14 * distY) + (10 * (distX - distY)))

  }
  return (14 * distX + (10 * (distY - distX)));
}

function retracePath(startNode, endNode) {
  path = new Set();
  var currentNode = endNode;
  var reverseArray;
  while (currentNode != startNode) {
    path.add(currentNode);
    currentNode = currentNode.parent;
    currentNode.inPath = true;
    if (currentNode != startNode)
      currentNode.drawPath();
  }

  reverseArray = Array.from(path);

  reverseArray.reverse();
  path = new Set(reverseArray);

}
//list of neighbors
function getNeighbors(node) {
  var checkX;
  var checkY;
  var neighborList = [];
  var tempList = [];
  for (var x = -NODESIZE; x <= NODESIZE; x += NODESIZE) {
    for (var y = -NODESIZE; y <= NODESIZE; y += NODESIZE) {
      if (x == 0 && y == 0) {
        continue;
      }
      checkX = node.posx + x;
      checkY = node.posy + y;

      if (checkX >= 0 && checkX <= CANVAS_WIDTH - NODESIZE && checkY >= 0 && checkY <= CANVAS_HEIGHT - NODESIZE) {

        tempList.push(gridPointsByPos[checkX][checkY]);
      }
    }
  }
  neighborList = tempList;

  return (neighborList);

}



//UI, buttons, and click events/functions

//tells canvas to how to draw the node
function nodeDrawer(context, target, lineW, strokeS, fillS) {
  context.beginPath();
  context.lineWidth = lineW;
  context.strokeStyle = strokeS;
  context.fillStyle = fillS;
  context.fillRect(target.posx, target.posy, target.size, target.size);
  context.rect(target.posx, target.posy, target.size, target.size);
  context.closePath();
  context.stroke();
}
//clears the path WITHOUT clearing the walls
function reset() {
  gridPoints = []; // resets the gridPoints so that it clears the walls etc. on reset.
  gridPointsByPos = [];
  openSet.clear();
  closedSet.clear();
  gctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  grid.createGrid();

}
//resets everything INCLUDING walls
function resetWalls() {

  wallSet.clear();
  reset();
}

//creates the button functions 
document.getElementById("btnReset").addEventListener("click", function(event) {
  reset();
});
document.getElementById("btnStartPoint").addEventListener("click", function(event) {
  mode = "startPoint";
});
document.getElementById("btnEndPoint").addEventListener("click", function(event) {
  mode = "endPoint";
});
document.getElementById("btnWall").addEventListener("click", function(event) {
  mode = "wall";
});
document.getElementById("wallReset").addEventListener("click", function(event) {
  resetWalls();
})
document.getElementById("btnBeginPathFind").addEventListener("click", function(event) {
  reset();
  myPath = new PathFindingAlg(grid, startPoint, endPoint);
  myPath.findPath();
});
//tells the canvas what to do when clicked 
gCanvas.addEventListener('click', function(event) {
  var x = event.pageX - $(gCanvas).position().left;
  var y = event.pageY - $(gCanvas).position().top;

  gridPoints.forEach(function(element) {
    if (y > element.posy && y < element.posy + element.size && x > element.posx && x < element.posx + element.size) {

      if (mode === "startPoint") {

        startPoint = new Vec2(element.posx, element.posy);
        reset();
      } else if (mode === "wall") {
        //Starting to work out resets without clearning walls, so wallSet doesn't do much yet.
        wallSet.add(element.id);
        element.toggleWalkable();
        element.drawNode();

      } else if (mode === "endPoint") {
        endPoint = new Vec2((element.posx), (element.posy));
        reset();
      } else {
        alert("You must select a Mode from the list above!")
      }

    }
  });

}, false);
*/
  
return {
    meta: meta,
    binarySearch: binarySearch,
    astar: wrappedAStar,
  }
})()
