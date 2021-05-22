
// Sisendandmed paiknevad failis data.js

// Algväärtuste lisamine teemadele
for(var id in topic) {
  document.getElementById('t'+id).innerHTML = topic[id];
}

// Algväärtuste lisamine küsimustikule
for(var id in questionary) {
	document.querySelector("[data-target='simpleModal_"+id+"']").innerHTML = questionary[id]['points']; // Punktide arv tabelisse
	var modalObj = document.getElementById('simpleModal_'+id);
	modalObj.getElementsByTagName("h3")[0].innerHTML = questionary[id]['points'];
	modalObj.getElementsByTagName("p" )[0].innerHTML = questionary[id]['question'];
	modalObj.getElementsByTagName("h2")[0].innerHTML = questionary[id]['answer'];
}


document.addEventListener('click', function (e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    // Modali avamisega ja andmete muutmisega seotud tegevused
	if (target.hasAttribute('data-toggle') && target.getAttribute('data-toggle') == 'modal') {
        if (target.hasAttribute('data-target')) {
            var modalId  = target.getAttribute('data-target');
			var modalObj = document.getElementById(modalId);
            //var del = document.getElementById('del');
			var [type, id] = modalId.split("_");            //  Modali tüüp ja numbriline ID
			if (type == "simpleModalTopic") {               // Teema muutmine
				var [topicInputObj, topicButtonObj] = modalObj.getElementsByTagName("input");
				topicButtonObj.onclick = function(){
					document.getElementById('t'+id).textContent = topicInputObj.value;
				};
			} else if (type == "simpleModal") {             // Küsimuse ja vastuse muutmine
				var [queryInputObj, queryButtonObj, answerInputObj, answerButtonObj, correctButtonObj, wrongButtonObj, closeButtonObj] = modalObj.getElementsByTagName("input");
				var queryTextObj  = modalObj.getElementsByTagName("p")[0];
				var answerTextObj = modalObj.getElementsByTagName("h2")[0];
				queryButtonObj.onclick = function(){
					queryTextObj.textContent = queryInputObj.value;
                    queryInputObj.value =""; 
				};
				answerButtonObj.onclick = function(){
					answerTextObj.textContent = answerInputObj.value;
                    answerInputObj.value ="";
				};
                correctButtonObj.onclick = function(){
                    document.querySelector("[data-target='simpleModal_"+id+"']").innerHTML = "";
                    modalObj.classList.add("modalClosed");
                    modalObj.classList.remove("open");
                    incrementPoints(selectedTeam, questionary[id]['points']);
                }
                wrongButtonObj.onclick = function(){
                    document.querySelector("[data-target='simpleModal_"+id+"']").innerHTML = "";
                    modalObj.classList.add("modalClosed");
                    modalObj.classList.remove("open");
                    decrementPoints(selectedTeam, questionary[id]['points']);
                    
                }
                closeButtonObj.onclick = function(){         // Vastatud-nupp (Märgib küsimuse vastatuks)
                    document.querySelector("[data-target='simpleModal_"+id+"']").innerHTML = "";
                    modalObj.classList.add("modalClosed");
                    modalObj.classList.remove("open");
                }; 
			}

            if(!modalObj.classList.contains("modalClosed")){    // Avab modali, kui küsimus on vastamata
                modalObj.classList.add('open');                 
            }
            e.preventDefault();
        }
    }

    // Sulgeb modali nupust või taustale vajutades
    if ((target.hasAttribute('data-dismiss') && target.getAttribute('data-dismiss') == 'modal') || target.classList.contains('modal')) {
        var modal = document.querySelector('[class="modal open"]');
        modal.classList.remove('open');
        e.preventDefault();
    }
}, false);


// Skoori süsteem
var points = [0, 0, 0];

var selectedTeam;

var add1    = document.getElementById('increment1');
var remove1 = document.getElementById('decrement1')
var int1    = document.getElementById('number1');

add1.addEventListener('click', function(){
    points[0] += 100;
    int1.innerHTML = points[0];
});
remove1.addEventListener('click', function(){
    points[0] -= 100;
    int1.innerHTML = points[0];
});


var add2    = document.getElementById('increment2');
var remove2 = document.getElementById('decrement2')
var int2    = document.getElementById('number2');

add2.addEventListener('click', function(){
    points[1] += 100;
    int2.innerHTML = points[1];
});
remove2.addEventListener('click', function(){
    points[1] -= 100;
    int2.innerHTML = points[1];
});


var add3    = document.getElementById('increment3');
var remove3 = document.getElementById('decrement3')
var int3    = document.getElementById('number3');

add3.addEventListener('click', function(){
    points[2] += 100;
    int3.innerHTML = points[2];
});
remove3.addEventListener('click', function(){
    points[2] -= 100;
    int3.innerHTML = points[2];
});

 document.getElementById("selectTeam1").addEventListener("click", function() {
     selectedTeam = 0;
     unselectTeams();
     this.classList.add("teamSelected");
 });
    
 document.getElementById("selectTeam2").addEventListener("click", function() {
    selectedTeam = 1;
    unselectTeams();
    this.classList.add("teamSelected");
});

document.getElementById("selectTeam3").addEventListener("click", function() {
    selectedTeam = 2;
    unselectTeams();
    this.classList.add("teamSelected");
});

function unselectTeams() {
    var teamList = document.getElementById("points").getElementsByTagName("h4");
    for(i=0; i<teamList.length; i++) (teamList[i].classList.remove("teamSelected"));
}

function incrementPoints(teamNr, score){
    points[teamNr] += score;
    int1.innerHTML = points[0];
    int2.innerHTML = points[1];
    int3.innerHTML = points[2];
}
function decrementPoints(teamNr, score){
    points[teamNr] -= score;
    int1.innerHTML = points[0];
    int2.innerHTML = points[1];
    int3.innerHTML = points[2];
}