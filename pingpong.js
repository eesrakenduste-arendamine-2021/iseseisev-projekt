function newGame(){
    let pingPong = new PingPong();
}

class PingPong{
    constructor(){
        this.canvas = new fabric.Canvas("canvas");
        this.ball = new fabric.Rect();
        this.p1 = new fabric.Rect();
        this.p2 = new fabric.Rect();
        this.movementSpeed = 3.5;
        this.horizontalBallSpeed = 1.5;
        this.verticalBallSpeed = 1.5;
        this.leftScore = 0;
        this.rightScore = 0;
        this.maxScore = 3;
        this.reset = 0;
        this.animation;
        this.controller = {
            "KeyW": {pressed: false, func: "this.drawPlayerMovement(this.p1, 'up')"},
            "KeyS": {pressed: false, func: "this.drawPlayerMovement(this.p1, 'down')"},
            "ArrowUp": {pressed: false, func: "this.drawPlayerMovement(this.p2, 'up')"},
            "ArrowDown": {pressed: false, func: "this.drawPlayerMovement(this.p2, 'down')"}
        }
        this.render();
        this.init();
    }

    render(){
        this.drawBall();
        this.drawPlayers();
    }

    handleKeyDown(e){
        this.controller[e.code] && (this.controller[e.code].pressed = true);
    }

    handleKeyUp(e){
        this.controller[e.code] && (this.controller[e.code].pressed = false);
    }

    runPressedKeys(){
        Object.keys(this.controller).forEach(key=> {
            this.controller[key].pressed && eval(this.controller[key].func);
        })
    }

    init(){
        if(this.reset == 0){
            $(document).on("keydown", (e)=>this.handleKeyDown(e));
            $(document).on("keyup", (e)=>this.handleKeyUp(e));
            this.runPressedKeys();
            this.drawBallMovement();
            this.gameLoop();
        } else {

        }
        
    }

    gameLoop(){
        this.animation = window.requestAnimationFrame(() => {this.init(); }, 1000/60);
    }

    drawBall(){
        this.ball.set({
            "selectable": false,
            "evented": false,
            width: 20,
            height: 20,
            fill: "white",
            left: 630,
            top: 360
        })
        this.canvas.add(this.ball);
    }

    drawPlayers(){
        this.p1.set({
            "selectable": false,
            "evented": false,
            width: 20,
            height: 100,
            fill: "white",
            left: 50,
            top: 310
        })
        this.p2.set({
            "selectable": false,
            "evented": false,
            width: 20,
            height: 100,
            fill: "white",
            left: 1210,
            top: 310
        })
        this.canvas.add(this.p1, this.p2);
    }

    drawPlayerMovement(object, direction){
        var value = object.top;
        if(direction == "up" && this.playerBorderCollisionCheck(object) == false){
            object.set({top: value - this.movementSpeed})
        } else if(direction == "up" && this.playerBorderCollisionCheck(object) == true && object.top >= 620){
            object.set({top: value - this.movementSpeed})
        } else if(direction == "down" && this.playerBorderCollisionCheck(object) == false){
            object.set({top: value + this.movementSpeed})
        } else if(direction == "down" && this.playerBorderCollisionCheck(object) == true && object.top <= 0){
            object.set({top: value + this.movementSpeed})
        }
        this.canvas.requestRenderAll();
    }

    drawBallMovement(){
        this.ballScoreCheck();
        if(this.reset == 0){
            this.paddleCollisionCheck();
            this.ballBorderCollisionCheck();
            this.ball.left += this.horizontalBallSpeed;
            this.ball.top += this.verticalBallSpeed;
            this.canvas.requestRenderAll();
        } else {
            window.cancelAnimationFrame(this.animation);
        }
        
    }

    ballBorderCollisionCheck(){
        if(this.ball.top <= 0){
            this.verticalBallSpeed = Math.abs(this.verticalBallSpeed);
        } else if(this.ball.top >= 700){
            this.verticalBallSpeed = -this.verticalBallSpeed;
        }
    }

    ballScoreCheck(){
        if(this.ball.left >= 1260){
            this.leftScore += 1;
            if(this.leftScore == this.maxScore){
                this.reset = 1;
            }
            $("#left-score").html(this.leftScore);
            this.render();
        } else if(this.ball.left <= 0){
            this.rightScore += 1;
            if(this.rightScore == this.maxScore){
                this.reset = 1;
            }
            $("#right-score").html(this.rightScore);
            this.render();
        }
    }

    playerBorderCollisionCheck(object){
        if(object.top <= 0 || object.top >= 620){
            return true;
        }
        return false;
    }

    paddleCollisionCheck(){
        if(this.p1.left < this.ball.left + this.ball.width && this.p1.left + this.p1.width > this.ball.left && this.p1.top < this.ball.top + this.ball.height && this.p1.top + this.p1.height > this.ball.top){
            this.horizontalBallSpeed = Math.abs(this.horizontalBallSpeed);
        }
        if(this.p2.left < this.ball.left + this.ball.width && this.p2.left + this.p2.width > this.ball.left && this.p2.top < this.ball.top + this.ball.height && this.p2.top + this.p2.height > this.ball.top){
            this.horizontalBallSpeed = -this.horizontalBallSpeed;
        }
    }

}

newGame();