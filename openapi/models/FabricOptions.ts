/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ColorOption } from './ColorOption';
export type FabricOptions = {
    readonly id?: number;
    color_options: Array<ColorOption>;
    readonly product_name?: string;
    is_deleted?: boolean;
    deleted_at?: string | null;
    fabric_name: string;
    max_width?: number | null;
    max_height?: number | null;
    readonly created_on?: string | null;
    readonly updated_on?: string;
    image?: number | null;
    product?: number | null;
    tags?: Array<number>;
};

