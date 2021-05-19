let pics = document.querySelectorAll(".picture");
let openedPics = [];
let currentPic = "";
let usedpics = {
	pic1: 0,
	pic2: 0,
	pic3: 0,
	pic4: 0,
	pic5: 0,
	pic6: 0,
};

let themes = {
	default: "Kõike",
	landscape: "Maastik",
	animals: "Loomad",
	pom: "Pomeranian (koeratõug)",
	food: "Välismaised toidud",
	landmarks: "Vaatamisväärsused",
};

var turnsTaken = 0;
var turnsElem = document.getElementById("currentTurns");
var turns = document.querySelector(".turns");

var gameWon = document.querySelector("#gameWon");
var time = document.querySelector(".time");

var selectedPic;
var picSelect = document.querySelector("#picSelect");
var picSelectDiv = document.querySelector("#picSelectDiv");
var dropMenu = document.querySelector(".dropbtn");

gameWon.style.display = "none";
time.style.display = "none";
turns.style.display = "none";

var freeze = false;

selectedPic = "default";
function changePic(value) {
	selectedPic = value;
	dropMenu.innerHTML = themes[value];
	document.querySelector("style").innerHTML = "";
	setTimeout(function() {
		document.querySelector("style").innerHTML = ".dropdown:hover .dropdown-content {display: block;}";
	}, 100);
}


function start() {
	nupp = document.getElementById("playButton");
	if(nupp.innerHTML == "Mängi") {
		nupp.innerHTML = "Mängi uuesti";
		nupp.style.backgroundColor = "#a16e2b";
		picSelect.style.display = "none";
		time.style.display = "block";
		turns.style.display = "block";
		game();
		var startTime = Date.now();
		cancel = setInterval(function() {
			var elapsedTime = Date.now() - startTime;
			$("#currentTime").html((elapsedTime / 1000).toFixed(2));
		}, 10);
		turnsElem.innerText = turnsTaken;
	} else {
		location.reload();
	}
}

function game() {
	for(let i = 1; i < 13; i++) {
		elem = "#pic" + i;
		randomNr = getRandom(1, 7);
		while(usedpics["pic" + randomNr] === 2) {
			randomNr = getRandom(1, 7);
		}
		usedpics["pic" + randomNr] += 1;
		document.querySelector(elem).setAttribute("hiddenImg", randomNr);
	}

	function getRandom(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min) + min);
	}
	
	pics.forEach((element) => {
		element.addEventListener("click", function() {
			if(element.src == "http://www.tlu.ee/~harli17/eesrakendused/projekt/img/default.jpg") {
				playAudio("sound/imgclick.mp3");
				elemjquery = $(element);
				elemjquery.fadeOut("fast", function() {
					elemjquery.attr("src", "img/" + selectedPic + "/" + element.getAttribute("hiddenImg") + ".jpg");
					elemjquery.fadeIn("fast");
				});
				if(currentPic != "") {
					first = document.querySelector("#" + currentPic).getAttribute("hiddenImg");
					second = element.getAttribute("hiddenImg");
					if(first == second) {
						openedPics.push(currentPic);
						openedPics.push(element.id);
					} else {
						img1 = $("#" + currentPic);
						img2 = $("#" + element.id);
						freeze = true;
						setTimeout(() => {
							img1.fadeOut("fast", function () {
								img1.attr("src", "img/default.jpg");
								img1.fadeIn("fast");
							});
							img2.fadeOut("fast", function () {
								img2.attr("src", "img/default.jpg");
								img2.fadeIn("fast");
							});
							freeze = false;
							playAudio("sound/back.mp3");
						}, 1000);
					}
					
					currentPic = "";
					turnsTaken = parseInt(turnsElem.innerHTML);
					turnsElem.innerHTML = turnsTaken + 1;
				} else {
					currentPic = element.id;
				}
			}
			if(openedPics.length == 12) {
				clearInterval(cancel);
				gameWon.style.display = "block";
				playAudio("sound/win.mp3");
			}
		});
	});
}

document.addEventListener(
	"click",
	(e) => {
		if (freeze) {
			e.stopPropagation();
			e.preventDefault();
		}
	},
	true
);

function playAudio(url) {
    new Audio(url).play();
}