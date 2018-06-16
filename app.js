const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const googleTranslate = require('google-translate-api');

//sets up body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));


//sets up the template engine
app.set('view engine', 'ejs');

//sets up the first route/default 
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/translate', (req, res) => {
  res.render('translate');
})


//grab the variables from the view
app.get('/translate', (req, res) => {
  const translatedInput = req.body.translate;
  const targetLang = req.body.targetLang;
  console.log(translatedInput, targetLang);
  console.log(translatedOutput);
  next()
  googleTranslate(`${translatedInput}`, {to: `${targetLang}`})
  .then(response => {
  res.render('translate', {
    translatedOutput: response.text
  })
  }).catch((err) => console.error(err));
})

//sets up the about page
app.get('/about', (req, res) => {
  res.render('about');
});

//sets up the port
app.listen(3000, () => {
  console.log('app working on port 3000');
});














