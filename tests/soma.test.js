//import soma from "../soma.js";
//commonJS
const soma = require("../soma.js");

it("Add 2 + 2 to equal 4", () => {
  expect(soma(2, 2)).toBe(4);
});
