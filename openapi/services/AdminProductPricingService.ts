/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdminProductPricing } from '../models/AdminProductPricing';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AdminProductPricingService {
    /**
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @param fabricId queries
     * @returns any
     * @throws ApiError
     */
    public static adminProductPricingList(
        page?: number,
        pageSize?: number,
        fabricId?: string,
    ): CancelablePromise<{
        count: number;
        next?: string | null;
        previous?: string | null;
        results: Array<AdminProductPricing>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/product/pricing/',
            query: {
                'page': page,
                'page_size': pageSize,
                'fabric_id': fabricId,
            },
        });
    }
    /**
     * @param data
     * @returns AdminProductPricing
     * @throws ApiError
     */
    public static adminProductPricingCreate(
        data: AdminProductPricing,
    ): CancelablePromise<AdminProductPricing> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/product/pricing/',
            body: data,
        });
    }
    /**
     * @param id A unique integer value identifying this product pricing.
     * @returns AdminProductPricing
     * @throws ApiError
     */
    public static adminProductPricingRead(
        id: number,
    ): CancelablePromise<AdminProductPricing> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/product/pricing/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this product pricing.
     * @param data
     * @returns AdminProductPricing
     * @throws ApiError
     */
    public static adminProductPricingUpdate(
        id: number,
        data: AdminProductPricing,
    ): CancelablePromise<AdminProductPricing> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/product/pricing/{id}/',
            path: {
                'id': id,
            },
            body: data,
        });
    }
    /**
     * @param id A unique integer value identifying this product pricing.
     * @param data
     * @returns AdminProductPricing
     * @throws ApiError
     */
    public static adminProductPricingPartialUpdate(
        id: number,
        data: AdminProductPricing,
    ): CancelablePromise<AdminProductPricing> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/admin/product/pricing/{id}/',
            path: {
                'id': id,
            },
            body: data,
        });
    }
    /**
     * @param id A unique integer value identifying this product pricing.
     * @returns void
     * @throws ApiError
     */
    public static adminProductPricingDelete(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/product/pricing/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this product pricing.
     * @param height
     * @returns void
     * @throws ApiError
     */
    public static adminProductPricingRemoveHeight(
        id: number,
        height: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/product/pricing/{id}/remove-height/{height}',
            path: {
                'id': id,
                'height': height,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this product pricing.
     * @param width
     * @returns void
     * @throws ApiError
     */
    public static adminProductPricingRemoveWidth(
        id: number,
        width: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/product/pricing/{id}/remove-width/{width}',
            path: {
                'id': id,
                'width': width,
            },
        });
    }
}
