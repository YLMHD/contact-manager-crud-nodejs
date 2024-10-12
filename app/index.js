require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const session = require("express-session");
const port = process.env.PORT || 5000;

const app = express();

connectDB();

// middlewares to parse the request body as JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up the session middleware to store the session data
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Set up the middleware to pass the user data to the views
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});


// Set the public directory
app.use(express.static("app"));

// Set the views directory
app.set('views', __dirname + '/views');

// Set the view engine to ejs
app.set("view engine", "ejs");

// Define the route for the root URL of the site
app.use("/", require("./routes/routes"));
    
// Listen for requests
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
}); 