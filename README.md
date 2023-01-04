# Task-eet
This REST API is a task management service that allows users to create, read, update and delete tasks. 
- It was built using ***ExpressJS***
- Database management with Mongoose, for object data modelling with **Node.js**. 
- Environment variables were stored and managed using the ***dotenv*** package

This project folder makes use of Model-View-Controller architecture to ensure separation of concern and code readability.

[TECHNICAL DOCUMENTATION](https://docs.google.com/document/d/1gw5huAkGQw2UAeD73vmt9Ng75_d44EWaWop5bu1s0E4/edit?usp=sharing)

[API DOCUMENTATION]()

## To start up project on your local machine.
- Fork and clone the [Task-eet](https://github.com/ibehesther/Task-eet) repository unto your local development machine.
- Open a new terminal, move into the project repository `cd Task-eet`
- Then, install all the required libraries using `npm install`
- Go to MongoDB Atlas and set up a database, and get a connection string
- Create a `.env` file in the root of your project folder
- Create a "DATABASE_CONN_STR" variable in the `.env` file and assign the string copied from MongoDB Atlas to it
- Go to the terminal and run `npm run dev`
- Your server should be up and running! ;)