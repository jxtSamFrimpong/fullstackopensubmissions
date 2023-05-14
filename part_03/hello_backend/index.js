const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]

const newestID = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0
    return maxId + 1
}

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('<h1>Hello pun</h1>');
});

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    const note = req.body;
    if (!note.content) {
        return res.status(400).json({
            error: 'content missing'
        });
    }
    if (Object.keys(note).includes('content') && Object.keys(note).includes('important')) {
        console.log('recieved body', note);
        const noteToAdd = {
            id: newestID(),
            content: note.content,
            important: note.important || false
        }
        notes.push(noteToAdd);
        res.sendStatus(201);
        //res.send(`${notes[notes.length - 1].id}`);
    }
    else {
        console.log('recieved body', note);
        res.status(400).end()
    }
});

app.get('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    const results = notes.find(note => note.id === id);
    if (results !== undefined) {
        res.json(results);
    }
    else {
        res.status(404).end()
        //res.send('User doest exist');
    }
});

app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    const results = notes.find(note => note.id === id);
    if (results !== undefined) {
        notes = notes.filter(note => note.id !== id);
        res.status(204);
        res.end();
    }
    else {
        res.status(204);
        res.end();
    }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});
