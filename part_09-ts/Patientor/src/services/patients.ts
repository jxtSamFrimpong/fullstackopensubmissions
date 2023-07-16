import patientsData from '../../data/patients';
import { PatientsIncludeNeeded, NewPatientEntry, Patients } from '../types';
import { v1 as uuid } from 'uuid';

export const getPatients = (): PatientsIncludeNeeded[] => {
    return patientsData.map(({ ssn: _ssn, ...eve }) => {
        return {
            ...eve
        };
    });
};

export const addPatient = (object: NewPatientEntry): Patients => {
    //console.log(object);
    const newlyAddedPatient = {
        id: uuid(),
        ...object
    };

    patientsData.push(newlyAddedPatient);
    return newlyAddedPatient;
};