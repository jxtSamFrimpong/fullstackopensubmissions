export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export interface Diagnoses {
    code: string;
    name: string;
    latin?: string
}

export interface Patients {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
}

export type PatientsExcludeSSN = Omit<Patients, 'ssn'>;

export type PatientsIncludeNeeded = Pick<Patients, 'id' | 'name' | 'dateOfBirth' | 'gender' | 'occupation'>;

export type NewPatientEntry = Omit<Patients, 'id'>;