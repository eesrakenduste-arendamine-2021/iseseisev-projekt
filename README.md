Iseseisev projekt<br>
Teema: SLIDER PUZZLE<br>
Autor: Sofia Geroiskaja<br>

Funktsionaalsus:<br>
Minu mänguleht koosneb siis pealkirjast, sõnumist mis muutub mängu jooksul, puzzlest ja start/restart nuppust.<br>
Kasutasin ka sellist library nagu TweenMax (TweenMax võimaldab animeerida mis tahes objekti, mida JavaScript saab puudutada). Vaatasin ka paar videot et aru saada kuidas projekti teha: https://www.youtube.com/watch?v=2eFcrXqrYPk ja https://www.youtube.com/watch?v=s-nPR9-ham8.<br>
Ma kirjutasin funktsioonid nagu start(),init(),shuffle(),move(),setEmptyPiecePos(),checkIfWon(),congratulations(),checkAvailableMoves(),chooseRandomMove(),shuffleMove(),getRandomInt() ja blink(). Esiteks siis mängija näeb sõnumit "Press start to begin!" ja kui ta vajutab nuppu siis nuppu tekst on "Restart" ja sõnum on "Click on pieces to move them. Good luck! Try hard! I believe in you!" ja kui ta võidab siis "You won! Good job, congratulations!". TweenMax kasutasin selleks et empty_piece animeerida. Kui mäng algab siis empty_piece kaob ära ja kui mängija võidab siis see tuleb tagasi. Kõiki teisi funktsioone kasutasin selleks et leida vaba koht kuhu puzzle_pice saab liikuda ja selleks et seda liigutada.

<img width="975" alt="puzzle" src="https://user-images.githubusercontent.com/70939482/117961244-92536480-b326-11eb-9dc8-5c79b1448333.png">
<img width="968" alt="puzzle1" src="https://user-images.githubusercontent.com/70939482/117961247-941d2800-b326-11eb-95ec-76296b4c5b7e.png">
