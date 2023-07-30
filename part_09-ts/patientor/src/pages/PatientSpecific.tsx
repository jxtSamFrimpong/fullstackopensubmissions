import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useParams,
    useMatch,
    useNavigate
} from 'react-router-dom'
import { useEffect, useState } from 'react';
import { Button, Divider, Container, Typography } from '@mui/material';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import services from '../services/patients'
import diagnosticServices from '../services/diagnoses'
import { Patient, Gender, Diagnosis, Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from '../types';

const EntryDetails = ({ entry }: { entry: Entry }) => {
    switch (entry.type) {
        case 'HealthCheck':
            return <HealthCheckDetail entry={entry} />
        case 'Hospital':
            return <HospitalDetail entry={entry} />
        case 'OccupationalHealthcare':
            return <OccupationalHealthcareDetail entry={entry} />
        default:
            return null
    }
}

const HealthCheckDetail = ({ entry }: { entry: HealthCheckEntry }) => {
    return <section>
        <p>{entry.date} <HealthAndSafetyIcon /></p>
        {entry.description}
        {entry.healthCheckRating}
        {entry.specialist}
    </section>
}

const HospitalDetail = ({ entry }: { entry: HospitalEntry }) => {
    return <section>
        <p>{entry.date} </p>
        {entry.description}
        discharge date: {entry.discharge.date} criteria: {entry.discharge.criteria}
        {entry.specialist}
    </section>
}

const OccupationalHealthcareDetail = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
    return <section>
        <p>{entry.date} </p>
        {entry.description}
        {entry.sickLeave && <>sick leave start: {entry.sickLeave.startDate} end: {entry.sickLeave.endDate}</>}
        {entry.specialist}
    </section>
}

const PatientSpecific = () => {
    const id = useParams().id as string;
    const [patient, setPatient] = useState<Patient | null>(null);
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

    useEffect(() => {
        services.getOnePatient(id).then(data => {
            setPatient(data);
        });

    }, [id])
    useEffect(() => {
        diagnosticServices.getAll().then(data => setDiagnoses(data));
    }, [])
    const genderIcon = (gender: Gender) => {
        switch (gender) {
            case 'male':
                return <FemaleIcon />
            case 'female':
                return <MaleIcon />
            default:
                return <>Other</>
        }
    }
    return <Container>
        {patient && <>
            <Typography variant="h5" style={{ marginBottom: "0.5em" }}>
                {patient.name} {genderIcon(patient.gender)}
            </Typography>
            <p>ssn: {patient.ssn}</p>
            <p>occupation {patient.occupation}</p>
            <Typography variant="h6" style={{ marginBottom: "0.5em" }}>
                entries
            </Typography>
            {patient.entries.map(entry => {
                return <article key={entry.id}>
                    <EntryDetails entry={entry} />
                    {entry.diagnosisCodes && <ul>{entry.diagnosisCodes.map(cod => <li key={cod}>{cod} {diagnoses.find(d => d.code === cod)?.name}</li>)}</ul>}
                </article>;
            })}
        </>}
    </Container>
}

export default PatientSpecific;