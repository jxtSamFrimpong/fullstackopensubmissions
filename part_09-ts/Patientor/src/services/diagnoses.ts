import diagnosesData from '../../data/diagnoses';
import { Diagnoses } from '../types';

export const getDiagnoses = (): Diagnoses[] => {
    return diagnosesData;
};