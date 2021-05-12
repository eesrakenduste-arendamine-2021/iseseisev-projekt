const container = document.getElementById("container");
let startBtn = document.getElementById('start_btn');
const container_w = container.clientWidth;
const container_h = container.clientWidth;
const r_max = 3;
const col_max = 3;
const piece_w = Math.round(container_w / col_max);
const piece_h = Math.round(container_h / r_max);

const MOVES = { RIGHT: 1, LEFT: 2, UP: 3, DOWN: 4};
const shuffle_count = 150;
const start_pieceid = 0;
let pieces = [];
let empty_piece = null;
let x_pos = null; let y_pos = null;
let _isMoving = false;

startBtn.addEventListener('click', start);
document.getElementById("msg").innerHTML = "Press start to begin!";
init();

function start(){
  document.getElementById("msg").innerHTML = "Click on pieces to move them. Good luck! Try hard! I believe in you!";
  startBtn.innerHTML = 'Restart';

  for(let i = 0; i < r_max; i++){
    for(let j = 0; j < col_max; j++){
      let piece = pieces[i][j];
      if(piece.getAttribute('piece_id') !== start_pieceid.toString()){
        piece.addEventListener('click', move);
      }
    }
  }
  blink(empty_piece);
}

function init(){

  let count = 0;
  for(let i = 0; i < r_max; i++){
    let row = [];
    for(let j = 0; j < col_max; j++){
      let piece = document.createElement('div');
      container.appendChild(piece);
      piece.setAttribute("piece_id", count); 
      piece.style.height = piece_h + "px";
      piece.style.width = piece_w + "px";
      piece.style.left = i * piece_w + "px";
      piece.style.top = j * piece_h + "px";
      piece.className = 'piece';
      piece.style.backgroundPositionX = `-${i * piece_w}px`;
      piece.style.backgroundPositionY = `-${j  *piece_h}px`;

      if(count === start_pieceid){
        empty_piece = piece;
        x_pos = i; y_pos = j;
      }

      row.push(piece);
      count++; 
    }
    pieces.push(row);
  }
}

function shuffle(){
  let curx_pos = x_pos;
  let cury_pos = y_pos;
  let prev_move;

for(let i = 0; i < shuffle_count; i++){
  let move_choice = checkAvailableMoves(curx_pos, cury_pos, prev_move);
  let move = chooseRandomMove(move_choice);
  let new_pos = shuffleMove(move, curx_pos, cury_pos);
  prev_move = move;
  curx_pos = new_pos.x;
  cury_pos = new_pos.y;
  }
}

function move(e){
  let cur_piecex_pos = this.offsetLeft/piece_w;
  let cur_piecey_pos = this.offsetTop/piece_h;
  let emptypiece_curx_pos = empty_piece.offsetLeft/piece_w;
  let emptypiece_cury_pos = empty_piece.offsetTop/piece_h;

if(cur_piecex_pos !== emptypiece_curx_pos && cur_piecey_pos !== emptypiece_cury_pos){
  return;
}

if(Math.abs(emptypiece_curx_pos - cur_piecex_pos) > 1 || Math.abs(emptypiece_cury_pos - cur_piecey_pos) > 1 ){
  return;
}

if(_isMoving){
  return ;
}

_isMoving = true;

let new_x = this.offsetLeft + (emptypiece_curx_pos - cur_piecex_pos) * piece_w;
let new_y = this.offsetTop + (emptypiece_cury_pos - cur_piecey_pos) * piece_h;

let change = pieces[cur_piecex_pos][cur_piecey_pos];
pieces[cur_piecex_pos][cur_piecey_pos] = pieces[emptypiece_curx_pos][emptypiece_cury_pos];
pieces[emptypiece_curx_pos][emptypiece_cury_pos] = change;  

TweenMax.to(this, 0.4, { left: new_x, top: new_y,
    onComplete: () =>{
    setEmptyPiecePos(cur_piecex_pos,cur_piecey_pos);
    checkIfWon(); 
    _isMoving = false;
  }
});
}

function setEmptyPiecePos(x,y){
  let left = x * piece_w;
  let top = y * piece_h;
  empty_piece.style.left = `${left}px`;
  empty_piece.style.top = `${top}px`;
}

function checkIfWon(){
  let won = true;
  let count = 0;

  for(let i = 0; i < r_max; i++){
    for(let j = 0; j < col_max; j++){
      let piece = pieces[i][j];
      if(won && piece.getAttribute("piece_id") !== count.toString()){
        won = false;
      }
      count++;
    }
}

if(won){
  congratulations();
  }
}

function congratulations() {
  document.getElementById("msg").innerHTML = "You won! Good job, congratulations!";
  pieces.forEach((row) =>{
    row.forEach((piece) =>{
      piece.removeEventListener('click', move);
    })
  });
  empty_piece.classList.add('piece');
  TweenMax.to(empty_piece, 0.2, { 
    opacity: 0, 
    repeat: 3,
    delay: 0.2,
    onComplete: () =>{
      TweenMax.set(empty_piece, {opacity: 1});
    },
  });
}

function checkAvailableMoves(x,y, prevMove){
  let moves = [];
  if(x !== 0 && prevMove !== MOVES.LEFT){
    moves.push(MOVES.LEFT);
  }
  if (x !== col_max-1 && prevMove !== MOVES.RIGHT){
    moves.push(MOVES.RIGHT);
  }
  if(y !== 0 && prevMove !== MOVES.UP){
    moves.push(MOVES.UP);
  }
  if(y !== r_max-1 && prevMove !== MOVES.DOWN){
    moves.push(MOVES.DOWN);
  }
  return moves;
}


function chooseRandomMove(moves){
  let moves_nr = moves.length;
  let move_index = getRandomInt(0,(moves_nr - 1));
  return moves[move_index];
}

function shuffleMove(move, x, y){
  let new_x = x;
  let new_y = y;
  switch(move){
    case MOVES.RIGHT:
      new_x = x + 1;
      break;
    case MOVES.LEFT:
      new_x = x - 1;
      break;
    case MOVES.UP:
      new_y = y - 1;
      break;
    case MOVES.DOWN:
      new_y = y + 1;
      break;
}

  let change = pieces[new_x][new_y];
  pieces[new_x][new_y] = pieces[x][y];
  pieces[x][y] = change;  

  pieces[new_x][new_y].style.left = new_x * piece_w + "px";
  pieces[new_x][new_y].style.top = new_y * piece_w + "px";
  pieces[x][y].style.left = x * piece_w + "px";
  pieces[x][y].style.top = y * piece_w + "px";

  return {x: new_x, y: new_y};
}

function getRandomInt(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function blink(piece){
  let tween = TweenMax.to(piece, 0.4,{ 
    opacity: 0, 
    repeat: 3,
    delay: 0.4,
    onComplete: () =>{
      piece.classList.remove('piece');
      piece.classList.add('empty-piece');
      TweenMax.set(piece, {opacity: 1});
      shuffle();
    },
  }); 
}
