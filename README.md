# angular2-cookie  [![Build Status](https://travis-ci.org/salemdar/angular2-cookie.svg?branch=1.2.1)](https://travis-ci.org/salemdar/angular2-cookie) [![npm version](https://badge.fury.io/js/angular2-cookie.svg)](http://badge.fury.io/js/angular2-cookie) [![Downloads](http://img.shields.io/npm/dm/angular2-cookie.svg)](https://npmjs.org/package/angular2-cookie)

> Implementation of Angular 1.x $cookies service to Angular 2 **v1.2.1**

_Please use 1.1.x versions for angular2 beta, 1.2.x versions are for release candidates._

## Table of contents:
- [Get Started](#get-started)
  - [Installation](#installation)
  - [Usage](#usage)
- [CookieService](#cookieservice)
  - [get()](#get)
  - [getObject()](#getobject)
  - [getAll()](#getall)
  - [put()](#put)
  - [putObject()](#putobject)
  - [remove()](#remove)
  - [removeAll()](#removeall)
- [Options](#options)
- [Overriding default options globally](#overriding-default-options-globally)

## <a name="get-started"></a> Get Started

### <a name="installation"></a> Installation

You can install this package locally with npm.

```bash
# To get the latest stable version and update package.json file:
npm install angular2-cookie --save
```

After installing the library, it should be included in the SystemJS configurations.

```javascript
/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 * Override at the last minute with global.filterSystemConfig (as plunkers do)
 * Taken from: https://github.com/angular/quickstart/blob/master/systemjs.config.js
 */
(function(global) {

  // map tells the System loader where to look for things
  var map = {
    'app':                        'app', // 'dist',
    'rxjs':                       'node_modules/rxjs',
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    '@angular':                   'node_modules/@angular',
    'angular2-cookie':            'node_modules/angular2-cookie',
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'angular2-cookie':            { main: 'core.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { defaultExtension: 'js' },
  };

  var packageNames = [
    '@angular/common',
    '@angular/compiler',
    '@angular/core',
    '@angular/http',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    '@angular/router-deprecated',
    '@angular/testing',
    '@angular/upgrade',
  ];

  // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
  packageNames.forEach(function(pkgName) {
    packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
  });

  var config = {
    map: map,
    packages: packages
  }

  System.config(config);

})(this);
```

### <a name="usage"></a> Usage

**CookieService** class is an injectable service with angular `@Injectable()` decorator. Therefore, it needs to be registered in the providers array (encouraged way).
Then, it will be available in the constructor of the component class.

```typescript
import {Component} from 'angular2/core';
import {CookieService} from 'angular2-cookie/core';

@Component({
    selector: 'my-very-cool-app',
    template: '<h1>My Angular2 App with Cookies</h1>',
    providers: [CookieService]
})

export class AppComponent { 
  constructor(private _cookieService:CookieService){}
  
  getCookie(key: string){
    return this._cookieService.get(key);
  }
}
```

## <a name="cookieservice"></a> CookieService

There are 7 methods available in the `CookieService` (6 standard methods from **Angular 1** and 1 extra `removeAll()` method for convenience)

### <a name="get"></a> get()
Returns the value of given cookie key.

```typescript
/**
 * @param {string} key Id to use for lookup.
 * @returns {string} Raw cookie value.
 */
get(key: string): string;
```

### <a name="getobject"></a> getObject()
Returns the deserialized value of given cookie key.

```typescript
/**
 * @param {string} key Id to use for lookup.
 * @returns {Object} Deserialized cookie value.
 */
getObject(key: string): Object;
```

### <a name="getall"></a> getAll()
Returns a key value object with all the cookies.

```typescript
/**
 * @returns {Object} All cookies
 */
getAll(): any;
```

### <a name="put"></a> put()
Sets a value for given cookie key.

```typescript
/**
 * @param {string} key Id for the `value`.
 * @param {string} value Raw value to be stored.
 * @param {CookieOptionsArgs} options (Optional) Options object.
 */
put(key: string, value: string, options?: CookieOptionsArgs): void;
```

### <a name="putobject"></a> putObject()
Serializes and sets a value for given cookie key.

```typescript
/**
 * @param {string} key Id for the `value`.
 * @param {Object} value Value to be stored.
 * @param {CookieOptionsArgs} options (Optional) Options object.
 */
putObject(key: string, value: Object, options?: CookieOptionsArgs): void;
```

### <a name="remove"></a> remove()
Remove given cookie.

```typescript
/**
 * @param {string} key Id of the key-value pair to delete.
 * @param {CookieOptionsArgs} options (Optional) Options object.
 */
remove(key: string, options?: CookieOptionsArgs): void;
```

### <a name="removeall"></a> removeAll()
Remove all cookies.

```typescript
/**
 */
removeAll(): void;
```

## <a name="options"></a> Options

Options object should be a type of `CookieOptionsArgs` interface. The object may have following properties:

- **path** - {string} - The cookie will be available only for this path and its sub-paths. By default, this is the URL that appears in your `<base>` tag.
- **domain** - {string} - The cookie will be available only for this domain and its sub-domains. For security reasons the user agent will not accept the cookie if the current domain is not a sub-domain of this domain or equal to it.
- **expires** - {string|Date} - String of the form "Wdy, DD Mon YYYY HH:MM:SS GMT" or a Date object indicating the exact date/time this cookie will expire.
- **secure** - {boolean} - If `true`, then the cookie will only be available through a secured connection.

## <a name="overriding-default-options-globally"></a> Overriding default options globally

`CookieService` can use `ANGULAR2_COOKIES_PROVIDERS` to provide default options. Thus the default options can be altered by overriding the necessary class.
See [Angular dependency injection guide](https://angular.io/docs/ts/latest/guide/dependency-injection.html#the-provide-function) for more information on the topic.

```typescript
import {provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {App} from './myapp';

class MyOptions extends BaseCookieOptions {
  path: string = '/my/path/';
}

bootstrap(App, [ANGULAR2_COOKIES_PROVIDERS, provide(CookieOptions, {useClass: MyOptions})]);
```


### <a name="notes"></a> _Note_

_The build process and the file structure of this repository has respectively modeled after the awesome [angular2-google-maps](https://github.com/SebastianM/angular2-google-maps) project of [Sebastian Müller](http://twitter.com/Sebamueller)._