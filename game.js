let canvas;
let ctx;
let start_game = document.getElementById("start_game_button");
let end_game = document.getElementById("end_game_button");
let base_r = 15;
let ball_list = [];
let elements_limit = 10;
let game_alphabet = [];
let last_request_id;
let correct_hit_count = 0;
let wrong_hit_count = 0;
let missed_hit_count = 0;
let background_music_player = new Audio("./sounds/game_music.mp3");
let start_pic_url = "./decorations/esipilt.jpg";
let end_pic_url = "./decorations/end_of_game.jpg";
let button_text;
let game_score = 0;
let player_name;
let player_name_field = document.getElementById("player_name");
let high_score_list = JSON.parse(localStorage.getItem('alphabet_top_score')) || [];
let top_10_page = document.getElementById("top_10_page");
let top_nr = 1;
let ball_quantity_field = document.getElementById("starting_ball_quantity");
let top_list_content = document.getElementById("top_list_content");

window.onload = function(){
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	draw_game_design_pic(start_pic_url);
	document.getElementById("background_music").addEventListener("change", prepare_music_player);
	document.getElementById("volume_slider").addEventListener("input", set_volume);
	document.getElementById("color_the_balls").addEventListener("change", change_ball_color);
	document.getElementById("top_10_list_button").addEventListener("click", display_top_list_page);
	start_game.addEventListener("click", init_game);
}


function draw_game_design_pic(url){
	let image = new Image();
	image.onload = function(){
		ctx.drawImage(image, 0, 89);
	}
	image.src = url;
}

function get_player_name(){
	player_name = player_name_field.value;
	if(player_name == ""){
		player_name = "anonüümne mängija";
		player_name_field.value = "anonüümne mängija";
	}
}

function init_game(){
	close_top_list_page();
	get_player_name();
	elements_limit = document.getElementById("starting_ball_quantity").value;
	end_game.style.display = "inline-block";
	end_game.addEventListener("click", end_current_game);
	show_score();
	add_elements();
	start_game.removeEventListener("click", init_game);
	start_game.addEventListener("click", pause_or_play_game);
	play_game();
}

function play_game(){
	canvas.addEventListener("mousedown", check_hits);
	start_game.innerHTML = "Paus";
	prepare_music_player();
}

function pause_or_play_game(){
	if(start_game.innerHTML == "Paus"){
		button_text = "Jätka";
		pause_game(button_text);
	} else if(start_game.innerHTML == "Jätka"){
		play_game();
		move_elements();
	}
}

function pause_game(button_text){
	start_game.innerHTML = button_text;
	cancelAnimationFrame(last_request_id);
	canvas.removeEventListener("mousedown", check_hits);
	prepare_music_player();
}

function end_current_game(){
	save_game_score();
	canvas.width = canvas.width;
	end_game.style.display = "none";
	button_text = "Alusta";
	pause_game(button_text);
	start_game.removeEventListener("click", pause_or_play_game);
	end_game.removeEventListener("click", end_current_game);
	draw_game_design_pic(end_pic_url);
	start_game.addEventListener("click", prepare_new_game);
}

function prepare_new_game(){
	start_game.removeEventListener("click", prepare_new_game);
	base_r = 15;
	ball_list = [];
	game_alphabet = [];
	last_request_id;
	correct_hit_count = 0;
	wrong_hit_count = 0;
	missed_hit_count = 0
	game_score = 0;
	init_game();
}



function add_elements(){
	game_alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "Š", "Z", "Ž", "T", "U", "V", "W", "Õ", "Ä", "Ö", "Ü", "X", "Y"];

	while(game_alphabet.length > elements_limit){
		let one_to_remove = Math.round(Math.random() * (game_alphabet.length - 1));
		game_alphabet.splice(one_to_remove, 1);
	}

	for(let i = 0; i < elements_limit; i ++){
		let x = canvas.width / 2;
		let y = canvas.height / 2;
		let r = base_r + Math.round(Math.random() * 15);
		let ball_color = get_ball_color();
		let symbol = game_alphabet[game_alphabet.length - 1 - i];
		ball_list.push(new Game_ball(x, y, r, symbol, ball_color));
	}
	move_elements();
}

function get_ball_color(){
	if(document.getElementById("color_the_balls").checked){
		ball_color = "hsl(" + Math.round(Math.random() * 360) + ", 100%, 50%)";
	} else{
		ball_color = "#FF00CC";
	}
	return ball_color;
}

function change_ball_color(){
	if(ball_list.length > 0){
		for(let i = 0; i < ball_list.length; i++){
			ball_list[i].ball_color = get_ball_color();
		}
	}
}

function move_elements(){
	canvas.width = canvas.width;

	for(let i = 0; i < ball_list.length; i ++){
		ball_list[i].move_self();
		ball_list[i].draw_self();
	}

	if(ball_list.length > 0){
		last_request_id = requestAnimationFrame(move_elements);
	} else {
		end_current_game();
	}
}



function check_hits(e){
	let clicked_on_ball = false;
	let mouse_x = e.clientX - canvas.offsetLeft + window.scrollX;
	let mouse_y = e.clientY - canvas.offsetTop + window.scrollY;

	for(let i = 0; i < ball_list.length; i ++){
		if(ball_list[i].was_hit(mouse_x, mouse_y)){
			clicked_on_ball = true;
			if(ball_list[i].symbol == game_alphabet[correct_hit_count]){
				ball_list.splice(i, 1);
				correct_hit_count ++;
				game_score += 10;
				break;
			} else {
				wrong_hit_count++;
				game_score -= 3;
			}
		}
	}
	if(!clicked_on_ball){
		missed_hit_count++;
		game_score -= 2;
	}
	show_score();
}

function pythagoras(ball_x, ball_y, mouse_x, mouse_y){
	return Math.sqrt(Math.pow(ball_x - mouse_x, 2) + Math.pow(ball_y - mouse_y, 2));
}

function show_score(){
	document.getElementById("correct_hits_field").innerHTML = correct_hit_count + " / " + elements_limit;
	document.getElementById("wrong_hits_field").innerHTML = wrong_hit_count;
	document.getElementById("missed_hits_field").innerHTML = missed_hit_count;
	document.getElementById("game_score").innerHTML = game_score;
}

function save_game_score(){
	let game_result = {
		name: player_name,
		score: game_score,
		letters: elements_limit
	}
	high_score_list.push(game_result);
	high_score_list.sort((a, b) => parseInt(b.score) - parseInt(a.score));
	localStorage.setItem("alphabet_top_score", JSON.stringify(high_score_list));
}

function display_top_list_page(){
	document.getElementById("close_top_10_button").addEventListener("click", close_top_list_page);
	ball_quantity_field.addEventListener("change", display_top_10);
	canvas.style.display = "none";
	top_10_page.style.display = "block";
	display_top_10();
}

function display_top_10(){
	let played_balls = ball_quantity_field.value;
	document.getElementById("qty_of_played_balls").innerHTML = played_balls;
	top_list_content.innerHTML = "";
	let has_results = 0;
	top_list_content.innerHTML += "<div>" + "Koht:" + "</div>" + "<div>" + "Mängija nimi:" + "</div>" + "<div>" + "Punktiskoor" + "</div>" + "<br>";

	for(let i = 0; i < high_score_list.length; i++){
		if(high_score_list[i].letters == played_balls){
			top_list_content.innerHTML += "<div>" + top_nr + "</div>" + "<div>" + high_score_list[i].name + "</div>" + "<div>" + high_score_list[i].score + "</div>" + "<br>";
			top_nr++;
			has_results = 1;
			if(top_nr == 11){
				break;
			}
		}
	}

	if(!has_results){
		display_no_results_note();
	}
	top_nr = 1;
}

function display_no_results_note(){
	top_list_content.innerHTML = "<p>" + "Ei ole tulemusi!" + "</p>" + "<br>";
	let not_found_img = new Image();

	not_found_img.onload = function(){
		top_list_content.innerHTML += '<img src="' + not_found_img.src + '" />';
	};
	not_found_img.src = "./decorations/not_found.jpg";
}

function close_top_list_page(){
	document.getElementById("close_top_10_button").removeEventListener("click", close_top_list_page);
	ball_quantity_field.removeEventListener("change", display_top_10);
	top_10_page.style.display = "none";
	canvas.style.display = "block";
}



function prepare_music_player(){
	if(document.getElementById("background_music").checked){
		document.getElementById("volume_slider").addEventListener("input", set_volume);
		if(start_game.innerHTML == "Jätka"){
			pause_music();
		} else if(end_game.style.display == "none"){
			stop_music();
		} else{
			play_music();
		}
	} else {
		stop_music();
	}
}

function set_volume(e){
	background_music_player.volume = e.target.value;
}

function play_music(){
	background_music_player.play();
	background_music_player.addEventListener("ended", play_music);
}

function pause_music(){
	background_music_player.pause();
	background_music_player.removeEventListener("ended", play_music);
}

function stop_music(){
	background_music_player.pause();
	background_music_player.currentTime = 0;
	background_music_player.removeEventListener("ended", play_music);
}



class Game_ball{
	constructor(x, y, r, symbol, ball_color){
		this.x = x;
		this.y = y;
		this.r = r;
		this.ball_color = ball_color;
		this.symbol = symbol;
		this.speed_x = 0;
		this.speed_y = 0;
		this.set_speed();
		this.draw_self();
	}
	
	set_speed(){
		while(this.speed_x == 0 && this.speed_y == 0){
			this.speed_x = 4 - Math.round(Math.random() * 8);
			this.speed_y = 4 - Math.round(Math.random() * 8);
		}
	}
	
	draw_self(){
		ctx.fillStyle = this.ball_color;
		ctx.beginPath();
			ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
			ctx.fill();
		ctx.closePath();
		ctx.fillStyle = "#FFFFFF";
		ctx.strokeStyle = "#444444";
		ctx.font = "bold " + Math.round(this.r * 1.4) + "px Verdana";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText(this.symbol, this.x, this.y + 2);
		ctx.strokeText(this.symbol, this.x, this.y + 2);
	}
	
	move_self(){
		this.x += this.speed_x;
		this.y += this.speed_y;
		
		if(this.x <= this.r || this.x >= canvas.width - this.r){
			this.speed_x *= -1;
		}
		if(this.y <= this.r || this.y >= canvas.height - this.r){
			this.speed_y *= -1;
		}
	}
	
	was_hit(mouse_x, mouse_y){
		return pythagoras(this.x, this.y, mouse_x, mouse_y) <= this.r;
	}
}