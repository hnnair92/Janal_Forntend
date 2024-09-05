/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UploadedImages } from './UploadedImages';
export type ColorOption = {
    readonly id?: number;
    images: Array<UploadedImages>;
    readonly light_filter_display?: string;
    readonly color_type_display?: string;
    is_deleted?: boolean;
    deleted_at?: string | null;
    color_name: string;
    price?: string | null;
    color_type?: ColorOption.color_type;
    light_filter?: ColorOption.light_filter;
    fabric_image?: number | null;
};
export namespace ColorOption {
    export enum color_type {
        BUDGET = 'budget',
        CLASSIC = 'classic',
        PREMIUM = 'premium',
        BARGAIN = 'bargain',
    }
    export enum light_filter {
        ROOM_DARKEN = 'room-darken',
        LIGHT_FILTER = 'light-filter',
    }
}

