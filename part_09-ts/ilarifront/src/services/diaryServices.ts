import axios from "axios";
import { NonSensitiveDiaryEntry, NewDiaryEntry } from '../types'

const baseURL: string = 'http://localhost:3001/api/diaries';

export const getAllDiaries = async () => {
    const response = await axios.get(baseURL);
    return response.data as NonSensitiveDiaryEntry[];
}

export const addDiary = async (newEntry: NewDiaryEntry) => {
    const response = await axios.post(baseURL, newEntry)
    const { comment, ...results } = await response.data;
    return results as NonSensitiveDiaryEntry;
}