import {Injectable} from 'angular2/core';
import {Json, isPresent, isBlank, isString} from 'angular2/src/facade/lang';

@Injectable()
export class CookieService {
  get(key: string): string { return (<any>this._cookieReader())[key]; }

  getObject(key: string): any {
    let value = this.get(key);
    return value ? Json.parse(value) : value;
  }

  put(key: string, value: string, options?: any) { this._cookieWriter()(key, value); }

  putObject(key: string, value: Object, options?: any) { this.put(key, Json.stringify(value)); }

  remove(key: string) { this._cookieWriter()(key, undefined); }

  private _cookieReader(): Object {
    let rawDocument = document;
    let lastCookies = {};
    let lastCookieString = '';
    let that = this;

    let cookieArray: string[], cookie: string, i: number, index: number, name: string;
    let currentCookieString = rawDocument.cookie || '';
    if (currentCookieString !== lastCookieString) {
      lastCookieString = currentCookieString;
      cookieArray = lastCookieString.split('; ');
      lastCookies = {};

      for (i = 0; i < cookieArray.length; i++) {
        cookie = cookieArray[i];
        index = cookie.indexOf('=');
        if (index > 0) {  // ignore nameless cookies
          name = that._safeDecodeURIComponent(cookie.substring(0, index));
          // the first value that is seen for a cookie is the most
          // specific one.  values for the same cookie name that
          // follow are for less specific paths.
          if (isBlank((<any>lastCookies)[name])) {
            (<any>lastCookies)[name] = that._safeDecodeURIComponent(cookie.substring(index + 1));
          }
        }
      }
    }
    return lastCookies;
  }

  private _cookieWriter() {
    let that = this;
    var rawDocument = document;

    return function(name: string, value: string, options?: any) {
      rawDocument.cookie = that._buildCookieString(name, value, options);
    };
  }

  private _safeDecodeURIComponent(str: string) {
    try {
      return decodeURIComponent(str);
    } catch (e) {
      return str;
    }
  }

  private _buildCookieString(name: string, value: string, options?: any): string {
    var cookiePath = '/';
    var path: string, expires: any;
    options = options || {};
    expires = options.expires;
    path = isPresent(options.path) ? options.path : cookiePath;
    if (isBlank(value)) {
      expires = 'Thu, 01 Jan 1970 00:00:00 GMT';
      value = '';
    }
    if (isString(expires)) {
      expires = new Date(expires);
    }

    var str = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    str += path ? ';path=' + path : '';
    str += options.domain ? ';domain=' + options.domain : '';
    str += expires ? ';expires=' + expires.toUTCString() : '';
    str += options.secure ? ';secure' : '';

    // per http://www.ietf.org/rfc/rfc2109.txt browser must allow at minimum:
    // - 300 cookies
    // - 20 cookies per unique domain
    // - 4096 bytes per cookie
    var cookieLength = str.length + 1;
    if (cookieLength > 4096) {
      console.log(
          `Cookie \'${name}\' possibly not set or overflowed because it was too large (${cookieLength} > 4096 bytes)!`);
    }

    return str;
  }
}
