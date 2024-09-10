import { AxiosResponse } from 'axios';

import { QueryObserverResult, useQuery } from '@tanstack/react-query';

import { client } from '../../../api/client';
import { Patient } from '../types/patient.types';

export type SuccessResponse<T> = {
    data: T;
    status_code: string;
};

export type ServerResponse<T> = AxiosResponse<SuccessResponse<T>>;

const getPatients = async (name?: string) => {
    return name
        ? (
              await client.get<AxiosResponse<Patient[]>>(
                  `/patients/find?name=${name}`
              )
          ).data
        : (await client.get<AxiosResponse<Patient[]>>(`/patients`)).data;
};

export const useGetPatients = (
    name?: string
): QueryObserverResult<Patient[], unknown> => {
    return useQuery<Patient[], unknown>({
        queryFn: async () => {
            const { data } = await getPatients(name);
            return data;
        },
        queryKey: ['patients', name],
    });
};
