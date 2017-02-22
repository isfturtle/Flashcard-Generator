var inquirer = require("inquirer");

function BasicCard(question, answer){
	this.question = question;
	this.answer = answer;
}
var basicCardArray = [];

function ClozeCard(text, cloze){
	this.text = text;
	this.cloze = cloze;
	var clozeLocation = this.text.indexOf(this.cloze);
	if(clozeLocation === -1){
		console.log("Error: Cloze text is not contained in full text.");
	}
	else{
		var returnString = this.text.substring(0, clozeLocation) + ". . . "+(this.text.substring(clozeLocation + this.cloze.length));
		this.partialText = returnString;
	}
}
var clozeCardArray = [];

//Cards
var largestTurtleCloze = new ClozeCard("The leatherback sea turtle is the largest species of turtle.", "leatherback sea turtle");
//console.log(largestTurtleCloze.partialText);
clozeCardArray.push(largestTurtleCloze);
var largestTurtleBasic = new BasicCard("What is the largest species of turtle?", "leatherback sea turtle");
basicCardArray.push(largestTurtleBasic);

var petTradeCloze = new ClozeCard("The red-eared slider is the most common turtle in the pet trade.", "red-eared slider");
clozeCardArray.push(petTradeCloze);
var petTradeBasic = new BasicCard("What is the most common species of turtle in the pet trade?", "red-eared slider");
basicCardArray.push(petTradeBasic);

var lonesomeGeorgeCloze = new ClozeCard("The last Pinto Island Giant Tortoise, named Lonesome George, passed away in 2012", "Lonesome George");
clozeCardArray.push(lonesomeGeorgeCloze);
var lonesomeGeorgeBasic = new BasicCard("What was the name of the last Pinto Island Giant Tortoise?","Lonesome George");
basicCardArray.push(lonesomeGeorgeBasic);

var smartestTurtleCloze = new ClozeCard("The wood turtle is considered to be the most intelligent species of turtle.", "wood turtle");
clozeCardArray.push(smartestTurtleCloze);
var smartestTurtleBasic = new BasicCard("Which species is considered to be the most intelligent species of turtle?", "wood turtle");
basicCardArray.push(smartestTurtleBasic);

var pleurodiraCloze = new ClozeCard("Side-necked turtles belong to the suborder Pleurodira of the order Testudines", "Pleurodira");
clozeCardArray.push(pleurodiraCloze);
pleurodiraBasic = new BasicCard("What is the suborder of order Testudines that contains side-necked turtles?", "Pleurodira");
basicCardArray.push(pleurodiraBasic);

var flatbackCloze = new ClozeCard("The flatback sea turtle is native to Australia.", "flatback");
clozeCardArray.push(flatbackCloze);
var flatbackBasic = new BasicCard("What sea turtle is native to Australia?", "flatback");
basicCardArray.push(flatbackBasic);

//////////////////////////////////////////////////////
count = 0;
rightCount = 0;
wrongCount = 0;
function clozeCardQuiz(){
	if(count >= clozeCardArray.length){
		console.log("Done!");
		console.log("Right Answers: "+rightCount);
		console.log("Wrong Answers: "+wrongCount);
		return;
	}
	//console.log("cloze");
	inquirer.prompt([
	{
		type: "input",
		message: clozeCardArray[count].partialText,
		name: "answer"
	}
		]).then(function(response){
			if(response.answer.trim().toLowerCase() === clozeCardArray[count].cloze.toLowerCase()){
				console.log("Correct!");
				rightCount++;
				//console.log(clozeCardArray[count].text);
			}
			else{
				console.log("Incorrect");
				wrongCount++;
				console.log(clozeCardArray[count].text);
			}
			count++;
			clozeCardQuiz();
		});
}
//clozeCardQuiz();

function basicCardQuiz(){
	if(count >= basicCardArray.length){
		console.log("Done!");
		console.log("Right Answers: "+rightCount);
		console.log("Wrong Answers: "+wrongCount);
		return;
	}
	//console.log("basic")
	inquirer.prompt([
	{
		type: "input",
		message: basicCardArray[count].question,
		name: "answer"
	}
		]).then(function(response){
			if(response.answer.trim().toLowerCase() === basicCardArray[count].answer.toLowerCase()){
				console.log("Correct!");
				rightCount++;
			}
			else{
				console.log("Incorrect");
				wrongCount++;
				console.log("The correct answer is " +basicCardArray[count].answer);
			}
			count++;
			basicCardQuiz();
		});
}
inquirer.prompt([
	{
		type: "list",
		message: "Which type of flashcard would you like to use?",
		choices: ["Basic Flashcard","Cloze Card"],
		name: "choice"
	}
	]).then(function(response){
		if(response.choice ==="Basic Flashcard"){
			basicCardQuiz();
		}
		else{
			clozeCardQuiz();
		}
	});
