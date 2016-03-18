import {CookieService} from '../../src/services/cookies.service';
import {
  describe,
  it,
  inject,
  injectAsync,
  expect,
  beforeEachProviders,
  beforeEach,
  afterEach
} from 'angular2/testing';
import {Json} from 'angular2/src/facade/lang';
import {ANGULAR2_COOKIE_PROVIDERS} from '../../src/core';

export function main() {
  describe('CookieService', () => {
    beforeEachProviders(() => [ANGULAR2_COOKIE_PROVIDERS, CookieService]);
    beforeEach(
        inject([CookieService], (cookieService: CookieService) => { cookieService.removeAll(); }));

    it('should return undefined a non-existent cookie',
       inject([CookieService], (cookieService: CookieService) => {
         let key = 'nonExistentCookieKey';
         expect(cookieService.get(key)).toBeUndefined();
       }));

    it('should set and get a simple cookie',
       inject([CookieService], (cookieService: CookieService) => {
         let key = 'testCookieKey';
         let value = 'testCookieValue';
         cookieService.put(key, value);
         expect(cookieService.get(key)).toBe(value);
       }));

    it('should edit a simple cookie', inject([CookieService], (cookieService: CookieService) => {
         let key = 'testCookieKey';
         let oldValue = 'testCookieValue';
         let newValue = 'testCookieValueNew';
         cookieService.put(key, oldValue);
         expect(cookieService.get(key)).toBe(oldValue);
         cookieService.put(key, newValue);
         expect(cookieService.get(key)).toBe(newValue);
       }));

    it('should remove a cookie', inject([CookieService], (cookieService: CookieService) => {
         let key = 'testCookieKey';
         let value = 'testCookieValue';
         cookieService.put(key, value);
         expect(cookieService.get(key)).toBe(value);
         cookieService.remove(key);
         expect(cookieService.get(key)).toBeUndefined();
       }));

    it('should set and get an object cookie',
       inject([CookieService], (cookieService: CookieService) => {
         let key = 'testCookieKey';
         let value = {key1: 'value1', key2: 'value2'};
         cookieService.putObject(key, value);
         expect(cookieService.getObject(key)).toEqual(value);
       }));

    it('should set and get multiple cookies',
       inject([CookieService], (cookieService: CookieService) => {
         let simpleCookies = [
           {key: 'key1', value: 'value1'}, {key: 'key2', value: 'value2'},
           {key: 'key3', value: 'value3'}
         ];
         let objectCookies = [
           {key: 'keyO1', value: {keyO1_1: 'valueO1_1', keyO1_2: 'valueO1_2'}},
           {key: 'keyO2', value: {keyO2_1: 'valueO2_1', keyO2_2: 'valueO2_2'}},
           {key: 'keyO3', value: {keyO3_1: 'valueO3_1', keyO3_2: 'valueO3_2'}}
         ];
         let result: any = {};
         simpleCookies.forEach(c => {
           result[c.key] = c.value;
           cookieService.put(c.key, c.value);
         });
         objectCookies.forEach(c => {
           result[c.key] = Json.stringify(c.value);
           cookieService.putObject(c.key, c.value);
         });
         expect(cookieService.getAll()).toEqual(result);
       }));

    it('should remove all cookies', inject([CookieService], (cookieService: CookieService) => {
         let simpleCookies = [
           {key: 'key1', value: 'value1'}, {key: 'key2', value: 'value2'},
           {key: 'key3', value: 'value3'}
         ];
         let objectCookies = [
           {key: 'keyO1', value: {keyO1_1: 'valueO1_1', keyO1_2: 'valueO1_2'}},
           {key: 'keyO2', value: {keyO2_1: 'valueO2_1', keyO2_2: 'valueO2_2'}},
           {key: 'keyO3', value: {keyO3_1: 'valueO3_1', keyO3_2: 'valueO3_2'}}
         ];
         simpleCookies.forEach(c => { cookieService.put(c.key, c.value); });
         objectCookies.forEach(c => { cookieService.putObject(c.key, c.value); });
         cookieService.removeAll();
         expect(cookieService.getAll()).toEqual({});
       }));

  });
};
