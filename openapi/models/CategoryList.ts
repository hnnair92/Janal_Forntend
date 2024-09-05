/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UploadedImages } from './UploadedImages';
export type CategoryList = {
    readonly id?: number;
    images: Array<UploadedImages>;
    is_deleted?: boolean;
    deleted_at?: string | null;
    name: string;
    is_enabled?: boolean;
    readonly created_on?: string | null;
    readonly updated_on?: string;
};

