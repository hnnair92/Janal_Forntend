/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PublicColorOption } from './PublicColorOption';
import type { SelectedSubItem } from './SelectedSubItem';
export type CartItem = {
    readonly id?: number;
    readonly attributes_selected?: any;
    color: PublicColorOption;
    sub_items?: Array<SelectedSubItem> | null;
    height_inch?: number | null;
    height_fraction?: string | null;
    width_inch?: number | null;
    width_fraction?: string | null;
    attribute_values_configuration?: any;
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

