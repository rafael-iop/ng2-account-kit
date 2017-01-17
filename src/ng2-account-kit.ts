import { Injectable } from '@angular/core';

declare var AccountKit: any;

@Injectable()
export class AccountKitService {

    /**
     * This method is used to initialize and setup the Account Kit SDK.
     * 
     * @param options Options for the initialization.
     */
    init(options: InitOptions): void {
        AccountKit.init(options);
    }

    /**
     * Use this function to log the user in.
     * 
     * @param method Specifying the login method. This must be either "PHONE" or "EMAIL".
     * @param params A LoginParams object.
     */
    login(method: string, params: LoginParams): Promise<AuthResponse> {
        return new Promise<AuthResponse>(
            (resolve, reject) => {
                AccountKit.login(method, params, (response: AuthResponse) => {
                    if (response) {
                        resolve(response);
                    } else {
                        reject();
                    }
                });
            }
        );
    }

}

export interface InitOptions {
    /**
     * Your application ID. If you don't have one find it in the App dashboard or go there to create a new app. Defaults to null.
     */
    appId: string;

    /**
     * Determines which version of Account Kit to use. This is a required parameter.
     */
    version: string;

    /**
     * [boolean description]
     */
    debug?: boolean;

    /**
     * [string description]
     */
    state: string;
}

export interface LoginParams  {
    /**
     * [countryCode description]
     */
    countryCode: string;

    /**
     * [string description]
     */
    phoneNumber?: string;

    /**
     * [string description]
     */
    emailAddress?: string;
}

export interface AuthResponse {
    /**
     * [status description]
     */
    status: string;

    /**
     * [code description]
     */
    code: string;

    /**
     * [state description]
     */
    state: string;
}
