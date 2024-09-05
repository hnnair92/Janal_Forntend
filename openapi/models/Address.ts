/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Address = {
    readonly id?: number;
    readonly province_name?: string;
    first_name: string;
    last_name: string;
    address: string;
    apartment?: string | null;
    city: string;
    postal_code: string;
    phone_number: string;
    email: string;
    address_type?: Address.address_type | null;
    shipping?: Address.shipping | null;
    is_default?: boolean;
    readonly created_on?: string | null;
    readonly updated_on?: string;
    province?: number | null;
    user?: number | null;
};
export namespace Address {
    export enum address_type {
        SHIPPING = 'shipping',
        BILLING = 'billing',
        HOME = 'home',
    }
    export enum shipping {
        STANDARD = 'standard',
        EXPRESS = 'express',
    }
}

