/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Promotion } from '../models/Promotion';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AdminBannerManagementService {
    /**
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns any
     * @throws ApiError
     */
    public static adminBannersList(
        page?: number,
        pageSize?: number,
    ): CancelablePromise<{
        count: number;
        next?: string | null;
        previous?: string | null;
        results: Array<Promotion>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/banners/',
            query: {
                'page': page,
                'page_size': pageSize,
            },
        });
    }
    /**
     * @param data
     * @returns Promotion
     * @throws ApiError
     */
    public static adminBannersCreate(
        data: Promotion,
    ): CancelablePromise<Promotion> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/banners/',
            body: data,
        });
    }
    /**
     * @param id
     * @returns Promotion
     * @throws ApiError
     */
    public static adminBannersRead(
        id: string,
    ): CancelablePromise<Promotion> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/banners/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param data
     * @returns Promotion
     * @throws ApiError
     */
    public static adminBannersUpdate(
        id: string,
        data: Promotion,
    ): CancelablePromise<Promotion> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/banners/{id}/',
            path: {
                'id': id,
            },
            body: data,
        });
    }
    /**
     * @param id
     * @param data
     * @returns Promotion
     * @throws ApiError
     */
    public static adminBannersPartialUpdate(
        id: string,
        data: Promotion,
    ): CancelablePromise<Promotion> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/admin/banners/{id}/',
            path: {
                'id': id,
            },
            body: data,
        });
    }
    /**
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static adminBannersDelete(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/banners/{id}/',
            path: {
                'id': id,
            },
        });
    }
}
