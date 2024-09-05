/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProductVariant } from '../models/ProductVariant';
import type { ProductVariantList } from '../models/ProductVariantList';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProductVariantsService {
    /**
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns ProductVariantList
     * @throws ApiError
     */
    public static productVariantsList(
        page?: number,
        pageSize?: number,
    ): CancelablePromise<Array<ProductVariantList>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/product-variants/',
            query: {
                'page': page,
                'page_size': pageSize,
            },
        });
    }
    /**
     * @param data
     * @returns ProductVariant
     * @throws ApiError
     */
    public static productVariantsCreate(
        data: ProductVariant,
    ): CancelablePromise<ProductVariant> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/product-variants/',
            body: data,
        });
    }
    /**
     * @param id A unique integer value identifying this product variant.
     * @returns ProductVariant
     * @throws ApiError
     */
    public static productVariantsRead(
        id: number,
    ): CancelablePromise<ProductVariant> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/product-variants/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this product variant.
     * @param data
     * @returns ProductVariant
     * @throws ApiError
     */
    public static productVariantsUpdate(
        id: number,
        data: ProductVariant,
    ): CancelablePromise<ProductVariant> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/product-variants/{id}/',
            path: {
                'id': id,
            },
            body: data,
        });
    }
    /**
     * @param id A unique integer value identifying this product variant.
     * @param data
     * @returns ProductVariant
     * @throws ApiError
     */
    public static productVariantsPartialUpdate(
        id: number,
        data: ProductVariant,
    ): CancelablePromise<ProductVariant> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/product-variants/{id}/',
            path: {
                'id': id,
            },
            body: data,
        });
    }
    /**
     * @param id A unique integer value identifying this product variant.
     * @returns void
     * @throws ApiError
     */
    public static productVariantsDelete(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/product-variants/{id}/',
            path: {
                'id': id,
            },
        });
    }
}
