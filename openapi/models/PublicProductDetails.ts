/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Category } from './Category';
import type { ColorOption } from './ColorOption';
import type { DynamicAttributesPublic } from './DynamicAttributesPublic';
import type { ProductVariant } from './ProductVariant';
import type { UploadedImages } from './UploadedImages';
export type PublicProductDetails = {
    readonly id?: number;
    category: Category;
    product_images: Array<UploadedImages>;
    dynamic_attribute_values: Array<DynamicAttributesPublic>;
    variants: Array<ProductVariant>;
    readonly colors?: Array<ColorOption>;
    is_deleted?: boolean;
    deleted_at?: string | null;
    name: string;
    short_description: string;
    long_description?: string | null;
    base_price?: string | null;
    readonly created_on?: string | null;
    readonly updated_on?: string;
};

