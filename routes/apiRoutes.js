// File system
const fs = require('fs');
const util = require('util');
const router = require('express').Router();
// uuid package
const { v4: uuidv4 } =  require('uuid');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
var notes;


// GET notes
router.get("/notes", (req, res) => {
    readFileAsync("db/db.json", "utf8").then(function (data) {
        notes = JSON.parse(data);

        res.json(notes);
    });
});

// POST request notes

router.post("/notes", (req, res) => {
    readFileAsync("db/db.json", "utf8").then(function (data) {
        notes = JSON.parse(data);

        let newNote = req.body;

        // assigns note a unique ID
        newNote.id = uuidv4();

        notes.push(newNote);

        notes = JSON.stringify(notes);

        writeFileAsync("db/db.json", notes).then(function (data) {
            console.log("The note has been added!");
        });
        res.json(notes);
    });
});

// DELETE a note
router.delete("/notes/:id", (req, res) => {
    let noteID = req.params.id;

    let indexDelete = notes.findIndex(note => note.id === noteID);

    if(indexDelete !== -1) {
        let deletedNote = notes[indexDelete];
        notes.splice(indexDelete, 1);

        console.log('Deleted Note:', deletedNote);
        console.log('Updated Notes Array:', notes);
        // let noteJSON = JSON.stringify(notes, null, 2);

        writeFileAsync("db/db.json", JSON.stringify(notes, null, 2))
            .then(() => {
                res.json({ success: true, message: "Note deleted successfully!" });
            })
            .catch(error => {
                console.error('Error in file writting', error);
                res.status(500).json({ success: false, message: "Internal server Error "});
            });

    } else {
        res.status(404).json({ success: false, message: "Note was not found." });
    }
});

module.exports = router;