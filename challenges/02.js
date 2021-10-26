class ArrayUtilities {
  /* Your magic here */

  static addZeros = (numbers) => numbers.map((number) => number * 10);
  static moreThanFifty = (numbers) => numbers.filter((number) => number > 50);
  // static removeFirst = (numbers) => {
  //   numbers.shift();
  //   return numbers;
  // };
  static removeFirst = (numbers) => numbers.slice(1, numbers.length);
  // static sumAll = (numbers) => {
  //   let sum = 0;
  //   numbers.forEach((number) => {
  //     sum += number;
  //   });
  //   return sum;
  // };
  static sumAll = (numbers) =>
    numbers.reduce((sum, currValue) => sum + currValue, 0);

  static divide = (number) => number.toString().split("");
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const addZeros = ArrayUtilities.addZeros(numbers);
console.log(addZeros);

const moreThanFifty = ArrayUtilities.moreThanFifty(addZeros);
console.log(moreThanFifty);

const noFirst = ArrayUtilities.removeFirst(moreThanFifty);
console.log(noFirst);

const sumAll = ArrayUtilities.sumAll(noFirst);
console.log(sumAll);

const divided = ArrayUtilities.divide(sumAll);
console.log(divided);
