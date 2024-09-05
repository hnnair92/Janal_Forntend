/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Product = {
    readonly id?: number;
    readonly category_name?: string;
    is_deleted?: boolean;
    deleted_at?: string | null;
    name: string;
    short_description: string;
    long_description?: string | null;
    base_price?: string | null;
    readonly created_on?: string | null;
    readonly updated_on?: string;
    category: number;
    product_images?: Array<number>;
    dynamic_attribute_values: Array<number>;
};

