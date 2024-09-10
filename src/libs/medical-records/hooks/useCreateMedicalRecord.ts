import { AxiosResponse } from 'axios';

import {
    UseBaseMutationResult,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';

import { client } from '../../../api/client';
import {
    CreateMedicalRecord,
    MedicalRecord,
} from '../types/medical-record.types';

const addRecord = async (mr: CreateMedicalRecord) => {
    return (
        await client.post<AxiosResponse<MedicalRecord>>(
            '/medical-certificates',
            mr
        )
    ).data;
};

export const useCreateMedicalRecord = (): UseBaseMutationResult<
    AxiosResponse<MedicalRecord>,
    unknown,
    CreateMedicalRecord,
    unknown
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addRecord,
        onSuccess: (mr) => {
            queryClient.invalidateQueries({
                queryKey: ['medical-certificates'],
            });
            const url = `${import.meta.env.VITE_API_URL}/docs/${
                mr.data.id
            }.pdf`;
            const newWindow = window.open(url, '_blank');
            if (newWindow) {
                newWindow.focus();
            }
        },
    });
};
