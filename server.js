const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const api = require('./routes/apiRoutes');
const apiHTML = require('./routes/htmlRoutes');

const PORT = 3001;
const app = express();

app.use(clog);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/api', api);

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) => 
res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET route for notes page
app.get('/', (req, res) =>
res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// App listens at port 3001
app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`)
);