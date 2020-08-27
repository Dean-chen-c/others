// module.exports = {
//   fo: 1,
// };

exports.a1 = true;

exports.a3 = false;
const b = require("./b.js");
console.log("in a, b.done = %j", b.done);
exports.a2 = true;
