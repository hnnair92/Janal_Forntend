/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DynamicAttribute } from '../models/DynamicAttribute';
import type { DynamicAttributeValue } from '../models/DynamicAttributeValue';
import type { DynamicAttributeValueList } from '../models/DynamicAttributeValueList';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DynamicAttributesService {
    /**
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns any
     * @throws ApiError
     */
    public static dynamicAttributesList(
        page?: number,
        pageSize?: number,
    ): CancelablePromise<{
        count: number;
        next?: string | null;
        previous?: string | null;
        results: Array<DynamicAttribute>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/dynamic-attributes/',
            query: {
                'page': page,
                'page_size': pageSize,
            },
        });
    }
    /**
     * @param data
     * @returns DynamicAttribute
     * @throws ApiError
     */
    public static dynamicAttributesCreate(
        data: DynamicAttribute,
    ): CancelablePromise<DynamicAttribute> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/dynamic-attributes/',
            body: data,
        });
    }
    /**
     * @param dynamicId
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns DynamicAttributeValueList
     * @throws ApiError
     */
    public static dynamicAttributesDynamicAttributeValuesList(
        dynamicId: string,
        page?: number,
        pageSize?: number,
    ): CancelablePromise<Array<DynamicAttributeValueList>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/dynamic-attributes/{dynamic_id}/dynamic-attribute-values/',
            path: {
                'dynamic_id': dynamicId,
            },
            query: {
                'page': page,
                'page_size': pageSize,
            },
        });
    }
    /**
     * @param dynamicId
     * @param data
     * @returns DynamicAttributeValue
     * @throws ApiError
     */
    public static dynamicAttributesDynamicAttributeValuesCreate(
        dynamicId: string,
        data: DynamicAttributeValue,
    ): CancelablePromise<DynamicAttributeValue> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/dynamic-attributes/{dynamic_id}/dynamic-attribute-values/',
            path: {
                'dynamic_id': dynamicId,
            },
            body: data,
        });
    }
    /**
     * @param dynamicId
     * @param id A unique integer value identifying this dynamic attribute value.
     * @returns DynamicAttributeValue
     * @throws ApiError
     */
    public static dynamicAttributesDynamicAttributeValuesRead(
        dynamicId: string,
        id: number,
    ): CancelablePromise<DynamicAttributeValue> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/dynamic-attributes/{dynamic_id}/dynamic-attribute-values/{id}/',
            path: {
                'dynamic_id': dynamicId,
                'id': id,
            },
        });
    }
    /**
     * @param dynamicId
     * @param id A unique integer value identifying this dynamic attribute value.
     * @param data
     * @returns DynamicAttributeValue
     * @throws ApiError
     */
    public static dynamicAttributesDynamicAttributeValuesUpdate(
        dynamicId: string,
        id: number,
        data: DynamicAttributeValue,
    ): CancelablePromise<DynamicAttributeValue> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/dynamic-attributes/{dynamic_id}/dynamic-attribute-values/{id}/',
            path: {
                'dynamic_id': dynamicId,
                'id': id,
            },
            body: data,
        });
    }
    /**
     * @param dynamicId
     * @param id A unique integer value identifying this dynamic attribute value.
     * @param data
     * @returns DynamicAttributeValue
     * @throws ApiError
     */
    public static dynamicAttributesDynamicAttributeValuesPartialUpdate(
        dynamicId: string,
        id: number,
        data: DynamicAttributeValue,
    ): CancelablePromise<DynamicAttributeValue> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/dynamic-attributes/{dynamic_id}/dynamic-attribute-values/{id}/',
            path: {
                'dynamic_id': dynamicId,
                'id': id,
            },
            body: data,
        });
    }
    /**
     * @param dynamicId
     * @param id A unique integer value identifying this dynamic attribute value.
     * @returns void
     * @throws ApiError
     */
    public static dynamicAttributesDynamicAttributeValuesDelete(
        dynamicId: string,
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/dynamic-attributes/{dynamic_id}/dynamic-attribute-values/{id}/',
            path: {
                'dynamic_id': dynamicId,
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this dynamic attribute.
     * @returns DynamicAttribute
     * @throws ApiError
     */
    public static dynamicAttributesRead(
        id: number,
    ): CancelablePromise<DynamicAttribute> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/dynamic-attributes/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this dynamic attribute.
     * @param data
     * @returns DynamicAttribute
     * @throws ApiError
     */
    public static dynamicAttributesUpdate(
        id: number,
        data: DynamicAttribute,
    ): CancelablePromise<DynamicAttribute> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/dynamic-attributes/{id}/',
            path: {
                'id': id,
            },
            body: data,
        });
    }
    /**
     * @param id A unique integer value identifying this dynamic attribute.
     * @param data
     * @returns DynamicAttribute
     * @throws ApiError
     */
    public static dynamicAttributesPartialUpdate(
        id: number,
        data: DynamicAttribute,
    ): CancelablePromise<DynamicAttribute> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/dynamic-attributes/{id}/',
            path: {
                'id': id,
            },
            body: data,
        });
    }
    /**
     * @param id A unique integer value identifying this dynamic attribute.
     * @returns void
     * @throws ApiError
     */
    public static dynamicAttributesDelete(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/dynamic-attributes/{id}/',
            path: {
                'id': id,
            },
        });
    }
}
