/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AllFieldsUser } from '../models/AllFieldsUser';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
    /**
     * @param search A search term.
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns AllFieldsUser
     * @throws ApiError
     */
    public static usersList(
        search?: string,
        page?: number,
        pageSize?: number,
    ): CancelablePromise<Array<AllFieldsUser>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/',
            query: {
                'search': search,
                'page': page,
                'page_size': pageSize,
            },
        });
    }
    /**
     * @param data
     * @returns AllFieldsUser
     * @throws ApiError
     */
    public static usersCreate(
        data: AllFieldsUser,
    ): CancelablePromise<AllFieldsUser> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/',
            body: data,
        });
    }
    /**
     * @param id A unique integer value identifying this user.
     * @returns AllFieldsUser
     * @throws ApiError
     */
    public static usersRead(
        id: number,
    ): CancelablePromise<AllFieldsUser> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this user.
     * @param data
     * @returns AllFieldsUser
     * @throws ApiError
     */
    public static usersUpdate(
        id: number,
        data: AllFieldsUser,
    ): CancelablePromise<AllFieldsUser> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/users/{id}/',
            path: {
                'id': id,
            },
            body: data,
        });
    }
    /**
     * @param id A unique integer value identifying this user.
     * @param data
     * @returns AllFieldsUser
     * @throws ApiError
     */
    public static usersPartialUpdate(
        id: number,
        data: AllFieldsUser,
    ): CancelablePromise<AllFieldsUser> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/users/{id}/',
            path: {
                'id': id,
            },
            body: data,
        });
    }
    /**
     * @param id A unique integer value identifying this user.
     * @returns void
     * @throws ApiError
     */
    public static usersDelete(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/users/{id}/',
            path: {
                'id': id,
            },
        });
    }
}
