/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdminDynamicValueSelected } from './AdminDynamicValueSelected';
import type { ColorOption } from './ColorOption';
import type { MinDynamicAttribute } from './MinDynamicAttribute';
import type { SelectedSubItem } from './SelectedSubItem';
export type AdminCartItem = {
    readonly id?: number;
    readonly attributes_selected?: any;
    color: ColorOption;
    readonly product_name?: string;
    readonly color_name?: string;
    readonly fabric_name?: string;
    readonly options_selected?: Array<MinDynamicAttribute>;
    readonly sub_items?: Array<SelectedSubItem> | null;
    readonly attribute_values_selected?: Array<AdminDynamicValueSelected>;
    height_inch?: number | null;
    height_fraction?: string | null;
    width_inch?: number | null;
    width_fraction?: string | null;
    price: string;
    quantity: number;
    discount_amount?: number;
    refer_url?: string | null;
    fabric_id?: string | null;
    add_on_prices?: number | null;
    readonly created_on?: string | null;
    readonly updated_on?: string;
    product?: number | null;
    discount?: number | null;
    attribute_values?: Array<number>;
};

