/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Province } from '../models/Province';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProvincesService {
    /**
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns any
     * @throws ApiError
     */
    public static provincesList(
        page?: number,
        pageSize?: number,
    ): CancelablePromise<{
        count: number;
        next?: string | null;
        previous?: string | null;
        results: Array<Province>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/provinces/',
            query: {
                'page': page,
                'page_size': pageSize,
            },
        });
    }
    /**
     * @param data
     * @returns Province
     * @throws ApiError
     */
    public static provincesCreate(
        data: Province,
    ): CancelablePromise<Province> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/provinces/',
            body: data,
        });
    }
    /**
     * @param id A unique integer value identifying this province.
     * @returns Province
     * @throws ApiError
     */
    public static provincesRead(
        id: number,
    ): CancelablePromise<Province> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/provinces/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this province.
     * @param data
     * @returns Province
     * @throws ApiError
     */
    public static provincesUpdate(
        id: number,
        data: Province,
    ): CancelablePromise<Province> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/provinces/{id}/',
            path: {
                'id': id,
            },
            body: data,
        });
    }
    /**
     * @param id A unique integer value identifying this province.
     * @param data
     * @returns Province
     * @throws ApiError
     */
    public static provincesPartialUpdate(
        id: number,
        data: Province,
    ): CancelablePromise<Province> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/provinces/{id}/',
            path: {
                'id': id,
            },
            body: data,
        });
    }
    /**
     * @param id A unique integer value identifying this province.
     * @returns void
     * @throws ApiError
     */
    public static provincesDelete(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/provinces/{id}/',
            path: {
                'id': id,
            },
        });
    }
}
