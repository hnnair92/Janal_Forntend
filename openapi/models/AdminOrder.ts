/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Address } from './Address';
import type { AdminCartItem } from './AdminCartItem';
import type { OrderPaymentTracking } from './OrderPaymentTracking';
export type AdminOrder = {
    readonly id?: number;
    items: Array<AdminCartItem>;
    shipping_address?: Address;
    billing_address?: Address;
    payment_tracking: OrderPaymentTracking;
    readonly shipped_date?: string;
    readonly items_total?: string;
    readonly items_add_on_total?: string;
    readonly items_discount_total?: string;
    readonly total_sales?: string;
    readonly uuid?: string;
    customer_order_id?: string | null;
    sale_total?: string | null;
    add_on_total?: string | null;
    discount_total?: string | null;
    tax?: string | null;
    shipping_charge?: number;
    paid?: boolean;
    status?: AdminOrder.status | null;
    tracking_id?: string | null;
    tracking_partner_name?: string | null;
    tracking_partner_link?: string | null;
    readonly invoice_pdf?: string | null;
    readonly created_on?: string | null;
    readonly updated_on?: string;
    user?: number | null;
};
export namespace AdminOrder {
    export enum status {
        CREATED = 'created',
        CONFIRMED = 'confirmed',
        PENDING = 'pending',
        SHIPPED = 'shipped',
        DELIVERED = 'delivered',
    }
}

