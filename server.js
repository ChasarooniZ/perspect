// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

const bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


// our default array of dreams
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

var mysql = require('mysql');

var con = mysql.createConnection({
  host     : process.env.MYSQL_HOST,
  user     : process.env.MYSQL_USER,
  password : process.env.MYSQL_PASS,
  database : process.env.MYSQL_DB  
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  
  var sql = "";
  //sql = "drop table *";
  //con.query(sql, function (err, result) {});
  sql = "SELECT * FROM QUESTIONS";
  con.query(sql, function (err, result) {
    if (result != null) {
      sql = "CREATE TABLE questions (q_id INT NOT NULL AUTO_INCREMENT,question VARCHAR(255),answer VARCHAR(255),asker INT,answerer INT,vote_count INT, PRIMARY KEY (q_id));";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
      });
    }
  });
  
  sql = "SELECT * FROM PEOPLE";
  con.query(sql, function (err, result) {
    if (result != null) {
      sql = "CREATE TABLE people (p_id INT NOT NULL AUTO_INCREMENT,fname VARCHAR(45),lname VARCHAR(45),email VARCHAR(200),company VARCHAR(75),major VARCHAR(65),job_role VARCHAR(65),age INT,gender VARCHAR(15),race VARCHAR(45),city VARCHAR(65),country varchar(65), PRIMARY KEY (p_id));";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
      });
    }
  });
  
  sql = "SELECT * FROM account";
  con.query(sql, function (err, result) {
    if (result != null) {
      sql = "CREATE TABLE account (a_id INT NOT NULL,username VARCHAR(45) NOT NULL, password VARCHAR(45) NOT NULL, PRIMARY KEY (p_id));";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created account");
      });
    }
  });
  
  sql = "SELECT * FROM interests";
  con.query(sql, function (err, result) {
    if (result != null) {
      sql = "CREATE TABLE interests (p_id INT NOT NULL,tag VARCHAR(75) NOT NULL);";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created interest");
      });
    }
  });
    //var sql2 = "CREATE TABLE people (p_id INT NOT NULL AUTO_INCREMENT,fname VARCHAR(45),lname VARCHAR(45),email VARCHAR(200),company VARCHAR(75),major VARCHAR(65),job_role VARCHAR(65),age INT,gender VARCHAR(15),race VARCHAR(45),city VARCHAR(65),country varchar(65), PRIMARY KEY (p_id));";

});

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/main.html");
});


// https://expressjs.com/en/starter/basic-routing.html
app.get("/signup", (request, response) => {
  response.sendFile(__dirname + "/views/signup.html");
});

// https://expressjs.com/en/starter/basic-routing.html
app.get("/profile", (request, response) => {
  response.sendFile(__dirname + "/views/profile.html");
});

// https://expressjs.com/en/starter/basic-routing.html
app.get("/main", (request, response) => {
  response.sendFile(__dirname + "/views/main.html");
});

// https://expressjs.com/en/starter/basic-routing.html
app.get("/filteroptions", (request, response) => {
  response.sendFile(__dirname + "/views/filteroptions.html");
});

// https://expressjs.com/en/starter/basic-routing.html
app.get("/search", (request, response) => {
  response.sendFile(__dirname + "/views/search.html");
});


// send the default array of dreams to the webpage
app.get("/dreams", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.json(dreams);
});




// Get Experts
app.get("/expertquery", (request, response) => {
  // express helps us take JS objects and send them as JSON
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT fname, lname, company, major, job_role, age, gender, race, city, country FROM people", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      response.json(JSON.parse(result));
    });
  });
  
});

// Post Question to DB
app.post("/question", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.json(dreams);
});

// Post Answer Question
app.post("/answer", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.json(dreams);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
