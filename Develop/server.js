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
    // data of new task
    var newNote = req.body;
// read the file containing the tasks
fs.readFile('./db/db.json', function(err, data){
    if(err) throw err;
    // parse the data 
    var newJsonArr = JSON.parse(data);
    // push the latest note to the data parsed from the db.json
    newJsonArr.push(newNote);
    // stringify the new list of tasks
    var newFile = JSON.stringify(newJsonArr);
    // overwrite the db.json file with the new list
    fs.writeFile('./db/db.json', newFile, function(err){
        if(err) throw err;
        console.log('saved')
    })
})
});

// delete task
app.delete('/api/notes/:id', function(req, res){
    var selected = req.id
});

// starts the server listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });