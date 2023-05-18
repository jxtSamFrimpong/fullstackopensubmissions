const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const people = require('./models/people');
const { errorHandler, unknownEndpoint } = require('./middlewares/errorhandler')
const { requestLogger, logHeaders } = require('./middlewares/logging')

const PORT = process.env.PORT;

const app = express();
app.use(express.json())
app.use(express.static('build'))
app.use(requestLogger);
app.use(logHeaders);
app.use(cors())

morgan.token('reqBody', (req) => JSON.stringify(req.body));
customMorganFormat = ':method :url :status :res[content-length] - :response-time ms :reqBody'
app.use(morgan(customMorganFormat));


app.get('/', (req, res) => {
    res.send('<html><em>Phonebook</em></html>');
})

app.get('/api/persons', (req, res) => {
    people.find({})
        .then(person => {
            console.log(person);
            res.json(person)
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: `${err}` })
        })
});

app.get('/api/persons/:id', (req, res, next) => {
    const { id } = req.params

    people.findById(id)
        .then(person => {
            console.log(person);
            if (person) {
                res.json(person)
            }
            else {
                res.sendStatus(404)
            }
        })
        .catch((err) => {
            console.log(err);
            return next(err)
        })
});

app.delete('/api/persons/:id', (req, res, next) => {
    const { id } = req.params;

    people.findByIdAndDelete(id)
        .then(results => {
            res.status(204).end()
        })
        .catch(err => {
            return next(err)
        })
});

app.post('/api/persons', (req, res) => {
    const { number, name } = req.body;
    if (number === undefined ||
        number === null ||
        number === '') {
        res.statusCode = 400;
        return res.end()
    }
    const person = new people({ name, number })
    person.save()
        .then(person => res.status(201).json(person))
        .catch(e => {
            console.log('post /api/persons', e);
            res.status(500).end()
        })

});

app.put('/api/persons/:id', (req, res) => {
    const { id } = req.params;
    const { name, number } = req.body;
    people.findByIdAndUpdate(id, { name, number }, { new: true })
        .then(result => {
            console.log('put /api/persons', result);
            return res.json(result)
        })
        .catch(e => {
            console.log('put /api/persons/:id', e);
            res.sendStatus(500);
        });
})

app.get('/info', (req, res) => {
    people.find({})
        .then(persons => {
            const localTime = new Date();
            whatToReturn = `Phonebook has information for ${persons.length} people\n${localTime}`;
            res.send(whatToReturn);
        })

});

app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log('listening ... on ', PORT);
});