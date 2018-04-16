import clamp from "lodash/clamp";

const num = Infinity;
const answer = clamp(num, 0, 42);
console.log(answer);

export default answer;
