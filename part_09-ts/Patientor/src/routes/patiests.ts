import express from 'express';
import { getPatients, addPatient } from '../services/patients';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    //res.send('Fetching all diagnoses!');
    res.json(getPatients()).send();
});

router.post('/', (req, res) => {
    //res.send('Saving a diagnises!');
    const newPaient = toNewPatient(req.body);

    const addedPatient = addPatient(newPaient);
    res.json(addedPatient);
});

export default router;