import { AxiosResponse } from 'axios';

import { QueryObserverResult, useQuery } from '@tanstack/react-query';

import { client } from '../../../api/client';
import { Doctor } from '../types/doctor.type';

const getDoctor = async (id: string) => {
    return (await client.get<AxiosResponse<Doctor>>(`/doctors/${id}`)).data;
};

export const useGetDoctor = (
    id: string
): QueryObserverResult<Doctor, unknown> => {
    return useQuery<Doctor, unknown>({
        queryFn: async () => {
            const { data } = await getDoctor(id);
            return data;
        },
        queryKey: ['doctor', id],
    });
};
