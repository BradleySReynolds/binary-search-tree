// Create a node class with attributs: root, right child and left child.

class Node {
  constructor(val) {
    this.val = val;
    this.right = null;
    this.left = null;
  }
}

// Create a Tree class with attributes array (sorted & no dups), root and buildTree function.

class Tree {
  constructor(arr) {
    this.arr = [...new Set(arr.sort((a, b) => a - b))];
    this.root = this.buildTree(this.arr, 0, this.arr.length - 1);
  }

  buildTree(arr, start, end) {
    if (start > end) {
      return null;
    }

    const mid = Math.floor((start + end) / 2);
    let node = new Node(arr[mid]);

    node.left = this.buildTree(arr, start, mid - 1);
    node.right = this.buildTree(arr, mid + 1, end);

    return node;
  }

  insert(value) {
    this.root = this.insertRec(this.root, value);
  }

  insertRec(root, value) {
    if (root === null) {
      root = new Node(value);
      return root;
    }

    if (value < root.val) {
      root.left = this.insertRec(root.left, value);
    } else if (value > root.val) {
      root.right = this.insertRec(root.right, value);
    }

    return root;
  }

  deleteValue(value) {
    this.root = this.deleteRec(this.root, value);
  }

  deleteRec(root, value) {
    if (root === null) {
      return root;
    }

    if (value < root.val) {
      root.left = this.deleteRec(root.left, value);
    } else if (value > root.val) {
      root.right = this.deleteRec(root.right, value);
    } else {
      if (root.left === null) {
        return root.right;
      } else if (root.right === null) {
        return root.left;
      }

      root.val = this.minValue(root.right);
      root.right = this.deleteRec(root.right, root.val);
    }

    return root;
  }

  minValue(root) {
    let minv = root.val;
    while (root.left != null) {
      minv = root.left.val;
      root = root.left;
    }
    return minv;
  }

  find(value, root = this.root) {
    while (root.val !== value) {
      if (value > root.val) {
        root = root.right;
      } else if (value < root.val) {
        root = root.left;
      }
    }

    return root;
  }

  levelOrder(root) {
    if (!root) {
      return [];
    }

    const queue = [root];
    const result = [];

    while (queue.length) {
      const level = [];

      for (let i = 0; i < queue.length; i++) {
        const node = queue.shift();
        level.push(node.val);

        if (node.left) {
          queue.push(node.left);
        }

        if (node.right) {
          queue.push(node.right);
        }
      }

      result.push(level);
    }

    return result.flatMap((ele) => ele);
  }

  //   Inorder visit left subtree --> current node --> right subtree
  inorder(node = this.root, tmp = []) {
    if (node !== null) {
      this.inorder(node.left, tmp);
      tmp.push(node.val);
      this.inorder(node.right, tmp);
    }

    return tmp;
  }

  //   Preorder visit current node --> left subtree --> right subtree
  preorder(node = this.root, tmp = []) {
    if (node !== null) {
      tmp.push(node.val);
      this.preorder(node.left, tmp);
      this.preorder(node.right, tmp);
    }

    return tmp;
  }

  //   Postorder visit left subtree --> right subtree --> current node
  postorder(node = this.root, tmp = []) {
    if (node !== null) {
      this.postorder(node.left, tmp);
      this.postorder(node.right, tmp);
      tmp.push(node.val);
    }

    return tmp;
  }

  height(node) {
    if (node === null) {
      return 0;
    }

    // Each recursion to child will add + 1
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  //   Depth is the 'distance' from the given node to root
  depth(value, root = this.root, depth = 0) {
    if (root === null) {
      return -1;
    }

    if (root.val === value) {
      return depth;
    }

    // left and right recursions will return a depth or -1.
    let leftDepth = this.depth(value, root.left, depth + 1);
    let rightDepth = this.depth(value, root.right, depth + 1);

    // Checks for depth or -1
    if (leftDepth !== -1) {
      return leftDepth;
    } else {
      return rightDepth;
    }
  }

  //   Balanced is defined as the left and right height differing by one or less
  isBalanced(root = this.root) {
    let right = this.height(root.right);
    let left = this.height(root.left);

    return Math.abs(right - left) <= 1 ? true : false;
  }

  //   Rebalance essentially reassigns arr and root for tree class with any inserted values.
  rebalance(arr = this.inorder(this.root)) {
    this.arr = [...new Set(arr.sort((a, b) => a - b))];
    this.root = this.buildTree(this.arr, 0, this.arr.length - 1);
  }

  returnArr() {
    return this.arr;
  }
}

// TESTING SCRIPTS

function randomArray(tmp = []) {
  for (let i = 0; i < 10; i++) {
    tmp.push(Math.floor(Math.random() * 100));
  }

  return tmp;
}

// Create a Test Tree of length 10 using random array function
let test = new Tree(randomArray());

// Confirm that the tree is balanced
console.log(test.isBalanced()); // True

// Print out and confirm all elements in levels, pre, post, and in order.
console.log(
  test.levelOrder(), // Correct
  test.preorder(), // Correct
  test.inorder(), // Correct
  test.preorder() // Correct
);

// Unbalance the Tree
for (let i = 101; i < 125; i++) {
  test.insert(i);
}

console.log(test.isBalanced()); // False

// Rebalance the Tree
test.rebalance();

console.log(test.isBalanced()); // True

// Print out and confirm all elements in levels, pre, post, and in order.
console.log(
  test.levelOrder(), // Correct
  test.preorder(), // Correct
  test.inorder(), // Correct
  test.preorder() // Correct
);
