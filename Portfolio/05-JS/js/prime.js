/*
    Prime Factorization - Have the user enter a number and find
    all Prime Factors (if there are any) and display them.
*/

var getPrimeFactors = function (n) { 

  function isPrime(n) {
    var i;

    for (i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        return false;
      }
    }
    return true;
  }


  var i, sequence = [];

  //TODO: Check which numbers are factors of n and also check if
  // that number also happens to be a prime
  for (i = 2; i <= n; i++) {
    if (n % i === 0 && isPrime(i)) {
      sequence.push(i);
    }
  }

  return sequence;
};

//added this so go button would work
function go() {
  var inputValue = document.getElementById("num").value;
  var num = parseInt(inputValue, 10);
  var spanLabel = document.getElementById("pf");

  if (isNaN(num) || num < 2) {
    spanLabel.innerHTML = "Please enter a valid number.";
    return;
  }

  var primeFactors = getPrimeFactors(num);
  spanLabel.innerHTML = "The prime factors for this number are: [" + primeFactors.join(", ") + "]";
}



// the prime factors for this number are: [ 2, 3, 5, 7, 11, 13 ]
console.log(getPrimeFactors(30030));
