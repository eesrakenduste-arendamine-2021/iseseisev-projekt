const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");
const scoreElement = document.getElementById("score");

const ROW = 20;
const COL = 10;
const SQ = squareSize = 20;
const VACANT = "WHITE";

//ruut
function drawSquare(x, y, color){
  ctx.fillStyle = color;
  ctx.fillRect(x*SQ, y*SQ, SQ, SQ);
  
  ctx.strokeStyle = "BLACK";
  ctx.strokeRect(x*SQ, y*SQ, SQ, SQ);
}

//draw(0, 0, "red")
//mängu laud

let board = [];
for( r = 0; r <ROW; r++){
  board[r] = [];
  for(c = 0; c < COL; c++){
    board[r][c] = VACANT;
  }
}

//laua joonistamine

function drawBoard(){
  for( r = 0; r <ROW; r++){
    for(c = 0; c < COL; c++){
      drawSquare(c, r, board[r][c]);
    }
  }
}

drawBoard();

// tetrimiinod ja nende värvid

const PIECES = [
  [Z, "red"],
  [S, "green"],
  [T, "yellow"],
  [O, "blue"],
  [L, "purple"],
  [I, "cyan"],
  [J, "orange"]
];
//Genereeri tetromiino

function randomPiece(){
  let r = randomN = Math.floor(Math.random() * PIECES.length)
  return new Piece(PIECES[r][0], PIECES[r][1]);
}
// esimene tetromiino

let p = randomPiece();

// tetremiino

function Piece(tetromino, color){
  this.tetromino = tetromino;
  this.color = color;

  //tetrominoN = tetromino number

  this.tetrominoN = 0; // alustame esimesest tetremiinost
  this.activeTetromino = this.tetromino[this.tetrominoN];

  //aktiivse tetromino juhtimiseks
  this.x=0;
  this.y=0;

}

// fill funktsioon

Piece.prototype.fill = function(color){
  for( r = 0; r < this.activeTetromino.length; r++){
    for(c = 0; c < this.activeTetromino.length; c++){
      // joonistame ainult okupeeritud ruudud
      if (this.activeTetromino[r][c]){
        drawSquare(this.x + c, this.y + r, color);
      }
    }
  }
}

// joonista tetromiino lauale

Piece.prototype.draw = function(){
  this.fill(this.color);
}

// kustuta liikuva tetromiino eelmine asukoht

Piece.prototype.unDraw = function(){
  this.fill(VACANT);
}

// liigu alla
Piece.prototype.moveDown = function(){
  if (!this.collison(0, 1, this.activeTetromino)){
    this.unDraw();
    this.y++;
    this.draw();
  }else{
    // lukusta tetromiino
    this.lock();
    p = randomPiece();
  }
}

// liigu paremale
Piece.prototype.moveRight = function(){
  if (!this.collison(1, 0, this.activeTetromino)){
    this.unDraw();
    this.x++;
    this.draw();
  }

}

// liigu vasakule
Piece.prototype.moveLeft = function(){
  if (!this.collison(-1, 0, this.activeTetromino)){
    this.unDraw();
    this.x--;
    this.draw();
  }
}

// p22ra
Piece.prototype.rotate = function(){
  let nextPattern = this.tetromino[(this.tetrominoN + 1)%this.tetromino.length];
  let kick = 0;

  if(!this.collison(0, 0, nextPattern)){
    if(this.x > COL/2){
      //parem sein
      kick = -1;// liiguta vasakule
    }else{
      kick = 1;//liiguta paremale
    }
  }
  if(!this.collison(0, 0, nextPattern)){
    this.unDraw();
    this.x +=kick;
    this.tetrominoN = (this.tetrominoN + 1)%this.tetromino.length;
    this.activeTetromino = this.tetromino[this.tetrominoN];
    this.draw();
  }
}

// Kokkupõrge 
Piece.prototype.collison = function(x, y, piece){
  for( r = 0; r < piece.length; r++){
    for(c = 0; c < piece.length; c++){
      //kui ruut on tühi jätame vahele
      if(!piece[r][c]){
        continue;
      }
      // koordinaadid pärast liikumist
      let newX = this.x + c + x;
      let newY = this.y + r + y;

      //koordinaadid
      if(newX < 0 || newX >= COL || newY >= ROW){
        return true;
      }
      //  newY < 0; Board[-1] - m2ng jooksis kokku
      if (newY < 0){
        continue;
      }
      // kas on kinnine tetromiino ees
      if (board[newY][newX] != VACANT){
        return true;
      }
    }
  }
  return false;
}
let score =0;

Piece.prototype.lock = function(){
  for( r = 0; r < this.activeTetromino.length; r++){
    for(c = 0; c < this.activeTetromino.length; c++){
      // j2tan vahele t2hja ruudu
      if (!this.activeTetromino[r][c]){
        continue;
      }
      // m2ng l2bi- tetrimiino lukustub lage puudutades
      if(this.y + r < 0){
        alert("Game Over");
        gameOver= true;
        break;
      }
      //lukustan tetromiino
      board[this.y+r][this.x+c]= this.color;
    }
  }
  //eemalda t2is rida
  for(r= 0; r < ROW; r++){
    let isRowFull = true;
    for(c = 0; c < COL; c++){
      isRowFull = isRowFull && (board[r][c] != VACANT);
    }
    if(isRowFull){
      //k2ik read 1 rea v2rra alla
      for(y= r; y > 1; y--){
        for(c = 0; c < COL; c++){
          board[y][c]= board[y-1][c]
        }
      }
      // 2lemine rida kadus seega uus
      for(c = 0; c < COL; c++){
        board[y][c]= VACANT;
      }
      // punkte juurde
      score += 10;
    }
  }
  drawBoard();
  scoreElement.innerHTML = score;
}

//kasutaja kontrollid
document.addEventListener("keydown",CONTROL);

function CONTROL(event){
  if(event.keyCode == 37){
    p.moveLeft();
    dropStart = Date.now();
  }else if(event.keyCode == 38){
    p.rotate();
    dropStart = Date.now();
  }else if(event.keyCode == 39){
    p.moveRight();
    dropStart = Date.now();
  }else if(event. keyCode == 40){
    p.moveDown();
    dropStart = Date.now();
  }
}

// tetromiino alla tikkumine

let dropStart = Date.now();
let gameOver= false;
function drop(){
  let now = Date.now();
  let delta = now - dropStart;
  if(delta > 1000){
    p.moveDown();
    dropStart = Date.now();
  }
  if(!gameOver){
    requestAnimationFrame(drop);
  }
}

drop();
