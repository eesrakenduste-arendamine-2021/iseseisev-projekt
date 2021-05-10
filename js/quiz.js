function check(){
	
    var score = 0;

    var q1 = document.quiz.qu1.value;
    var q2 = document.quiz.qu2.value;
    var q3 = document.quiz.qu3.value;
    var q4 = document.quiz.qu4.value;
    var q5 = document.quiz.qu5.value;
    var q6 = document.quiz.qu6.value;
    var q7 = document.quiz.qu7.value;
    var q8 = document.quiz.qu8.value;
    var q9 = document.quiz.qu9.value;
    var q10 = document.quiz.qu10.value;

    var result = document.getElementById('result');

    if(q1 == "Marss"){score++}
    if(q2 == "1918"){score++}
    if(q3 == "Washington"){score++}
    if(q4 == "Paisub"){score++}
    if(q5 == "Colt"){score++}
    if(q6 == "Bezos"){score++}
    if(q7 == "Lic"){score++}
    if(q8 == "24j"){score++}
    if(q9 == "2004"){score++}
    if(q10 == "Luts"){score++}  
	
	document.getElementById("quiz").style.visibility ='hidden';
	document.getElementById('end').style.visibility = 'visible';

    if(score <= 3){ 
        result.textContent =  `Teie tulemus on ${score}. Võibolla järgmine kord õnnestub paremini.. `;
		document.body.style.background = "red";
		document.body.style.color = "white";
    }
	
    else if(score <= 5){
        result.textContent = `Teie tulemus on ${score}. Pole üldse paha. `;
		document.body.style.background = "blue";
		document.body.style.color = "white";		
    }    
	
    else if(score <= 8){ 
        result.textContent = `Teie tulemus on ${score}. Väga hea tulemus! `; 
		document.body.style.background = "purple";	
		document.body.style.color = "white";
		
    }else{
        result.textContent = `Teie tulemus on ${score}. Ideaalne! `;
		document.body.style.background = "green";
		document.body.style.color = "white";
    }
		
}
