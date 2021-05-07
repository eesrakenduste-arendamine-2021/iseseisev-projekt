//kogu JS on ise kirjutatud
const arvutivalik = ["kivi", "paper","k22rid","kivi", "paper","k22rid"];

function k2ik(k2si){
    console.log("-------------------");
    var pScore = document.getElementById('playerScore').innerHTML;
    var cScore = document.getElementById('computerScore').innerHTML;
    var tieScore = document.getElementById('tieScore').innerHTML;
    
    var x = Math.floor(Math.random()* 6);     
    var arvutik2ik = arvutivalik[x];
    console.log("Player: "+k2si);
    console.log("Computer: "+arvutik2ik);

    if(k2si == arvutik2ik){
        console.log("Viik!");
        var integer = parseInt(tieScore, 10);
        document.getElementById('tieScore').innerHTML = integer+1;
        if(k2si == 'kivi'){
            document.getElementById("playerchoice").className = "fas fa-hand-rock"; 
            document.getElementById("computerchoice").className = "fas fa-hand-rock";
        }else if(k2si == 'paber'){
            document.getElementById("playerchoice").className = "fas fa-hand-paper"; 
            document.getElementById("computerchoice").className = "fas fa-hand-paper";
        }else if(k2si == 'k22rid'){
            document.getElementById("playerchoice").className = "fas fa-hand-scissors"; 
            document.getElementById("computerchoice").className = "fas fa-hand-scissors";
        }

    }else if(k2si == 'kivi'){
        if(arvutik2ik == "k22rid"){
            console.log("sa valisid kivi ja arvuti valis k22rid!");
            var integer = parseInt(pScore, 10);
            document.getElementById('playerScore').innerHTML = integer+1;

            document.getElementById("playerchoice").className = "fas fa-hand-rock"; 
            document.getElementById("computerchoice").className = "fas fa-hand-scissors"; 
        }else{
            console.log("sa valisid kivi ja arvuti valis paberi!");
            var integer = parseInt(cScore, 10);
            document.getElementById('computerScore').innerHTML = integer+1;

            document.getElementById("playerchoice").className = "fas fa-hand-rock"; 
            document.getElementById("computerchoice").className = "fas fa-hand-paper"; 
        }

    }else if(k2si == 'paper'){
        if(arvutik2ik == "kivi"){
            console.log("sa valisid paberi ja arvuti valis kivi!");
            var integer = parseInt(pScore, 10);
            document.getElementById('playerScore').innerHTML = integer+1;

            document.getElementById("playerchoice").className = "fas fa-hand-paper"; 
            document.getElementById("computerchoice").className = "fas fa-hand-rock"; 
        }else{
            console.log("sa valisid paberi ja arvuti valis k22rid!");
            var integer = parseInt(cScore, 10);
            document.getElementById('computerScore').innerHTML = integer+1;

            document.getElementById("playerchoice").className = "fas fa-hand-paper"; 
            document.getElementById("computerchoice").className = "fas fa-hand-scissors"; 
        }

    }else if(k2si== 'k22rid'){
        if(arvutik2ik == "paber"){
            console.log("sa valisid k22rid ja arvuti valis paberi!");
            var integer = parseInt(pScore, 10);
            document.getElementById('playerScore').innerHTML = integer+1;

            document.getElementById("playerchoice").className = "fas fa-hand-scissors"; 
            document.getElementById("computerchoice").className = "fas fa-hand-paper"; 
        }else{
            console.log("sa valisid k22rid ja arvuti valis kivi!");
            var integer = parseInt(cScore, 10);
            document.getElementById('computerScore').innerHTML = integer+1;

            document.getElementById("playerchoice").className = "fas fa-hand-scissors"; 
            document.getElementById("computerchoice").className = "fas fa-hand-rock"; 
        }
    }
}
