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

function insert(root,val) {
  let value = parseInt(val);
  if (root === null) {
    let root = new Node(value);
    return root;
  } else if (root.data > value) {
    root.left = insert(root.left, value);
  } else if (root.data < value){
    root.right = insert(root.right, value);
  }
  return root;
}

function minValueNode(node) {
  let current = node;
  while(current.left !== null) {
    current = current.left;
  }
  return current;
}

function deleteNode(root,val) {
  let value = parseInt(val);
  if(root === null) {
    return root;
  } if (root.data > value) {
    root.left = deleteNode(root.left,value);
  } else if (root.data < value) {
    root.right = deleteNode(root.right, value);
  } else {
    if (root.left === null && root.right === null) {
      return null;
    } else if (root.right === null) {
      let nodeL = root.left;
      root = null;
      return nodeL;
    } else if (root.right === null) {
      let nodeR = root.right; 
      root = null;
      return nodeR;
    } 
    let node = minValueNode(root.right);
    root.data = node.data;
    root.right = deleteNode(root.right, node.data);
  }
  return root;
}

function find(root, val) {
  let value = parseInt(val);
  if (root === null || root.data === value) {
    return root;
  } if (root.data < value) {
    return find(root.right, value);
  } return find(root.left, value);
}

let arr = [1,1,3,2,5,3,4,9,8,5,6,5];
let sortedArr = sortNoDupes(arr);
let len = sortedArr.length;
let newTree = new Tree(sortedArr);
newTree.root = buildTree(sortedArr, 0, len -1);
console.log(newTree.root);
prettyPrint(newTree.root);
insert(newTree.root, 7);
prettyPrint(newTree.root);
deleteNode(newTree.root, 3);
prettyPrint(newTree.root);
find(newTree.root, 7);

