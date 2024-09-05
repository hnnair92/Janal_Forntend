/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Address } from '../models/Address';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AddressService {
    /**
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns any
     * @throws ApiError
     */
    public static addressList(
        page?: number,
        pageSize?: number,
    ): CancelablePromise<{
        count: number;
        next?: string | null;
        previous?: string | null;
        results: Array<Address>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/address/',
            query: {
                'page': page,
                'page_size': pageSize,
            },
        });
    }
    /**
     * @param data
     * @returns Address
     * @throws ApiError
     */
    public static addressCreate(
        data: Address,
    ): CancelablePromise<Address> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/address/',
            body: data,
        });
    }
    /**
     * @param id A unique integer value identifying this address.
     * @returns Address
     * @throws ApiError
     */
    public static addressRead(
        id: number,
    ): CancelablePromise<Address> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/address/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this address.
     * @param data
     * @returns Address
     * @throws ApiError
     */
    public static addressUpdate(
        id: number,
        data: Address,
    ): CancelablePromise<Address> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/address/{id}/',
            path: {
                'id': id,
            },
            body: data,
        });
    }
    /**
     * @param id A unique integer value identifying this address.
     * @param data
     * @returns Address
     * @throws ApiError
     */
    public static addressPartialUpdate(
        id: number,
        data: Address,
    ): CancelablePromise<Address> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/address/{id}/',
            path: {
                'id': id,
            },
            body: data,
        });
    }
    /**
     * @param id A unique integer value identifying this address.
     * @returns void
     * @throws ApiError
     */
    public static addressDelete(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/address/{id}/',
            path: {
                'id': id,
            },
        });
    }
}
