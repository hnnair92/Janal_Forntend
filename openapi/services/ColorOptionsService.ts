/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ColorOption } from '../models/ColorOption';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ColorOptionsService {
    /**
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns any
     * @throws ApiError
     */
    public static colorOptionsList(
        page?: number,
        pageSize?: number,
    ): CancelablePromise<{
        count: number;
        next?: string | null;
        previous?: string | null;
        results: Array<ColorOption>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/color-options',
            query: {
                'page': page,
                'page_size': pageSize,
            },
        });
    }
    /**
     * @param data
     * @returns ColorOption
     * @throws ApiError
     */
    public static colorOptionsCreate(
        data: ColorOption,
    ): CancelablePromise<ColorOption> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/color-options',
            body: data,
        });
    }
    /**
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns any
     * @throws ApiError
     */
    public static colorOptionsList1(
        page?: number,
        pageSize?: number,
    ): CancelablePromise<{
        count: number;
        next?: string | null;
        previous?: string | null;
        results: Array<ColorOption>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/color-options/',
            query: {
                'page': page,
                'page_size': pageSize,
            },
        });
    }
    /**
     * @param data
     * @returns ColorOption
     * @throws ApiError
     */
    public static colorOptionsCreate1(
        data: ColorOption,
    ): CancelablePromise<ColorOption> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/color-options/',
            body: data,
        });
    }
    /**
     * @param id A unique integer value identifying this color option.
     * @returns ColorOption
     * @throws ApiError
     */
    public static colorOptionsRead(
        id: number,
    ): CancelablePromise<ColorOption> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/color-options/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this color option.
     * @param data
     * @returns ColorOption
     * @throws ApiError
     */
    public static colorOptionsUpdate(
        id: number,
        data: ColorOption,
    ): CancelablePromise<ColorOption> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/color-options/{id}/',
            path: {
                'id': id,
            },
            body: data,
        });
    }
    /**
     * @param id A unique integer value identifying this color option.
     * @param data
     * @returns ColorOption
     * @throws ApiError
     */
    public static colorOptionsPartialUpdate(
        id: number,
        data: ColorOption,
    ): CancelablePromise<ColorOption> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/color-options/{id}/',
            path: {
                'id': id,
            },
            body: data,
        });
    }
    /**
     * @param id A unique integer value identifying this color option.
     * @returns void
     * @throws ApiError
     */
    public static colorOptionsDelete(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/color-options/{id}/',
            path: {
                'id': id,
            },
        });
    }
}
