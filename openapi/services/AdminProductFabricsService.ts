/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SimpleFabricOptions } from '../models/SimpleFabricOptions';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AdminProductFabricsService {
    /**
     * @param search A search term.
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns any
     * @throws ApiError
     */
    public static adminProductFabricsList(
        search?: string,
        page?: number,
        pageSize?: number,
    ): CancelablePromise<{
        count: number;
        next?: string | null;
        previous?: string | null;
        results: Array<SimpleFabricOptions>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/product/fabrics/',
            query: {
                'search': search,
                'page': page,
                'page_size': pageSize,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this fabric options.
     * @returns SimpleFabricOptions
     * @throws ApiError
     */
    public static adminProductFabricsRead(
        id: number,
    ): CancelablePromise<SimpleFabricOptions> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/product/fabrics/{id}/',
            path: {
                'id': id,
            },
        });
    }
}
