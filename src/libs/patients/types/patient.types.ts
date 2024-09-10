export interface Patient {
    id: string;
    first_name: string;
    last_name: string;
    gender: string;
    date_of_birth: Date;
    place_of_birth: string;
    phone_number: string;
    created_at: Date;
}

export interface CreatePatient {
    first_name: string;
    last_name: string;
    gender: string;
    date_of_birth: Date;
    place_of_birth: string;
    phone_number: string;
}
