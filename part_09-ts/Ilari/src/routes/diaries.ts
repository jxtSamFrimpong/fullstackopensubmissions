import express from 'express';
import diaryService from "../services/diaryService";
// import {
//     Weather,
//     Visibility
// } from '../types';
import toNewDiaryEntry from '../utils/index';

const router = express.Router();

router.get('/', (_req, res) => {
    //res.send('Fetching all diaries!');
    res.json(diaryService.getNonSensitiveEntries()).send();
});

router.get('/:id', (req, res) => {
    const diary = diaryService.findById(Number(req.params.id));
    console.log(diary);

    if (diary) {
        res.json(diary).send();
    } else {
        res.sendStatus(404);
    }
});

router.post('/', (req, res) => {
    const newDiaryEntry = toNewDiaryEntry(req.body);
    //const addedEntry = diaryService.addDiary(newDiaryEntry);
    // const date: string = req.body.date as string;
    // const weather = req.body.weather as Weather;
    // const visibility = req.body.visibility as Visibility;
    // const comment = req.body.comment as string;

    const addedEntry = diaryService.addDiary(newDiaryEntry);
    res.json(addedEntry);
});

export default router;