// var a = require("./a");
// console.log(a);

const a = require("./a.js");
console.log("in b, a.a1 = %j, a.a2 = %j", a.a1, a.a2);
a.a3 = true;
module.exports = {
  done: a.a2,
};
