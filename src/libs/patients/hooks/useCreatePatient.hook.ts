import { AxiosResponse } from 'axios';

import {
    UseBaseMutationResult,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';

import { client } from '../../../api/client';
import { CreatePatient } from '../types/patient.types';

const addPatient = async (patient: CreatePatient) => {
    return (
        await client.post<AxiosResponse<CreatePatient>>('/patients', patient)
    ).data;
};

export const useCreatePatient = (): UseBaseMutationResult<
    AxiosResponse<CreatePatient>,
    unknown,
    CreatePatient,
    unknown
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addPatient,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['patients'] });
        },
    });
};
