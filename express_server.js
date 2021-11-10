const express = require("express");
const app = express();
const PORT = 8080; // default port 8080

app.set("view engine", "ejs");

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

function generateRandomString() {
  let randomString = '';
  const characterList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let x = 0; x < 6; x += 1) {
    randomString += characterList.charAt(Math.floor(Math.random() * characterList.length));
  }
  return randomString;
}

// on link localhost:8080 shows hello
app.get("/", (req, res) => {
  res.send("Hello!");
});
// on link localhost:8080/urls.json shows object
app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});
// on link localhost:8080/hello shows html style Hello World
app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

app.get("/urls",(req, res)=>{
  const templateVars = {urls: urlDatabase};
  res.render("urls_index", templateVars);
});
app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.post("/urls", (req, res) => {
  let longUrl = req.body.longURL;  // Log the POST request body to the console
  let shortUrl = generateRandomString();
  //adds a short url (random generated) and long url to the database
  urlDatabase[shortUrl]=longUrl;
  const templateVars = {shortURL :shortUrl, longURL:longUrl};
  res.render("urls_show", templateVars); 
});

app.get("/u/:shortURL", (req, res) => {
  // const longURL = ...
  res.redirect(longURL);
});

app.get("/urls/:shortURL",(req, res)=>{
  const templateVars = {shortURL : req.params.shortURL, longURL: urlDatabase[req.params.shortURL]};
  res.render("urls_show", templateVars);
});

app.post("/urls/:shortURL/delete", (req, res) => {
  delete urlDatabase[req.params.shortURL]
  res.redirect("/urls")
})

