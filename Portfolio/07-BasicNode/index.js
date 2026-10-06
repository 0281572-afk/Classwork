import fs from 'fs';
import sw from 'star-wars-quotes';
import { randomSuperhero } from 'superheroes';
import { randomSupervillain } from 'supervillains';

//require tool
console.log("Star Wars Quote: ");
console.log(sw());

//multiple calls (Superheroes vs Supervillains)

const hero = randomSuperhero();
const villain = randomSupervillain();

console.log("Epic Battle: ");
console.log(`${hero} vs ${villain}`);

console.log("Secret Message: ");
try {
    const secretMessage = fs.readFileSync('./data/input.txt', 'utf8');
    console.log(secretMessage);
} catch (error) {
    console.error("Cannot read file", error.message);
}

