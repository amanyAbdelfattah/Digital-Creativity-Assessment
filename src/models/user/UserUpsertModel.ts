export interface UserUpsertModel {
    Id?: number;
    name: string;
    father_name: string;
    grandfather_name: string;
    family_branch_name: string;
    gender: string;
    phone: string;
    email: string;
    password?: string;
    password_confirmation?: string;
    date_of_birth: string;
    country_id: string;
    phone_code: string;
    country_code: string;
    tribe: string;
    active: string;
    is_premium: string;
}