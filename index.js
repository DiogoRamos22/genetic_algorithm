var randomString = require('randomstring');
var currentPop = [];
var matingPool = [];
var newPop = [];
var fitnessArray = [];
var generations = 10000000;
var bestScore = 0;
var best = '';
var answer = 'String'; //change to whatever here
var answerLength = answer.length;
// setup()
//  # Step 1: The Population
//    # Create an empty population (an array or ArrayList)
//    # Fill it with DNA encoded objects (pick random values to start)

// draw()
//  # Step 1: Selection
//    # Create an empty mating pool (an empty ArrayList)
//    # For every member of the population, evaluate its fitness based on some criteria / function,
//      and add it to the mating pool in a manner consistant with its fitness, i.e. the more fit it
//      is the more times it appears in the mating pool, in order to be more likely picked for reproduction.

//  # Step 2: Reproduction Create a new empty population
//    # Fill the new population by executing the following steps:
//       1. Pick two "parent" objects from the mating pool.
//       2. Crossover -- create a "child" object by mating these two parents.
//       3. Mutation -- mutate the child's DNA based on a given probability.
//       4. Add the child object to the new population.
//    # Replace the old population with the new population
//
//   # Rinse and repeat
function mutation(child) {
	if(1.5>=Math.random()*100){
		var randomLetter = randomString.generate({
			length: 1,
			charset: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ '
		});
		var randomLetterPlace = Math.floor(Math.random() * child.length);
		var partOnePhrase = child.substring(0,randomLetterPlace);
		var partTwoPhrase = child.substring(randomLetterPlace+1,child.length);
		var newChild = partOnePhrase.concat(randomLetter,partTwoPhrase);
		return newChild;
	};
	return child;
}
function pickParents() {
	var parentOne = Math.floor((Math.random() * (matingPool.length)));
	var parentTwo = Math.floor((Math.random() * (matingPool.length)));
	return {
		parentOne: parentOne,
		parentTwo: parentTwo
	};
}
function crossover() {
	var i = 0;
	newPop = [];
	while(i<matingPool.length){
	var parents = pickParents();
	var stringOne = matingPool[parents.parentOne];
	var stringTwo = matingPool[parents.parentTwo];
	var childOne = stringOne.substring(0,Math.ceil((stringOne.length/2))).concat(stringTwo.substring(Math.ceil((stringTwo.length/2)),stringTwo.length));
	var childTwo = stringTwo.substring(0,Math.ceil((stringTwo.length/2))).concat(stringOne.substring(Math.ceil((stringOne.length/2)),stringOne.length));
	childOne = mutation(childOne);
	childTwo = mutation(childTwo);
	newPop.push(childOne);
	newPop.push(childTwo);
	i++;
	};
	for (let x = 0; x < 100; x++) {
		newPop.push(best);
	}
	currentPop = newPop;
}
function populate(phrasePhenotype, score) {
	if(bestScore<=score){
		for (let i = 0; i < score; i++) {
			matingPool.push(phrasePhenotype);
			fitnessArray.push(score);
		}
		for (let q = 0; q < fitnessArray.length; q++) {
			if(bestScore<fitnessArray[q]){
				bestScore = fitnessArray[q];
				best = matingPool[q];
			}
		}
	}
}
function fitness(phenotype) {
	arraySize = 0;
	matingPool  = [];
	fitnessArray = [];
	for (let a = 0; a < phenotype.length; a++) {
		var score = 0;
		var phrasePhenotype = phenotype[a];

		for (let b = 0; b < answer.length; b++) {
			var letterAnswer = answer.substring(b,b+1);
			var letterPhenotype = phrasePhenotype.substring(b,b+1);
				if(letterAnswer==letterPhenotype){
					score++
				};
		};
		populate(phrasePhenotype, score);
		if(a>8000){break};
	};
};
for (let i = 1; i < 5001; i++) {
	currentPop[i-1] = randomString.generate({
		length: answerLength,
		charset: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ '
	});
};
	console.log("Starting with: ")
	console.log("Current Population: " + currentPop.length);
	console.log("-----------------");

function nextGeneration() {
	fitness(currentPop);//fitness test // populate // get best score&best phrase
	crossover(); //pick parents // crossover // mutation
	console.log("Current Population: " + currentPop.length);
	console.log("Score: " + bestScore);
	console.log("Best: " + best);
	console.log("-----------------");
};

for (let j = 0; j < generations; j++) {
	console.log('Generation: ' + j);
	nextGeneration();
	if(best==answer){
		break;
	}
};
	console.log("Final Result");
	console.log("Current Population: " + currentPop.length);
	console.log("Score: " + bestScore);
	console.log("Best: " + best);
