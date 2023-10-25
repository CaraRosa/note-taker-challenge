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
        // newNote.id = uuidv4();
        newNote.id = generateUniqueID();

        const notes = JSON.parse(fs.readFileSync('db.json', 'utf8'));

        notes.push(newNote);

        saveNotesToFile(notes);

        fs.writeFileSync('db.json', JSON.stringify(notes, null, 2));

        res.json(newNote);
    });
};

function generateUniqueID() {
    return Date.now().toString();
  }
  
  function saveNotesToFile(notes) {
    const filePath = path.join(__dirname, 'db.json');
  
    fs.writeFileSync(filePath, JSON.stringify(notes), 'utf8');
  }