Iseseisev projekt<br>
Teema: SLIDER PUZZLE<br>
Autor: Sofia Geroiskaja<br>

Funktsionaalsus:<br>
Minu mänguleht koosneb pealkirjast, sõnumist mis muutub mängu jooksul, puzzlest, start/restart ja moves nuppudest.<br>
Kasutasin ka sellist library nagu TweenMax (TweenMax võimaldab animeerida mis tahes objekti, mida JavaScript saab puudutada). Vaatasin ka paar videot et aru saada kuidas projekti teha: https://www.youtube.com/watch?v=2eFcrXqrYPk ja https://www.youtube.com/watch?v=s-nPR9-ham8.<br>
Ma kirjutasin funktsioonid nagu start(),init(),shuffle(),move(),setEmptyPiecePos(),checkIfWon(),congratulations(),checkAvailableMoves(),chooseRandomMove(),shuffleMove(),getRandomInt() ja blink(). Alguses mängija näeb sõnumit "Press start to begin!" ja kui ta vajutab nuppu siis nuppu tekst on "Restart" ja sõnum on "Click on pieces to move them. Good luck! Try hard! I believe in you!" ja kui ta võidab siis "You won! Congratulations! You made it in ... moves". TweenMax kasutasin selleks et empty_piece animeerida. Kui mäng algab siis empty_piece kaob ära ja kui mängija võidab siis see tuleb tagasi. Kõiki teisi funktsioone kasutasin selleks et leida vaba koht kuhu puzzle_pice saab liikuda ja selleks et seda liigutada. Mängu jooksul iga kord kui puzzle_piece liigub muutub moves number mida näeb mängija

<img width="1106" alt="puzzlegame1" src="https://user-images.githubusercontent.com/70939482/117965576-9930a600-b32b-11eb-99ac-b09e09fa2290.png">
<img width="962" alt="puzzlegame" src="https://user-images.githubusercontent.com/70939482/117965581-9a61d300-b32b-11eb-8e4f-3ea9c78a52d9.png">
<img width="972" alt="puzzlegame3" src="https://user-images.githubusercontent.com/70939482/117966955-317b5a80-b32d-11eb-8e84-18e56e25c151.png">
