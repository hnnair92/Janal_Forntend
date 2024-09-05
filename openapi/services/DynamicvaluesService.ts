/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DynamicAttributeValueList } from '../models/DynamicAttributeValueList';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DynamicvaluesService {
    /**
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns DynamicAttributeValueList
     * @throws ApiError
     */
    public static dynamicvaluesList(
        page?: number,
        pageSize?: number,
    ): CancelablePromise<Array<DynamicAttributeValueList>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/dynamicvalues/',
            query: {
                'page': page,
                'page_size': pageSize,
            },
        });
    }
}
