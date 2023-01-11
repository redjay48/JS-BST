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

function levelOrder(root, fn) {
  if(root === null) {
    return;
  }
  let queue = [];
  queue.push(root);
  while(queue.length > 0) {
    let node = queue.shift();
    fn(node.data);
    if(node.left !== null) {
      queue.push(node.left);
    } if(node.right !== null) {
      queue.push(node.right);
    }
  }
}

function preOrder(root, fn) {
  if(root === null) {
    return;
  }
  fn(root.data);
  preorder(root.left, fn);
  preorder(root.right, fn);
}

function inOrder(root, fn) {
  if(root === null) {
    return;
  }
  inOrder(root.left, fn);
  fn(root.data);
  inOrder(root.right, fn);
}

function postOrder(root, fn) {
  if(root === null) {
    return;
  }
  postOrder(root.left, fn);
  postOrder(root.right, fn);
  fn(root.data);
}

function printNode(value) {
  console.log(value);
}

function height(root) {
  let count = 0;
  let queue = [];
  queue.push(root);
  queue.push(null);
  while(queue.length > 0) {
    let temp = queue.shift();
    
    if(temp === null) {
      count++;
    }
    if(temp !== null) {
      if(temp.left) {
        queue.push(temp.left);
      } if(temp.right) {
        queue.push(temp.right);
      }
    } else if( queue.length > 0) {
      queue.push(null);
    }
  }
  return count - 1;

}

function depth(root) {
  if(root === null) {
    return 0;
  }
  else {
    leftDepth = depth(root.left);
    rightDepth = depth(root.right);
    if(leftDepth > rightDepth) {
      return leftDepth + 1;
    } else {
      return rightDepth + 1;
    }
  }
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
levelOrder(newTree.root, printNode);

