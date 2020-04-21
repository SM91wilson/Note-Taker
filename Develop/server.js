const express = require('express');
const fs = require('fs');
const path = require('path');
const notesStorage = require('./db/db.json')

// setting up express with a port
var app = express();
var PORT = 3030;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// setting up routes for the html pages
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, './public/index.html'))
});

app.get('/notes', function(req, res){
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

// routes to get the notes from the json file
app.get('/api/notes', function(req, res){
    return res.json(notesStorage)
});

// post new note to list
app.post('/api/notes', function(req, res){
    var newNote = req.body;

// read file, parse it, re write json file with all data from db.json and new data
fs.readFile('./db/db.json', function(err, data){
    if(err) throw err;
    var newJson = JSON.parse(data);
    newJson.push(newNote);
    console.log(newJson);
    var newFile = JSON.stringify(newJson);
    fs.writeFile('./db/db.json', newFile, function(err){
        if(err) throw err;
        console.log('saved')
    })
})
});

app.delete('/api/notes/:id', function(req, res){
    var selected = req.id
});

// starts the server listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });