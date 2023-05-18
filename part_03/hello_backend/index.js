const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const Note = require('./models/note');
const { unknownEndpoint, errorHandler, newestID } = require('./midlewares/middle')



const app = express()
app.use(express.json())
app.use(express.static('build'))
app.use(cors())

app.get('/', (req, res) => {
    res.send('<h1>Hello pun</h1>');
});

app.get('/api/notes', (req, res, next) => {
    // res.json(notes); 
    Note.find({}).then(result => {
        console.log(result);
        res.json(result);
    });
});

app.post('/api/notes', (req, res, next) => {
    const reqBody = req.body;
    if (!reqBody.content) {
        return res.status(400).json({
            error: 'content missing'
        });
    }

    const note = new Note({
        content: reqBody.content,
        important: reqBody.important || false
    });

    note.save().then(
        savedNote => {
            res.json(savedNote);
        }
    )
        .catch(err => next(err))
});

app.get('/api/notes/:id', (req, res, next) => {
    const id = req.params.id;

    Note.findById(id).then(note => res.json(note))
        .catch(e => next(e));
});

app.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    Note.findByIdAndRemove(id)
        .then(results => res.json(results))
        .catch(e => {
            console.log(e);
            res.status(500).json({ error: `${e}` })
        })

});

app.put('/api/notes/:id', (req, res, next) => {
    const { id } = req.params;
    const { content, important } = req.body;

    Note.findByIdAndUpdate(id, { content, important }, { new: true, runValidators: true, context: 'query' })
        .then(results => res.json(results))
        .catch(e => {
            return next(e);
        })
})

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});
