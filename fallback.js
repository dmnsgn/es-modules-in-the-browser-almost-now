function clamp(value, min, max) {
  return min < max
    ? (value < min ? min : value > max ? max : value)
    : (value < max ? max : value > min ? min : value)
}

const num = Infinity;
const answer = clamp(num, 0, 42);
console.log(answer);

window.answer = answer;
