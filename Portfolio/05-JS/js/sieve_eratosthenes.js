/*
    Sieve of Eratosthenes - The sieve of Eratosthenes is one of the most efficient ways
    to find all of the smaller primes (below 10 million or so).
*/

/*
How Sieve of Erathostenes works:
List all numbers from 2 to chosen maximum (n), assume all are prime
Find the first number, 2, and cross out its multiples
Move to next number, repeat until your current number is > sqrt(n)

*/

// TODO: Adjust this script so it can work with the sieve.html file.

var sieve = function (n) {
  "use strict";

  var array = [], primes = [], i, j;

  // TODO: Implement the sieve of eratosthenes algorithm to find all the prime numbers under the given number.
  
  if (n < 2 || isNaN(n)) {
    return primes;
  }

  for (i = 0; i <= n; i++) { 
    array.push(true); //initialize array with true values
  }

  array[0] = false;
  array[1] = false;

  for (i = 2; i <= Math.sqrt(n); i++) {
    if (array[i]) {
      for (j = i * i; j <= n; j += i) {
        array[j] = false; //mark multiples of i as false
      }
    }
  }

  for (i = 2; i <= n; i++) {
    if (array[i]) {
      primes.push(i); //add prime numbers to the primes array
    }
  }

  return primes;
};

function calcAndDisplay() {
  "use strict";
  var input = document.getElementById("num").value;
  var n = parseInt(input, 10);
  var spanLabel = document.getElementById("primes");

  if (isNaN(n) || n < 2) {
    spanLabel.innerText = "Please enter a valid number greater than or equal to 2.";
    return;
  }

  var result = sieve(n);
  spanLabel.innerText = result.join(", ");

}

document.addEventListener("DOMContentLoaded", () => {
  var btn = document.getElementById("btn");
  if (btn) {
    btn.addEventListener("click", calcAndDisplay);
  }
});

console.log(sieve(1000000));
