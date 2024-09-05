/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Address } from './Address';
import type { AdminCartItem } from './AdminCartItem';
import type { OrderPaymentTracking } from './OrderPaymentTracking';
export type CustomerOrder = {
    readonly id?: number;
    items: Array<AdminCartItem>;
    shipping_address?: Address;
    billing_address?: Address;
    payment_tracking: OrderPaymentTracking;
    readonly shipped_date?: string;
    readonly uuid?: string;
    customer_order_id?: string | null;
    sale_total?: string | null;
    add_on_total?: string | null;
    tax?: string | null;
    shipping_charge?: number;
    paid?: boolean;
    status?: CustomerOrder.status | null;
    tracking_id?: string | null;
    tracking_partner_name?: string | null;
    tracking_partner_link?: string | null;
    readonly invoice_pdf?: string | null;
    readonly created_on?: string | null;
    readonly updated_on?: string;
    user?: number | null;
};
export namespace CustomerOrder {
    export enum status {
        CREATED = 'created',
        CONFIRMED = 'confirmed',
        PENDING = 'pending',
        SHIPPED = 'shipped',
        DELIVERED = 'delivered',
    }
}

