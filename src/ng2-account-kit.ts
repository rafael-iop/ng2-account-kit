interface LocalWindow extends Window {
  AccountKit_OnInteractive(): void
}

declare var window: LocalWindow;

declare var AccountKit: any;

export class AccountKitWrapper {

  /**
   * This method is used to initialize and setup the Account Kit SDK.
   * 
   * @param options Options for the initialization.
   */
  static init(options: InitOptions): void {
    window.AccountKit_OnInteractive = () => {
      AccountKit.init(options);
    }
  }

  /**
   * Use this function to log the user in.
   * 
   * @param method A string specifying the login method. This must be either "PHONE" or "EMAIL".
   * @param params A LoginParams object.
   */
  static login(method: string, params: LoginParams): Promise<AuthResponse> {
    return new Promise<AuthResponse>(
      (resolve, reject) => {
        AccountKit.login(method, params, (response: AuthResponse) => {
          if (!response){
            reject();
          } else if (response.status === 'PARTIALLY_AUTHENTICATED') {
            resolve(response);
          } else {
            reject(response);
          }
        });
      }
    );
  }

}

export interface InitOptions {
  /**
   * Your application ID. 
   * If you don't have one find it in the App dashboard or go there to create a new app.
   */
  appId: string;

  /**
   * Determines which version of Account Kit to use. This is a required parameter.
   */
  version: string;

  /**
   * A Boolean specifying whether to display a descriptive error message when an error occurs. 
   * If true, an explicit error message is displayed. If false, only a generic error is displayed.
   */
  debug?: boolean;

  /**
   * CSRF protection. A string containing a non-guessable value which should originate on the server. 
   * It is bundled with requests and is returned back to the app client unchanged, and the app client can pass it back to server to verify the match with the original value.
   */
  state: string;
}

export interface LoginParams  {
  /**
   * For use with the PHONE login method. A string which should be in the form "+<number>", e.g. "+91".
   */
  countryCode: string;

  /**
   * For use with the PHONE login method. A string containing 1 to 20 numeric characters.
   */
  phoneNumber?: string;

  /**
   * For use with the EMAIL login method. A string containing a valid email address.
   */
  emailAddress?: string;
}

export interface AuthResponse {
  /**
   * A string indicating the status of the request.
   *
   * - "PARTIALLY_AUTHENTICATED": This indicates that the login was successful, and that you may pass the code to your server for token exchange to complete authentication.
   * - "NOT_AUTHENTICATED": Failure, for any reason.
   * - "BAD_PARAMS": One or more of the parameters in the login() request were invalid.
   */
  status: string;

  /**
   * This string contains an authorization code, which your server may exchange for a user access token.
   */
  code: string;

  /**
   * This string should match the value of the state param passed to AccountKit.init().
   */
  state: string;
}