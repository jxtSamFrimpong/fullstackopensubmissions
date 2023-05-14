const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config();
const PORT = process.env.PORT;

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
    next()
}

const logHeaders = (request, response, next) => {
    console.log('Headers', request.headers);
    console.log('---');
    next()
}

const app = express();
app.use(express.json())
app.use(requestLogger);
app.use(logHeaders);

morgan.token('reqBody', (req) => JSON.stringify(req.body));
customMorganFormat = ':method :url :status :res[content-length] - :response-time ms :reqBody'
app.use(morgan(customMorganFormat));


let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
];


const genRandIndex = () => {
    let someNum = Math.ceil(Math.random() * 1000);
    if (persons.map(p => p.id).find(i => i === someNum) !== undefined) {
        console.log(someNum);
        someNum = genRandIndex();
    }
    return someNum;
}

app.get('/', (req, res) => {
    res.send('<html><em>Phonebook</em></html>');
})

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(p => p.id === id);
    if (person !== undefined) {
        res.json(person);
    }
    else {
        res.status(404).end();
    }
});

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id !== id);
    res.status(204).end();
});

app.post('/api/persons', (req, res) => {
    const reqBody = req.body;
    if (reqBody.number === undefined ||
        reqBody.number === null ||
        reqBody.number === '') {
        res.statusCode = 400;
        return res.json({
            error: 'number field cannot be empty'
        });//.send('Number field cannot be empty');
    }
    if (persons.find(p => p.name === reqBody.name) !== undefined) {
        res.statusCode = 409
        return res.json({
            error: 'name already in use'
        });
    }
    const pushBody = {
        id: genRandIndex(),
        name: reqBody.name,
        number: reqBody.number,
    }
    persons.push(pushBody);
    res.statusCode = 201;
    res.send(`${pushBody.id}`);

});

app.get('/info', (req, res) => {
    const localTime = new Date();
    whatToReturn = `Phonebook has information for ${persons.length} people\n${localTime}`;
    res.send(whatToReturn);
});

app.use(unknownEndpoint);

app.listen(PORT, () => {
    console.log('listening ...');
});