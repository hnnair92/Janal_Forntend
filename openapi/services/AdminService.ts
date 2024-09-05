/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdminOrder } from '../models/AdminOrder';
import type { ContactUsFormData } from '../models/ContactUsFormData';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AdminService {
    /**
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns any
     * @throws ApiError
     */
    public static adminContactUsList(
        page?: number,
        pageSize?: number,
    ): CancelablePromise<{
        count: number;
        next?: string | null;
        previous?: string | null;
        results: Array<ContactUsFormData>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/contact-us/',
            query: {
                'page': page,
                'page_size': pageSize,
            },
        });
    }
    /**
     * Create a new Contact Us Form entry.
     * @param data
     * @returns ContactUsFormData
     * @throws ApiError
     */
    public static adminContactUsCreate(
        data: ContactUsFormData,
    ): CancelablePromise<ContactUsFormData> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/contact-us/',
            body: data,
        });
    }
    /**
     * @param id A unique integer value identifying this contact us form data.
     * @returns ContactUsFormData
     * @throws ApiError
     */
    public static adminContactUsRead(
        id: number,
    ): CancelablePromise<ContactUsFormData> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/contact-us/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Edit a Contact Us Form entry.
     * @param id A unique integer value identifying this contact us form data.
     * @param data
     * @returns ContactUsFormData
     * @throws ApiError
     */
    public static adminContactUsPartialUpdate(
        id: number,
        data: ContactUsFormData,
    ): CancelablePromise<ContactUsFormData> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/admin/contact-us/{id}/',
            path: {
                'id': id,
            },
            body: data,
        });
    }
    /**
     * @param id A unique integer value identifying this contact us form data.
     * @returns void
     * @throws ApiError
     */
    public static adminContactUsDelete(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/contact-us/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static adminOrderCountList(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/order-count/',
        });
    }
    /**
     * @param search A search term.
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @param activeTab Which Tab Query Originated
     * @returns AdminOrder
     * @throws ApiError
     */
    public static adminOrdersList(
        search?: string,
        page?: number,
        pageSize?: number,
        activeTab?: string,
    ): CancelablePromise<Array<AdminOrder>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/orders/',
            query: {
                'search': search,
                'page': page,
                'page_size': pageSize,
                'activeTab': activeTab,
            },
        });
    }
    /**
     * @param data
     * @returns AdminOrder
     * @throws ApiError
     */
    public static adminOrdersCreate(
        data: AdminOrder,
    ): CancelablePromise<AdminOrder> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/orders/',
            body: data,
        });
    }
    /**
     * @param id A unique integer value identifying this order.
     * @returns AdminOrder
     * @throws ApiError
     */
    public static adminOrdersRead(
        id: number,
    ): CancelablePromise<AdminOrder> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/orders/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this order.
     * @param data
     * @returns AdminOrder
     * @throws ApiError
     */
    public static adminOrdersUpdate(
        id: number,
        data: AdminOrder,
    ): CancelablePromise<AdminOrder> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/orders/{id}/',
            path: {
                'id': id,
            },
            body: data,
        });
    }
    /**
     * @param id A unique integer value identifying this order.
     * @param data
     * @returns AdminOrder
     * @throws ApiError
     */
    public static adminOrdersPartialUpdate(
        id: number,
        data: AdminOrder,
    ): CancelablePromise<AdminOrder> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/admin/orders/{id}/',
            path: {
                'id': id,
            },
            body: data,
        });
    }
    /**
     * @param id A unique integer value identifying this order.
     * @returns void
     * @throws ApiError
     */
    public static adminOrdersDelete(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/orders/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this order.
     * @param data
     * @returns AdminOrder
     * @throws ApiError
     */
    public static adminOrdersOrderShipped(
        id: number,
        data: AdminOrder,
    ): CancelablePromise<AdminOrder> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/orders/{id}/ship/',
            path: {
                'id': id,
            },
            body: data,
        });
    }
}
