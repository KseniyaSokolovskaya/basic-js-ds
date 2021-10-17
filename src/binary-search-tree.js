const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
module.exports = class BinarySearchTree {
  constructor() {
    this.base = null;
  }

  root() {
    return this.base;
  }

  add(data) {
    let node = new Node(data);

    if (this.base === null) {
      this.base = node;
      return this;
    }

    let current = this.base;
    while (current) {
      if (node.data === current.data) return undefined;

      if (node.data < current.data) {
        if (current.left === null) {
          current.left = node;
          return this;
        } else {
          current = current.left;
        }
      } else {
        if (current.right === null) {
          current.right = node;
          return this;
        } else {
          current = current.right;
        }
      }
    }
  }

  has(data) {
    let node = new Node(data);
    if (this.base === null) return false;

    let current = this.base;
    let found = false;

    while (current && !found) {
      if (node.data === current.data) {
        return true;
      } else if (node.data < current.data) {
        current = current.left;
      } else if (node.data > current.data) {
        current = current.right;
      }
    }

    return false;


  }

  find(data) {
    let node = new Node(data);
    if (this.base === null) return undefined;

    let current = this.base;
    let found = false;

    while (current && !found) {
      if (node.data === current.data) {
        return current;
      } else if (node.data < current.data) {
        current = current.left;
      } else if (node.data > current.data) {
        current = current.right;
      }
    }

    return null;
  }

  remove(data) {
    let left, right;

    if (this.has(data)) {
      if (this.base.data === data) {
        left = this.base.left;
        right = this.base.right;
        this.base = this.base.right;
        this.minNode(this.base).left = left;
        return true;
      }

      let found = false;
      let current = this.base;
      let parent = null;

      while (current && !found) {

        if (data < current.data) {
          parent = current;
          current = current.left;
        } else if (data > current.data) {
          parent = current;
          current = current.right;
        } else {

          if (data > parent.data) {
            left = current.left;
            right = current.right
            if (right) {
              parent.right = right;
              this.minNode(right).left = left;
            }
            else if (left) {
              parent.right = left;
              this.maxNode(left).right = right;
            } else {
              parent.right = null
            }
          } else {
            left = current.left;
            right = current.right
            if (left) {
              parent.left = left;
              this.maxNode(left).right = right;
            } else if (right) {
              parent.left = right;
              this.minNode(right).left = left;
            } else {
              parent.left = null;
            }
          }

          found = true;

        }
      }
    }
  }

  minNode(from = this.base) {
    let current = from;

    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }

  min() {

    let current = this.base;

    while (current.left !== null) {
      current = current.left;
    }
    return current.data;
  }

  maxNode(from = this.base) {
    let current = from;

    while (current.right !== null) {
      current = current.right;
    }

    return current;
  }
  max() {
    let current = this.base;

    while (current.right !== null) {
      current = current.right;
    }

    return current.data;
  }

  toString(node = this.base) {
    let str = ""

    if (node.left) {
      str += this.toString(node.left)
      str += ","
    }

    str += node.data;
    str += ","

    if (node.right) {
      str += this.toString(node.right)
      str += ","
    }

    return str
  }
}
