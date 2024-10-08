/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UploadedImages } from './UploadedImages';
export type Promotion = {
    readonly id?: number;
    banner_image?: UploadedImages;
    banner_image_long?: UploadedImages;
    banner_image_mobile?: UploadedImages;
    name: string;
    readonly uuid?: string;
    description?: string | null;
    discount_percentage: string;
    start_date?: string | null;
    end_date?: string | null;
    is_enabled?: boolean;
    readonly created_on?: string | null;
    permanent_banner?: boolean;
    products?: Array<number>;
};

