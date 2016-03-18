import {provide} from 'angular2/core';
import {CookieOptions, BaseCookieOptions} from './services';

export * from './services';

export const ANGULAR2_COOKIE_PROVIDERS: any[] =
    [provide(CookieOptions, {useClass: BaseCookieOptions})];
