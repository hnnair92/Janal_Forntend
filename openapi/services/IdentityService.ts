/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PasswordReset } from '../models/PasswordReset';
import type { TokenObtainPair } from '../models/TokenObtainPair';
import type { TokenRefresh } from '../models/TokenRefresh';
import type { User } from '../models/User';
import type { UserEmail } from '../models/UserEmail';
import type { UserEmailResponse } from '../models/UserEmailResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class IdentityService {
    /**
     * @param email email
     * @param code verification code
     * @returns UserEmail
     * @throws ApiError
     */
    public static identityAccountsEmailVerifyList(
        email?: string,
        code?: string,
    ): CancelablePromise<UserEmail> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/identity/accounts/email/verify',
            query: {
                'email': email,
                'code': code,
            },
        });
    }
    /**
     * @param data
     * @returns UserEmail
     * @throws ApiError
     */
    public static identityAccountsForgotPasswordCreate(
        data: UserEmail,
    ): CancelablePromise<UserEmail> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/identity/accounts/forgot-password',
            body: data,
        });
    }
    /**
     * Takes a set of user credentials and returns an access and refresh JSON web
     * token pair to prove the authentication of those credentials.
     * @param data
     * @returns TokenObtainPair
     * @throws ApiError
     */
    public static identityAccountsLoginCreate(
        data: TokenObtainPair,
    ): CancelablePromise<TokenObtainPair> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/identity/accounts/login/',
            body: data,
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static identityAccountsLogoutCreate(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/identity/accounts/logout',
        });
    }
    /**
     * @param data
     * @returns User
     * @throws ApiError
     */
    public static identityAccountsRegisterCreate(
        data: User,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/identity/accounts/register/',
            body: data,
        });
    }
    /**
     * @param data
     * @returns UserEmailResponse
     * @throws ApiError
     */
    public static identityAccountsRegisterEmailCreate(
        data: UserEmail,
    ): CancelablePromise<UserEmailResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/identity/accounts/register/email',
            body: data,
        });
    }
    /**
     * @param data
     * @returns UserEmail
     * @throws ApiError
     */
    public static identityAccountsUserPasswordCreate(
        data: PasswordReset,
    ): CancelablePromise<UserEmail> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/identity/accounts/user-password',
            body: data,
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static identityMeList(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/identity/me',
        });
    }
    /**
     * Takes a refresh type JSON web token and returns an access type JSON web
     * token if the refresh token is valid.
     * @param data
     * @returns TokenRefresh
     * @throws ApiError
     */
    public static identityRefreshCreate(
        data: TokenRefresh,
    ): CancelablePromise<TokenRefresh> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/identity/refresh/',
            body: data,
        });
    }
}
