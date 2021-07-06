const express = require("express");
const app = express();
const path = require('path');
const fs = require("fs");
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const port = 80;

app.use('/static', express.static('static')); //Serving static file
app.set('views', path.join(__dirname, 'views'));

// app.get('/',(req,res)=>{
//     res.send("This is Home page");
// })

app.get('/', function (req, res) {
  res.render('home.pug', {
    title: 'Dancing website',
    message: 'Welcome to our Dance website with Pug template'
  })
})

//Set Scehma to database.
const contactSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  country: String,
  subject: String
});

const contact = mongoose.model('contact', contactSchema);

app.get('/contact', function (req, res) {
  res.render('contact.pug', {
    title: 'Dancing website',
    message: 'Welcome to our Dance website with Pug template'
  })
})

app.post('/contact',function(req,res){
  var myData=new contact(req.body);
  myData.save().then(() => {
    res.send("Data is saved into database");
  }).catch(() => {
    res.send("Data is not saved into database");
  })
})

app.listen(port, () => {
  console.log(`This Express started Succesfully on ${port}`);
})