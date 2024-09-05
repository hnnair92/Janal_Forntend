/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FabricOptions } from '../models/FabricOptions';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FabricOptionsService {
    /**
     * @param search A search term.
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @param variantId Product variant ID
     * @returns FabricOptions
     * @throws ApiError
     */
    public static fabricOptionsList(
        search?: string,
        page?: number,
        pageSize?: number,
        variantId?: string,
    ): CancelablePromise<Array<FabricOptions>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/fabric-options',
            query: {
                'search': search,
                'page': page,
                'page_size': pageSize,
                'variant_id': variantId,
            },
        });
    }
    /**
     * @param data
     * @returns FabricOptions
     * @throws ApiError
     */
    public static fabricOptionsCreate(
        data: FabricOptions,
    ): CancelablePromise<FabricOptions> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/fabric-options',
            body: data,
        });
    }
    /**
     * @param id A unique integer value identifying this fabric options.
     * @returns FabricOptions
     * @throws ApiError
     */
    public static fabricOptionsRead(
        id: number,
    ): CancelablePromise<FabricOptions> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/fabric-options/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this fabric options.
     * @param data
     * @returns FabricOptions
     * @throws ApiError
     */
    public static fabricOptionsUpdate(
        id: number,
        data: FabricOptions,
    ): CancelablePromise<FabricOptions> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/fabric-options/{id}/',
            path: {
                'id': id,
            },
            body: data,
        });
    }
    /**
     * @param id A unique integer value identifying this fabric options.
     * @param data
     * @returns FabricOptions
     * @throws ApiError
     */
    public static fabricOptionsPartialUpdate(
        id: number,
        data: FabricOptions,
    ): CancelablePromise<FabricOptions> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/fabric-options/{id}/',
            path: {
                'id': id,
            },
            body: data,
        });
    }
    /**
     * @param id A unique integer value identifying this fabric options.
     * @returns void
     * @throws ApiError
     */
    public static fabricOptionsDelete(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/fabric-options/{id}/',
            path: {
                'id': id,
            },
        });
    }
}
