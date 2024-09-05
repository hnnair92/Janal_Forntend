/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UploadedImages } from '../models/UploadedImages';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ImagesService {
    /**
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns any
     * @throws ApiError
     */
    public static imagesList(
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
            url: '/images/',
            query: {
                'page': page,
                'page_size': pageSize,
            },
        });
    }
    /**
     * @param data
     * @returns UploadedImages
     * @throws ApiError
     */
    public static imagesCreate(
        data: UploadedImages,
    ): CancelablePromise<UploadedImages> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/images/',
            body: data,
        });
    }
    /**
     * @param id A unique integer value identifying this uploaded images.
     * @returns UploadedImages
     * @throws ApiError
     */
    public static imagesRead(
        id: number,
    ): CancelablePromise<UploadedImages> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/images/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this uploaded images.
     * @param data
     * @returns UploadedImages
     * @throws ApiError
     */
    public static imagesUpdate(
        id: number,
        data: UploadedImages,
    ): CancelablePromise<UploadedImages> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/images/{id}/',
            path: {
                'id': id,
            },
            body: data,
        });
    }
    /**
     * @param id A unique integer value identifying this uploaded images.
     * @param data
     * @returns UploadedImages
     * @throws ApiError
     */
    public static imagesPartialUpdate(
        id: number,
        data: UploadedImages,
    ): CancelablePromise<UploadedImages> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/images/{id}/',
            path: {
                'id': id,
            },
            body: data,
        });
    }
    /**
     * @param id A unique integer value identifying this uploaded images.
     * @returns void
     * @throws ApiError
     */
    public static imagesDelete(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/images/{id}/',
            path: {
                'id': id,
            },
        });
    }
}
