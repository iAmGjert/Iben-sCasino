# Iben's Casino
Casino app to replicate casino games!

# Description
Iben's Casino was designed to replicate different casino games to give the user the rush of gambling without leaving the comfort of their own home, or losing all their money! Upon logging into our application you'll have access to three different types of casino games: blackjack, texas hold-em, and roulette. Players are given $1,000 upon account creation and also a $200 reward as a daily login bonus. The app has some social features, allowing users to add other players and chat with them live. Recently played poker games are displayed for everyone to see in the social screen.

# Application 
Entertainment/Games/Gambling

# Dependencies 
```
"dependencies":
        "@emotion/react": "^11.9.0",
        "@emotion/styled": "^11.8.1",
        "@fortawesome/fontawesome-svg-core": "^1.3.0-beta2",
        "@fortawesome/free-regular-svg-icons": "^6.0.0-beta2",
        "@fortawesome/free-solid-svg-icons": "^6.0.0-beta2",
        "@material-ui/core": "^4.12.4",
        "@mui/material": "^5.8.2",
        "@mui/styled-engine-sc": "^5.8.0",
        "axios": "^0.21.4",
        "cookie-parser": "^1.4.5",
        "cookie-session": "^1.4.0",
        "core-js": "^3.18.0",
        "cors": "^2.8.5",
        "cross-env": "^7.0.3",
        "dotenv": "^10.0.0",
        "express-session": "^1.17.2",
        "font-awesome": "^4.7.0",
        "html-webpack-plugin": "^5.3.2",
        "install": "^0.13.0",
        "material-table": "^1.69.3",
        "mysql": "^2.18.1",
        "mysql2": "^2.3.0",
        "node-cron": "^3.0.0",
        "npm": "^7.24.1",
        "passport": "^0.5.0",
        "passport-google-oauth20": "^2.0.0",
        "path": "^0.12.7",
        "pokersolver": "^2.1.4",
        "process": "^0.11.10",
        "react": "^17.0.2",
        "react-dom": "^17.0.2",
        "react-fontawesome": "^1.7.1",
        "react-google-login": "^5.2.2",
        "react-router": "^5.2.1",
        "react-router-dom": "^5.3.0",
        "react-wheel-of-prizes": "^1.0.9",
        "regenerator-runtime": "^0.13.9",
        "rimraf": "^3.0.2",
        "sequelize": "^6.6.5",
        "socket.io-client": "^4.5.1",
        "styled-components": "^5.3.5",
        "timeago.js": "^4.0.2",
        "underscore-node": "^0.1.2"
"devDependencies": 
        "@babel/cli": "^7.15.7",
        "@babel/core": "^7.15.5",
        "@babel/preset-env": "^7.15.6",
        "@babel/preset-react": "^7.14.5",
        "@types/core-js": "^2.5.5",
        "@types/regenerator-runtime": "^0.13.1",
        "babel-loader": "^8.2.2",
        "dotenv-webpack": "^7.1.0",
        "express": "^4.17.1",
        "file-loader": "^6.2.0",
        "sequelize-cli": "^6.2.0",
        "url-loader": "^4.1.1",
        "webpack": "^5.53.0",
        "webpack-cli": "^4.8.0"
```
# Installation and Startup
1. Fork TheYesMen/Iben-sCasino repo to your github account.
2. Clone your forked repo to your local system
3. Run npm install to install dependancies
```
npm i
```
4. Create a .env file in your main directory. You can run the following command to create your .env file using .env.example as a base model.
```
cp .env.example .env
```
5. navigate into the /socket directory and perform an npm install as well to install websocket dependancies.
```
cd /socket
npm i
```
6. while inside your socket directory, start your socket server.
```
npm start
```

7. Navigate back to the Casino's root directory, then compile your files to create bundle.
```
cd ..
npm run build
```
8. Start the main server
```
npm start
```

# Google OAuth
Google Oauth requires a google cloud account. First create your account and then navigate to the developer console. Go to credentials and press "create credentials" and then click "OAuth Client ID". Follow the on-screen promps until you've recieved a CLIENT_ID and CLIENT_SECRET. These values go inside the .env file. Also ensure you add all authorized redirect URI's to your google API credentials.

# Deployment
AWS EC2 was used to deploy the application. Some tips for deployment can be found in the deploy.md file included in this repo.

# Schema 
The schema's for your DB are declared in the following path:
```
~/db/index.js
```

# MySQL DB hosted on Amazon RDS
We deployed using Amazon RDS to manage and host our database. Navigate to Amazon AWS console webpage and signup for their service. Create a database instance. Under the 'connectivity & security' tab on your database instance, copy the port and endpoint for your database and remember your admin credentials to put into your .env file. Once all of that is done, your database should be hosted remotely for your project to connect to. 
**YOU WILL NEED TO CREATE A DATABASE NAMED 'poker_database' IN ORDER FOR THE POKER GAME TO RUN PROPERLY**