function isPrime(num) {
    if (num<2) return false;
    for (var i = 2; i < num; i++) {
        if (num % i === 0) {
            return false;
        }
    }
return true;
}

function checkPrime() {
    var id = document.getElementById("num");
    var number = parseInt(id.value, 10);
    var maxNum = parseInt(1299827);
    var spanLabel = document.getElementById("pf");
    
    if (number < maxNum && !isNaN(number) && number >= 0) {
        for (var i = number + 1; i < maxNum; i++) {
            //TODO: check if the current number is a prime or not
            // If it is, then return it
            if (isPrime(i)) {
                spanLabel.innerHTML = "Next prime number = " + i;
                return;
            }
            continue;
        }
    } else {
        window.alert("Please Enter Number Below 1299827 or Enter A Valid Integer");
        id.value = "";
    }
}
