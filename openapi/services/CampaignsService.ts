/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Promotion } from '../models/Promotion';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CampaignsService {
    /**
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns any
     * @throws ApiError
     */
    public static campaignsList(
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
            url: '/campaigns/',
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
    public static campaignsCreate(
        data: Promotion,
    ): CancelablePromise<Promotion> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/campaigns/',
            body: data,
        });
    }
    /**
     * @param id A unique integer value identifying this promotion campaigns.
     * @returns Promotion
     * @throws ApiError
     */
    public static campaignsRead(
        id: number,
    ): CancelablePromise<Promotion> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/campaigns/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this promotion campaigns.
     * @param data
     * @returns Promotion
     * @throws ApiError
     */
    public static campaignsUpdate(
        id: number,
        data: Promotion,
    ): CancelablePromise<Promotion> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/campaigns/{id}/',
            path: {
                'id': id,
            },
            body: data,
        });
    }
    /**
     * @param id A unique integer value identifying this promotion campaigns.
     * @param data
     * @returns Promotion
     * @throws ApiError
     */
    public static campaignsPartialUpdate(
        id: number,
        data: Promotion,
    ): CancelablePromise<Promotion> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/campaigns/{id}/',
            path: {
                'id': id,
            },
            body: data,
        });
    }
    /**
     * @param id A unique integer value identifying this promotion campaigns.
     * @returns void
     * @throws ApiError
     */
    public static campaignsDelete(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/campaigns/{id}/',
            path: {
                'id': id,
            },
        });
    }
}
