import { CountryModel } from "../CountryModel";

export interface UserDetailsModel {
    id: number;
    name: string;
    father_name: string;
    grandfather_name: string;
    family_branch_name: string;
    tribe: string;
    image: string;
    gender: string;
    date_of_birth: string;
    country_id: number;
    phone: string;
    phone_code: string;
    country_code: string;
    email: string;
    type: string;
    active: number;
    is_premium: number;
    code: string;
    verified_at: string;
    created_at: string;
    updated_at: string;
    country: CountryModel;
}