const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const googleTranslate = require('google-translate-api');

//for heroku, either run on the port heroku wants or port 3000
const port = process.env.PORT || 3000;

//sets up body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

//sets up the template engine
app.set('view engine', 'ejs');

//sets up the first route/default, sets translatedOutput to nothing for now
app.get('/', (req, res) => {
  res.render('home', {
    translatedOutput: ''
  });
});

//after post request is submitted by the form this happens
app.post('/', (req, res) => {
  //grabs the input from the form
  const translateInput = req.body.translate;
  //grabs the desired language to switch to
  const targetLang = req.body.targetLang;

  //runs the google translate function to change language
  googleTranslate(`${translateInput}`, {to: `${targetLang}`})
  .then(response => {
    //afterwards it sets the translatedOutput to the response text
    res.render('home', {
      translatedOutput: response.text
    })
    //if we have an error, just let us know
  }).catch((err) => console.error(err))
});

//listens on the port that the host wants or 3000
app.listen(port, () => {
  console.log(`app working on port ${port}`);
});














