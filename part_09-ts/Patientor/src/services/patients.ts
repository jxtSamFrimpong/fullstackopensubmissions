import patientsData from '../../data/patients';
import { PatientsIncludeNeeded, NewPatientEntry, Patients, EntryWithoutId } from '../types';
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

export const addEntryToPatient = (patient: string, object: EntryWithoutId) => {
    // const patienFound = patientsData.find(i => i.id === patient)
    // if (patienFound) {
    //     patienFound.entries.push(
    //         {
    //             id: uuid(),
    //             ...object
    //         }
    //     )
    // }
    // patientsData = patientsData.map( i => i.id !== patient? i : patienFound)
    patientsData.forEach(i => {
        if (i.id === patient) {
            i.entries.push({
                id: uuid(),
                ...object
            })
        }
    })
}

export const getSpecificPatients = (id: string): Patients | undefined => {
    return patientsData.find(i => i.id === id);
}