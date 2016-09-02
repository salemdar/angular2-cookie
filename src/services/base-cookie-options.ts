import {APP_BASE_HREF} from '@angular/common';
import {Inject, Injectable, Injector, Optional} from '@angular/core';
import {CookieOptionsArgs} from './cookie-options-args.model';

/** @private */
export class CookieOptions {
  path: string;
  domain: string;
  expires: string|Date;
  secure: boolean;

  constructor({path, domain, expires, secure}: CookieOptionsArgs = {}) {
    this.path = this.isPresent(path) ? path : null;
    this.domain = this.isPresent(domain) ? domain : null;
    this.expires = this.isPresent(expires) ? expires : null;
    this.secure = this.isPresent(secure) ? secure : false;
  }

  merge(options?: CookieOptionsArgs): CookieOptions {
    return new CookieOptions(<CookieOptionsArgs>{
      path: this.isPresent(options) && this.isPresent(options.path) ? options.path : this.path,
      domain: this.isPresent(options) && this.isPresent(options.domain) ? options.domain :
                                                                          this.domain,
      expires: this.isPresent(options) && this.isPresent(options.expires) ? options.expires :
                                                                            this.expires,
      secure: this.isPresent(options) && this.isPresent(options.secure) ? options.secure :
                                                                          this.secure,
    });
  }

  private isPresent(obj: any): boolean { return obj !== undefined && obj !== null; }
}

/** @private */
@Injectable()
export class BaseCookieOptions extends CookieOptions {
  constructor(@Optional() @Inject(APP_BASE_HREF) private baseHref: string) {
    super({path: baseHref || '/'});
  }
}
