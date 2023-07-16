import express from 'express';
import { getDiagnoses } from '../services/diagnoses';

const router = express.Router();

router.get('/', (_req, res) => {
    //res.send('Fetching all diagnoses!');
    res.json(getDiagnoses()).send();
});

router.post('/', (_req, res) => {
    res.send('Saving a diagnises!');
});

export default router;