/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DynamicAttributesPublic } from './DynamicAttributesPublic';
import type { Product } from './Product';
import type { PublicColorOption } from './PublicColorOption';
import type { UploadedImages } from './UploadedImages';
export type PublicProductFabricsDetails = {
    readonly id?: number;
    image: UploadedImages;
    fabric_name: string;
    readonly dynamic_attribute_values?: Array<DynamicAttributesPublic>;
    color_options: Array<PublicColorOption>;
    product?: Product;
    readonly category_name?: string;
};

