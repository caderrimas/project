/*jshint esversion:6*/

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

//=======================================================================================================

console.log(`${__dirname}`);

const uri = "mongodb+srv://rimas:rimasihsan@cluster0-h4pbs.mongodb.net/studentDB"
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true} ,function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("Connected to database");
    }
});

const studentSchema = {
  name: String,
  address: String,
  age: Number,
  gender: String,
  email: String,
  dob: String,
  phno: Number
};

const Student = mongoose.model("Student", studentSchema);

//=======================================================================================================

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/fun.html`);
});

app.post('/', (req, res) =>{

    const newStudent = new Student({
        name: req.body.studentName,
        address: req.body.studentAddress,
        age: req.body.studentAge,
        gender: req.body.gender,
        email: req.body.studentEmail,
        dob: req.body.dob,
        phno: req.body.phone
    });

    newStudent.save();
    res.sendFile(`${__dirname}/success.html`);
});

//=======================================================================================================

port = 3000;
app.listen(process.env.PORT || port, () => {
  console.log('Listening to requests on port ' + port);
});