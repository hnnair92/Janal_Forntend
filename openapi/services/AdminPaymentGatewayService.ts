/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderPaymentTrackingSession } from '../models/OrderPaymentTrackingSession';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AdminPaymentGatewayService {
    /**
     * @param firstName queries
     * @param lastName queries
     * @returns OrderPaymentTrackingSession
     * @throws ApiError
     */
    public static adminPaymentTestPaymentList(
        firstName?: string,
        lastName?: string,
    ): CancelablePromise<OrderPaymentTrackingSession> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/payment/test-payment/',
            query: {
                'first_name': firstName,
                'last_name': lastName,
            },
        });
    }
}
