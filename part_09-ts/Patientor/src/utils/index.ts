import { EntryWithoutId, NewPatientEntry, BaseEntry, HealthCheckEntry, OccupationalHealthcareEntry, HospitalEntry } from "../types";
//Entry,, BaseEntry,, HospitalEntry
import { Gender, HealthCheckRating } from "../types";


export const toNewPatient = (object: unknown): NewPatientEntry => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        return {
            name: parseName(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseSSN(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            entries: ('entries' in object) && (Array.isArray(object.entries)) ? object.entries : []
            //parseEntries(object.entries)
        };
    }

    throw new Error('Incorrect data: some fields are missing');
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }

    return name;
};

const parseSSN = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }

    return ssn;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }

    return occupation;
};

// const parseEntries = (entries: unknown[]): Entry[] => {
//     if (!entries) {
//         throw new Error('Bad Entries structure');
//     }
//     entries.map( i => {
//         try {
//             parseEntry()
//         }
//     })
// }

// const parseEntry = (entry: unknown): Entry => {
//     if (!entry || !parseBaseEntry(entry) || !parseOccupationalHealthcareEntry(entry) || !parseHealthCheckEntry(entry) || !parseHospitalEntry(entry)) {
//         throw new Error('Entry should be well structured')
//     }
//     return entry as Entry
// }

// const parseHospitalEntry = (entry: unknown): HospitalEntry => {
//     if (!entry || typeof entry !== 'object') {
//         throw new Error('Entry should be well structured');
//     }
//     if (!("type" in entry && "discharge" in entry) || (entry.type !== "Hospital")) {
//         throw new Error('Entry Not OccupationalHealthcare');
//     }
//     if (typeof entry.discharge !== 'object' || entry.discharge === null || !("date" in entry.discharge) || !("criteria" in entry.discharge)) {
//         throw new Error('Entry should be well structured');
//     }
//     if (!isString(entry.discharge.date) || !isString(entry.discharge.criteria)) {
//         throw new Error('Entry should be well structured')
//     }


//     return entry as HospitalEntry
// }

// const parseOccupationalHealthcareEntry = (entry: unknown): OccupationalHealthcareEntry => {
//     if (!entry || typeof entry !== 'object') {
//         throw new Error('Entry should be well structured');
//     }
//     if (!("type" in entry && "employerName" in entry) || (entry.type !== "OccupationalHealthcare")) {
//         throw new Error('Entry Not OccupationalHealthcare');
//     }
//     if ("sickLeave" in entry && entry.sickLeave !== null) {
//         if (typeof entry.sickLeave !== 'object') {
//             throw new Error('Entry should be well structured');
//         }
//         if (!("startDate" in entry.sickLeave && "endDate" in entry.sickLeave && typeof entry.sickLeave.startDate === 'string' && typeof entry.sickLeave.endDate === 'string')) {
//             throw new Error('Entry should be well structured');
//         }
//     }
//     return entry as OccupationalHealthcareEntry
// }

// const parseHealthCheckEntry = (entry: unknown): HealthCheckEntry => {
//     if (!entry || typeof entry !== 'object') {
//         throw new Error('Entry should be well structured');
//     }
//     if (!("type" in entry && "healthCheckRating" in entry) || (entry.type !== "HealthCheck")) {
//         throw new Error('Entry Not a Health Check Entry');
//     }
//     if (!isHealthCheckRating(entry.healthCheckRating as number)) {
//         throw new Error('Incorrect Healthchek rating');
//     }
//     return entry as HealthCheckEntry;

// }

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isNumber = (text: unknown): text is number => {
    return typeof text === 'number' || text instanceof Number;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
};

export const toNewEntries = (object: unknown): EntryWithoutId[] => {
    if (!object || typeof object !== 'object' || !Array.isArray(object)) {
        throw new Error('Incorrect or missing data');
    }
    const parsedEntried = object.map(i => parseNewEntry(i));
    return parsedEntried.filter(i => {
        return i !== null
    }) as EntryWithoutId[]
};

export const parseNewEntry = (object: unknown): EntryWithoutId | null => {
    if (!object || typeof object !== 'object' || !('type' in object) || !isBaseEntry(object)) {
        return null
    }

    switch (object.type) {
        case 'HealthCheck':
            if (isHealthCheck(object)) {
                return object
            }
            return null
        case 'OccupationalHealthcare':
            if (isOccupationalHealthcare(object)) {
                return object
            }
            return null
        case 'Hospital':
            if (isHospital(object)) {
                return object
            }
            return null
        default:
            return null
    }
}

const isBaseEntry = (entry: unknown): entry is BaseEntry => {
    if (!entry || typeof entry !== 'object') {
        return false
    }
    const propExist = ("description" in entry && "date" in entry && "specialist" in entry)
    if (propExist && (isString(entry.description) && isString(entry.date) && isDate(entry.date) && isString(entry.specialist))) {
        if ("diagnosisCodes" in entry) {
            if (Array.isArray(entry.diagnosisCodes)) {
                if (entry.diagnosisCodes.find(i => {
                    !isString(i)
                })) {
                    return false
                } else {
                    return true
                }
            } else {
                return false
            }
        } else {
            return true
        }
    } else {
        return false
    }
}

const isOccupationalHealthcare = (entry: unknown): entry is OccupationalHealthcareEntry => {
    if (!entry || typeof entry !== 'object') {
        return false
    }
    if (!("employerName" in entry) || !isString(entry.employerName)) {
        return false
    }
    if ("sickLeave" in entry) {
        if (typeof entry.sickLeave === 'object' && entry.sickLeave) {
            if (("startDate" in entry.sickLeave && isString(entry.sickLeave.startDate) && "endDate" in entry.sickLeave && isString(entry.sickLeave.endDate))) {
                return true
            } else {
                return false
            }
        }
        else {
            return false
        }
    } else {
        return true
    }
}

const isHospital = (entry: unknown): entry is HospitalEntry => {
    if (!entry || typeof entry !== 'object') {
        return false
    }
    if ("discharge" in entry && typeof entry.discharge === 'object' && entry.discharge) {
        if ("date" in entry.discharge && isString(entry.discharge.date) && "criteria" in entry.discharge && isString(entry.discharge.criteria)) {
            return true
        } else {
            return false
        }
    } else {
        return true
    }
}

const isHealthCheck = (entry: unknown): entry is HealthCheckEntry => {
    if (!entry || typeof entry !== 'object') {
        return false
    }
    const propExists = ("healthCheckRating" in entry)
    if (propExists && (isNumber(entry.healthCheckRating)) && (isHealthCheckRating(entry.healthCheckRating))) {
        return true
    } else {
        return false
    }

}

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).map(v => v).includes(param);
}