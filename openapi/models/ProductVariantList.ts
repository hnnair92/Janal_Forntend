/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FabricOptions } from './FabricOptions';
import type { Product } from './Product';
export type ProductVariantList = {
    readonly id?: number;
    product: Product;
    fabrics: Array<FabricOptions>;
    is_deleted?: boolean;
    deleted_at?: string | null;
    max_width?: number | null;
    max_height?: number | null;
    price?: string | null;
    readonly created_on?: string | null;
    readonly updated_on?: string;
};

