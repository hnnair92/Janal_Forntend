/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ProductVariant = {
    readonly id?: number;
    is_deleted?: boolean;
    deleted_at?: string | null;
    max_width?: number | null;
    max_height?: number | null;
    price?: string | null;
    readonly created_on?: string | null;
    readonly updated_on?: string;
    product: number;
    fabrics?: Array<number>;
};

