require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const auth = require('./middleware/auth');
//  const cors = require('cors')
const API_PORT = process.env.PORT || 8080;

// app.use(cors());
app.use(express.json());  


const dbPath = process.env.DB_PATH;
console.log(__dirname + './env');
//console.log(require('dotenv').config());
// app.get("/:name", (req, res) => {
//   res.send("Hello, " + req.params.name);
// });


mongoose.connect(dbPath, {
  dbName: "saturday",
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true 
}).then(() => {
   console.log("Connected to Database");
}).catch((err) => console.log(err));

// remember to require(auth) at top of page
app.all('/api/*', auth); // this is the function we want to call when any function hits that api value
//this ensures that the user is authenticated before going onto any other routes.
// this pulls in the router for both routes
app.use('/api/mines', require('./routes/mines'));
app.use('/api/auth', require('./routes/auth'));
// this helps to keep the server file small and concise while keeping all the functionality



app.listen(API_PORT,  () => console.log(`Listening on Port ${API_PORT} `));
// return UserRouter;
// module.exports = app;