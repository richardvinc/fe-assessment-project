import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import * as yup from 'yup';

import { Doctor } from '../../libs/doctors/types/doctor.type';
import { CreateMedicalRecord } from '../../libs/medical-records/types/medical-record.types';
import { Patient } from '../../libs/patients/types/patient.types';

export interface FormValues {
    insurance_name: string;
    category: string;
    cost_unit: string;
    status: string;
    establishment_no: string;
    datum: string;
    diagnosis: string;
    nearest_hospital: string;
}

interface InsuranceFormProps {
    patient: Patient | null;
    doctor: Doctor | undefined;
    initialValues: FormValues;
    createRecord: (record: CreateMedicalRecord) => void;
}

export const MedicalRecordForm: React.FC<InsuranceFormProps> = ({
    patient,
    doctor,
    initialValues,
    createRecord,
}) => {
    return (
        <Formik
            initialValues={initialValues}
            validate={(values) => {
                const errors: Partial<typeof values> = {};
                if (!values.insurance_name) {
                    errors.insurance_name = 'Required';
                }
                if (!values.cost_unit) {
                    errors.cost_unit = 'Required';
                }
                if (!values.category) {
                    errors.category = 'Required';
                }
                if (!values.status) {
                    errors.status = 'Required';
                }
                if (!values.establishment_no) {
                    errors.establishment_no = 'Required';
                }
                if (!values.datum) {
                    errors.datum = 'Required';
                }
                if (!values.diagnosis) {
                    errors.diagnosis = 'Required';
                }
                if (!values.nearest_hospital) {
                    errors.nearest_hospital = 'Required';
                }
                console.log(errors);
            }}
            validationSchema={yup.object({
                insurance_name: yup
                    .string()
                    .required('Health insurance is required'),
                category: yup.string().required('Category is required'),
                cost_unit: yup.string().required('Cost unit is required'),
                status: yup.string().required('Status is required'),
                establishment_no: yup
                    .string()
                    .required('Establishment no. is required'),
                datum: yup.string().required('Datum is required'),
                diagnosis: yup.string().required('Diagnosis is required'),
                nearest_hospital: yup
                    .string()
                    .required('Nearest hospital is required'),
            })}
            onSubmit={async (values) => {
                if (patient && doctor) {
                    createRecord({
                        category: values.category,
                        cost_unit: values.cost_unit,
                        datum: values.datum,
                        establishment_no: values.establishment_no,
                        insurance_name: values.insurance_name,
                        nearest_hospital: values.nearest_hospital,
                        status: values.status,
                        diagnosis: values.diagnosis,
                        patient_id: patient.id,
                        doctor_id: doctor.id,
                    });
                } else {
                    console.log('Patient or doctor could not be identified');
                }
            }}>
            <Form className='max-w-lg mx-auto'>
                <div className='p-4 border border-solid mb-6'>
                    <h2 className='text-center mb-4'>Patient Information</h2>
                    <div className='relative z-0 w-full mb-5 group'>
                        <input
                            type='text'
                            name='patient_name'
                            className='block py-3.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                            placeholder=' '
                            readOnly
                            disabled
                            value={
                                patient
                                    ? `${patient.last_name}, ${patient.first_name}`
                                    : ''
                            }
                        />
                        <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                            Surname, first name of the insured
                        </label>
                    </div>
                    <div className='relative z-0 w-full mb-5 group'>
                        <input
                            type='text'
                            name='pob'
                            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                            placeholder=' '
                            disabled
                            value={patient ? patient.place_of_birth : ''}
                            readOnly
                        />
                        <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                            Place of Birth
                        </label>
                    </div>
                    <div className='relative z-0 w-full mb-5 group'>
                        <input
                            type='text'
                            name='patient_phone_number'
                            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                            placeholder=' '
                            value={patient ? patient.phone_number : ''}
                            readOnly
                        />
                        <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                            Insured person number
                        </label>
                        <ErrorMessage
                            name='patient_phone_number'
                            component='p'
                            className='mt-2 text-sm text-red-600 dark:text-red-500'
                        />
                    </div>
                </div>
                <label className='block mb-2 text-sm text-gray-900 dark:text-white'>
                    Document Category
                </label>
                <Field
                    as='select'
                    name='category'
                    className='bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                    <option value='TREATMENT'>
                        Attending physician treatment
                    </option>
                    <option value='EMERGENCY'>Emergency</option>
                    <option value='ACCIDENT'>Accident</option>
                    <option value='BVG'>BVG</option>
                </Field>

                <div className='relative z-0 w-full mb-5 group'>
                    <Field
                        type='text'
                        name='insurance_name'
                        className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                        placeholder=' '
                    />
                    <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                        Health insurance or cost carrier
                    </label>
                    <ErrorMessage
                        name='insurance_name'
                        component='p'
                        className='mt-2 text-sm text-red-600 dark:text-red-500'
                    />
                </div>
                <div className='relative z-0 w-full mb-5 group'>
                    <Field
                        type='text'
                        name='cost_unit'
                        className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                        placeholder=' '
                    />
                    <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                        Cost unit identification
                    </label>
                    <ErrorMessage
                        name='cost_unit'
                        component='p'
                        className='mt-2 text-sm text-red-600 dark:text-red-500'
                    />
                </div>
                <div className='relative z-0 w-full mb-5 group'>
                    <Field
                        type='text'
                        name='status'
                        className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                        placeholder=' '
                    />
                    <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                        Status
                    </label>
                    <ErrorMessage
                        name='status'
                        component='p'
                        className='mt-2 text-sm text-red-600 dark:text-red-500'
                    />
                </div>
                <div className='relative z-0 w-full mb-5 group'>
                    <Field
                        type='text'
                        name='establishment_no'
                        className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                        placeholder=' '
                    />
                    <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                        Establishment No.
                    </label>
                    <ErrorMessage
                        name='establishment_no'
                        component='p'
                        className='mt-2 text-sm text-red-600 dark:text-red-500'
                    />
                </div>
                {/* <div className='relative z-0 w-full mb-5 group'>
                    <input
                        type='text'
                        name='doctor_no'
                        className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                        placeholder=' '
                        readOnly
                        disabled
                        value={doctor ? doctor.license_number : ''}
                    />
                    <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                        Doctor no.
                    </label>
                    <ErrorMessage
                        name='doctor_no'
                        component='p'
                        className='mt-2 text-sm text-red-600 dark:text-red-500'
                    />
                </div> */}
                <div className='relative z-0 w-full mb-5 group'>
                    <Field
                        type='text'
                        name='datum'
                        className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                        placeholder=' '
                    />
                    <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                        Datum
                    </label>
                    <ErrorMessage
                        name='datum'
                        component='p'
                        className='mt-2 text-sm text-red-600 dark:text-red-500'
                    />
                </div>
                <div className='relative z-0 w-full mb-5 group'>
                    <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                        Diagnosis
                    </label>
                    <Field
                        type='text'
                        name='diagnosis'
                        className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                        placeholder=' '
                    />
                    <ErrorMessage
                        name='diagnosis'
                        component='p'
                        className='mt-2 text-sm text-red-600 dark:text-red-500'
                    />
                </div>
                <div className='relative z-0 w-full mb-5 group'>
                    <Field
                        type='text'
                        name='nearest_hospital'
                        className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                        placeholder=' '
                    />
                    <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                        Nearest Suitable Hospital
                    </label>
                    <ErrorMessage
                        name='nearest_hospital'
                        component='p'
                        className='mt-2 text-sm text-red-600 dark:text-red-500'
                    />
                </div>
                <button
                    type='submit'
                    className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 w-full font-medium rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                    Submit and Preview Document
                </button>
            </Form>
        </Formik>
    );
};
