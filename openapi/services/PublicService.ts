/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CartItem } from '../models/CartItem';
import type { ContactUsFormData } from '../models/ContactUsFormData';
import type { DistinctHeightWidth } from '../models/DistinctHeightWidth';
import type { Order } from '../models/Order';
import type { ProductPricing } from '../models/ProductPricing';
import type { PublicOrderCheck } from '../models/PublicOrderCheck';
import type { PublicProductDetails } from '../models/PublicProductDetails';
import type { PublicProductFabrics } from '../models/PublicProductFabrics';
import type { PublicProductFabricsDetails } from '../models/PublicProductFabricsDetails';
import type { PublicPromotion } from '../models/PublicPromotion';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PublicService {
    /**
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns any
     * @throws ApiError
     */
    public static publicCampaignsList(
        page?: number,
        pageSize?: number,
    ): CancelablePromise<{
        count: number;
        next?: string | null;
        previous?: string | null;
        results: Array<PublicPromotion>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/public/campaigns/',
            query: {
                'page': page,
                'page_size': pageSize,
            },
        });
    }
    /**
     * @param data
     * @returns CartItem
     * @throws ApiError
     */
    public static publicCartCreate(
        data: CartItem,
    ): CancelablePromise<CartItem> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/public/cart/',
            body: data,
        });
    }
    /**
     * @param data
     * @returns Order
     * @throws ApiError
     */
    public static publicCheckOrderCreate(
        data: PublicOrderCheck,
    ): CancelablePromise<Order> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/public/check-order',
            body: data,
        });
    }
    /**
     * Create a new Contact Us Form entry.
     * @param data
     * @returns ContactUsFormData
     * @throws ApiError
     */
    public static publicContactUsCreate(
        data: ContactUsFormData,
    ): CancelablePromise<ContactUsFormData> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/public/contact-us/',
            body: data,
        });
    }
    /**
     * @param id A unique integer value identifying this fabric options.
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @param colorOptionId color_option_id
     * @returns DistinctHeightWidth
     * @throws ApiError
     */
    public static publicFabricGetMeasurements(
        id: number,
        page?: number,
        pageSize?: number,
        colorOptionId?: number,
    ): CancelablePromise<DistinctHeightWidth> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/public/fabric/{id}/get_measurements',
            path: {
                'id': id,
            },
            query: {
                'page': page,
                'page_size': pageSize,
                'color_option_id': colorOptionId,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this fabric options.
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @param colorOptionId color_option_id
     * @param height Height
     * @param width width
     * @param attributes Selected Attributes
     * @param subItems Selected Sub Items
     * @returns ProductPricing
     * @throws ApiError
     */
    public static publicFabricGetPrice(
        id: number,
        page?: number,
        pageSize?: number,
        colorOptionId?: number,
        height?: number,
        width?: number,
        attributes?: Array<any>,
        subItems?: Array<any>,
    ): CancelablePromise<ProductPricing> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/public/fabric/{id}/get_price',
            path: {
                'id': id,
            },
            query: {
                'page': page,
                'page_size': pageSize,
                'color_option_id': colorOptionId,
                'height': height,
                'width': width,
                'attributes': attributes,
                'sub_items': subItems,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this fabric options.
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns PublicProductFabrics
     * @throws ApiError
     */
    public static publicFabricGetProductName(
        id: number,
        page?: number,
        pageSize?: number,
    ): CancelablePromise<PublicProductFabrics> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/public/fabric/{id}/get_product_name',
            path: {
                'id': id,
            },
            query: {
                'page': page,
                'page_size': pageSize,
            },
        });
    }
    /**
     * @param data
     * @returns Order
     * @throws ApiError
     */
    public static publicOrderCreate(
        data: Order,
    ): CancelablePromise<Order> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/public/order/',
            body: data,
        });
    }
    /**
     * @param id A unique integer value identifying this order.
     * @returns Order
     * @throws ApiError
     */
    public static publicOrderRead(
        id: number,
    ): CancelablePromise<Order> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/public/order/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param orderId
     * @returns Order
     * @throws ApiError
     */
    public static publicOrderGetOrderList(
        orderId: string,
    ): CancelablePromise<Order> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/public/order/{order_id}/get_order',
            path: {
                'order_id': orderId,
            },
        });
    }
    /**
     * @param orderId
     * @param data
     * @returns Order
     * @throws ApiError
     */
    public static publicOrderGetOrderUpdate(
        orderId: string,
        data: Order,
    ): CancelablePromise<Order> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/public/order/{order_id}/get_order',
            path: {
                'order_id': orderId,
            },
            body: data,
        });
    }
    /**
     * @param orderId
     * @returns Order
     * @throws ApiError
     */
    public static publicOrderUpdateOrderList(
        orderId: string,
    ): CancelablePromise<Order> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/public/order/{order_id}/update_order',
            path: {
                'order_id': orderId,
            },
        });
    }
    /**
     * @param orderId
     * @param data
     * @returns Order
     * @throws ApiError
     */
    public static publicOrderUpdateOrderUpdate(
        orderId: string,
        data: Order,
    ): CancelablePromise<Order> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/public/order/{order_id}/update_order',
            path: {
                'order_id': orderId,
            },
            body: data,
        });
    }
    /**
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @param category queries
     * @param q queries
     * @param sortBy Sort by value
     * @returns PublicProductFabrics
     * @throws ApiError
     */
    public static publicProductsFabricsList(
        page?: number,
        pageSize?: number,
        category?: string,
        q?: any,
        sortBy?: string,
    ): CancelablePromise<Array<PublicProductFabrics>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/public/products-fabrics/',
            query: {
                'page': page,
                'page_size': pageSize,
                'category': category,
                'q': q,
                'sortBy': sortBy,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this fabric options.
     * @returns PublicProductFabricsDetails
     * @throws ApiError
     */
    public static publicProductsFabricsRead(
        id: number,
    ): CancelablePromise<PublicProductFabricsDetails> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/public/products-fabrics/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this product.
     * @returns PublicProductDetails
     * @throws ApiError
     */
    public static publicProductsRead(
        id: number,
    ): CancelablePromise<PublicProductDetails> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/public/products/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns PublicProductFabrics
     * @throws ApiError
     */
    public static publicTopSellerList(
        page?: number,
        pageSize?: number,
    ): CancelablePromise<Array<PublicProductFabrics>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/public/top-seller/',
            query: {
                'page': page,
                'page_size': pageSize,
            },
        });
    }
    /**
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @param fabricIds queries
     * @returns PublicProductFabrics
     * @throws ApiError
     */
    public static publicWishlistList(
        page?: number,
        pageSize?: number,
        fabricIds?: Array<any>,
    ): CancelablePromise<Array<PublicProductFabrics>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/public/wishlist',
            query: {
                'page': page,
                'page_size': pageSize,
                'fabricIds': fabricIds,
            },
        });
    }
}
