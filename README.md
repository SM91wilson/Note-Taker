# Homework11 Note Taker

## Description
The homework was to creat an application that allowed a user to write, save and delete notes.
Express was used to access data from a JSON file that stored the notes.

First express, fs, path and the database storing the notes data had to be required.
Express was then set up with a port along with the middleware to deal with the data.

HTML routes were set up using .get method for the home and notes pages.

A route was also set up to retrieve the file data from the JSON file to be shown with '/api/notes'.

The post method allows a user to add a note to the JSON file so that it can be accessed and added to the notes list when the page is loaded. It takes the request data and pushes it to the parsed JSON data array that is then used to rewrite the JSON file.
Before being added the new note is given an id.

The delete method allows a user to delete a selected note. It takes the id parameter and iterates through array to find the note that matches the id chosen.
The chosen id is removed from the array and the JSON file is rewritten again.