/**
 * http://usejsdoc.org/
 */

function Error(error) {
  this.error = error;
}

Error.prototype.toString = function dogToString() {
  return '{ "error":' + this.error+'}';
}