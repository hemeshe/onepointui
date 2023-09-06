import { Log, User, UserManager, UserManagerSettings } from 'oidc-client';

import { Constants } from './Constants';

export class AuthService {
  public userManager: UserManager;

  constructor() {
    const settings: UserManagerSettings = {
      authority: Constants.stsAuthority,
      client_id: Constants.clientId,
      // client_secret: Constants.clientSecret,
      redirect_uri: `${Constants.clientRoot}signin-callback.html`,
      silent_redirect_uri: `${Constants.clientRoot}silent-renew.html`,
      // tslint:disable-next-line:object-literal-sort-keys
      post_logout_redirect_uri: `${Constants.clientRoot}`,
      response_type: 'code',
      scope: Constants.clientScope,
      metadataUrl: Constants.metadataUrl,
      response_mode: 'query',
    };
    this.userManager = new UserManager(settings);

    Log.logger = console;
    Log.level = Log.INFO;
  }

  public getUser(): Promise<User | null> {
    return this.userManager.getUser();
  }

  public login(): Promise<void> {
    return this.userManager.signinRedirect();
  }

  public renewToken(): Promise<User> {
    return this.userManager.signinSilent();
  }

  public logout(): Promise<void> {
    return this.userManager.signoutRedirect();
  }
}
