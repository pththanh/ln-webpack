import { hello } from "./hello";
import { message } from "./javascript2";
import { sum } from "./sum";
import _ from "lodash";

const PI = 3.14;

console.log("Hi", message);
console.log(sum([2, 4]));
console.log("Check");
console.log(sum(3));
alert(message);
hello("webpack");
console.log("main", _.size([1, 2, 3]));
console.log(`PI: ${PI}`);
