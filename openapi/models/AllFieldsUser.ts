/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Address } from './Address';
export type AllFieldsUser = {
    readonly id?: number;
    address?: Array<Address> | null;
    last_login?: string | null;
    first_name?: string | null;
    last_name?: string | null;
    email: string;
    readonly date_joined?: string;
    is_admin?: boolean;
    is_active?: boolean;
    is_staff?: boolean;
    is_superuser?: boolean;
    readonly created_on?: string | null;
    readonly updated_on?: string;
    /**
     * The groups this user belongs to. A user will get all permissions granted to each of their groups.
     */
    groups?: Array<number>;
    /**
     * Specific permissions for this user.
     */
    user_permissions?: Array<number>;
};

