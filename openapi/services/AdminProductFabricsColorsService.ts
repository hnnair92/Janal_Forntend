/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdminMultiPriceUpdate } from '../models/AdminMultiPriceUpdate';
import type { AdminProductFabricsColors } from '../models/AdminProductFabricsColors';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AdminProductFabricsColorsService {
    /**
     * @param search A search term.
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns any
     * @throws ApiError
     */
    public static adminProductFabricsAndColorsList(
        search?: string,
        page?: number,
        pageSize?: number,
    ): CancelablePromise<{
        count: number;
        next?: string | null;
        previous?: string | null;
        results: Array<AdminProductFabricsColors>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/product/fabrics-and-colors/',
            query: {
                'search': search,
                'page': page,
                'page_size': pageSize,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this color option.
     * @returns AdminProductFabricsColors
     * @throws ApiError
     */
    public static adminProductFabricsAndColorsRead(
        id: number,
    ): CancelablePromise<AdminProductFabricsColors> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/product/fabrics-and-colors/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param data
     * @returns AdminMultiPriceUpdate
     * @throws ApiError
     */
    public static adminProductMultiPriceCreate(
        data: AdminMultiPriceUpdate,
    ): CancelablePromise<AdminMultiPriceUpdate> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/product/multi-price',
            body: data,
        });
    }
}
