import { CountryModel } from "../CountryModel";

export interface UserListingModel {
    id: number;
    active: string;
    code: string;
    country: CountryModel;
    country_code: string;
    country_id: number;
    created_at: string;
    date_of_birth: string;
    email: string;
    family_branch_name: string
    father_name: string;
    gender: string;
    grandfather_name: string;
    image: string;
    is_premium: string;
    name: string;
    phone: string;
    phone_code: string;
    tribe: string;
    type: string;
    updated_at: string;
    verified_at: string
}