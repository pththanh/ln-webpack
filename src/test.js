import _ from "lodash";

const { hello } = require("./hello");

hello("Javascript");
console.log("test", _.size([1, 2, 3]));
