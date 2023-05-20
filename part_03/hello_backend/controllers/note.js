/* eslint-disable indent */
const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', (req, res) => {
    Note.find({}).then(result => {
        console.log(result);
        res.json(result);
    });
});

notesRouter.post('/', (req, res, next) => {
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

notesRouter.get('/:id', (req, res, next) => {
    const id = req.params.id;

    Note.findById(id).then(note => res.json(note))
        .catch(e => next(e));
});

notesRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    Note.findByIdAndRemove(id)
        .then(results => res.json(results))
        .catch(e => {
            console.log(e);
            res.status(500).json({ error: `${e}` })
        })

});

notesRouter.put('/:id', (req, res, next) => {
    const { id } = req.params;
    const { content, important } = req.body;

    Note.findByIdAndUpdate(id, { content, important }, { new: true, runValidators: true, context: 'query' })
        .then(results => res.json(results))
        .catch(e => {
            return next(e);
        })
})

module.exports = notesRouter;