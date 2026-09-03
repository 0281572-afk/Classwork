/*
    Fibonacci Sequence - Enter a number and have the program
    generate the Fibonacci sequence to that number or to the Nth number.
*/
// This array will keep memory of the previous fibonacci numbers
var memo = {};

function fibonacci() {
  "use strict";
  var n = document.getElementById("num").value;
  n = parseInt(n, 10); //html input values are strings, change to int for calc in base 10
  if (isNaN(n) || n < 0) {
    document.getElementById("fibonacciLbl").innerHTML = "Please enter a valid number";
    return;
  } 

  var val = f(n);
  document.getElementById("fibonacciLbl").innerHTML = "Fibonacci number for " + n + " = " + val;
  return val;
}

function f(n) {
  var value;
  // Check if the memory array already contains the requested number
  if (memo.hasOwnProperty(n)) {
    value = memo[n];
  } else {
    //TODO: Implement the fibonacci function here!
    if(n===0){
      value = 0;
    } else if (n===1){
      value = 1;
    } else {
      value = f(n-1) + f(n-2);
    }

    memo[n] = value;
  }

  return value;
}
console.log(fibonacci(15));
