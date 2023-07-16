import diaryData from '../../data/entries';
import {
    NonSensitiveDiaryEntry,
    NewDiaryEntry,
    DiaryEntry
} from '../types';

const diaries: DiaryEntry[] = diaryData;

const getEntries = (): DiaryEntry[] => {
    return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
    return diaries.map(({ comment: _comment, ...eve }) => {
        return { ...eve };
    });
};

const findById = (id: number): DiaryEntry | undefined => {
    const entry = diaries.find(d => d.id === id);
    return entry;
};

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
    const newDiaryEntry = {
        id: Math.max(...diaries.map(d => d.id)) + 1,
        ...entry
    };

    diaries.push(newDiaryEntry);
    return newDiaryEntry;
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addDiary,
    findById
};