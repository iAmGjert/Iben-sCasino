# poker-app

<!-- description of the app -->
[] Digital Poker App to replace Video Poker Machines.
[] Stop wasting money on poker at the bar.
[] Great U/X design to play poker.
[] Better than Casino Apps and Video Poker Machines.
  
<!-- features -->
[] Card API to play the game.  
[] user can play blackjack and texas hold em against the computer
[] profile displaying user information
[] Search for Users and follow friends

<!-- steps for setup, dependencies -->
[] need to have Mysql and Node and Nodemon installed
[] clone repo from https://github.com/AlTreJoe/poker-app.git
[] In the root directory of the repo, create a .env file.  it should contain: 
  NODE_ENV=development
  GOOGLE_CLIENT_SECRET='-----'
  CLIENT_ID='----'
  SESSION_SECRET='---'
-where GOOGLE_CLIENT_SECRET and CLIENT_ID come from the api console for google passport (https://console.cloud.google.com/apis/dashboard) after creating credentials.
-SESSION_SECRET is a string of your choosing for cookies.  
[]create a db in mysql called poker_database
  -if you alter the structure of this db, you will need to drop it and recreate it. 
[] npm install ----in the root directory of the repo
[] npm run dev  ---- in the root directory of the repo
[] then you can run npm start and the server should spin up and the project should be usable on your local machine

<!-- Login and User Profile -->
[] user should see a signup and login display when site loads
[] Set up google authentication(passport)
[] make database request to check user status(i.e. if not a user: set up cookies/ session, if user: access cookie and login)
[] when user logs in, user profile should display
[] user should see username, bankroll(monies), city, baller status(i.e. high roller), friends category
[] user profile has a game log with how much they won


<!-- BlackJack -->

[]  blackjack game to play computer
[] this makes use of the free api https://deckofcardsapi.com/  for shuffling and tracking hands 
[] Use Card API for shuffling, drawing, and displaying cards
[] Update user database with bankroll after game is played

<!-- Poker -->
[] can play very basic texas hold em against the computer.  limitations are you can only raise once.  
[] this also uses the deck of cards api.  but most of the hands are tracked on the db instead
[] each game of poker creates an entry in PokerGames db.  
[] finding the best hands uses a poker solver library.  be aware that the documentation can be misleading.  https://github.com/goldfire/pokersolver


<!-- Search for Users and Add Friends -->
[] Button to click for User Searchbar
[] Display Searchbar for Users
[] Check database to see if user exists, Add friend to friend database if it does not exist
[] Delete broke friends from friend list and database


<!-- Profile and authentication -->
[] uses google passport oauth2.  you will need to create credentials on the google api dashboard
[] stores user info in the User table in the db
[] Sessions are handled with express-session and google passport provides methods to serialize and deserialize cookies to keep track of users





<!-- Deployment w/ AWS -->



