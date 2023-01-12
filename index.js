let postOrderArray = [];
let inOrderArray = [];
let preOrderArray = [];
let levelOrderArray = [];

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
  if (start > end) {
    return null;
  }
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

function insert(root, val) {
  let value = parseInt(val);
  if (root === null) {
    let root = new Node(value);
    return root;
  } else if (root.data > value) {
    root.left = insert(root.left, value);
  } else if (root.data < value) {
    root.right = insert(root.right, value);
  }
  return root;
}

function minValueNode(node) {
  let current = node;
  while (current.left !== null) {
    current = current.left;
  }
  return current;
}

function levelOrder(root, fn) {
  if (root === null) {
    return;
  }
  let queue = [];
  queue.push(root);
  while (queue.length > 0) {
    let node = queue.shift();
    fn(node.data, levelOrderArray);
    if (node.left !== null) {
      queue.push(node.left);
    }
    if (node.right !== null) {
      queue.push(node.right);
    }
  }
}

function preOrder(root, fn) {
  if (root === null) {
    return;
  }
  fn(root.data, preOrderArray);
  preOrder(root.left, fn);
  preOrder(root.right, fn);
}

function inOrder(root, fn) {
  if (root === null) {
    return;
  }
  inOrder(root.left, fn);
  fn(root.data, inOrderArray);
  inOrder(root.right, fn);
}

function postOrder(root, fn) {
  if (root === null) {
    return;
  }
  postOrder(root.left, fn);
  postOrder(root.right, fn);
  fn(root.data, postOrderArray);
}

function printNode(value) {
  console.log(value);
}

function pushArray(value, array) {
  array.push(value);
}

function height(root) {
  let count = 0;
  let queue = [];
  queue.push(root);
  queue.push(null);
  while (queue.length > 0) {
    let temp = queue.shift();

    if (temp === null) {
      count++;
    }
    if (temp !== null) {
      if (temp.left) {
        queue.push(temp.left);
      }
      if (temp.right) {
        queue.push(temp.right);
      }
    } else if (queue.length > 0) {
      queue.push(null);
    }
  }
  return count - 1;
}

function depth(root) {
  if (root === null) {
    return 0;
  } else {
    leftDepth = depth(root.left);
    rightDepth = depth(root.right);
    if (leftDepth > rightDepth) {
      return leftDepth + 1;
    } else {
      return rightDepth + 1;
    }
  }
}

function isBalanced(root) {
  if (root === null) {
    return;
  } else {
    if ([1, -1, 0].includes(height(root.left) - height(root.right))) {
      return true;
    } else {
      return false;
    }
  }
}

function printIsBalanced(fn) {
  if (fn) {
    console.log("The Tree is Balanced");
  } else {
    console.log("The Tree is unbalanced");
  }
}

function rebalance(root) {
  newArray(root, (array = []));
  let newSortedArray = sortNoDupes(array);
  console.log(newSortedArray);
  let len = newSortedArray.length;
  let balancedTree = buildTree(newSortedArray, 0, len - 1);
  return balancedTree;
}

function newArray(root, array) {
  if (root === null) {
    return;
  }
  array.push(root.data);
  newArray(root.left, array);
  newArray(root.right, array);
}

function deleteNode(root, val) {
  let value = parseInt(val);
  if (root === null) {
    return root;
  }
  if (root.data > value) {
    root.left = deleteNode(root.left, value);
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
  }
  if (root.data < value) {
    return find(root.right, value);
  }
  return find(root.left, value);
}

function createRandomArray() {
  let arraySize = Math.floor(Math.random() * 5 + 5);
  let array = [];
  for (let i = 0; i < arraySize; i++) {
    array.push(Math.floor(Math.random() * 100));
  }
  return array;
}

function printOrders(root) {
  levelOrder(root, pushArray);
  console.log(`LevelOrder: ${levelOrderArray}`);
  preOrder(root, pushArray);
  console.log(`PreOrder: ${preOrderArray}`);
  inOrder(root, pushArray);
  console.log(`InOrder: ${inOrderArray}`);
  postOrder(root, pushArray);
  console.log(`postOrder: ${postOrderArray}`);
}

function randomInsertion(root) {
  console.log(`Inserting random numbers`);
  let randomLimit = Math.floor(Math.random() * 5);
  for (let i = 0; i < randomLimit; i++) {
    let random = Math.floor(Math.random() * 1000);
    console.log(`inserting ${random} to tree`);
    insert(root, random);
  }
}

function empthArrays() {
  postOrderArray = [];
  inOrderArray = [];
  preOrderArray = [];
  levelOrderArray = [];
}

function driver() {
  let array = createRandomArray();
  sortedArray = sortNoDupes(array);
  let arrayLength = sortedArray.length;
  let binaryTree = new Tree(sortedArray);
  binaryTree.root = buildTree(sortedArray, 0, arrayLength - 1);
  console.log(binaryTree.root);
  prettyPrint(binaryTree.root);
  printIsBalanced(isBalanced(binaryTree.root));
  printOrders(binaryTree.root);
  randomInsertion(binaryTree.root);
  prettyPrint(binaryTree.root);
  printIsBalanced(isBalanced(binaryTree.root));
  let newBalancedTree = rebalance(binaryTree.root);
  printIsBalanced(isBalanced(newBalancedTree));
  prettyPrint(newBalancedTree);
  empthArrays();
  printOrders(newBalancedTree);
}
