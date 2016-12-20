# <%= pkg.name %>  [![Build Status](https://travis-ci.org/salemdar/angular2-cookie.svg?branch=<%= pkg.version %>)](https://travis-ci.org/salemdar/angular2-cookie) [![npm version](https://badge.fury.io/js/angular2-cookie.svg)](http://badge.fury.io/js/angular2-cookie) [![Downloads](http://img.shields.io/npm/dm/angular2-cookie.svg)](https://npmjs.org/package/angular2-cookie)

> <%= pkg.description %> **v<%= pkg.version %>**

_Please use >=1.2.4 for Angular >2.0.0, 1.1.x versions for beta, 1.2.2 version is for release candidates earlier than rc.5 and 1.2.3 is for >rc.5._

## Table of contents:
- [Get Started](https://github.com/salemdar/angular2-cookie#get-started)
  - [Installation](https://github.com/salemdar/angular2-cookie#installation)
  - [Usage](https://github.com/salemdar/angular2-cookie#usage)
  - [Angular-universal](https://github.com/salemdar/angular2-cookie#universal)
  - [Examples](https://github.com/salemdar/angular2-cookie#examples)
    - [Angular2-quickstart](https://github.com/salemdar/angular2-cookie#quickstart)
    - [Angular2-seed](https://github.com/salemdar/angular2-cookie#seed)
    - [Angular-cli](https://github.com/salemdar/angular2-cookie#cli)
    - [Angular2 Webpack Starter](https://github.com/salemdar/angular2-cookie#angular2-webpack-starter)
- [CookieService](https://github.com/salemdar/angular2-cookie#cookieservice)
  - [get()](https://github.com/salemdar/angular2-cookie#get)
  - [getObject()](https://github.com/salemdar/angular2-cookie#getobject)
  - [getAll()](https://github.com/salemdar/angular2-cookie#getall)
  - [put()](https://github.com/salemdar/angular2-cookie#put)
  - [putObject()](https://github.com/salemdar/angular2-cookie#putobject)
  - [remove()](https://github.com/salemdar/angular2-cookie#remove)
  - [removeAll()](https://github.com/salemdar/angular2-cookie#removeall)
- [Options](https://github.com/salemdar/angular2-cookie#options)

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
 * Taken from: https://github.com/angular/quickstart/blob/master/systemjs.config.js
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',

      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

      // other libraries
      'rxjs':                       'npm:rxjs',
      'angular2-in-memory-web-api': 'npm:angular2-in-memory-web-api',
      'angular2-cookie':            'npm:angular2-cookie'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      'angular2-in-memory-web-api': {
        main: './index.js',
        defaultExtension: 'js'
      },
      'angular2-cookie': {
        main: './core.js',
        defaultExtension: 'js'
      }
    }
  });
})(this);
```

### <a name="usage"></a> Usage

**CookieService** class is an injectable service with angular `@Injectable()` decorator. Therefore, it needs to be registered in the providers array (encouraged way).
Then, it will be available in the constructor of the component class.

```typescript
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CookieService } from 'angular2-cookie/services/cookies.service';

import { AppComponent }  from './app.component';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ AppComponent ],
  providers: [ CookieService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

```typescript
import {Component} from 'angular2/core';
import {CookieService} from 'angular2-cookie/core';

@Component({
    selector: 'my-very-cool-app',
    template: '<h1>My Angular2 App with Cookies</h1>'
})

export class AppComponent {
  constructor(private _cookieService:CookieService){}

  getCookie(key: string){
    return this._cookieService.get(key);
  }
}
```
