/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Address } from '../models/Address';
import type { ChangePassword } from '../models/ChangePassword';
import type { CustomerOrder } from '../models/CustomerOrder';
import type { DeleteUserAccount } from '../models/DeleteUserAccount';
import type { Order } from '../models/Order';
import type { OrderPaymentTrackingSession } from '../models/OrderPaymentTrackingSession';
import type { PersonalProfile } from '../models/PersonalProfile';
import type { Wishlist } from '../models/Wishlist';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CustomerService {
    /**
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns any
     * @throws ApiError
     */
    public static customerAddressesList(
        page?: number,
        pageSize?: number,
    ): CancelablePromise<{
        count: number;
        next?: string | null;
        previous?: string | null;
        results: Array<Address>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/customer/addresses',
            query: {
                'page': page,
                'page_size': pageSize,
            },
        });
    }
    /**
     * @param data
     * @returns Address
     * @throws ApiError
     */
    public static customerAddressesCreate(
        data: Address,
    ): CancelablePromise<Address> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/customer/addresses',
            body: data,
        });
    }
    /**
     * @param id A unique integer value identifying this address.
     * @returns Address
     * @throws ApiError
     */
    public static customerAddressesRead(
        id: number,
    ): CancelablePromise<Address> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/customer/addresses//{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this address.
     * @param data
     * @returns Address
     * @throws ApiError
     */
    public static customerAddressesUpdate(
        id: number,
        data: Address,
    ): CancelablePromise<Address> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/customer/addresses//{id}/',
            path: {
                'id': id,
            },
            body: data,
        });
    }
    /**
     * @param id A unique integer value identifying this address.
     * @param data
     * @returns Address
     * @throws ApiError
     */
    public static customerAddressesPartialUpdate(
        id: number,
        data: Address,
    ): CancelablePromise<Address> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/customer/addresses//{id}/',
            path: {
                'id': id,
            },
            body: data,
        });
    }
    /**
     * @param id A unique integer value identifying this address.
     * @returns void
     * @throws ApiError
     */
    public static customerAddressesDelete(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/customer/addresses//{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param data
     * @returns ChangePassword
     * @throws ApiError
     */
    public static customerChangePasswordCreate(
        data: ChangePassword,
    ): CancelablePromise<ChangePassword> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/customer/change-password',
            body: data,
        });
    }
    /**
     * @param data
     * @returns void
     * @throws ApiError
     */
    public static customerDeleteAccountDelete(
        data: DeleteUserAccount,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/customer/delete-account',
            body: data,
        });
    }
    /**
     * @returns CustomerOrder
     * @throws ApiError
     */
    public static customerOrdersList(): CancelablePromise<Array<CustomerOrder>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/customer/orders',
        });
    }
    /**
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static customerOrdersInvoiceList(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/customer/orders/{id}/invoice',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param orderId
     * @returns OrderPaymentTrackingSession
     * @throws ApiError
     */
    public static customerPaymentGetSessionTokenCreate(
        orderId: string,
    ): CancelablePromise<OrderPaymentTrackingSession> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/customer/payment/{order_id}/get_session_token/',
            path: {
                'order_id': orderId,
            },
        });
    }
    /**
     * @param orderId
     * @param transactionId
     * @param data
     * @returns OrderPaymentTrackingSession
     * @throws ApiError
     */
    public static customerPaymentFailedCreate(
        orderId: string,
        transactionId: string,
        data: OrderPaymentTrackingSession,
    ): CancelablePromise<OrderPaymentTrackingSession> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/customer/payment/{order_id}/{transaction_id}/failed',
            path: {
                'order_id': orderId,
                'transaction_id': transactionId,
            },
            body: data,
        });
    }
    /**
     * @param orderId
     * @param transactionId
     * @param data
     * @returns Order
     * @throws ApiError
     */
    public static customerPaymentSuccessCreate(
        orderId: string,
        transactionId: string,
        data: OrderPaymentTrackingSession,
    ): CancelablePromise<Order> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/customer/payment/{order_id}/{transaction_id}/success',
            path: {
                'order_id': orderId,
                'transaction_id': transactionId,
            },
            body: data,
        });
    }
    /**
     * @param data
     * @returns PersonalProfile
     * @throws ApiError
     */
    public static customerPersonalProfilePartialUpdate(
        data: PersonalProfile,
    ): CancelablePromise<PersonalProfile> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/customer/personal-profile',
            body: data,
        });
    }
    /**
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns any
     * @throws ApiError
     */
    public static customerWishlistList(
        page?: number,
        pageSize?: number,
    ): CancelablePromise<{
        count: number;
        next?: string | null;
        previous?: string | null;
        results: Array<Wishlist>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/customer/wishlist',
            query: {
                'page': page,
                'page_size': pageSize,
            },
        });
    }
    /**
     * @param data
     * @returns Wishlist
     * @throws ApiError
     */
    public static customerWishlistCreate(
        data: Wishlist,
    ): CancelablePromise<Wishlist> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/customer/wishlist',
            body: data,
        });
    }
    /**
     * @param id A unique integer value identifying this wish list.
     * @returns Wishlist
     * @throws ApiError
     */
    public static customerWishlistRead(
        id: number,
    ): CancelablePromise<Wishlist> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/customer/wishlist/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this wish list.
     * @param data
     * @returns Wishlist
     * @throws ApiError
     */
    public static customerWishlistUpdate(
        id: number,
        data: Wishlist,
    ): CancelablePromise<Wishlist> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/customer/wishlist/{id}/',
            path: {
                'id': id,
            },
            body: data,
        });
    }
    /**
     * @param id A unique integer value identifying this wish list.
     * @param data
     * @returns Wishlist
     * @throws ApiError
     */
    public static customerWishlistPartialUpdate(
        id: number,
        data: Wishlist,
    ): CancelablePromise<Wishlist> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/customer/wishlist/{id}/',
            path: {
                'id': id,
            },
            body: data,
        });
    }
    /**
     * @param id A unique integer value identifying this wish list.
     * @returns void
     * @throws ApiError
     */
    public static customerWishlistDelete(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/customer/wishlist/{id}/',
            path: {
                'id': id,
            },
        });
    }
}
