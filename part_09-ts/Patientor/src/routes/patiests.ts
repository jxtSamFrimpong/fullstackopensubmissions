import express from 'express';
import { getPatients, addPatient, getSpecificPatients, addEntryToPatient } from '../services/patients';
import { toNewPatient, toNewEntries } from '../utils';
import { Patients } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
    res.json(getPatients()).send();
});

router.get('/:id', (req, res) => {
    const id: string = req.params.id.toString();
    const specificPatient: Patients | undefined = getSpecificPatients(id);
    if (specificPatient) {
        res.json(specificPatient);
    }
    else {
        res.statusCode = 404;
        res.send()
    }
});

router.post('/', (req, res) => {
    //res.send('Saving a diagnises!');
    const newPaient = toNewPatient(req.body);

    const addedPatient = addPatient(newPaient);
    res.json(addedPatient);
});

router.post('/:id/entries', (req, res) => {
    //res.send('Saving a diagnises!');
    const id: string = req.params.id.toString();
    const newEntries = toNewEntries(req.body);
    newEntries.forEach(i => {
        addEntryToPatient(id, i)
    })
    res.json(newEntries);
});

export default router;