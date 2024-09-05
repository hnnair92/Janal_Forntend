/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Category } from '../models/Category';
import type { CategoryList } from '../models/CategoryList';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CategoriesService {
    /**
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns CategoryList
     * @throws ApiError
     */
    public static categoriesList(
        page?: number,
        pageSize?: number,
    ): CancelablePromise<Array<CategoryList>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/categories/',
            query: {
                'page': page,
                'page_size': pageSize,
            },
        });
    }
    /**
     * @param data
     * @returns Category
     * @throws ApiError
     */
    public static categoriesCreate(
        data: Category,
    ): CancelablePromise<Category> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/categories/',
            body: data,
        });
    }
    /**
     * @param id A unique integer value identifying this category.
     * @returns Category
     * @throws ApiError
     */
    public static categoriesRead(
        id: number,
    ): CancelablePromise<Category> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/categories/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this category.
     * @param data
     * @returns Category
     * @throws ApiError
     */
    public static categoriesUpdate(
        id: number,
        data: Category,
    ): CancelablePromise<Category> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/categories/{id}/',
            path: {
                'id': id,
            },
            body: data,
        });
    }
    /**
     * @param id A unique integer value identifying this category.
     * @param data
     * @returns Category
     * @throws ApiError
     */
    public static categoriesPartialUpdate(
        id: number,
        data: Category,
    ): CancelablePromise<Category> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/categories/{id}/',
            path: {
                'id': id,
            },
            body: data,
        });
    }
    /**
     * @param id A unique integer value identifying this category.
     * @returns void
     * @throws ApiError
     */
    public static categoriesDelete(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/categories/{id}/',
            path: {
                'id': id,
            },
        });
    }
}
