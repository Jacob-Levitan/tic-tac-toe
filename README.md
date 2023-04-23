# tic-tac-toe

This is a practice project for Jacob and Zach to create a full stack web app. 

The goal is a deployed site where users can play tic-tac-toe in real time against each other. 

Users can create an account and log in with email confirmation (we will be using jwt). The wins/losses are saved per user and there is a public leaderboard. Multiple games can be played simultaneously.

We are using the MERN stack: 
- MongoDB for the user data
- Express
- React for the front end
- Node.js for the server

For networking we plan on using https://docs.colyseus.io/colyseus/ (See https://www.smashingmagazine.com/2021/10/real-time-multi-user-game/).

The app is set up to run in a docker container and we are also utalizing the docker container for developement, as explained in this YouTube video: [Container-Based Development with Visual Studio Code](https://youtu.be/ftir5Dq7LoA). 
