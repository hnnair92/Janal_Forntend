/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProvinceTaxRate } from '../models/ProvinceTaxRate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProvinceTaxRatesService {
    /**
     * Retrieve all province tax rates
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns ProvinceTaxRate
     * @throws ApiError
     */
    public static adminProvinceTaxList(
        page?: number,
        pageSize?: number,
    ): CancelablePromise<Array<ProvinceTaxRate>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/province-tax/',
            query: {
                'page': page,
                'page_size': pageSize,
            },
        });
    }
    /**
     * Create a new province tax rate
     * @param data
     * @returns ProvinceTaxRate
     * @throws ApiError
     */
    public static adminProvinceTaxCreate(
        data: ProvinceTaxRate,
    ): CancelablePromise<ProvinceTaxRate> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/province-tax/',
            body: data,
        });
    }
    /**
     * Retrieve a province tax rate by ID
     * @param id A unique integer value identifying this province tax rate.
     * @returns ProvinceTaxRate
     * @throws ApiError
     */
    public static adminProvinceTaxRead(
        id: number,
    ): CancelablePromise<ProvinceTaxRate> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/province-tax/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Update a province tax rate by ID
     * @param id A unique integer value identifying this province tax rate.
     * @param data
     * @returns ProvinceTaxRate
     * @throws ApiError
     */
    public static adminProvinceTaxUpdate(
        id: number,
        data: ProvinceTaxRate,
    ): CancelablePromise<ProvinceTaxRate> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/province-tax/{id}/',
            path: {
                'id': id,
            },
            body: data,
        });
    }
    /**
     * Retrieve a province tax rate by ID
     * @param id A unique integer value identifying this province tax rate.
     * @param data
     * @returns ProvinceTaxRate
     * @throws ApiError
     */
    public static adminProvinceTaxPartialUpdate(
        id: number,
        data: ProvinceTaxRate,
    ): CancelablePromise<ProvinceTaxRate> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/admin/province-tax/{id}/',
            path: {
                'id': id,
            },
            body: data,
        });
    }
    /**
     * Delete a province tax rate by ID
     * @param id A unique integer value identifying this province tax rate.
     * @returns void
     * @throws ApiError
     */
    public static adminProvinceTaxDelete(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/province-tax/{id}/',
            path: {
                'id': id,
            },
        });
    }
}
