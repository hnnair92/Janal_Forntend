/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type OrderPaymentTracking = {
    payment_transaction_id?: string | null;
    payment_status?: OrderPaymentTracking.payment_status | null;
    transaction_completed?: boolean;
};
export namespace OrderPaymentTracking {
    export enum payment_status {
        INITIATED = 'initiated',
        IN_PROGRESS = 'in_progress',
        ERROR = 'error',
        SUCCESS = 'success',
        FAILED = 'failed',
    }
}

