import { AxiosResponse } from 'axios';

import { QueryObserverResult, useQuery } from '@tanstack/react-query';

import { client } from '../../../api/client';
import { Patient } from '../types/patient.types';

const getPatient = async (id: string) => {
    return (await client.get<AxiosResponse<Patient>>(`/patients/${id}`)).data;
};

export const useGetPatient = (
    id: string
): QueryObserverResult<Patient, unknown> => {
    return useQuery<Patient, unknown>({
        queryFn: async () => {
            const { data } = await getPatient(id);
            return data;
        },
        queryKey: ['patient', id],
    });
};
