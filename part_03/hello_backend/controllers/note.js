/* eslint-disable indent */
const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}

notesRouter.get('/', async (req, res) => {

    const allNotes = await Note.find({}).populate('user', { username: 1, name: 1 });
    res.json(allNotes);
});

notesRouter.post('/', async (req, res) => {
    const reqBody = req.body;
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
    if (!decodedToken.id) {
        return res.status(401).json({ error: 'token invalid' })
    }

    if (!reqBody.content) {
        return res.status(400).json({
            error: 'content missing'
        });
    }

    const user = await User.findById(decodedToken.id)//reqBody.userId)

    const note = new Note({
        content: reqBody.content,
        important: reqBody.important || false,
        user: user.id
    });
    const savedNote = await note.save();
    user.notes = user.notes.concat(savedNote.id)
    await user.save()
    res.status(201).json(savedNote);

});

notesRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    const foundNote = await Note.findById(id);
    res.json(foundNote)

});

notesRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const removedNote = await Note.findByIdAndRemove(id);
    res.json(removedNote);


});

notesRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { content, important } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(id, { content, important }, { new: true, runValidators: true, context: 'query' });
    res.json(updatedNote);

})

module.exports = notesRouter;