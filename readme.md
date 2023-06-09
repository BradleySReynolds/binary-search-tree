# Binary Search Tree

## Made for the Odin Project

### by Bradley Reynolds

### Class

```
class Node {
  constructor(val) {
    this.val = val;
    this.right = null;
    this.left = null;
  }
}
```

```
class Tree {
  constructor(arr) {
    this.arr = [...new Set(arr.sort((a, b) => a - b))];
    this.root = this.buildTree(this.arr, 0, this.arr.length - 1);
  }

  buildTree(arr, start, end) {}

  insert(value) {}

  deleteValue(value) {}

  find(value) {}

  levelOrder(root) {}

  inorder() {}

  preorder() {}

  postorder() {}

  height(node) {}

  depth(value) {}

  isBalanced() {}

  rebalance() {}

  returnArr() {}
}
```

### Methods

`buildTree(arr, start, end)` - This method does the most work, it uses a given `arr`, `start` (typically 0) and `end` (typically just `arr.length`). A tree finds the middle value (given that the array is sorted and does not contain duplicates, which is done in the constructor function using the `Set` data type -- which does not allow duplicates -- and the `sort()` method using a callback of `(a, b) => a - b)`). Using the middle value, the method can be called recusively on the right and left sides until there is no node found.

`insert(value)` - This method allows for a new node to be inserted into the tree. Note: this does not reorganize the tree, rather it just follows a track down the tree until it finds a 'leaf' or edge of a node.

`deleteValue(value)` - This method removes a node from the tree.

`find(value)` - This method returns a node with the given `value`.

`levelOrder(root)` - This method returns a sorted list of values which takes the order of root --> root's children --> roots childrens' children --> etc...

`inorder()` - This method returns a sorted list in order of left subtree --> current node --> right subtree.

`preorder()` - This method returns a sorted list in order of current node --> left subtree --> right subtree.

`postorder()` - This method returns a sorted list in order of left subtree --> right subtree --> current node.

`height(node)` - This method will return an integer based on how far away the furthest leaf is.

`depth(value)` - This method will return an interger based on the distance between the node with the given `value` to the root node.

`isBalanced()` - This method will return true/false based on whether the tree is balanced or not. Balanced is defined as when the right and left sides of a root node having a difference in height of 0-1.

`rebalance()` - This method will rework the current tree into a balanced tree if there has been some amount of insertions and deletions.
