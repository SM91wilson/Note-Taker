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
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

// routes to get the notes from the json file
app.get('/api/notes', function (req, res) {
    return res.json(notesStorage)
});

// post new note to list
app.post('/api/notes', function (req, res) {
    // data of new task
    var newNote = req.body;
    // read the file containing the tasks
    fs.readFile('./db/db.json', function (err, data) {
        if (err) throw err;
        // parse the data 
        var newJsonArr = JSON.parse(data);
        // using square brackets dynamically creates the new key
        newNote['id'] = newJsonArr.length;
        // push the latest note to the data parsed from the db.json
        newJsonArr.push(newNote);
        console.log(newJsonArr);
        // stringify the new list of tasks
        var newFile = JSON.stringify(newJsonArr);
        // overwrite the db.json file with the new list
        fs.writeFile('./db/db.json', newFile, function (err) {
            if (err) throw err;
            console.log('saved')
            return data;
        })
        res.json(notesStorage);
    })

});

// delete task
app.delete('/api/notes/:id', function (req, res) {
    // var to select the id of the note to be deleted
    var selected = req.params.id
    console.log(selected);
    var JsonArray = notesStorage;
    // for loop to iterate trough the array to find the corresponding id
    for (var i = 0; i < JsonArray.length; i++) {
        if (selected == JsonArray[i].id) {
            console.log(JsonArray[0].id);
            // delete id from params
            JsonArray.splice(i, 1);
            // return array
            return JsonArray
        };
        // rewrite the source file without the note that was deleted
        var rewrite = JSON.stringify(JsonArray);
        fs.writeFile('./db/db.json', rewrite, function (err) {
            if (err) throw err;
            console.log('deleted');
        })
    }
});

// starts the server listening
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});