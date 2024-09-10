import React from 'react';

import { Doctor } from '../../libs/doctors/types/doctor.type';

interface DoctorStatusProps {
    isLoading: boolean;
    isError: boolean;
    data: Doctor | undefined;
}

export const DoctorBox: React.FC<DoctorStatusProps> = ({
    isLoading,
    isError,
    data,
}) => {
    return (
        <div className='max-w-lg mx-auto p-5 border border-solid mb-6'>
            {isLoading ? (
                <p>Loading...</p>
            ) : isError ? (
                <p>Error</p>
            ) : (
                <div>
                    <h1 className=' text-gray-900 dark:text-white'>
                        Logged in as dr.{' '}
                        <strong>
                            {data?.first_name} {data?.last_name}
                        </strong>
                    </h1>
                </div>
            )}
        </div>
    );
};
