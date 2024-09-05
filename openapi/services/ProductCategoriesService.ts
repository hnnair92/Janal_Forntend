/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PublicCategoryList } from '../models/PublicCategoryList';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProductCategoriesService {
    /**
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns PublicCategoryList
     * @throws ApiError
     */
    public static productCategoriesList(
        page?: number,
        pageSize?: number,
    ): CancelablePromise<Array<PublicCategoryList>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/product_categories/',
            query: {
                'page': page,
                'page_size': pageSize,
            },
        });
    }
}
