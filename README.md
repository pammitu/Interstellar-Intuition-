# Interstellar-Intuition-
Project 1 with General Assembly
For my project this week I decided to create a Concentration/Memory Game. This will be a single player game and it will have a set of 20 masked cards, player will ‘flip’ over two cards at the same time to reveal the image on them. If the cards match, the pair will remain face up and the player earns points if they do not match the player will get a notification saying it’s a wrong guess and the chosen cards will flip back over. The player will receive 100 points for each correct pair and they will lose 10 points for every incorrect guess however, if they have a total of 6 “bad guesses” in a row they automatically lose the game. In order to win the game the player will need to successfully reveal all 20 cards!

Here is my pseudo-code!
1. Player clicks the start button to initialize the game.
2.The board begins with all of the tiles flipped down to hide the images
-There is an array created of 20 cards with a total of ten matching pairs of images
-Initialize variables for the player’s score, the # of matched pairs, the # of incorrect guesses and one to indicate if a  card is currently flipped over
3.Loop until all of the cards have been matched or if the player has made 6 consecutive incorrect guesses
-Allow the player to select two cards to flip over to reveal the image
4.If the pair matches, leave the pair face up and add 100 points to the player’s score
5.If the cards do not match, flip them back over and count it as a bad guess
-Display a notification to the player, deduct ten points from the score and add to the total amount of bad guesses
6.Win Logic: If all the cards have been matched (10 pairs total) and reveals all 20 cards, display a message to the player - they have won and their final score
-Use variable to keep track of the number of matched cards
7.If the player has made 6 bad guesses, display a message to the player that they have lost and what their final score is.
8.Ask the player if they want to play again.
