/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Product } from '../models/Product';
import type { UploadedImages } from '../models/UploadedImages';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProductsService {
    /**
     * @param search A search term.
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns any
     * @throws ApiError
     */
    public static productsList(
        search?: string,
        page?: number,
        pageSize?: number,
    ): CancelablePromise<{
        count: number;
        next?: string | null;
        previous?: string | null;
        results: Array<Product>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/products/',
            query: {
                'search': search,
                'page': page,
                'page_size': pageSize,
            },
        });
    }
    /**
     * @param data
     * @returns Product
     * @throws ApiError
     */
    public static productsCreate(
        data: Product,
    ): CancelablePromise<Product> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/products/',
            body: data,
        });
    }
    /**
     * @param id A unique integer value identifying this product.
     * @returns Product
     * @throws ApiError
     */
    public static productsRead(
        id: number,
    ): CancelablePromise<Product> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/products/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this product.
     * @param data
     * @returns Product
     * @throws ApiError
     */
    public static productsUpdate(
        id: number,
        data: Product,
    ): CancelablePromise<Product> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/products/{id}/',
            path: {
                'id': id,
            },
            body: data,
        });
    }
    /**
     * @param id A unique integer value identifying this product.
     * @param data
     * @returns Product
     * @throws ApiError
     */
    public static productsPartialUpdate(
        id: number,
        data: Product,
    ): CancelablePromise<Product> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/products/{id}/',
            path: {
                'id': id,
            },
            body: data,
        });
    }
    /**
     * @param id A unique integer value identifying this product.
     * @returns void
     * @throws ApiError
     */
    public static productsDelete(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/products/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param productId
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns any
     * @throws ApiError
     */
    public static productsImagesList(
        productId: string,
        page?: number,
        pageSize?: number,
    ): CancelablePromise<{
        count: number;
        next?: string | null;
        previous?: string | null;
        results: Array<UploadedImages>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/products/{product_id}/images/',
            path: {
                'product_id': productId,
            },
            query: {
                'page': page,
                'page_size': pageSize,
            },
        });
    }
}
