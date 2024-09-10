import React from 'react';

interface Patient {
    id: string;
    first_name: string;
    last_name: string;
    place_of_birth: string;
    date_of_birth: Date;
}

interface PatientFormProps {
    isLoading: boolean;
    isError: boolean;
    patients: Patient[] | undefined;
    selectPatient: (id: string) => void;
}

export const PatientBox: React.FC<PatientFormProps> = ({
    isLoading,
    isError,
    patients,
    selectPatient,
}) => {
    return (
        <form className='max-w-lg mx-auto p-5 border border-solid mb-6'>
            {isLoading ? (
                <p>Loading...</p>
            ) : isError ? (
                <p>Error</p>
            ) : (
                <div>
                    <h2 className='text-center mb-4'>Select Patient</h2>
                    <select
                        id='patients'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        onChange={(e) => {
                            selectPatient(e.target.value);
                        }}>
                        {patients?.map((p) => (
                            <option
                                key={p.id}
                                value={p.id}>
                                {p.last_name}, {p.first_name} (
                                {p.place_of_birth}, {p.date_of_birth.toString()}
                                )
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </form>
    );
};
