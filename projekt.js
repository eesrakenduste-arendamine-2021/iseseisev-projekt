$(document).ready(function(){
    var gameCoordComp = []; //koordinaadid mida arvuti saab proovida

    var coordPlayer = []; //laevade koordniaadid + ümbritsevad
    var coordComp = []; //arvuti laevade koordinaadid + ümbritsevad
    
    var shipPlayer = []; //mängija laevade koordinaadid
    var shipComp = []; //arvuti laevade koordinaadid

    var delayInMilliseconds = 750; //delayb arvuti käiku 
    let Nofships = 0; //mängija laevade counter
    //var ship = [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]];

    $("button.comp").attr("disabled", true);

    for(let i=10; i<17; i++){ 
        for(let u=0; u<7; u++){
            gameCoordComp.push(i+" "+u);
        }
    }

    function randInt(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    $('.own').on('click', function(){ //mängija tekitab endale mängulaua
        //console.log(this.id);
        //console.log(Nofships);
        //console.log(row, column);
        let id = this.id;
        let newID = id.split(" ");
        let row = parseInt(newID[0]);
        let column = parseInt(newID[1]);

        if(!coordPlayer.includes(row+" "+column)){ //kontroll, et laevad ei asuks üksteise kõrval
            shipPlayer.push(row+" "+column);
            coordPlayer.push(row+" "+column);
            coordPlayer.push(row+1+" "+column);
            coordPlayer.push(row-1+" "+column);
            coordPlayer.push(row+" "+(column+1));
            coordPlayer.push(row+" "+(column-1));
            document.getElementById(this.id).style.backgroundColor = "rgb(51,255,100)";
            document.getElementById(this.id).style.border = "none";
            Nofships++;
            $("#Nofships").text(Nofships);
        }
        //console.log(crntPlayerShip);
        if(Nofships>6){
            $(function(){
                $("button.own").attr("disabled", true);
                $("button.comp").attr("disabled", false);
            });
        }
    })

    while(coordComp.length<35){ //tekitab 7 laeva, ja ümbritsevad ruudud (4*7)
        let n1 = randInt(0,6);
        let n2 = randInt(0,6);
        //console.log(n1, n2);
        if(!coordComp.includes(n1+" "+n2)){ //
            //ship[n1].splice([n2], 1, 1); //paneb 2d arraysse "1" kus on laev
            shipComp.push(n1+" "+n2); //paneb laevade koordinaadid arraysse
            coordComp.push(n1+" "+n2); //paneb laevade koordinaadid ja ümbritsevad ruudud arraysse
            coordComp.push(n1+1+" "+n2);
            coordComp.push(n1-1+" "+n2);
            coordComp.push(n1+" "+(n2+1));
            coordComp.push(n1+" "+(n2-1));
        }
        //console.log(crntShip);
    }
    //console.table(ship);
    
    /* function indeksid() { //leiab 2d arrayst indeksid kus laevad asuvad, hetkel ei kasuta
        var r; //row
        var c; //column
        let i = 0;
        while(i<7){
            for (r = 0; r < ship.length; ++r){
                const row = ship[r];
                for (c = 0; c < row.length; ++c){
                    if (ship[r][c] == 1) {
                        //console.log(r, c);
                        let id = r +" "+ c;
                        //document.getElementById(id).style.backgroundColor = "rgb(26, 0, 110)";
                    }
                }
            }
            i++;
        }
    }  */
    
    function deleteFromArray(array, value){ //kustutab arrayst elemente
        let index = array.indexOf(value);
        if (index > -1) {
            array.splice(index, 1);
        }
    }
    
    
    $('.comp').on('click', function(){ 
        //console.log("player turn");
        //player
        $("#Pturn").text("Computer turn");
        $("#Cturn").text("");
        
        if(shipComp.includes(this.id)){ //kui id on arvuti laevade arrays olemas
            document.getElementById(this.id).style.backgroundColor = "rgb(26,0,110)";
            document.getElementById(this.id).disabled = true;
            deleteFromArray(shipComp, this.id);
        }else{
            document.getElementById(this.id).style.backgroundColor = "rgb(100,0,0)";
            document.getElementById(this.id).style.border = "none";
            document.getElementById(this.id).disabled = true;
        }
        //console.log(this.id);
        if(shipComp.length === 0){ //kui arvuti laevade array saab tühjaks, on mängija võitnud ja funktsioon lõpetab
            $("button.comp").attr("disabled", true);
            $("#Cturn").text("You won!");
            $("#Pturn").text("");
            return;
        }


        setTimeout(function() { //delay
            //console.log("comp turn");
            //arvuti
            $("#Cturn").text("Player turn");
            $("#Pturn").text("");
            let randomSquare = randInt(0,gameCoordComp.length-1); //genereerib random id'd mängija lauale
            console.log(randomSquare);
            let square = gameCoordComp[randomSquare];
            //console.log(n1, n2);
            console.log(square);
            if(shipPlayer.includes(square)){ //kui id on mängija laevade arrays olemas
                //color button
                //console.log(0);
                //shipPlayer
                //gameCoordComp
                document.getElementById(square).style.backgroundColor = "rgb(26,0,110)";
                var res = square.split(" ");
                //console.log(res);
                let r = parseInt(res[0]);
                let c = parseInt(res[1]);
                gameCoordComp.splice(gameCoordComp.indexOf(r+" "+c), 1);
                if(gameCoordComp.includes((r+1)+" "+c)){gameCoordComp.splice(gameCoordComp.indexOf((r+1)+" "+c), 1);}
                if(gameCoordComp.includes((r-1)+" "+c)){gameCoordComp.splice(gameCoordComp.indexOf((r-1)+" "+c), 1);}
                if(gameCoordComp.includes(r+" "+(c+1))){gameCoordComp.splice(gameCoordComp.indexOf(r+" "+(c+1)), 1);}
                if(gameCoordComp.includes(r+" "+(c-1))){gameCoordComp.splice(gameCoordComp.indexOf(r+" "+(c-1)), 1);}
                deleteFromArray(shipPlayer, square);
            }else{
                //console.log(1);
                document.getElementById(square).style.backgroundColor = "rgb(100,0,0)";
                document.getElementById(square).style.border = "none";
                gameCoordComp.splice(gameCoordComp.indexOf(square), 1);
                
            }
            console.log(gameCoordComp);

            console.log(shipPlayer);
        }, delayInMilliseconds);
        if(shipPlayer.length === 0){ //kui mängija laevade array on tühi, on arvuti võitnud
            $("button.comp").attr("disabled", true);
            $("#Pturn").text("Computer won!");
            $("#Cturn").text("");
            return;
        }
    })

})
