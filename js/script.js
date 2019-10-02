function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

let generatedNumber = getRandomInt(100);
let playChance = 5;
let guessNumber = [];
document.getElementById("gameOver").style.display = "none";
document.getElementById("number").value = generatedNumber;
document.getElementById("chance-left").innerHTML = playChance;

function resetInput() {
  document.getElementById("numberInput").value = "";
  document.getElementById("numberInput").innerHTML = "";
}

function doGuess() {
  let chance = document.getElementById("chance-left").innerHTML;
  let valInput = document.getElementById("numberInput").value;
  let dangerOrSuccess;
  let msg;
  
  if (valInput == "") {
    alertResultFunction(false, "Please enter a number");
  } else if (valInput > 100) {
    alertResultFunction(false, "Your guess exceeds the hidden number");
    resetInput();
  } else {
    if (valInput == generatedNumber) {
      let msg = "Correct";
      dangerOrSuccess = true;
      if (
        addHistory(valInput, dangerOrSuccess) &&
        alertResultFunction(dangerOrSuccess, msg)
      ) {
        resetInput();
      }
      gameOver("You won");
    } else if (valInput < generatedNumber) {
      let msg = "it's a little bit smaller";
      //   guessNumber.push(valInput);
      dangerOrSuccess = false;
      if (
        addHistory(valInput, dangerOrSuccess) &&
        alertResultFunction(dangerOrSuccess, msg)
      ) {
        resetInput();
      }
      chance -= 1;
      document.getElementById("chance-left").innerHTML = chance;

      // gameOver("Out of chance");
    } else if (valInput > generatedNumber) {
      msg = "it's a little bigger";
      //   guessNumber.push(valInput);
      dangerOrSuccess = false;
      if (
        addHistory(valInput, dangerOrSuccess) &&
        alertResultFunction(dangerOrSuccess, msg)
      ) {
        resetInput();
      }
      chance -= 1;
      document.getElementById("chance-left").innerHTML = chance;
      // gameOver("Out of chance");
    }
  }

  //print history
  return chance;
}

function addHistory(guessNumber, falsy) {
  //Node for history
  var node = document.createElement("div");

  //add alert class, danger or success
  if (falsy == true) {
    node.className = "alert alert-success";
    node_class = "alert alert-success";
  } else if (false == false) {
    node.className = "alert alert-danger";
    node_class = "alert alert-danger";
  }

  //inside node for history
  var textnode = document.createTextNode(guessNumber);
  node.appendChild(textnode);
  document.getElementById("guessHistory").append(node);

  return true;
}

function alertResultFunction(falsy, msg) {
  //Node for alert result
  var node_ = "";
  var node_class = "";
  //inside alert node

  if (falsy == true) {
    node_class = "alert alert-success";
  } else if (false == false) {
    node_class = "alert alert-danger";
  }
  node_ = `<div class='${node_class}'>${msg}</div>`;

  document.getElementById("alertResult").innerHTML = node_;

  return true;
}

function newGame() {
  document.getElementById("chance-left").innerHTML = playChance;
  document.getElementById("gameOn").style.display = "block";
  document.getElementById("gameOver").style.display = "none";
  document.getElementById("guessHistory").innerHTML = "";
  document.getElementById("alertResult").innerHTML = "";
  guessNumber = [];

  generatedNumber = getRandomInt(100);
  document.getElementById("number").value = generatedNumber;
}

function gameOver(msg) {
  document.getElementById("gameOn").style.display = "none";
  document.getElementById("gameOver").style.display = "block";
  document.getElementById("announce").innerHTML = msg;
}

function mainFunction() {
  //   let chance = parseInt(document.getElementById("chance-left").innerHTML);
  let valInput = document.getElementById("numberInput").value;

  if (guessNumber.includes(valInput) == true) {
    alertResultFunction(false, "You enter a duplicated number");
    return;
  } else if(valInput != "" && valInput < 100) {
    guessNumber.push(valInput);
  }

  if (doGuess() > 0) {
    return;
  } else if (doGuess() < 1) {
    gameOver("Out of Chance");
    console.log("run");
  }
}
