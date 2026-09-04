/*
Pig Latin
*/
//move first consotant to the end, add ay after
//move first vowel to the end, add way after

function igpayAtinlay(str) {
  if (!str) return "";

  // TODO: Initialize the word array properly
  var vowels = "aeiou";
  var returnArray = [];
  var wordArray = str.split(" ");

  // TODO: make sure that the output is being properly built to produce the desired result.
  for (var i = 0; i < wordArray.length; i++) {
    var word = wordArray[i];
    var beginning = word.charAt(0);

    if (vowels.includes(beginning.toLowerCase())) { 
      returnArray.push(word + "way");
      continue;
    }

    for (var ii = 1; ii < word.length; ii++) {
      if (vowels.includes(word.charAt(ii).toLowerCase())) {
        break;
      } else {
        beginning += word.charAt(ii);
      }
    }

    var restOfWord = word.slice(beginning.length);
    returnArray.push(restOfWord + beginning + "ay");
  }

  return returnArray.join(" ");
}

//for button
function translated(){
  "use strict";
  var inputVal = document.getElementById("txtVal").value;
  var spanLabel = document.getElementById("pigLatLbl");
  
  var translated = igpayAtinlay(inputVal);
  spanLabel.innerText = translated;

}

// Some examples of expected outputs
console.log(igpayAtinlay("pizza")); // "izzapay"
console.log(igpayAtinlay("apple")); // "appleway"
console.log(igpayAtinlay("happy meal")); // "appyhay ealmay"
