/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DynamicAttribute } from './DynamicAttribute';
import type { DynamicAttributeValueSubItems } from './DynamicAttributeValueSubItems';
import type { UploadedImages } from './UploadedImages';
export type DynamicAttributesPublic = {
    readonly id?: number;
    image: UploadedImages;
    attribute: DynamicAttribute;
    readonly sub_items?: Array<DynamicAttributeValueSubItems> | null;
    is_deleted?: boolean;
    deleted_at?: string | null;
    value: string;
    price: string;
    position_required?: boolean;
    position?: DynamicAttributesPublic.position | null;
    min_height?: number | null;
    max_height?: number | null;
    min_width?: number | null;
    max_width?: number | null;
    help_text?: string | null;
    readonly created_on?: string | null;
    readonly updated_on?: string;
    extra_attributes?: Array<number>;
};
export namespace DynamicAttributesPublic {
    export enum position {
        '_1' = 1,
        '_2' = 2,
    }
}

