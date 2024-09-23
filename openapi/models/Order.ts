/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Address } from './Address';
import type { CartItem } from './CartItem';
export type Order = {
    items: Array<CartItem>;
    shipping_address?: Address;
    billing_address?: Address;
    readonly uuid?: string;
    customer_order_id?: string | null;
    sale_total?: string | null;
    add_on_total?: string | null;
    discount_total?: string | null;
    tax?: string | null;
    shipping_charge?: number;
    status?: Order.status | null;
    tracking_id?: string | null;
    tracking_partner_name?: string | null;
    tracking_partner_link?: string | null;
    readonly invoice_pdf?: string | null;
    readonly created_on?: string | null;
    readonly updated_on?: string;
    user?: number | null;
};
export namespace Order {
    export enum status {
        CREATED = 'created',
        CONFIRMED = 'confirmed',
        PENDING = 'pending',
        SHIPPED = 'shipped',
        DELIVERED = 'delivered',
    }
}

