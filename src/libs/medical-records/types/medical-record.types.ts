export interface MedicalRecord {
    id: string;
    patient_id: string;
    doctor_id: string;
    diagnosis: string;
    start_date: Date;
    end_date: Date;
    category: string;
    created_at: Date;
}

export interface CreateMedicalRecord {
    patient_id: string;
    doctor_id: string;
    diagnosis: string;
    insurance_name: string;
    cost_unit: string;
    status: string;
    establishment_no: string;
    datum: string;
    nearest_hospital: string;
    category: string;
}

export enum REPORT_CATEGORY {
    TREATMENT = 'TREATMENT',
    ACCIDENT = 'ACCIDENT',
    EMERGENCY = 'EMERGENCY',
    BVG = 'BVG',
}

// function to generate a random report category

export const randomReportCategory = (): REPORT_CATEGORY => {
    const categories = Object.values(REPORT_CATEGORY);
    const randomIndex = Math.floor(
        Math.random() * Object.values(REPORT_CATEGORY).length
    );
    return categories[randomIndex];
};
