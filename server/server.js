const express = require('express');
const mongoose = require('mongoose');
const mine = require('./models/mine');
const app = express();
const auth = require('./middleware/auth');
require('dotenv').config();

console.log(process.env);

const API_PORT = process.env.PORT || 8080;


app.use(express.json());  

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

const dbPath = `mongodb+srv://${dbUser}:${dbPass}@test-cluster.m2aat.mongodb.net/Mineral?retryWrites=true&w=majority`;

// app.get("/:name", (req, res) => {
//   res.send("Hello, " + req.params.name);
// });



mongoose.connect(dbPath, {
  dbName: "Mineral",
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(() => {
   console.log("Connected to Database");
}).catch((err) => console.log(err));

// remember to require(auth) at top of page
app.all('/api/*', auth); // this is the function we want to call when any function makes that api call
//this ensures that the user is authenticated before going onto any other routes.
// this pulls in the router for both routes
app.use('/api/mines', require('./routes/mines'));
app.use('/api/auth', require('./routes/auth'));
// this helps to keep the server file small and concise while keeping all the functionality



app.listen(API_PORT,  () => console.log(`Listening on Port ${API_PORT} `));
// return UserRouter;
// module.exports = app;