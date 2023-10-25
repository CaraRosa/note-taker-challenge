// File system
const fs = require('fs');
// uuid package
const { v4: uuidv4 } =  require('uuid');

// reads the notes
module.exports = (app) => {
    app.get('/api/notes', (req, res) => {
        const notes = JSON.parse(fs.readFileSync('db.json', 'utf8'));
        res.json(notes);
    });

    app.post('/api/notes', (req, res) => {
        const newNote = req.body;
        newNote.id = uuidv4();

        const notes = JSON.parse(fs.readFileSync('db.json', 'utf8'));

        notes.push(newNote);

        fs.writeFileSync('db.json', JSON.stringify(notes, null, 2));

        res.json(newNote);
    });
};