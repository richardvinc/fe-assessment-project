/* eslint-disable @typescript-eslint/no-unused-vars */
import './App.css';

import { generate } from 'random-words';
import { useCallback, useEffect, useState } from 'react';

import { DoctorBox } from './components/DoctorBox';
import { FormValues, MedicalRecordForm } from './components/MedicalRecordForm';
import { PatientBox } from './components/PatientBox';
import { useGetDoctor } from './libs/doctors/hooks/useGetDoctor.hook';
import { useCreateMedicalRecord } from './libs/medical-records/hooks/useCreateMedicalRecord';
import { REPORT_CATEGORY } from './libs/medical-records/types/medical-record.types';
import { useGetPatients } from './libs/patients/hooks/useGetPatients.hook';
import { Patient } from './libs/patients/types/patient.types';

function App() {
    const randomizeFormValue = () => {
        const categories = Object.values(REPORT_CATEGORY);
        const randomIndex = Math.floor(
            Math.random() * Object.values(REPORT_CATEGORY).length
        );

        return {
            insurance_name: generate({ exactly: 3, join: ' ' }),
            category: categories[randomIndex],
            cost_unit: generate({ exactly: 3, join: ' ' }),
            status: generate({ exactly: 3, join: ' ' }),
            establishment_no: generate({ exactly: 3, join: ' ' }),
            datum: generate({ exactly: 3, join: ' ' }),
            diagnosis: generate({ exactly: 20, join: ' ' }),
            nearest_hospital: generate({ exactly: 3, join: ' ' }),
        };
    };

    const [name, setName] = useState<string>('');
    const [patient, setPatient] = useState<Patient | null>(null);
    const [formValue, setFormValue] = useState<FormValues>(randomizeFormValue);

    const { data: patients, isLoading, isError } = useGetPatients(name);

    // usually, we can get this doctor id from some auth mechanism,
    // but we hardcode the id here
    const {
        data: dataDoctor,
        isLoading: doctorLoading,
        isError: doctorError,
    } = useGetDoctor('c721e2f5-4eac-4996-9cca-d135efe49e1d');

    const { mutate: createRecord } = useCreateMedicalRecord();

    const selectPatient = useCallback(
        (id: string) => {
            const p = patients?.find((p) => p.id === id);
            if (p) {
                setPatient(p);
            }
        },
        [patients]
    );

    useEffect(() => {
        selectPatient(patients?.[0]?.id || '');
    }, [patients, selectPatient]);

    return (
        <div className='w-full'>
            <DoctorBox
                data={dataDoctor}
                isError={doctorError}
                isLoading={doctorLoading}
            />

            <PatientBox
                isLoading={isLoading}
                isError={isError}
                patients={patients}
                selectPatient={selectPatient}
            />

            <MedicalRecordForm
                createRecord={createRecord}
                doctor={dataDoctor}
                initialValues={formValue}
                patient={patient}
            />
        </div>
    );
}

export default App;
