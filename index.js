class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = null;
    this.array = array;
  }
  
}

function sortNoDupes(array) {
  let noDupes = array.filter((item, index) => array.indexOf(item) === index);
  let sortedArr = noDupes.sort((a, b) => a - b);
  return sortedArr;
}


function buildTree(array, start, end) {
  if (start > end) {return null};
  let mid = parseInt((start + end) / 2);
  let node = new Node(array[mid]);
  node.left = buildTree(array, start, mid - 1);
  node.right = buildTree(array, mid + 1, end);
  return node;
}

function prettyPrint(node, prefix = "", isLeft = true) {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
}

let arr = [1,1,3,2,,5,3,4,9,8,5,6,5,219,22,11,13];
let sortedArr = sortNoDupes(arr);
let len = sortedArr.length;
let newTree = new Tree(sortedArr);
newTree.root = buildTree(sortedArr, 0, len -1);
console.log(newTree.root);
prettyPrint(newTree.root);
