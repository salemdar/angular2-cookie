import {BaseCookieOptions, CookieOptions, CookieService} from './services';

export * from './services';

export const ANGULAR2_COOKIE_PROVIDERS = [
  {provide: CookieOptions, useClass: BaseCookieOptions},
  {provide: CookieService, useFactory: cookieServiceFactory, deps: [CookieOptions]}
];

export function cookieServiceFactory(options: CookieOptions) {
  return new CookieService(options);
}
