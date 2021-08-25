webpackJsonp([0],{

/***/ 10:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_module__ = __webpack_require__(645);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_service__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_auth__ = __webpack_require__(461);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_user__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api_base__ = __webpack_require__(457);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__api_resources__ = __webpack_require__(460);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__api_transform__ = __webpack_require__(462);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__api_prepare__ = __webpack_require__(658);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__api_module__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_1__api_service__["a"]; });
/* unused harmony reexport ApiProvider */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__api_auth__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_3__api_user__["a"]; });
/* unused harmony reexport ApiBase */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_6__api_transform__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_7__api_prepare__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_5__api_resources__["a"]; });









//# sourceMappingURL=index.js.map

/***/ }),

/***/ 14:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export isObject */
/* unused harmony export isDefined */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Collection; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__is__ = __webpack_require__(164);


function isObject(x) {
    return x !== null && typeof x === 'object';
}
function isDefined(x) {
    return x !== undefined;
}
var Collection = /** @class */ (function () {
    function Collection() {
    }
    /**
     * "Plucks" property values of given property
     * Can concat all its inner data by passing concat property (typically to get .data of includes)
     */
    Collection.pluck = function (src, property, concat) {
        var result = src && src.map(function (item) { return item[property]; }) || [];
        return (concat && result.reduce(function (res, item) { return res.concat(item.data); }, [])) || result;
    };
    /**
     * Returns all ids from objects in src array
     */
    Collection.ids = function (src) {
        return Collection.pluck(src, 'id');
    };
    /**
     * Extracts data from given include path (nested data property)
     *
     * @param {object} src Source object
     * @param {string} path Includes path (dot notation)
     * @returns {any}
     *
     * @example
     * var resp = {project: {data: {job: {data: {assignment: {data: 'some'}}}}}};
     * var test = collection.extract(resp, 'project.job.assignment'); // returns 'some'
     */
    Collection.extract = function (src, path) {
        return path.split(/\./).reduce(function (prev, prop) {
            return prev && ((prev[prop] && prev[prop].data) || prev[prop]);
        }, src);
    };
    /**
     * Transforms array of items into key:value object
     *
     * @param set
     * @param key Property name used as a key
     * @param prefix key prefix, could be used to ensure object key ordering of numbered keys
     * @param value Property name to get value (whole object if not defined)
     * @param transform Property name to get value (whole object if not defined)
     *
     */
    Collection.objectize = function (set, key, prefix, value, transform) {
        var result = {};
        var trans = function (val) { return val && (transform ? transform(val) : val); };
        (set || []).forEach(function (item) {
            if (undefined === result[item[key]]) {
                result[(prefix || '') + item[key]] = trans(value ? item[value] : item);
            }
        });
        return set && result;
    };
    /**
     * "Flatify" data from given include paths
     *
     * @param {object} src Source object
     * @param {string} props Includes path(s) (dot notation), or mapping config
     * @returns {any}
     *
     * @example
     * var resp = {project: {data: {job: {data: {assignment: {data: 'some'}}}}}};
     * collection.flatify(resp, 'project.job.assignment'); // returns {assignment: 'some'}
     * collection.extract(resp, ['project.job', 'project.job.assignment']); // returns {project: ..., job: ..., assignment: 'some'}
     * collection.extract(resp, {other: 'project.job.assignment'}); // returns {project: ..., other: 'some'}
     */
    Collection.flatify = function (src, props) {
        var extracted = {};
        var paths = (__WEBPACK_IMPORTED_MODULE_1__is__["a" /* Is */].array(props) || !props.length) && props || [props];
        // extract property => path map; use direct mapping if given
        if (paths.length) {
            paths.forEach(function (path) { return extracted[path.split('.').pop()] = path; });
        }
        else {
            extracted = props;
        }
        // then extract for each key
        Object.keys(extracted).forEach(function (key) {
            extracted[key] = Collection.extract(src, extracted[key]);
        });
        return extracted;
    };
    /**
     * Returns copied src
     */
    Collection.copy = function (src) {
        return src && JSON.parse(JSON.stringify(src));
    };
    /**
     * Returns intersection of 2 arrays
     */
    Collection.intersect = function (a, b) {
        return a.filter(function (n) { return b.indexOf(n) !== -1; });
    };
    /**
     * Returns diff of 2 arrays
     */
    Collection.diff = function (a, b) {
        return a.filter(function (n) { return b.indexOf(n) < 0; }).concat(b.filter(function (n) { return a.indexOf(n) < 0; }));
    };
    /**
     * Returns unique values
     *
     * @param prop Optional property name to determine identity (like id)
     */
    Collection.unique = function (src, prop) {
        return prop ? Object.values(Collection.objectize(src, prop, '_')) : Array.from(new Set(src));
    };
    /**
     * Finds object in array matching given properties.
     * Within no multi flag it will return single object (default)
     *
     * Note: Matches explicitly values
     */
    Collection.find = function (src, props, multi) {
        var res = [];
        var check = Object.keys(props);
        src.forEach(function (item) {
            var matched = 0;
            check.forEach(function (prop) { return item[prop] === props[prop] && matched++; });
            if (matched === check.length) {
                res.push(item);
            }
        });
        return multi ? res : res[0];
    };
    /**
     * Returns only properties for src (or its data part)
     *
     * @param src
     * @param properties
     * @param transform Optional transform method (applied if property found)
     * @returns {object}
     */
    Collection.only = function (src, properties, transform) {
        var dst = {};
        var trans = function (val, prop) { return val && (transform ? transform(val, prop) : val); };
        properties.forEach(function (key) {
            dst[key] = src && trans(src[key] || src.data && src.data[key], key);
        });
        return dst;
    };
    /**
     * Sums all values of given property (parsed float; result rounded to 2 digits)
     *
     * @param  src Collection or object with .data collection
     * @param property
     */
    Collection.sum = function (src, property) {
        return (src.data || src || []).reduce(function (acc, val) {
            return acc + (parseFloat(val[property] || 0) * 100);
        }, 0) / 100;
    };
    /**
     * Transforms given object properties values to date object.
     * Assumes given string is UTC
     *
     * @param set Object or value
     * @param properties Property names to transform (optional, will do for all if not provided)
     * @returns Transformed object
     */
    Collection.datify = function (set, properties) {
        return Collection.transform(set, properties, Collection.toDate);
    };
    /**
     * Transforms given object properties values to string.
     *
     *
     * @param set Object or value
     * @param properties Property names to transform (optional, will do for all if not provided)
     * @param all If to process undefined also
     * @returns Transformed object
     */
    Collection.stringify = function (set, properties, all) {
        if (all === void 0) { all = true; }
        return Collection.transform(set, properties, Collection.toString, all);
    };
    /**
     * Transforms given object properties values to boolean.
     *
     *
     * @param set Object or value
     * @param properties Property names to transform (optional, will do for all if not provided)
     * @param all If to process undefined also
     * @returns Transformed object
     */
    Collection.boolify = function (set, properties, all) {
        if (all === void 0) { all = true; }
        return Collection.transform(set, properties, Collection.toBool, all);
    };
    /**
     * Merges items from src collection into dest (by property field)
     *
     * @param dest
     * @param src
     * @param property
     */
    Collection.merge = function (dest, src, property) {
        if (property === void 0) { property = 'id'; }
        var find = {};
        src.forEach(function (item) {
            find[property] = item[property];
            Object.assign(Collection.find(dest, find), item);
        });
    };
    /**
     * Internal. Transforms given object properties values by callback
     *
     * @param set
     * @param properties
     * @param callback
     * @param all
     * @returns Transformed object
     */
    Collection.transform = function (set, properties, callback, all) {
        if (all === void 0) { all = false; }
        if (!properties && !isObject(set)) {
            set = callback(set);
        }
        else {
            (properties || Object.keys(set)).map(function (prop) {
                if (set && (all || !all && isDefined(set[prop]))) {
                    set[prop] = callback(set[prop]);
                }
                return prop;
            });
        }
        return set;
    };
    /**
     * Parses to date from UTC to local time
     *
     * @param val Date string (or object {date:...})
     * @returns Date
     */
    Collection.toDate = function (val) {
        return val && __WEBPACK_IMPORTED_MODULE_0_moment__["utc"](val.date || val).toDate();
    };
    /**
     * Parses to bool value
     *
     * @param val
     */
    Collection.toBool = function (val) {
        return Boolean(val && val !== 'false');
    };
    /**
     * Converts to string value
     *
     * @param val
     */
    Collection.toString = function (val) {
        return String(val);
    };
    return Collection;
}());

//# sourceMappingURL=collection.js.map

/***/ }),

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__details_module__ = __webpack_require__(661);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__details_controller__ = __webpack_require__(467);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__details_module__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__details_controller__["a"]; });



//# sourceMappingURL=index.js.map

/***/ }),

/***/ 160:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_confirm__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_loading__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_tabs__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__reset_password_page__ = __webpack_require__(464);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_api__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var LoginPage = /** @class */ (function () {
    function LoginPage(translate, loading, navigation, params, events, confirm, auth, user) {
        this.translate = translate;
        this.loading = loading;
        this.navigation = navigation;
        this.params = params;
        this.events = events;
        this.confirm = confirm;
        this.auth = auth;
        this.user = user;
        // credentials = { email: '', password: '' };
        this.credentials = { email: 'heike70@vodafone.de', password: 'NYhQUHFPQDkC' };
        //
    }
    LoginPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        // can come from 401 interceptor
        if (this.params.data.reason) {
            setTimeout(function () {
                _this.confirm.create({ title: 'auth.error', message: _this.params.data.reason, confirm: true }).present();
                _this.params.data.reason = '';
            });
        }
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        this.logging = this.loading.create('authenticating');
        this.logging.present();
        this.auth.login(this.credentials).then(function (user) {
            _this.process(user);
        }, function (error) {
            switch (error.status) {
                case 401:
                case 403:
                case 422: {
                    _this.showError('errors.login-failed', /^[a-z_]+$/.test(error.message) && 'errors.' + error.message || error.message);
                    break;
                }
                default: {
                    _this.showError('errors.login-failed', _this.translate.instant('errors.general'));
                }
            }
        });
    };
    LoginPage.prototype.forgotPasswordAction = function () {
        this.navigation.push(__WEBPACK_IMPORTED_MODULE_5__reset_password_page__["a" /* ResetPasswordPage */]);
    };
    LoginPage.prototype.showPassword = function () {
        this.input.type = this.input.type === 'password' ? 'text' : 'password';
        this.input.setFocus();
    };
    LoginPage.prototype.process = function (user) {
        var _this = this;
        if (user.isOnboarding()) {
            this.showError('warnings.login-restricted', 'warnings.onboarding-login').then(function () {
                _this.navigation.setRoot(__WEBPACK_IMPORTED_MODULE_4__app_app_tabs__["a" /* AppTabs */]);
            });
        }
        else {
            if (user.isDeactivated()) {
                this.events.publish('user:deactivated', user.data().deactivated_reason);
            }
            this.navigation.setRoot(__WEBPACK_IMPORTED_MODULE_4__app_app_tabs__["a" /* AppTabs */]);
        }
    };
    LoginPage.prototype.showError = function (title, message) {
        var _this = this;
        return new Promise(function (resolve) {
            var modal = _this.confirm.create({ title: title, message: message, confirm: true });
            _this.logging.dismiss();
            modal.present();
            modal.onDidDismiss(function () { return resolve(); });
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('password'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* TextInput */])
    ], LoginPage.prototype, "input", void 0);
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/login/login.page.html"*/'<ion-content padding>\n  <img src="assets/img/logo.svg" alt="logo"/>\n  <form (ngSubmit)="login()" #local="ngForm">\n    <ion-list inset>\n      <ion-item>\n        <ion-label floating>{{ \'auth.login.email-placeholder\' | translate }}</ion-label>\n        <ion-input type="email" name="email" [(ngModel)]="credentials.email" required></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>{{ \'auth.login.password-placeholder\' | translate }}</ion-label>\n        <ion-input type="password" name="password" clearOnEdit="false" [(ngModel)]="credentials.password" required #password></ion-input>\n        <ion-checkbox item-right class="show-password" (click)="showPassword()"></ion-checkbox>\n      </ion-item>\n      <button ion-button full strong color="button-primary" solid type="submit" [disabled]="!local.form.valid">{{ \'auth.login.button\' | translate }}</button>\n    </ion-list>\n  </form>\n\n  <button ion-button clear full (click)="forgotPasswordAction()">{{ \'auth.login.password-forgotten\' | translate }}</button>\n\n</ion-content>\n'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/login/login.page.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__["d" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_3__components_loading__["a" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Events */], __WEBPACK_IMPORTED_MODULE_2__components_confirm__["a" /* ConfirmController */], __WEBPACK_IMPORTED_MODULE_7__components_api__["a" /* ApiAuthService */], __WEBPACK_IMPORTED_MODULE_7__components_api__["f" /* ApiUserService */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.page.js.map

/***/ }),

/***/ 161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppTabs; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_api__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_navigation__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages__ = __webpack_require__(88);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AppTabs = /** @class */ (function () {
    function AppTabs(translate, tabs, user) {
        var _this = this;
        this.translate = translate;
        this.tabs = tabs;
        this.user = user;
        this.pages = __WEBPACK_IMPORTED_MODULE_5__pages__["a" /* AppPages */];
        this.indicies = {};
        this.user.current().then(function (data) {
            _this.profile = data;
            // add translated titles and store indicies for names
            var i = 0;
            _this.pages.forEach(function (tab) {
                Object.assign(tab, {
                    title: _this.translate.instant(tab.name + ".tab-name"),
                    disabled: !_this.profile.hasAccess(tab.name),
                });
                if (tab.tab) {
                    _this.indicies[tab.name] = i;
                    i++;
                }
            });
            // subscribe tabs change requests (per tabSwitch directive or tabs service select)
            _this.tabs.change.subscribe(function (name) {
                _this.container.select(_this.indicies[name]);
            });
        });
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('tabs'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* Tabs */])
    ], AppTabs.prototype, "container", void 0);
    AppTabs = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/app/app.tabs.html"*/'<ion-tabs #tabs>\n  <ng-container *ngFor="let item of pages">\n    <ion-tab *ngIf="item.tab" [root]="item.component" [tabTitle]="item.title" [tabIcon]="item.icon" [enabled]="!item.disabled">\n    </ion-tab>\n  </ng-container>\n</ion-tabs>\n'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/app/app.tabs.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["d" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_4__components_navigation__["b" /* TabsService */], __WEBPACK_IMPORTED_MODULE_3__components_api__["f" /* ApiUserService */]])
    ], AppTabs);
    return AppTabs;
}());

//# sourceMappingURL=app.tabs.js.map

/***/ }),

/***/ 163:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiUserService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_collection__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_service__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 *
 */
var ApiUserService = /** @class */ (function () {
    function ApiUserService(api) {
        this.api = api;
    }
    ApiUserService.prototype.current = function () {
        var _this = this;
        if (this.fetching) {
            return this.fetching;
        }
        else if (this.data) {
            return Promise.resolve(this.instance);
        }
        else {
            return this.authenticated().then(function () {
                _this.fetching = _this.api.promised(_this.api.getCurrentUser()).then(function (data) {
                    _this.data = data;
                    _this.instance = _this.user();
                    _this.fetching = null;
                    return _this.instance;
                }, function () {
                    _this.fetching = null;
                    return Promise.reject(false);
                });
                return _this.fetching;
            }, function () { return _this.fetching = null; });
        }
    };
    ApiUserService.prototype.get = function () {
        return this.instance;
    };
    ApiUserService.prototype.reset = function () {
        this.data = null;
        this.instance = null;
    };
    ApiUserService.prototype.setAuthenticatedCheck = function (callback) {
        this.authenticated = callback;
    };
    /**
     * Checks user's access to resources - currently only assignments, jobs, bills are checked and blocked
     * return false if user is onboarding
     */
    ApiUserService.prototype.hasAccess = function (resource) {
        switch (resource) {
            case 'assignments':
            case 'jobs':
            case 'certificates':
            case 'bills': {
                return this.data && this.data.status !== 'onboarding';
            }
            default: {
                return true;
            }
        }
    };
    ApiUserService.prototype.isRestricted = function (identifier) {
        return (this.data.legal_blocked && this.data.legal_blocked[identifier] && 'legal-blocked')
            || (this.data.gtc_blocked && this.data.gtc_blocked[identifier] && 'gtc_blocked')
            || (this.data.contract_type_pending && this.data.contract_type_pending[identifier] && 'pending');
    };
    ApiUserService.prototype.user = function () {
        var _this = this;
        var data = __WEBPACK_IMPORTED_MODULE_1__utils_collection__["a" /* Collection */].copy(this.data);
        return {
            id: function () { return data.id; },
            roleId: function () { return data.role_id; },
            name: function () { return data.firstname; },
            email: function () { return data.email; },
            isOnboarding: function () { return data.status === 'onboarding'; },
            isDeactivated: function () { return data.status === 'deactivated'; },
            isRestricted: function (identifier) { return _this.isRestricted(identifier); },
            data: function () { return data; },
            hasAccess: function (resource) { return _this.hasAccess(resource); },
        };
    };
    ApiUserService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__api_service__["a" /* NewApiService */]])
    ], ApiUserService);
    return ApiUserService;
}());

//# sourceMappingURL=api.user.js.map

/***/ }),

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Is; });
/*
 * Utils class Is - checking if variable is something
 */
var Is = /** @class */ (function () {
    function Is() {
    }
    /**
     * Returns true if src is array
     */
    Is.array = function (set) {
        return typeof set === 'object' && set.length !== undefined;
    };
    /**
     * Returns true if object is empty
     */
    Is.empty = function (set) {
        return !set || Object.keys(set).length === 0;
    };
    /**
     * Returns true if object is set (not empty)
     */
    Is.set = function (set) {
        return set && Object.keys(set).length > 0;
    };
    /**
     * Check if value is set to true (or string 'true')
     *
     * @param set
     */
    Is.true = function (set) {
        return set === 'true' || set === true;
    };
    /**
     * Check if value is set to false (or string 'false')
     *
     * @param set
     */
    Is.false = function (set) {
        return set === 'false' || set === false;
    };
    return Is;
}());

//# sourceMappingURL=is.js.map

/***/ }),

/***/ 165:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * @name TabsService
 * @description
 * "Proxy" service for providing programatic tab switching. Exposes observable subscribed by AppTabs.
 *
 * Tab name can contain subtab as ('main-tab:sub-tab') - 'sub-tab' will be send (deferred) as an event 'tabs:select' within 'main-tab', 'sub-tab' data
 * To be handled and calling appriopriate action in main tab view controller.
 *
 * @usage
 * ```ts
 * import { TabsService } from '../components/navigation';
 *
 * constructor(private tabs: TabsService) {
 * }
 *
 * changeTab(name: string) {
 *     this.tabs.select(name);
 * }
 * ```
 *
 * @see TabSwitchDirective also
 */
var TabsService = /** @class */ (function () {
    function TabsService(events) {
        var _this = this;
        this.events = events;
        this.change = __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (observer) {
            _this.observer = observer;
        });
    }
    TabsService.prototype.select = function (name) {
        var _this = this;
        var target = name.split(':');
        if (this.observer) {
            this.observer.next(target[0]);
            if (target[1]) {
                setTimeout(function () { return _this.events.publish('tabs:select', target[0], target[1]); });
            }
        }
    };
    TabsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Events */]])
    ], TabsService);
    return TabsService;
}());

//# sourceMappingURL=tabs.service.js.map

/***/ }),

/***/ 166:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JobsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_loading__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_api__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__base_page__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_app_animations__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils_collection__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__jobs_service__ = __webpack_require__(466);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__jobs_operations__ = __webpack_require__(89);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var JobsPage = /** @class */ (function (_super) {
    __extends(JobsPage, _super);
    function JobsPage(translate, loading, user, renderer, params, ref, events, jobs) {
        var _this = _super.call(this, translate, loading, renderer, user) || this;
        _this.translate = translate;
        _this.loading = loading;
        _this.user = user;
        _this.renderer = renderer;
        _this.params = params;
        _this.ref = ref;
        _this.events = events;
        _this.jobs = jobs;
        _this.initFilters();
        return _this;
    }
    JobsPage.prototype.initFilters = function () {
        var _this = this;
        if (this.params.data.type === 'offers') {
            this.filters = {
                state: { set: ['pending'], type: 'buttons', options: 'jobs.offer.states' },
                contractType: { type: 'select', options: [], set: undefined, none: true },
                search: { type: 'search', set: '' },
            };
            this.context = 'offers';
        }
        else {
            this.filters = {
                search: { type: 'search', set: '' },
                dates: { type: 'daterange', set: { start: null, end: null } },
                postcodes: { type: 'range', set: { min: null, max: null } },
                contractType: { type: 'select', options: [], set: undefined, none: true },
                certificate: { type: 'select', options: [], set: undefined, none: true },
            };
            this.context = 'jobs';
            this.jobs.certificates().then(function (data) {
                _this.filters.certificate.options = data.map(function (cert) { return __WEBPACK_IMPORTED_MODULE_7__utils_collection__["a" /* Collection */].only(cert, ['id', 'name']); });
            });
        }
        this.jobs.contractTypes().then(function (data) {
            _this.filters.contractType.options = data.map(function (contract) { return __WEBPACK_IMPORTED_MODULE_7__utils_collection__["a" /* Collection */].only(contract, ['id', 'name']); });
        });
    };
    JobsPage.prototype.ionViewDidLoad = function () {
        _super.prototype.ionViewDidLoad.call(this);
        // subscribe push notification events
        this.listenNotification();
    };
    JobsPage.prototype.fetch = function (loaded, load) {
        var _this = this;
        if (load === void 0) { load = 10; }
        if (this.params.data.type === 'offers') {
            return this.jobs.offers(this.profile.roleId(), loaded && loaded.length, load, this.filtered).then(function (jobs) { return _this.setItems(loaded, jobs); });
        }
        else {
            var matching = this.params.data.type === 'matched' ? __WEBPACK_IMPORTED_MODULE_9__jobs_operations__["a" /* JobMatch */].Yes : __WEBPACK_IMPORTED_MODULE_9__jobs_operations__["a" /* JobMatch */].No;
            return this.jobs.list(this.profile.roleId(), matching, loaded && loaded.length, load, this.filtered).then(function (jobs) { return _this.setItems(loaded, jobs); });
        }
    };
    JobsPage.prototype.onChange = function (job) {
        var _this = this;
        // updates entry
        return this.jobs.get(this.profile.roleId(), job.id).then(function (data) {
            _this.items[_this.items.indexOf(job)] = data;
            _this.ref.detectChanges();
        });
    };
    JobsPage.prototype.onRemove = function (job) {
        this.items.splice(this.items.indexOf(job), 1);
        this.ref.detectChanges();
    };
    JobsPage.prototype.doRefresh = function (refresher) {
        _super.prototype.doRefresh.call(this, refresher);
    };
    JobsPage.prototype.listenNotification = function () {
        var _this = this;
        if (this.params.data.type === 'matched') {
            this.events.subscribe('push:notification', function (type) {
                if (['tenders-matching'].includes(type)) {
                    _this.doRefresh();
                }
            });
        }
    };
    JobsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-jobs',template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/jobs/jobs.page.html"*/'<ion-content>\n  <ion-refresher (ionRefresh)="doRefresh($event);" #refresher [enabled]="!filterOpened">\n    <ion-refresher-content pulling-icon="ion-arrow-down-b positive" spinner="crescent" pullingText="{{ \'common.pull-to-refresh\' | translate }}"\n      refreshingText="{{ \'common.refreshing\' | translate }}">\n    </ion-refresher-content>\n  </ion-refresher>\n\n  <filter-bar [filters]="filters" [context]="context" (on-apply)="filter($event)" (filter-opened)="onFilterOpened($event)"></filter-bar>\n\n  <ion-list no-lines *ngIf="items && items.length">\n    <job-card *ngFor="let job of items" [job]="job" (removed)="onRemove($event)" (changed)="onChange($event)" [@softItem]></job-card>\n    <ion-infinite-scroll (ionInfinite)="$event.waitFor(fetch(items, 10))" [enabled]="moreItems">\n      <ion-infinite-scroll-content loadingSpinner="crescent" loadingText="{{ \'common.fetching-data\' | translate }}">\n      </ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n  </ion-list>\n\n  <nothing-found *ngIf="items && !items.length" [context]="context + \'.nothing-found\'" [redirect]="context === \'offers\' ? \'jobs:matched\' : \'certificates:all\'"></nothing-found>\n</ion-content>'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/jobs/jobs.page.html"*/,
            animations: __WEBPACK_IMPORTED_MODULE_6__app_app_animations__["a" /* animations */],
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["d" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_3__components_loading__["a" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__components_api__["f" /* ApiUserService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer2"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Events */], __WEBPACK_IMPORTED_MODULE_8__jobs_service__["a" /* JobsService */]])
    ], JobsPage);
    return JobsPage;
}(__WEBPACK_IMPORTED_MODULE_5__base_page__["a" /* BasePage */]));

//# sourceMappingURL=jobs.page.js.map

/***/ }),

/***/ 167:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataprivacyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var DataprivacyPage = /** @class */ (function () {
    function DataprivacyPage() {
    }
    DataprivacyPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/settings/dataprivacy.page.html"*/'<ion-content padding>\n  <button-back label="auth.reset.buttons.back"></button-back>\n  <h1>Datenschutzerklärung</h1>\n  <ol>\n    <li>\n      <p><b> Name und Kontaktdaten des für die Verarbeitung Verantwortlichen sowie des betrieblichen\n        Datenschutzbeauftragten</b></p>\n      <p>\n        Diese Datenschutz-Information gilt für die Datenverarbeitung durch:\n      </p>\n      <address>\n      Verantwortlicher: elevate staffing GmbH, Stubenrauchstr. 72, 12161 Berlin,\n      <br/>\n      E-Mail:\n      <u>info@amploi.de</u>,<br/>\n      Telefon: +49 (0)30-30307156, Fax: +49 (0)30-41762922.\n      </address>\n      <p>\n        Der Datenschutzbeauftragte von der elevate staffing GmbH ist:\n      </p>\n      <address>\n        Herr Willuhn, unter der o.g. Anschrift, zu Hd. Herrn Willuhn,\n        beziehungsweise unter <u>info@amploi.de</u>.\n      </address>\n    </li>\n    <li>\n      <p><b>Erhebung und Speicherung personenbezogener Daten sowie Art und Zweck von deren Verwendung</b></p>\n      <p><b>a. Beim Besuch der Website</b></p>\n      <p>\n        Beim Aufrufen unserer Website <u><a href="http://portal.amploi.de/">portal.amploi.de</a></u> werden\n        durch den auf Ihrem Endgerät zum Einsatz kommenden Browser\n        automatisch Informationen an den Server unserer Website gesendet.\n        Diese Informationen werden temporär in einem sog. Logfile\n        gespeichert. Folgende Informationen werden dabei ohne Ihr Zutun\n        erfasst und bis zur automatisierten Löschung gespeichert:\n      </p>\n\n      <ul>\n        <li>IP-Adresse des anfragenden Rechners,</li>\n        <li>Datum und Uhrzeit des Zugriffs,</li>\n        <li>Name und URL der abgerufenen Datei,</li>\n        <li>Website, von der aus der Zugriff erfolgt (Referrer-URL),</li>\n        <li>verwendeter Browser und ggf. das Betriebssystem Ihres Rechners sowie\n          der Name Ihres Access-Providers.\n        </li>\n      </ul>\n      <br/>\n      <p>Die genannten Daten werden durch uns zu folgenden Zwecken verarbeitet:</p>\n      <ul>\n        <li>Gewährleistung eines reibungslosen Verbindungsaufbaus der\n          Website,\n        </li>\n        <li>Gewährleistung einer komfortablen Nutzung unserer\n          Website,\n        </li>\n        <li>Auswertung der Systemsicherheit und -stabilität\n          sowie\n        </li>\n        <li>zu weiteren administrativen Zwecken.</li>\n      </ul>\n      <br/>\n      <p>\n        Die\n        Rechtsgrundlage für die Datenverarbeitung ist Art. 6 Abs. 1 S. 1\n        lit. f DSGVO. Unser berechtigtes Interesse folgt aus oben\n        aufgelisteten Zwecken zur Datenerhebung. In keinem Fall verwenden\n        wir die erhobenen Daten zu dem Zweck, Rückschlüsse auf Ihre Person\n        zu ziehen. Darüber hinaus setzen wir beim Besuch unserer Website\n        Cookies ein. Nähere Erläuterungen dazu erhalten Sie unter den\n        Ziff. 4 und 5 dieser Datenschutzerklärung.\n      </p>\n      <p>\n        <b>b. Bei Anmeldung für unser Portal</b></p>\n      <p>\n        Sofern\n        Sie nach Art. 6 Abs. 1 S. 1 lit. a DSGVO ausdrücklich eingewilligt\n        haben, verwenden wir Ihre E-Mail-Adresse und ihre eingetragenen\n        Daten dafür, Ihnen regelmäßig unseren Newsletter oder\n        Ausschreibungen für Aufträge zu übersenden. Für den Empfang des\n        Newsletters bzw. der Ausschreibungen ist die Angabe einer\n        E-Mail-Adresse ausreichend. Die Abmeldung ist jederzeit möglich,\n        zum Beispiel über einen Link am Ende eines jeden Newsletters.\n        Alternativ können Sie Ihren Abmeldewunsch gerne auch jederzeit an\n        <u><a href="mailto:info@amploi.de">info@amploi.de</a></u> per E-Mail senden.\n      </p>\n      <p><b>Weitergabe von Daten</b></p>\n      <p>\n        Eine\n        Übermittlung Ihrer persönlichen Daten an Dritte zu anderen als den\n        im Folgenden aufgeführten Zwecken findet nicht statt. Wir geben Ihre\n        persönlichen Daten nur an Dritte weiter, wenn:\n      </p>\n      <ul>\n        <li>Sie\n          Ihre nach Art. 6 Abs. 1 S. 1 lit. a DSGVO ausdrückliche Einwilligung\n          dazu erteilt haben,\n        </li>\n        <li>die Weitergabe nach Art. 6 Abs. 1 S. 1\n          lit. f DSGVO zur <i>der Anbahnung, Abwicklung und Abrechnung von Promotionaufträgen</i>erforderlich\n          ist und kein Grund zur Annahme besteht, dass Sie ein überwiegendes\n          schutzwürdiges Interesse an der Nichtweitergabe Ihrer Daten haben,\n        </li>\n        <li>wenn für die Weitergabe nach Art. 6 Abs. 1 S. 1 lit. c DSGVO eine\n          gesetzliche Verpflichtung besteht, sowie\n        </li>\n        <li>dies gesetzlich\n          zulässig und nach Art. 6 Abs. 1 S. 1 lit. b DSGVO für die\n          Abwicklung von Vertragsverhältnissen mit Ihnen erforderlich ist.\n        </li>\n      </ul>\n      <br/>\n    </li>\n    <li>\n      <p>\n        <b>Cookies</b></p>\n      <p>Wir\n        setzen auf unserer Seite Cookies ein. Hierbei handelt es sich um\n        kleine Dateien, die Ihr Browser automatisch erstellt und die auf\n        Ihrem Endgerät (Laptop, Tablet, Smartphone o.Ä.) gespeichert\n        werden, wenn Sie unsere Seite besuchen. Cookies richten auf Ihrem\n        Endgerät keinen Schaden an, enthalten keine Viren, Trojaner oder\n        sonstige Schadsoftware. In dem Cookie werden Informationen abgelegt,\n        die sich jeweils im Zusammenhang mit dem spezifisch eingesetzten\n        Endgerät ergeben. Dies bedeutet jedoch nicht, dass wir dadurch\n        unmittelbar Kenntnis von Ihrer Identität erhalten. Der Einsatz von\n        Cookies dient einerseits dazu, die Nutzung unseres Angebots für Sie\n        angenehmer zu gestalten. So setzen wir sogenannte Session-Cookies\n        ein, um zu erkennen, dass Sie einzelne Seiten unserer Website\n        bereits besucht haben. Diese werden nach Verlassen unserer Seite\n        automatisch gelöscht. Darüber hinaus setzen wir ebenfalls zur\n        Optimierung der Benutzerfreundlichkeit temporäre Cookies ein, die\n        für einen bestimmten festgelegten Zeitraum auf Ihrem Endgerät\n        gespeichert werden. Besuchen Sie unsere Seite erneut, um unsere\n        Dienste in Anspruch zu nehmen, wird automatisch erkannt, dass Sie\n        bereits bei uns waren und welche Eingaben und Einstellungen sie\n        getätigt haben, um diese nicht noch einmal eingeben zu müssen. Zum\n        anderen setzten wir Cookies ein, um die Nutzung unserer Website\n        statistisch zu erfassen und zum Zwecke der Optimierung unseres\n        Angebotes für Sie auszuwerten (siehe Ziff. 5). Diese Cookies\n        ermöglichen es uns, bei einem erneuten Besuch unserer Seite\n        automatisch zu erkennen, dass Sie bereits bei uns waren. Diese\n        Cookies werden nach einer jeweils definierten Zeit automatisch\n        gelöscht. Die durch Cookies verarbeiteten Daten sind für die\n        genannten Zwecke zur Wahrung unserer berechtigten Interessen sowie\n        der Dritter nach Art. 6 Abs. 1 S. 1 lit. f DSGVO erforderlich. Die\n        meisten Browser akzeptieren Cookies automatisch. Sie können Ihren\n        Browser jedoch so konfigurieren, dass keine Cookies auf Ihrem\n        Computer gespeichert werden oder stets ein Hinweis erscheint, bevor\n        ein neuer Cookie angelegt wird. Die vollständige Deaktivierung von\n        Cookies kann jedoch dazu führen, dass Sie nicht alle Funktionen\n        unserer Website nutzen können.\n      </p>\n    </li>\n    <li>\n      <p><b>Analyse-Tools</b>\n      </p>\n      <p><b>a. Tracking-Tools</b></p>\n      <p>Die\n        im Folgenden aufgeführten und von uns eingesetzten\n        Tracking-Maßnahmen werden auf Grundlage des Art. 6 Abs. 1 S. 1 lit.\n        f DSGVO durchgeführt. Mit den zum Einsatz kommenden\n        Tracking-Maßnahmen wollen wir eine bedarfsgerechte Gestaltung und\n        die fortlaufende Optimierung unserer Website sicherstellen. Zum\n        anderen setzen wir die Tracking-Maßnahmen ein, um die Nutzung\n        unserer Website statistisch zu erfassen und zum Zwecke der\n        Optimierung unseres Angebotes für Sie auszuwerten. Diese Interessen\n        sind als berechtigt im Sinne der vorgenannten Vorschrift anzusehen.\n        Die jeweiligen Datenverarbeitungszwecke und Datenkategorien sind aus\n        den entsprechenden Tracking-Tools zu entnehmen.\n      </p>\n      <p><b>b. Google Analytics</b></p>\n      <p>Zum\n        Zwecke der bedarfsgerechten Gestaltung und fortlaufenden Optimierung\n        unserer Seiten nutzen wir Google Analytics, einen Webanalysedienst\n        der Google Inc. (<a href="https://www.google.de/intl/de/about/" target="_blank"><u>https://www.google.de/intl/de/about/</u></a>)\n        (1600 Amphitheatre Parkway, Mountain View, CA 94043, USA; im\n        Folgenden „Google“). In\n        diesem Zusammenhang werden pseudonymisierte Nutzungsprofile erstellt\n        und Cookies (siehe unter Ziff. 4) verwendet. Die durch den Cookie\n        erzeugten Informationen über Ihre Benutzung dieser Website wie\n      </p>\n      <ul>\n        <li>Browser-Typ/-Version,</li>\n        <li>verwendetes Betriebssystem,</li>\n        <li>Referrer-URL (die zuvor besuchte Seite),</li>\n        <li>Hostname des\n          zugreifenden Rechners (IP-Adresse),\n        </li>\n        <li>Uhrzeit der\n          Serveranfrage,\n        </li>\n      </ul>\n      <br/>\n      <p>\n        werden an einen Server von Google in den\n        USA übertragen und dort gespeichert. Die Informationen werden\n        verwendet, um die Nutzung der Website auszuwerten, um Reports über\n        die Websiteaktivitäten zusammenzustellen und um weitere mit der\n        Websitenutzung und der Internetnutzung verbundene Dienstleistungen\n        zu Zwecken der Marktforschung und bedarfsgerechten Gestaltung dieser\n        Internetseiten zu erbringen. Auch werden diese Informationen\n        gegebenenfalls an Dritte übertragen, sofern dies gesetzlich\n        vorgeschrieben ist oder soweit Dritte diese Daten im Auftrag\n        verarbeiten. Es wird in keinem Fall Ihre IP-Adresse mit anderen\n        Daten von Google zusammengeführt. Die IP-Adressen werden\n        anonymisiert, so dass eine Zuordnung nicht möglich ist\n        (IP-Masking). Sie können die Installation der Cookies durch eine\n        entsprechende Einstellung der Browser-Software verhindern; wir\n        weisen jedoch darauf hin, dass in diesem Fall gegebenenfalls nicht\n        sämtliche Funktionen dieser Website vollumfänglich genutzt werden\n        können. Sie können darüber hinaus die Erfassung der durch das\n        Cookie erzeugten und auf Ihre Nutzung der Website bezogenen Daten\n        (inkl. Ihrer IP-Adresse) sowie die Verarbeitung dieser Daten durch\n        Google verhindern, indem Sie ein Browser-Add-on herunterladen und\n        installieren (<a href="https://tools.google.com/dlpage/gaoptout?hl=de" target="_blank"><u>https://tools.google.com/dlpage/gaoptout?hl=de</u></a>).\n        Alternativ zum Browser-Add-on, insbesondere bei Browsern auf mobilen\n        Endgeräten, können Sie die Erfassung durch Google Analytics zudem\n        verhindern, indem Sie auf diesen Link klicken. Es wird ein\n        Opt-out-Cookie gesetzt, das die zukünftige Erfassung Ihrer Daten\n        beim Besuch dieser Website verhindert. Das Opt-out-Cookie gilt nur\n        in diesem Browser und nur für unsere Website und wird auf Ihrem\n        Gerät abgelegt. Löschen Sie die Cookies in diesem Browser, müssen\n        Sie das Opt-out-Cookie erneut setzen. Weitere Informationen zum\n        Datenschutz im Zusammenhang mit Google Analytics finden Sie etwa in\n        der Google Analytics-Hilfe\n        (<a href="https://support.google.com/analytics/answer/6004245?hl=de" target="_blank"><u>https://support.google.com/analytics/answer/6004245?hl=de</u></a>).\n      </p>\n      <p><b>c. Google Adwords Conversion Tracking<br/></b></p>\n      <p>Um\n        die Nutzung unserer Website statistisch zu erfassen und zum Zwecke\n        der Optimierung unserer Website für Sie auszuwerten, nutzen wir\n        ferner das Google Conversion Tracking. Dabei wird von Google Adwords\n        ein Cookie (siehe Ziff. 4) auf Ihrem Rechner gesetzt, sofern Sie\n        über eine Google-Anzeige auf unsere Website gelangt sind. Diese\n        Cookies verlieren nach 30 Tagen ihre Gültigkeit und dienen nicht\n        der persönlichen Identifizierung. Besucht der Nutzer bestimmte\n        Seiten der Website des Adwords-Kunden und das Cookie ist noch nicht\n        abgelaufen, können Google und der Kunde erkennen, dass der Nutzer\n        auf die Anzeige geklickt hat und zu dieser Seite weitergeleitet\n        wurde. Jeder Adwords-Kunde erhält ein anderes Cookie. Cookies\n        können somit nicht über die Webseiten von Adwords-Kunden\n        nachverfolgt werden. Die mithilfe des Conversion-Cookies eingeholten\n        Informationen dienen dazu, Conversion-Statistiken für\n        Adwords-Kunden zu erstellen, die sich für Conversion-Tracking\n        entschieden haben. Die Adwords-Kunden erfahren die Gesamtanzahl der\n        Nutzer, die auf ihre Anzeige geklickt haben und zu einer mit einem\n        Conversion-Tracking-Tag versehenen Seite weitergeleitet wurden. Sie\n        erhalten jedoch keine Informationen, mit denen sich Nutzer\n        persönlich identifizieren lassen. Wenn Sie nicht an dem\n        Tracking-Verfahren teilnehmen möchten, können Sie auch das hierfür\n        erforderliche Setzen eines Cookies ablehnen – etwa per\n        Browser-Einstellung, die das automatische Setzen von Cookies\n        generell deaktiviert. Sie können Cookies für Conversion-Tracking\n        auch deaktivieren, indem Sie Ihren Browser so einstellen, dass\n        Cookies von der Domain „www.googleadservices.com“ blockiert\n        werden. Googles Datenschutzbelehrung zum Conversion-Tracking finden\n        Sie hier (<a href="https://services.google.com/sitestats/de.html" target="_blank"><u>https://services.google.com/sitestats/de.html</u></a>).\n      </p>\n    </li>\n    <li>\n      <p><b>Social Media Plug-ins</b></p>\n      <p>Wir\n        setzen auf unserer Website auf Grundlage des Art. 6 Abs. 1 S. 1 lit.\n        f DSGVO Social Plug-ins der sozialen Netzwerke Facebook, Twitter und\n        Instagram ein, um unsere Kanzlei hierüber bekannter zu machen. Der\n        dahinterstehende werbliche Zweck ist als berechtigtes Interesse im\n        Sinne der DSGVO anzusehen. Die Verantwortung für den\n        datenschutzkonformen Betrieb ist durch den jeweiligen Anbieter zu\n        gewährleisten. Die Einbindung dieser Plug-ins durch uns erfolgt im\n        Wege der sogenannten Zwei-Klick-Methode, um Besucher unserer\n        Webseite bestmöglich zu schützen.</p>\n      <p><b>a. Facebook</b></p>\n      <p>Auf\n        unserer Website kommen Social-Media Plug-ins von Facebook zum\n        Einsatz, um den Nutzung persönlicher zu gestalten. Hierfür nutzen\n        wir den „LIKE“ oder „TEILEN“-Button. Es handelt sich dabei\n        um ein Angebot von Facebook. Wenn Sie eine Seite unseres\n        Webauftritts aufrufen, die ein solches Plug-in enthält, baut Ihr\n        Browser eine direkte Verbindung mit den Servern von Facebook auf.\n        Der Inhalt des Plug-ins wird von Facebook direkt an Ihren Browser\n        übermittelt und von diesem in die Website eingebunden. Durch die\n        Einbindung der Plug-ins erhält Facebook die Information, dass Ihr\n        Browser die entsprechende Seite unseres Webauftritts aufgerufen hat,\n        auch wenn Sie kein Facebook-Konto besitzen oder gerade nicht bei\n        Facebook eingeloggt sind. Diese Information (einschließlich Ihrer\n        IP-Adresse) wird von Ihrem Browser direkt an einen Server von\n        Facebook in den USA übermittelt und dort gespeichert. Sind Sie bei\n        Facebook eingeloggt, kann Facebook den Besuch unserer Website Ihrem\n        Facebook-Konto direkt zuordnen. Wenn Sie mit den Plug-ins\n        interagieren, zum Beispiel den „LIKE“ oder „TEILEN“-Button\n        betätigen, wird die entsprechende Information ebenfalls direkt an\n        einen Server von Facebook übermittelt und dort gespeichert. Die\n        Informationen werden zudem auf Facebook veröffentlicht und Ihren\n        Facebook-Freunden angezeigt. Facebook kann diese Informationen zum\n        Zwecke der Werbung, Marktforschung und bedarfsgerechten Gestaltung\n        der Facebook-Seiten benutzen. Hierzu werden von Facebook Nutzungs-,\n        Interessen- und Beziehungsprofile erstellt, z.B. um Ihre Nutzung\n        unserer Website im Hinblick auf die Ihnen bei Facebook\n        eingeblendeten Werbeanzeigen auszuwerten, andere Facebook-Nutzer\n        über Ihre Aktivitäten auf unserer Website zu informieren und um\n        weitere mit der Nutzung von Facebook verbundene Dienstleistungen zu\n        erbringen. Wenn Sie nicht möchten, dass Facebook die über unseren\n        Webauftritt gesammelten Daten Ihrem Facebook-Konto zuordnet, müssen\n        Sie sich vor Ihrem Besuch unserer Website bei Facebook ausloggen.\n        Zweck und Umfang der Datenerhebung und die weitere Verarbeitung und\n        Nutzung der Daten durch Facebook sowie Ihre diesbezüglichen Rechte\n        und Einstellungsmöglichkeiten zum Schutz Ihrer Privatsphäre\n        entnehmen Sie bitte den Datenschutzhinweisen von Facebook\n        (<a href="https://www.facebook.com/about/privacy/" target="_blank"><u>https://www.facebook.com/about/privacy/</u></a>).\n      </p>\n      <p><b>b. Twitter</b></p>\n      <p>Auf\n        unseren Internetseiten sind Plug-ins des Kurznachrichtennetzwerks\n        der Twitter Inc. (Twitter) integriert. Die Twitter-Plug-ins\n        (tweet-Button) erkennen Sie an dem Twitter-Logo auf unserer Seite.\n        Eine Übersicht über tweet-Buttons finden Sie unter:\n        (<a href="https://about.twitter.com/resources/buttons" target="_blank"><u>https://about.twitter.com/resources/buttons</u></a>).\n      </p>\n      <p>\n        Wenn\n        Sie eine Seite unseres Webauftritts aufrufen, die ein solches\n        Plug-in enthält, wird eine direkte Verbindung zwischen Ihrem\n        Browser und dem Twitter-Server hergestellt. Twitter erhält dadurch\n        die Information, dass Sie mit Ihrer IP-Adresse unsere Seite besucht\n        haben. Wenn Sie den Twitter „tweet-Button“ anklicken, während\n        Sie in Ihrem Twitter-Account eingeloggt sind, können Sie die\n        Inhalte unserer Seiten auf Ihrem Twitter-Profil verlinken. Dadurch\n        kann Twitter den Besuch unserer Seiten Ihrem Benutzerkonto zuordnen.\n        Wir weisen darauf hin, dass wir als Anbieter der Seiten keine\n        Kenntnis vom Inhalt der übermittelten Daten sowie deren Nutzung\n        durch Twitter erhalten. Wenn Sie nicht wünschen, dass Twitter den\n        Besuch unserer Seiten zuordnen kann, loggen Sie sich bitte aus Ihrem\n        Twitter-Benutzerkonto aus. Weitere Informationen hierzu finden Sie\n        in der Datenschutzerklärung von Twitter\n        (<a href="https://twitter.com/privacy" target="_blank"><u>https://twitter.com/privacy</u></a>).\n      </p>\n      <p><b>c. Instagram</b></p>\n      <p>Auf\n        unserer Website werden auch sogenannte Social Plug-ins („Plug-ins“)\n        von Instagram verwendet, das von der Instagram LLC., 1601 Willow\n        Road, Menlo Park, CA 94025, USA („Instagram“) betrieben wird.\n        Die Plug-ins sind mit einem Instagram-Logo beispielsweise in Form\n        einer „Instagram-Kamera“ gekennzeichnet. Wenn Sie eine Seite\n        unseres Webauftritts aufrufen, die ein solches Plugin enthält,\n        stellt Ihr Browser eine direkte Verbindung zu den Servern von\n        Instagram her. Der Inhalt des Plug-ins wird von Instagram direkt an\n        Ihren Browser übermittelt und in die Seite eingebunden. Durch diese\n        Einbindung erhält Instagram die Information, dass Ihr Browser die\n        entsprechende Seite unseres Webauftritts aufgerufen hat, auch wenn\n        Sie kein Instagram-Profil besitzen oder gerade nicht bei Instagram\n        eingeloggt sind. Diese Information (einschließlich Ihrer\n        IP-Adresse) wird von Ihrem Browser direkt an einen Server von\n        Instagram in die USA übermittelt und dort gespeichert. Sind Sie bei\n        Instagram eingeloggt, kann Instagram den Besuch unserer Website\n        Ihrem Instagram-Account unmittelbar zuordnen. Wenn Sie mit den\n        Plug-ins interagieren, zum Beispiel den „Instagram“-Button\n        betätigen, wird diese Information ebenfalls direkt an einen Server\n        von Instagram übermittelt und dort gespeichert. Die Informationen\n        werden außerdem auf Ihrem Instagram-Account veröffentlicht und\n        dort Ihren Kontakten angezeigt. Wenn Sie nicht möchten, dass\n        Instagram die über unseren Webauftritt gesammelten Daten\n        unmittelbar Ihrem Instagram-Account zuordnet, müssen Sie sich vor\n        Ihrem Besuch unserer Website bei Instagram ausloggen. Weitere\n        Informationen hierzu finden Sie in der Datenschutzerklärung\n        (<a href="https://help.instagram.com/155833707900388" target="_blank"><u>https://help.instagram.com/155833707900388</u></a>)\n        von Instagram.\n      </p>\n    </li>\n    <li>\n      <p><b>Betroffenenrechte</b></p>\n      <p>Sie haben das Recht:</p>\n      <ul>\n        <li>Gemäß Art. 15 DSGVO Auskunft über\n          Ihre von uns verarbeiteten personenbezogenen Daten zu verlangen.\n          Insbesondere können Sie Auskunft über die Verarbeitungszwecke, die\n          Kategorien der personenbezogenen Daten, die Kategorien von\n          Empfängern, gegenüber denen Ihre Daten offengelegt wurden oder\n          werden, die geplante Speicherdauer, das Bestehen eines Rechts auf\n          Berichtigung, Löschung, Einschränkung der Verarbeitung oder\n          Widerspruch, das Bestehen eines Beschwerderechts, die Herkunft ihrer\n          Daten, sofern diese nicht bei uns erhoben wurden, sowie über das\n          Bestehen einer automatisierten Entscheidungsfindung einschließlich\n          Profiling und ggf. aussagekräftigen Informationen zu deren\n          Einzelheiten verlangen;\n        </li>\n        <li>Gemäß Art. 16 DSGVO unverzüglich\n          die Berichtigung unrichtiger oder Vervollständigung Ihrer bei uns\n          gespeicherten personenbezogenen Daten zu verlangen;\n        </li>\n        <li> Gemäß\n          Art. 17 DSGVO die Löschung Ihrer bei uns gespeicherten\n          personenbezogenen Daten zu verlangen, soweit nicht die Verarbeitung\n          zur Ausübung des Rechts auf freie Meinungsäußerung und\n          Information, zur Erfüllung einer rechtlichen Verpflichtung, aus\n          Gründen des öffentlichen Interesses oder zur Geltendmachung,\n          Ausübung oder Verteidigung von Rechtsansprüchen erforderlich\n          ist;\n        </li>\n        <li>Gemäß Art. 18 DSGVO die Einschränkung der\n          Verarbeitung Ihrer personenbezogenen Daten zu verlangen, soweit die\n          Richtigkeit der Daten von Ihnen bestritten wird, die Verarbeitung\n          unrechtmäßig ist, Sie aber deren Löschung ablehnen und wir die\n          Daten nicht mehr benötigen, Sie jedoch diese zur Geltendmachung,\n          Ausübung oder Verteidigung von Rechtsansprüchen benötigen oder\n          Sie gemäß Art. 21 DSGVO Widerspruch gegen die Verarbeitung\n          eingelegt haben;\n        </li>\n        <li>Gemäß Art. 20 DSGVO Ihre\n          personenbezogenen Daten, die Sie uns bereitgestellt haben, in einem\n          strukturierten, gängigen und maschinenlesebaren Format zu erhalten\n          oder die Übermittlung an einen anderen Verantwortlichen zu\n          verlangen;\n        </li>\n        <li>Gemäß Art. 7 Abs. 3 DSGVO Ihre einmal erteilte\n          Einwilligung jederzeit uns gegenüber zu widerrufen. Dies hat zur\n          Folge, dass wir die Datenverarbeitung, die auf dieser Einwilligung\n          beruhte, für die Zukunft nicht mehr fortführen dürfen;\n        </li>\n        <li>Gemäß Art. 77 DSGVO sich bei einer Aufsichtsbehörde zu\n          beschweren. In der Regel können Sie sich hierfür an die\n          Aufsichtsbehörde Ihres üblichen Aufenthaltsortes oder\n          Arbeitsplatzes oder unseres Kanzleisitzes wenden.\n        </li>\n      </ul>\n      <br/>\n    </li>\n    <li>\n      <p><b>Widerspruchsrecht<br/></b></p>\n      <p>Sofern\n        Ihre personenbezogenen Daten auf Grundlage von berechtigten\n        Interessen gemäß Art. 6 Abs. 1 S. 1 lit. f DSGVO verarbeitet\n        werden, haben Sie das Recht, gemäß Art. 21 DSGVO Widerspruch gegen\n        die Verarbeitung Ihrer personenbezogenen Daten einzulegen, soweit\n        dafür Gründe vorliegen, die sich aus Ihrer besonderen Situation\n        ergeben oder sich der Widerspruch gegen Direktwerbung richtet. Im\n        letzteren Fall haben Sie ein generelles Widerspruchsrecht, das ohne\n        Angabe einer besonderen Situation von uns umgesetzt wird. Möchten\n        Sie von Ihrem Widerrufs- oder Widerspruchsrecht Gebrauch machen,\n        genügt eine E-Mail: <u>info@amploi.de</u>\n      </p>\n    </li>\n    <li>\n      <p><b>Datensicherheit</b></p>\n      <p>Wir\n        verwenden innerhalb des Website-Besuchs das verbreitete\n        SSL-Verfahren (Secure Socket Layer) in Verbindung mit der jeweils\n        höchsten Verschlüsselungsstufe, die von Ihrem Browser unterstützt\n        wird. In der Regel handelt es sich dabei um eine 256-Bit\n        Verschlüsselung. Falls Ihr Browser keine 256-Bit Verschlüsselung\n        unterstützt, greifen wir stattdessen auf die 128-Bit v3 Technologie\n        zurück. Ob eine einzelne Seite unseres Internetauftrittes\n        verschlüsselt übertragen wird, erkennen Sie an der geschlossenen\n        Darstellung des Schüssel- beziehungsweise Schloss-Symbols in der\n        unteren Statusleiste Ihres Browsers. Wir bedienen uns im Übrigen\n        geeigneter technischer und organisatorischer Sicherheitsmaßnahmen,\n        um Ihre Daten gegen zufällige oder vorsätzliche Manipulationen,\n        teilweisen oder vollständigen Verlust, Zerstörung oder gegen den\n        unbefugten Zugriff Dritter zu schützen. Unsere Sicherheitsmaßnahmen\n        werden entsprechend der technologischen Entwicklung fortlaufend\n        verbessert.</p>\n    </li>\n    <li>\n      <p><b>Aktualität und Änderung dieser Datenschutzerklärung</b></p>\n      <p>Diese\n        Datenschutzerklärung ist aktuell gültig und hat den Stand Mai\n        2018. Durch die Weiterentwicklung unserer Website und Angebote\n        darüber oder aufgrund geänderter gesetzlicher beziehungsweise\n        behördlicher Vorgaben kann es notwendig werden, diese\n        Datenschutzerklärung zu ändern. Die jeweils aktuelle\n        Datenschutzerklärung kann jederzeit im Portal\n        unter&nbsp;<a href="https://portal.amploi.de/dataprivacy" target="_blank"><u>https://portal.amploi.de/dataprivacy</u></a> von Ihnen abgerufen und\n        ausgedruckt werden.</p>\n    </li>\n  </ol>\n</ion-content>\n'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/settings/dataprivacy.page.html"*/
        })
    ], DataprivacyPage);
    return DataprivacyPage;
}());

//# sourceMappingURL=dataprivacy.page.js.map

/***/ }),

/***/ 168:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_api__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_collection__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 *
 */
var ProfileService = /** @class */ (function () {
    function ProfileService(api) {
        this.api = api;
    }
    /**
     * Gets freelancer profile data
     *
     * @param freelancerId
     */
    ProfileService.prototype.get = function (freelancerId) {
        var _this = this;
        return this.api.promised(this.api.getFreelancer({ freelancerId: freelancerId }, { includes: ['contract_types'] })).then(function (profile) { return _this.transform(profile); });
    };
    ProfileService.prototype.transform = function (profile) {
        var fields = ['address', 'addressaddition', 'zip', 'city', 'country', 'near_to_city'];
        var addresses = [{}, {}];
        addresses.forEach(function (addr, idx) {
            fields.forEach(function (field) {
                var key = field + ((idx && '2') || ''); // to reflect datamodel
                if (profile[key]) {
                    addr[field] = profile[key];
                }
            });
        });
        return Object.assign(profile, {
            addresses: addresses.filter(function (i) { return Object.getOwnPropertyNames(i).length; }),
            contract_types: __WEBPACK_IMPORTED_MODULE_2__utils_collection__["a" /* Collection */].pluck(profile.contract_types.data, 'identifier')
        });
    };
    ProfileService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__components_api__["g" /* NewApiService */]])
    ], ProfileService);
    return ProfileService;
}());

//# sourceMappingURL=profile.service.js.map

/***/ }),

/***/ 169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AllCertificatesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_loading__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_api__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__base_page__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__certificates_service__ = __webpack_require__(170);
/* tslint:disable:no-access-missing-member due to inheritance */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AllCertificatesPage = /** @class */ (function (_super) {
    __extends(AllCertificatesPage, _super);
    function AllCertificatesPage(translate, loading, renderer, user, nav, events, certificates, params) {
        var _this = _super.call(this, translate, loading, renderer, user) || this;
        _this.translate = translate;
        _this.loading = loading;
        _this.renderer = renderer;
        _this.user = user;
        _this.nav = nav;
        _this.events = events;
        _this.certificates = certificates;
        _this.params = params;
        _this.search = '';
        _this.type = _this.params && _this.params.data.type;
        _this.initFilters();
        // subscribe change in certificates (after pass exam)
        _this.events.subscribe('certificates:changed', function () { return _this.doRefresh(); });
        return _this;
    }
    AllCertificatesPage.prototype.initFilters = function () {
        this.filters = {
            search: { type: 'search', set: '' },
            recommendation: { type: 'buttons', options: 'certificates.recommendation', set: undefined },
            category: { type: 'select', options: 'certificates.categories', set: undefined, none: true }
        };
    };
    AllCertificatesPage.prototype.fetch = function (loaded, load) {
        var _this = this;
        if (load === void 0) { load = 10; }
        return this.certificates.list(this.type, this.profile.roleId(), loaded && loaded.length, load, this.filtered).then(function (items) { return _this.setItems(loaded, items); });
    };
    AllCertificatesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-certificates',template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/certificates/all.certificates.page.html"*/'<ion-content>\n  <ion-refresher (ionRefresh)="doRefresh($event);" [enabled]="!filterOpened">\n    <ion-refresher-content pulling-icon="ion-arrow-down-b positive" spinner="crescent" pullingText="{{ \'common.pull-to-refresh\' | translate }}"\n      refreshingText="{{ \'common.refreshing\' | translate }}">\n    </ion-refresher-content>\n  </ion-refresher>\n\n  <filter-bar [filters]="filters" context="certificates" (on-apply)="filter($event)" (filter-opened)="onFilterOpened($event)"></filter-bar>\n  <ion-list no-lines *ngIf="items && items.length">\n    <certificate-card *ngFor="let item of items" [certificate]="item" [passed]="item.exam_result && item.exam_result.passed"></certificate-card>\n  </ion-list>\n  <ion-infinite-scroll (ionInfinite)="$event.waitFor(fetch(items, 10))" [enabled]="moreItems">\n    <ion-infinite-scroll-content loadingSpinner="crescent" loadingText="{{ \'common.fetching-data\' | translate }}">\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n  <nothing-found *ngIf="items && !items.length" icon="ios-happy-outline" context="certificates.nothing-found.{{type}}" redirect="{{type === \'mine\' ? \'certificates:all\' : undefined}}"></nothing-found>\n</ion-content>'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/certificates/all.certificates.page.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["d" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_3__components_loading__["a" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer2"], __WEBPACK_IMPORTED_MODULE_4__components_api__["f" /* ApiUserService */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* Events */], __WEBPACK_IMPORTED_MODULE_6__certificates_service__["a" /* CertificatesService */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["p" /* NavParams */]])
    ], AllCertificatesPage);
    return AllCertificatesPage;
}(__WEBPACK_IMPORTED_MODULE_5__base_page__["a" /* BasePage */]));

//# sourceMappingURL=all.certificates.page.js.map

/***/ }),

/***/ 170:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CertificatesService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_api__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 *
 */
var CertificatesService = /** @class */ (function () {
    function CertificatesService(api) {
        this.api = api;
    }
    /**
     * Gets all the certificates
     *
     * @param type Parameter to include all or exclusive certificates
     *
     */
    CertificatesService.prototype.list = function (type, freelancerId, offset, limit, filtered) {
        if (type === void 0) { type = 'all'; }
        var options = {
            order: { is_recommended: 'desc' },
            params: {
                without_passed: true,
                without_exclusive: true,
                only_recommended: filtered && (filtered.recommendation || []).includes('recommended') || undefined,
                with_jobs: filtered && (filtered.recommendation || []).includes('with_jobs') || undefined,
                category: filtered && filtered.category || undefined,
            },
            paging: { offset: offset, limit: limit },
            search: filtered.search
        };
        if (type === 'exclusive') {
            options.params.only_exclusive = true;
            options.params.without_exclusive = undefined;
        }
        if (type === 'mine') {
            options.params = undefined;
        }
        return this.api.promised(this.api.getFreelancerCertificates({ id: freelancerId }, options), undefined, true);
    };
    /**
     * Gets single certificate
     *
     * @param trainingId
     */
    CertificatesService.prototype.get = function (trainingId) {
        var options = { includes: ['training', 'exam'] };
        return this.api.promised(this.api.getCertificate({ id: trainingId }, options));
    };
    CertificatesService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__components_api__["g" /* NewApiService */]])
    ], CertificatesService);
    return CertificatesService;
}());

//# sourceMappingURL=certificates.service.js.map

/***/ }),

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExamInstructionsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__exam_main_page__ = __webpack_require__(172);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ExamInstructionsPage = /** @class */ (function () {
    function ExamInstructionsPage(params, navigation) {
        this.params = params;
        this.navigation = navigation;
        this.examId = this.params.get('id');
    }
    ExamInstructionsPage.prototype.startExam = function () {
        this.navigation.push(__WEBPACK_IMPORTED_MODULE_2__exam_main_page__["a" /* ExamMainPage */], { id: this.examId });
    };
    ExamInstructionsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/exam/exam.instructions.page.html"*/'<ion-content padding>\n  <button-back label="buttons.back"></button-back>\n  <h6>{{ "exam.instruction.headline" | translate }}</h6>\n  <p [innerHTML]="\'exam.instruction.description\' | translate"></p>\n  <button color="button-primary" ion-button full (click)="startExam()">{{ "exam.buttons.next" | translate }}</button>\n</ion-content>\n'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/exam/exam.instructions.page.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */]])
    ], ExamInstructionsPage);
    return ExamInstructionsPage;
}());

//# sourceMappingURL=exam.instructions.page.js.map

/***/ }),

/***/ 172:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExamMainPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_confirm__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_loading__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_checklist__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__exam_result_page__ = __webpack_require__(476);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__exam_service__ = __webpack_require__(477);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ExamMainPage = /** @class */ (function () {
    function ExamMainPage(navigation, exams, confirm, params, loading, events) {
        var _this = this;
        this.navigation = navigation;
        this.exams = exams;
        this.confirm = confirm;
        this.params = params;
        this.loading = loading;
        this.events = events;
        this.answers = {};
        this.fetching(true);
        this.examId = this.params.get('id');
        this.exams.get(this.examId).then(function (data) {
            _this.instance = data;
            _this.initAnswers();
            _this.fetching(false);
        });
    }
    // inits checklist model
    ExamMainPage.prototype.initAnswers = function () {
        var _this = this;
        this.instance.questions.forEach(function (question) {
            Object.assign(_this.answers, __WEBPACK_IMPORTED_MODULE_4__utils_checklist__["a" /* Checklist */].prepare(question.answers));
        });
    };
    ExamMainPage.prototype.onSlideChanging = function () {
        this.content.scrollToTop();
    };
    ExamMainPage.prototype.submitAnswers = function () {
        var _this = this;
        this.confirm.create({
            context: 'exam',
            title: 'submit',
            confirm: true,
            cancel: true,
            cssClass: 'exam-info',
            onConfirm: function () {
                _this.fetching(true);
                _this.exams.submitTest(_this.instance.exam_instance_id, __WEBPACK_IMPORTED_MODULE_4__utils_checklist__["a" /* Checklist */].selected(_this.answers)).then(function (result) {
                    if (result.passed) {
                        _this.events.publish('certificates:changed');
                    }
                    _this.navigation.push(__WEBPACK_IMPORTED_MODULE_5__exam_result_page__["a" /* ExamResultPage */], { id: _this.examId, result: result });
                    _this.fetching(false);
                });
            },
        }).present();
    };
    ExamMainPage.prototype.fetching = function (show) {
        if (show) {
            this.loader = this.loading.create('common.fetching-data', false);
            this.loader.present();
        }
        else if (this.loader) {
            this.loading.hide(this.loader);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('slides'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* Slides */])
    ], ExamMainPage.prototype, "slides", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Content */])
    ], ExamMainPage.prototype, "content", void 0);
    ExamMainPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-exam-main',template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/exam/exam.main.page.html"*/'<ion-content padding>\n  <button-back label="buttons.back"></button-back>\n  <div>\n    <ion-slides *ngIf="instance" (ionSlideWillChange)="onSlideChanging()" #slides>\n      <ion-slide class="swiper-no-swiping" *ngFor="let question of instance.questions; let i = index;">\n        <h6>{{ \'exam.test\' | translate : instance.exam }} </h6>\n        <p class="question"> {{ "exam.question" | translate : {num: i + 1, all: instance.questions.length} }} </p>\n        <p class="text">{{ question.text }}</p>\n        <ion-list margin-bottom no-lines>\n          <ion-item *ngFor="let ans of question.answers">\n            <ion-label class="choices" text-wrap>{{ ans.answer }}</ion-label>\n            <ion-checkbox color="button-primary" item-left [(ngModel)]="answers[ans.id]"></ion-checkbox>\n          </ion-item>\n        </ion-list>\n      </ion-slide>\n    </ion-slides>\n  </div>\n</ion-content>\n\n<ion-footer *ngIf="slides">\n  <ion-row>\n    <ion-col>\n      <button color="primary" ion-button clear small strong icon-start [disabled]="slides.isBeginning()" (click)="slides.slidePrev()">\n          <ion-icon name="ios-arrow-back"></ion-icon>\n          {{ "exam.buttons.back" | translate }}\n        </button>\n    </ion-col>\n    <ion-col>\n      <button color="button-primary" float-right ion-button solid strong small icon-end *ngIf="slides.isEnd()" (click)="submitAnswers()">\n        {{ "exam.buttons.submit" | translate }}\n        <ion-icon name="ios-arrow-forward"></ion-icon>\n      </button>\n      <button color="button-primary" float-right ion-button solid strong small icon-end *ngIf="!slides.isEnd()" (click)="slides.slideNext()">\n        {{ "exam.buttons.next" | translate }}\n        <ion-icon name="ios-arrow-forward"></ion-icon>\n      </button>\n    </ion-col>\n  </ion-row>\n</ion-footer>'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/exam/exam.main.page.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_6__exam_service__["a" /* ExamService */], __WEBPACK_IMPORTED_MODULE_2__components_confirm__["a" /* ConfirmController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__components_loading__["a" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Events */]])
    ], ExamMainPage);
    return ExamMainPage;
}());

//# sourceMappingURL=exam.main.page.js.map

/***/ }),

/***/ 173:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PreparationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base_page__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_details__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_loading__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_api__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_app_animations__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__preparation_service__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__preparation_details__ = __webpack_require__(175);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var PreparationPage = /** @class */ (function (_super) {
    __extends(PreparationPage, _super);
    function PreparationPage(translate, loading, user, renderer, details, preparations) {
        var _this = _super.call(this, translate, loading, renderer, user) || this;
        _this.translate = translate;
        _this.loading = loading;
        _this.user = user;
        _this.renderer = renderer;
        _this.details = details;
        _this.preparations = preparations;
        return _this;
    }
    PreparationPage.prototype.fetch = function (loaded, load) {
        var _this = this;
        if (load === void 0) { load = 10; }
        return this.preparations.assignments(this.profile.roleId(), loaded && loaded.length, load).then(function (assignments) { return _this.setItems(loaded, assignments); });
    };
    /**
     * Shows details
     */
    PreparationPage.prototype.showDetails = function (assignment) {
        var _this = this;
        var modal = this.details.open(__WEBPACK_IMPORTED_MODULE_8__preparation_details__["a" /* PreparationDetails */], { assignment: assignment, profile: this.profile });
        modal.onDidDismiss(function (data) { return data && _this.doRefresh(); });
    };
    PreparationPage.prototype.doRefresh = function (refresher) {
        _super.prototype.doRefresh.call(this, refresher);
    };
    PreparationPage.prototype.onChange = function (job) {
        // updates entries
        this.doRefresh();
    };
    PreparationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-preparation',template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/bills/preparation/preparation.page.html"*/'<ion-content>\n  <ion-refresher (ionRefresh)="doRefresh($event);" #refresher>\n    <ion-refresher-content pulling-icon="ion-arrow-down-b positive" spinner="crescent" pullingText="{{ \'common.pull-to-refresh\' | translate }}"\n      refreshingText="{{ \'common.refreshing\' | translate }}">\n    </ion-refresher-content>\n  </ion-refresher>\n\n  <ion-list no-lines *ngIf="items && items.length">\n    <tender-item *ngFor="let assignment of items" [tender]="assignment" tappable (click)="showDetails(assignment)" (changed)="onChange($event)"\n      [@softItem]></tender-item>\n    <ion-infinite-scroll (ionInfinite)="$event.waitFor(fetch(items, 10))" [enabled]="moreItems">\n      <ion-infinite-scroll-content loadingSpinner="crescent" loadingText="{{ \'common.fetching-data\' | translate }}">\n      </ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n  </ion-list>\n\n  <nothing-found *ngIf="items && !items.length" context="bills.preparation.nothing-found" redirect="assignments"></nothing-found>\n</ion-content>'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/bills/preparation/preparation.page.html"*/,
            animations: __WEBPACK_IMPORTED_MODULE_6__app_app_animations__["a" /* animations */],
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["d" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_4__components_loading__["a" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_5__components_api__["f" /* ApiUserService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer2"],
            __WEBPACK_IMPORTED_MODULE_3__components_details__["a" /* DetailsController */], __WEBPACK_IMPORTED_MODULE_7__preparation_service__["a" /* PreparationService */]])
    ], PreparationPage);
    return PreparationPage;
}(__WEBPACK_IMPORTED_MODULE_2__base_page__["a" /* BasePage */]));

//# sourceMappingURL=preparation.page.js.map

/***/ }),

/***/ 174:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__survey_module__ = __webpack_require__(479);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__survey_service__ = __webpack_require__(482);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__survey_page__ = __webpack_require__(483);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__survey_module__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_0__survey_module__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__survey_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__survey_page__["a"]; });




//# sourceMappingURL=index.js.map

/***/ }),

/***/ 175:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PreparationDetails; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_collection__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_details__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_notify__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_survey__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_confirm__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__preparation_service__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__revenue_report_details__ = __webpack_require__(484);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var PreparationDetails = /** @class */ (function () {
    function PreparationDetails(params, view, modal, preparations, notify, confirm) {
        var _this = this;
        this.params = params;
        this.view = view;
        this.modal = modal;
        this.preparations = preparations;
        this.notify = notify;
        this.confirm = confirm;
        this.questionnaire = {};
        this.feedback = {};
        // initial data on open
        this.details = this.params.get('assignment');
        this.profile = this.params.get('profile');
        // then request detailed for assignment (if not fetched yet)
        var req = this.details.fetched && this.details || this.preparations.assignment(this.profile.roleId(), this.details.id);
        Promise.resolve(req).then(function (assignment) {
            _this.details = assignment;
            _this.details.fetched = true;
            // copy prev data once loaded
            _this.previous = __WEBPACK_IMPORTED_MODULE_2__utils_collection__["a" /* Collection */].copy({ reports: _this.details.reports });
            // set questionnaire/feedback flags
            _this.questionnaire.available = Boolean(_this.details.questionnaire && _this.details.questionnaire.questions &&
                _this.details.questionnaire.questions.length);
            _this.questionnaire.answered = _this.questionnaire.available && Boolean(_this.details.questionnaire.instance);
            _this.feedback.available = Boolean(_this.details.feedback && _this.details.feedback.questions && _this.details.feedback.questions.length);
            _this.feedback.answered = _this.feedback.available && Boolean(_this.details.feedback.instance);
        });
    }
    PreparationDetails.prototype.reportFillable = function () {
        return this.details.fetched && (!this.questionnaire.available || this.questionnaire.answered) && (!this.feedback.available || this.feedback.answered);
    };
    PreparationDetails.prototype.onReportUpload = function (document, type) {
        var _this = this;
        // submit after upload
        this.confirm.create({
            context: 'bills.preparation.details.' + type,
            title: 'confirm.title',
            message: 'confirm.message',
            item: document,
            confirm: true,
            cancel: true,
            onConfirm: function () {
                // update details
                _this.details.reports[type] = document;
                // and submit document
                return _this.onDocumentsSubmit(type);
            }
        }).present();
    };
    PreparationDetails.prototype.onDocumentsSubmit = function (type) {
        var _this = this;
        // then submit (and dismiss with updated data)
        this.processing = true;
        return this.preparations.submitDocuments(this.details.id, type, this.details.reports, this.previous.reports).then(function () {
            // copy prev data once loaded
            _this.previous = __WEBPACK_IMPORTED_MODULE_2__utils_collection__["a" /* Collection */].copy({ reports: _this.details.reports });
            return _this.notify.present('bills.preparation.details.' + type + (_this.details.reports[type] ? '.submit' : '.remove') + '.success');
        }).finally(function () { return _this.processing = false; });
    };
    PreparationDetails.prototype.editRevenue = function () {
        var _this = this;
        var modal = this.modal.open(__WEBPACK_IMPORTED_MODULE_8__revenue_report_details__["a" /* RevenueReportDetails */], { assignment: this.details });
        modal.onDidDismiss(function (data) {
            if (data) {
                _this.details.revenue = data;
                // update revenue by its mandatory information
                var revenue = _this.details.revenue && Object.assign(_this.details.revenue, {
                    freelancerId: _this.profile.roleId(),
                    job_id: _this.details.job.id,
                    assignment_ids: [_this.details.id],
                });
                // then submit (and dismiss with updated data)
                _this.processing = true;
                _this.preparations.submitRevenue(revenue).then(function () { return _this.notify.present('bills.preparation.submit.revenue.success'); }).finally(function () { return _this.processing = false; });
            }
        });
    };
    PreparationDetails.prototype.editSurvey = function (type) {
        var _this = this;
        // modal with questionnaire data and save handler
        var modal = this.modal.open(__WEBPACK_IMPORTED_MODULE_5__components_survey__["b" /* SurveyPage */], {
            instance: this.details[type],
            save: function (data) { return _this.preparations.submitSurvey(data, _this.details); },
        });
        // then set answered on saved
        modal.onDidDismiss(function (instance) {
            if (instance) {
                _this.details[type] = instance;
                _this[type].answered = true;
            }
        });
    };
    // @deprecated
    PreparationDetails.prototype.onSubmit = function () {
        var _this = this;
        // update revenue by its mandatory information
        var revenue = this.details.revenue && Object.assign(this.details.revenue, {
            freelancerId: this.profile.roleId(),
            job_id: this.details.job.id,
            assignment_ids: [this.details.id],
        });
        // then submit (and dismiss with updated data)
        this.processing = true;
        this.preparations.submit(this.details.id, this.details.reports, this.previous.reports, revenue).then(function () { return _this.notify.present('bills.preparation.submit.success') && _this.view.dismiss(true); }, function () { return _this.processing = false; });
    };
    PreparationDetails.prototype.onRemove = function (document, type) {
        var _this = this;
        this.confirm.create({
            context: 'bills.preparation.details.' + type + '.remove',
            title: 'confirm.title',
            message: 'confirm.message',
            item: document,
            confirm: true,
            cancel: true,
            onConfirm: function () {
                // remove document of type
                _this.details.reports[type] = null;
                // and submit empty document for removal
                return _this.onDocumentsSubmit(type);
            }
        }).present();
    };
    PreparationDetails = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/bills/preparation/preparation.details.html"*/'<ion-content padding>\n  <button-back label="bills.preparation.details.back"></button-back>\n\n  <tender-item [tender]="details"></tender-item>\n\n  <ion-item class="details" light text-wrap>\n    <span>{{ \'assignments.details.fees\' | translate }}</span>\n    <div itemDetails>\n      <ion-col col-12 light text-wrap class="desc incentives" *ngIf="details.incentive_model">\n        <p>{{ \'assignments.details.incentives.label\' | translate }}</p>\n        <div *ngFor="let key of [\'checkin\', \'sales_report\', \'picture_documentation\']">\n          <span>{{ \'assignments.details.incentives.\' + key | translate }}</span>\n          <span>{{ details.incentives[key] | toCurrency }}</span>\n        </div>\n      </ion-col>\n\n      <ion-col col-12 light text-wrap class="desc costs" *ngIf="details.additional_costs">\n        <p>{{ \'assignments.details.costs.label\' | translate }}</p>\n        <div *ngFor="let key of details.costs | keys">\n          <span>{{ key }}</span>\n          <span>{{ details.costs[key] | toCurrency }}</span>\n        </div>\n      </ion-col>\n\n      <ion-col col-12 light text-wrap class="desc wage" *ngIf="details.wage && details.wage > 0">\n        <div>\n          <span>{{ \'assignments.details.wage\' | translate }}</span>\n          <span>{{ details.wage | toCurrency }}</span>\n        </div>\n      </ion-col>\n    </div>\n  </ion-item>\n\n  <ion-item *ngIf="questionnaire.available" text-wrap class="quest">\n    <h5 head-5>{{ \'bills.preparation.details.questionnaire.headline\' | translate }}</h5>\n    <p>{{ \'bills.preparation.details.questionnaire.description\' | translate }}</p>\n    <button ion-button full [color]="questionnaire.answered ? \'button-default\' : \'button-primary\'" (click)="editSurvey(\'questionnaire\')" [ngClass]="{ outline: questionnaire.answered }">\n      {{ \'bills.preparation.details.questionnaire.button.\' + (questionnaire.answered ? \'edit\' : \'add\') | translate }}\n    </button>\n  </ion-item>\n\n  <ion-item *ngIf="feedback.available" text-wrap class="quest">\n    <h5 head-5>{{ \'bills.preparation.details.feedback.headline\' | translate }}</h5>\n    <p>{{ \'bills.preparation.details.feedback.description\' | translate }}</p>\n    <approval-info *ngIf="feedback.answered" [approval]="details.feedback.approval"></approval-info>\n    <button ion-button full [color]="feedback.answered ? \'button-default\' : \'button-primary\'"  (click)="editSurvey(\'feedback\')" [ngClass]="{ outline: feedback.answered }">\n      {{ \'bills.preparation.details.feedback.button.\' + (feedback.answered ? \'edit\' : \'add\') | translate }}\n    </button>\n  </ion-item>\n\n  <ng-container *ngIf="reportFillable()">\n\n    <ion-item text-wrap class="templates">\n      <h5 head-5>{{ \'bills.preparation.details.templates.headline\' | translate }}</h5>\n      <div *ngIf="details.documents">\n        <p>{{ \'bills.preparation.details.templates.description\' | translate }}</p>\n        <document-item *ngIf="details.templates.report" [document]="details.templates.report"></document-item>\n      </div>\n    </ion-item>\n\n    <ion-item *ngFor="let type of [\'report\', \'picture-documentation\']" text-wrap class="docs">\n      <h5 head-5>{{ \'bills.preparation.details.\' + type + \'.headline\' | translate }}</h5>\n      <document-item *ngIf="details.reports && details.reports[type]" [document]="details.reports[type]" [attr.action]="!details.reports[type].approval || details.reports[type].approval.state !== \'accepted\' ? \'remove\' : \'\'" (remove)="onRemove($event, type)"></document-item>\n      <file-upload *ngIf="!details.reports[type] || !details.reports[type].approval || details.reports[type].approval.state !== \'accepted\'" (uploaded)="onReportUpload($event, type)" [button]="details.reports[type] ? \'optional\' : \'\'"\n        [label]="\'bills.preparation.details.\' + type + \'.\' + (details.reports[type] ? \'update\' : \'upload\')">\n      </file-upload>\n    </ion-item>\n\n    <ion-item *ngIf="details.saleslots && details.saleslots.length" text-wrap no-lines class="docs">\n      <h5 head-5>{{ \'bills.preparation.details.revenue.headline\' | translate }}</h5>\n      <div>\n        <p *ngIf="details.revenue" float-left>{{ \'bills.preparation.details.revenue.total\' | translate }}: {{ details.revenue.sum  | toCurrency }}</p>\n        <p *ngIf="!details.revenue" float-left>{{ \'bills.preparation.details.revenue.none\' | translate }}</p>\n        <button ion-button color="default" icon-only float-right outline (click)="editRevenue()" [ngClass]="{ optional: details.revenue }">\n          <ion-icon [name]="details.revenue ? \'create\' : \'add\'"></ion-icon>\n        </button>\n      </div>\n    </ion-item>\n\n    <ion-item *ngIf="details.reports" text-wrap no-lines>\n      <button color="button-primary" ion-button full solid strong navPop>\n        {{ \'bills.preparation.details.close\' | translate }}\n      </button>\n    </ion-item>\n\n  </ng-container>\n\n  <ion-item *ngIf="!details.fetched" center>\n    <ion-spinner></ion-spinner>\n  </ion-item>\n\n</ion-content>\n'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/bills/preparation/preparation.details.html"*/,
            selector: 'preparation-details',
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* ViewController */], __WEBPACK_IMPORTED_MODULE_3__components_details__["a" /* DetailsController */],
            __WEBPACK_IMPORTED_MODULE_7__preparation_service__["a" /* PreparationService */], __WEBPACK_IMPORTED_MODULE_4__components_notify__["a" /* NotifyController */], __WEBPACK_IMPORTED_MODULE_6__components_confirm__["a" /* ConfirmController */]])
    ], PreparationDetails);
    return PreparationDetails;
}());

//# sourceMappingURL=preparation.details.js.map

/***/ }),

/***/ 176:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InvoicesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__base_page__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_details__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_loading__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_api__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__invoices_service__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__invoice_details__ = __webpack_require__(177);
/* tslint:disable:no-access-missing-member due to inheritance */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var InvoicesPage = /** @class */ (function (_super) {
    __extends(InvoicesPage, _super);
    function InvoicesPage(translate, loading, user, renderer, details, invoices, nav) {
        var _this = _super.call(this, translate, loading, renderer, user) || this;
        _this.translate = translate;
        _this.loading = loading;
        _this.user = user;
        _this.renderer = renderer;
        _this.details = details;
        _this.invoices = invoices;
        _this.nav = nav;
        _this.initFilters();
        return _this;
    }
    InvoicesPage.prototype.initFilters = function () {
        this.filters = {
            search: { type: 'search', set: '' },
            state: { type: 'select', set: undefined, none: true, options: 'bills.invoices.states' },
            dates: { type: 'daterange', set: { start: null, end: null } },
        };
    };
    InvoicesPage.prototype.fetch = function (loaded, load) {
        var _this = this;
        if (load === void 0) { load = 10; }
        var offset = loaded && loaded.length;
        return this.invoices.list(this.profile.roleId(), offset, load, this.filtered).then(function (invoices) { return _this.setItems(loaded, invoices); });
    };
    InvoicesPage.prototype.doRefresh = function (refresher) {
        _super.prototype.doRefresh.call(this, refresher);
    };
    /**
     * Shows details
     */
    InvoicesPage.prototype.showDetails = function (invoice) {
        var _this = this;
        var modal;
        modal = this.details.open(__WEBPACK_IMPORTED_MODULE_8__invoice_details__["a" /* InvoiceDetails */], { invoice: invoice, profile: this.profile });
        modal.onDidDismiss(function (data) { return _this.doRefresh(data); });
        return modal;
    };
    /**
     * Switch to create invoice tab
     */
    InvoicesPage.prototype.createInvoice = function () {
        this.nav.parent.select(2);
    };
    InvoicesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-invoices',template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/bills/invoices/invoices.page.html"*/'<ion-content>\n  <ion-refresher (ionRefresh)="doRefresh($event);" #refresher [enabled]="!filterOpened">\n    <ion-refresher-content pulling-icon="ion-arrow-down-b positive" spinner="crescent" pullingText="{{ \'common.pull-to-refresh\' | translate }}"\n      refreshingText="{{ \'common.refreshing\' | translate }}">\n    </ion-refresher-content>\n  </ion-refresher>\n\n  <filter-bar [filters]="filters" context="bills.invoices" (on-apply)="filter($event)" (filter-opened)="onFilterOpened($event)"></filter-bar>\n\n  <ion-list no-lines *ngIf="items && items.length">\n    <invoice-item *ngFor="let entry of items" [invoice]="entry" (click)="showDetails(entry)"></invoice-item>\n    <ion-infinite-scroll (ionInfinite)="$event.waitFor(fetch(items, 10))" [enabled]="moreItems">\n      <ion-infinite-scroll-content loadingSpinner="crescent" loadingText="{{ \'common.fetching-data\' | translate }}">\n      </ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n  </ion-list>\n\n  <nothing-found *ngIf="items && !items.length" context="bills.invoices.nothing-found" redirect="bills:invoice"></nothing-found>\n</ion-content>'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/bills/invoices/invoices.page.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["d" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_5__components_loading__["a" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_6__components_api__["f" /* ApiUserService */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer2"], __WEBPACK_IMPORTED_MODULE_4__components_details__["a" /* DetailsController */], __WEBPACK_IMPORTED_MODULE_7__invoices_service__["a" /* InvoicesService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */]])
    ], InvoicesPage);
    return InvoicesPage;
}(__WEBPACK_IMPORTED_MODULE_3__base_page__["a" /* BasePage */]));

//# sourceMappingURL=invoices.page.js.map

/***/ }),

/***/ 177:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InvoiceDetails; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_details__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__create_invoice_details__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__invoices_service__ = __webpack_require__(49);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var InvoiceDetails = /** @class */ (function () {
    function InvoiceDetails(params, view, invoices, modal) {
        var _this = this;
        this.params = params;
        this.view = view;
        this.invoices = invoices;
        this.modal = modal;
        this.details = this.params.get('invoice');
        this.profile = this.params.get('profile');
        this.invoices.get(this.profile.roleId(), this.details.id).then(function (invoice) {
            _this.details = invoice;
            _this.assignmentsPrepared = !invoice.assignments.some(function (assignment) {
                return !assignment.has_invoice_requirements;
            });
        });
    }
    InvoiceDetails.prototype.editInvoice = function () {
        var _this = this;
        // workaround for non-blocking submit-validator
        if (!this.assignmentsPrepared) {
            return;
        }
        var modal;
        modal = this.modal.open(__WEBPACK_IMPORTED_MODULE_3__create_invoice_details__["a" /* CreateInvoiceDetailsPage */], { invoice: this.details, profile: this.profile });
        modal.onDidDismiss(function (data) { return _this.onCreateDismissed(data); });
        return modal;
    };
    InvoiceDetails.prototype.onCreateDismissed = function (data) {
        var _this = this;
        if (data) {
            this.invoices.get(this.profile.roleId(), data.id).then(function (updated) {
                _this.details = updated;
            });
        }
    };
    InvoiceDetails = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/bills/invoices/invoice.details.html"*/'<ion-content padding text-wrap>\n  <button-back label="bills.invoices.back"></button-back>\n\n  <ion-item class="head">\n    <h2 head-2>{{ \'bills.invoice.title.details\' | translate }}</h2>\n  </ion-item>\n\n  <ion-item *ngIf="details.state === \'rejected\'" class="head rejected">\n    <h5 head-5>{{ \'bills.invoice.rejected.headline\' | translate }}</h5>\n    <p [innerHTML]="\'bills.invoice.rejected.hint-invoice\' | translate | nl2br" *ngIf="assignmentsPrepared && details.state === \'rejected\'"></p>\n    <p [innerHTML]="\'bills.invoice.rejected.hint-preparation\' | translate | nl2br" *ngIf="assignmentsPrepared === false"></p>\n    <button ion-button block clear color="button-default" tabSwitch="bills:preparation" dismissModal="true" *ngIf="assignmentsPrepared === false">\n      {{ \'bills.invoice.rejected.button\' | translate }}\n    </button>\n  </ion-item>\n\n  <ion-item class="head">\n    <h5 head-5>{{ \'bills.invoice.number\' | translate }}</h5>\n    <p>{{ details.number }}</p>\n  </ion-item>\n\n  <ion-item class="head">\n    <h5 head-5>{{ \'bills.invoice.total\' | translate }}</h5>\n    <span class="total_sconto_hint" *ngIf="details.with_discount === \'true\'">{{ \'bills.invoice.total-sconto-hint\' | translate }}</span>\n    <p>\n      {{ details.total | toCurrency }}\n    </p>\n  </ion-item>\n\n  <ion-item class="head">\n    <h5 head-5>{{ \'bills.invoice.issued-at\' | translate }}</h5>\n    <p>{{ details.issued_at | amDateFormat : \'DD-MM-YYYY\' }}</p>\n  </ion-item>\n\n  <ion-item class="head">\n    <h5 head-5>{{ \'bills.invoice.status.label\' | translate }}</h5>\n    <p>\n      {{ \'bills.invoice.status.\' + details.state | translate }}\n      <span *ngIf="details.state === \'rejected\'">({{ details.approval.comment }})</span>\n    </p>\n  </ion-item>\n\n  <ion-item class="head">\n    <h5 head-5>{{ \'bills.invoice.comment\' | translate }}</h5>\n    <p>{{ details.comment }}</p>\n  </ion-item>\n\n  <ion-item text-wrap class="docs">\n    <h5 head-5>\n      {{ \'bills.invoice.document\' | translate }}\n    </h5>\n    <ng-container *ngIf="details.document">\n      <document-item *ngIf="details.document.data" [document]="details.document.data" no-lines></document-item>\n    </ng-container>\n    <ion-spinner *ngIf="!details.document" center></ion-spinner>\n  </ion-item>\n\n  <ion-item text-wrap no-lines *ngIf="details.assignments">\n    <h5 head-5>\n      {{ \'bills.invoice.assignments\' | translate }}\n    </h5>\n    <ion-item *ngFor="let assignment of details.assignments">\n      <p>{{ assignment.start_at | amDateFormat : \'DD.MM.YYYY\' }}</p>\n      <ion-icon name="warning" item-end *ngIf="details.state === \'rejected\' && !assignment.has_invoice_requirements"></ion-icon>\n    </ion-item>\n  </ion-item>\n\n  <submit-validator context="bills.invoice" [check]="{\n    assignments: assignmentsPrepared\n  }">\n  </submit-validator>\n  <button ion-button block color="button-primary" type="button" (click)="editInvoice()" *ngIf="details.state === \'rejected\'">\n    {{ \'bills.invoice.edit\' | translate }}\n  </button>\n</ion-content>\n'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/bills/invoices/invoice.details.html"*/,
            selector: 'invoice-details',
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* ViewController */], __WEBPACK_IMPORTED_MODULE_4__invoices_service__["a" /* InvoicesService */], __WEBPACK_IMPORTED_MODULE_2__components_details__["a" /* DetailsController */]])
    ], InvoiceDetails);
    return InvoiceDetails;
}());

//# sourceMappingURL=invoice.details.js.map

/***/ }),

/***/ 178:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateInvoiceDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_confirm__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_collection__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_details__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__invoices_service__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__generate_invoice_details__ = __webpack_require__(485);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var CreateInvoiceDetailsPage = /** @class */ (function () {
    function CreateInvoiceDetailsPage(params, view, invoices, confirm, details, currency) {
        var _this = this;
        this.params = params;
        this.view = view;
        this.invoices = invoices;
        this.confirm = confirm;
        this.details = details;
        this.currency = currency;
        this.document = undefined;
        this.processing = false;
        this.invoice = { assignment_ids: [] };
        this.selected = [];
        this.profile = this.params.get('profile');
        this.job = this.params.get('job');
        // if job is not present, then assume edit mode
        if (!this.job) {
            this.invoice = this.params.get('invoice');
            this.job = this.invoice.job;
            // initially set to own as document generated
            this.upload = 'own';
            // fetch assignment ids
            this.selected = __WEBPACK_IMPORTED_MODULE_4__utils_collection__["a" /* Collection */].ids(this.invoice.assignments);
            // assign already invoiced assignments to job
            this.job.assignments = this.invoice.assignments;
            // fetch job with new invoiceable assignments
            this.invoices.job(this.profile.roleId(), this.invoice.job.id, 'invoiceable').then(function (job) {
                // merge both invoiced + invoiceable assignments
                _this.job.assignments = _this.job.assignments.concat(job.assignments);
            });
            // update document
            this.document = this.invoice.document.data;
        }
        this.invoice.issued_at = (this.invoice.issued_at && new Date(this.invoice.issued_at) || new Date()).toISOString();
        // actions for assignment select
        this.summary = {
            info: function (assignment) { return _this.summaryInfo(assignment); },
        };
    }
    CreateInvoiceDetailsPage.prototype.onUpload = function (document) {
        this.document = document;
        this.invoice.document = document;
        this.invoice.document_id = document.id;
    };
    CreateInvoiceDetailsPage.prototype.onSubmit = function () {
        var _this = this;
        this.invoice.assignment_ids = this.selected;
        this.processing = true;
        this.invoices.submit(this.invoice, this.profile.roleId()).then(function () {
            // job for create; invoice for edit
            _this.view.dismiss(_this.invoice.id ? _this.invoice : _this.job);
        }).catch(function () { return _this.processing = false; });
    };
    CreateInvoiceDetailsPage.prototype.onGenerate = function () {
        var _this = this;
        var params = { assignments: this.job.assignments, selected: this.selected, profile: this.profile, invoice: this.invoice };
        var modal = this.details.open(__WEBPACK_IMPORTED_MODULE_7__generate_invoice_details__["a" /* GenerateInvoiceDetailsPage */], params);
        modal.onDidDismiss(function (updated) {
            if (updated) {
                // merge data with original
                __WEBPACK_IMPORTED_MODULE_4__utils_collection__["a" /* Collection */].merge(_this.job.assignments, updated.assignments);
                _this.invoice.total = updated.total.gross;
                _this.invoice.net_total = updated.total.net;
                _this.invoice.generated = true;
                _this.onUpload(updated.document);
            }
        });
    };
    CreateInvoiceDetailsPage.prototype.checkSelectedAssignments = function () {
        var _this = this;
        if (this.selected.length > 0) {
            var validSelected = this.job.assignments.filter(function (assignment) {
                return _this.selected.includes(assignment.id) && assignment.has_invoice_requirements;
            });
            return validSelected.length === this.selected.length;
        }
        return undefined;
    };
    CreateInvoiceDetailsPage.prototype.info = function (ref) {
        this.confirm.create({
            context: 'bills.invoice',
            message: ref + '.hint',
            cancel: true
        }).present();
    };
    CreateInvoiceDetailsPage.prototype.summaryInfo = function (assignment) {
        return assignment.costs_summary && this.currency.transform(assignment.costs_summary, 'EUR', true) || '';
    };
    CreateInvoiceDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'create-invoice-details',template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/bills/invoices/create.invoice.details.html"*/'<ion-content padding>\n  <button-back label="bills.invoice.back"></button-back>\n\n  <ion-item class="head" no-lines>\n    <h2 head-2>{{ \'bills.invoice.title.\' + (invoice.id ? \'edit\' : \'create\') | translate }}</h2>\n  </ion-item>\n\n  <form #form="ngForm" (ngSubmit)="upload === \'generated\' && !invoice.generated ? onGenerate() : onSubmit()">\n    <ion-item class="head">\n      <ion-label floating>\n        <ion-icon name="card"></ion-icon>\n        {{ \'bills.invoice.number\' | translate }}\n      </ion-label>\n      <ion-input type="text" [(ngModel)]="invoice.number" name="number" [disabled]="invoice.generated" required></ion-input>\n    </ion-item>\n\n    <ion-item class="head">\n      <ion-label floating>\n        <ion-icon name="calendar"></ion-icon>\n        {{ \'bills.invoice.issued-at\' | translate }}\n      </ion-label>\n      <ion-datetime displayFormat="DD-MM-YYYY" [(ngModel)]="invoice.issued_at" name="issued_at"\n        [doneText]="\'done\' | translate" [cancelText]="\'cancel\' | translate" disabled>\n      </ion-datetime>\n    </ion-item>\n\n    <ion-list radio-group [(ngModel)]="invoice.includes_taxes" name="includes_taxes" required>\n      <ion-row>\n        <ion-item no-lines>\n          {{ \'bills.invoice.tax.label\' | translate }}\n          <ion-icon item-end name="information-circle" color="primary" tappable (click)="info(\'tax\')"></ion-icon>\n        </ion-item>\n      </ion-row>\n      <ion-row>\n        <ion-col no-padding>\n          <ion-item no-lines>\n            <ion-label>{{ \'bills.invoice.tax.with\' | translate }}</ion-label>\n            <ion-radio item-left value="true" [disabled]="invoice.generated" mode="md"></ion-radio>\n          </ion-item>\n        </ion-col>\n        <ion-col no-padding>\n          <ion-item no-lines>\n            <ion-label>{{ \'bills.invoice.tax.without\' | translate }}</ion-label>\n            <ion-radio item-left value="false" [disabled]="invoice.generated" mode="md"></ion-radio>\n          </ion-item>\n        </ion-col>\n      </ion-row>\n    </ion-list>\n\n    <ion-item>\n      <ion-label>{{ \'bills.invoice.discount.label\' | translate }}</ion-label>\n      <ion-toggle [(ngModel)]="invoice.with_discount" name="with_discount" [disabled]="invoice.generated"></ion-toggle>\n      <ion-icon item-end name="information-circle" color="primary" (click)="info(\'discount\')"></ion-icon>\n    </ion-item>\n\n    <ion-item class="head">\n      <ion-label floating>{{ \'bills.invoice.comment\' | translate }}</ion-label>\n      <ion-textarea [(ngModel)]="invoice.comment" name="comment"></ion-textarea>\n    </ion-item>\n\n    <ion-item class="docs" no-lines>\n      <h5 head-5>{{ \'bills.invoice.document\' | translate }}</h5>\n    </ion-item>\n\n    <ion-list class="generate" no-lines radio-group required [(ngModel)]="upload" name="upload">\n      <ion-row>\n        <ion-col no-padding col-6>\n          <ion-item text-wrap>\n            <ion-label>{{ \'bills.invoice.upload.generate\' | translate }}</ion-label>\n            <ion-radio item-left value="generated" [disabled]="invoice.generated" mode="md"></ion-radio>\n          </ion-item>\n        </ion-col>\n        <ion-col no-padding col-6>\n          <ion-item text-wrap>\n            <ion-label>{{ \'bills.invoice.upload.own\' | translate }}</ion-label>\n            <ion-radio item-left value="own" [disabled]="invoice.generated" mode="md"></ion-radio>\n          </ion-item>\n        </ion-col>\n      </ion-row>\n    </ion-list>\n\n    <ion-item *ngIf="upload === \'own\' || document" text-wrap no-lines>\n      <document-item *ngIf="document" [document]="document"></document-item>\n      <file-upload *ngIf="upload === \'own\'" (uploaded)="onUpload($event)" [button]="document ? \'optional\' : \'\'" [label]="\'bills.invoice.upload.button\'">\n      </file-upload>\n    </ion-item>\n\n    <ion-item text-wrap>\n      <h5 head-5>{{ \'bills.invoice.assignments\' | translate }}</h5>\n      <assignment-select [(selected)]="selected" [assignments]="job.assignments" [action]="summary" [disabled]="invoice.generated">\n      </assignment-select>\n    </ion-item>\n\n    <ion-item class="head sum" *ngIf="upload === \'own\' || invoice.generated">\n      <ion-label floating>\n        <ion-icon name="logo-euro"></ion-icon>{{ \'bills.invoice.total\' | translate }}\n      </ion-label>\n      <ion-input type="number" [(ngModel)]="invoice.total" name="total"\n         validateCurrency\n         [required]="upload === \'own\'" [disabled]="upload === \'generated\'">\n      </ion-input>\n    </ion-item>\n\n    <submit-validator context="bills.invoice" [form]="form" [check]="{\n        validity: form.value,\n        document: upload === \'own\' ? invoice.document_id > 0 : undefined,\n        selected: selected ? selected.length > 0 : undefined,\n        assignments: checkSelectedAssignments()\n      }">\n    </submit-validator>\n    <button ion-button full color="button-primary" type="button" [disabled]="processing">\n      {{ \'bills.invoice.buttons.\' + (upload === \'generated\' && !invoice.generated ? \'generate\' : \'submit\') | translate }}\n    </button>\n  </form>\n</ion-content>\n'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/bills/invoices/create.invoice.details.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["p" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["v" /* ViewController */], __WEBPACK_IMPORTED_MODULE_6__invoices_service__["a" /* InvoicesService */], __WEBPACK_IMPORTED_MODULE_3__components_confirm__["a" /* ConfirmController */],
            __WEBPACK_IMPORTED_MODULE_5__components_details__["a" /* DetailsController */], __WEBPACK_IMPORTED_MODULE_1__angular_common__["CurrencyPipe"]])
    ], CreateInvoiceDetailsPage);
    return CreateInvoiceDetailsPage;
}());

//# sourceMappingURL=create.invoice.details.js.map

/***/ }),

/***/ 179:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PushService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_push__ = __webpack_require__(488);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_device__ = __webpack_require__(489);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__notify__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_api__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_app_config__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * @name PushService
 * @description
 * A PushService is a for enabling push notifications
 *
 * @usage
 * ```ts
 * import { PushService } from '../components/push';
 *
 * constructor(private push: PushService) {
 * }
 *
 *
 */
var PushService = /** @class */ (function () {
    function PushService(device, api, storage, notify, push, user, translate) {
        this.device = device;
        this.api = api;
        this.storage = storage;
        this.notify = notify;
        this.push = push;
        this.user = user;
        this.translate = translate;
        // default options
        this.options = {
            android: {},
            ios: { alert: true, badge: true, sound: true },
        };
    }
    /**
     * Inits service
     *
     * @param handlers Handlers for notification action (button tapped)
     */
    PushService.prototype.init = function (handlers) {
        var _this = this;
        // set
        this.handlers = handlers;
        // then flow by user
        this.user.current().then(function (data) {
            _this.profile = data;
            // init to take permissions first time
            _this.options = { android: {}, ios: {} };
            _this.messages = _this.push.init(_this.options);
            // then register
            _this.storage.get('notifications').then(function (settings) {
                // if settings not stored yet - take and store default (waiting for storing as used later)
                if (!settings) {
                    settings = __WEBPACK_IMPORTED_MODULE_7__app_app_config__["a" /* appConfig */].notifications.defaultEnabled;
                    return _this.storage.set('notifications', settings);
                }
                else {
                    return Promise.resolve(settings);
                }
            }).then(function () {
                // register in any case - to be ready if user allow permission
                _this.registerHandlers();
                // then check to notify (if any settings exists)
                _this.push.hasPermission().then(function (permission) {
                    if (!permission.isEnabled) {
                        _this.notify.present(_this.translate.instant('push.no-permission'));
                    }
                });
            });
        });
    };
    /**
     * Registers on FCM side, then API
     */
    PushService.prototype.registerHandlers = function () {
        var _this = this;
        this.messages.on('registration').subscribe(function (res) {
            return _this.storage.set('notificationsRegistrationId', res.registrationId).then(function () { return _this.registerAPI(); });
        });
        this.messages.on('notification').subscribe(function (notification) {
            var type = notification.additionalData.type;
            _this.notify.action(notification.message, 'push.button.open', function () {
                if (_this.handlers[type]) {
                    _this.handlers[type](Object.assign(notification, { type: type }));
                }
            });
        });
    };
    /**
     * Registers on API (unregister if nothing set)
     */
    PushService.prototype.registerAPI = function () {
        var _this = this;
        return this.storage.get('notifications').then(function (settings) {
            return _this.storage.get('notificationsRegistrationId').then(function (token) {
                if (_this.profile) {
                    settings = settings || [];
                    if (settings.length) {
                        var params = { id: _this.profile.id(), device_id: _this.device.uuid, device_token: token, notifications: settings };
                        return _this.api.promised(_this.api.registerDevice(params));
                    }
                    else {
                        var params = { id: _this.profile.id(), device_id: _this.device.uuid };
                        return _this.api.promised(_this.api.unregisterDevice(params));
                    }
                }
            });
        });
    };
    /**
     * Unregister on FCM and API
     */
    PushService.prototype.unregister = function () {
        var _this = this;
        return this.messages.unregister().then(function () {
            return _this.storage.remove('notifications').then(function () {
                if (!(_this.device && _this.device.uuid)) {
                    return Promise.resolve(true);
                }
                var params = { id: _this.profile.id(), device_id: _this.device.uuid };
                return _this.api.promised(_this.api.unregisterDevice(params));
            });
        });
    };
    /**
     * Updates API
     */
    PushService.prototype.update = function () {
        var _this = this;
        return this.storage.get('notifications').then(function (settings) {
            return _this.storage.get('notificationsRegistrationId').then(function (token) {
                if (!token) {
                    return Promise.resolve(true);
                }
                var params = { id: _this.profile.id(), device_id: _this.device.uuid, device_token: token, notifications: settings };
                settings = settings || [];
                return _this.api.promised(_this.api.updateDevice(params));
            });
        });
    };
    /**
     * Checks if notification type is subscribed
     */
    PushService.prototype.isSubscribed = function (type) {
        return this.storage.get('notifications').then(function (settings) {
            return settings && settings.includes(type);
        });
    };
    /**
     * Set notification type on/off
     *
     * @param type Notification type
     * @param status Set status
     */
    PushService.prototype.set = function (type, status) {
        var _this = this;
        this.storage.get('notifications').then(function (settings) {
            var set = settings || [];
            if (status) {
                if (!set.includes(type)) {
                    set.push(type);
                }
            }
            else {
                set.splice(set.indexOf(type), 1);
            }
            _this.storage.set('notifications', set).then(function () {
                // if any set - depending on previous - register or update
                if (set.length) {
                    if (!settings) {
                        _this.registerHandlers();
                    }
                    else {
                        _this.update();
                    }
                }
                else {
                    // unregister otherwise
                    _this.unregister();
                }
            });
        });
    };
    PushService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__ionic_native_device__["a" /* Device */], __WEBPACK_IMPORTED_MODULE_6__components_api__["g" /* NewApiService */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_5__notify__["a" /* NotifyController */], __WEBPACK_IMPORTED_MODULE_1__ionic_native_push__["a" /* Push */],
            __WEBPACK_IMPORTED_MODULE_6__components_api__["f" /* ApiUserService */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["d" /* TranslateService */]])
    ], PushService);
    return PushService;
}());

//# sourceMappingURL=push.service.js.map

/***/ }),

/***/ 18:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__loading_module__ = __webpack_require__(633);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__loading_controller__ = __webpack_require__(456);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__loading_module__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__loading_controller__["a"]; });
/* unused harmony reexport Loading */




//# sourceMappingURL=index.js.map

/***/ }),

/***/ 180:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PushModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__push_service__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_push__ = __webpack_require__(488);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__push_notify_toggle__ = __webpack_require__(669);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_device__ = __webpack_require__(489);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var PushModule = /** @class */ (function () {
    function PushModule() {
    }
    PushModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */],
                __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateModule */],
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__push_notify_toggle__["a" /* PushNotifyToggle */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_push__["a" /* Push */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_device__["a" /* Device */],
                __WEBPACK_IMPORTED_MODULE_2__push_service__["a" /* PushService */],
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_4__push_notify_toggle__["a" /* PushNotifyToggle */],
            ]
        })
    ], PushModule);
    return PushModule;
}());

//# sourceMappingURL=push.module.js.map

/***/ }),

/***/ 181:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_file_transfer__ = __webpack_require__(494);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file__ = __webpack_require__(496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_opener__ = __webpack_require__(495);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__document_item__ = __webpack_require__(492);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__files_service__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__picture_load_directive__ = __webpack_require__(497);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__file_upload__ = __webpack_require__(675);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__approval_icon__ = __webpack_require__(676);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__approval_info__ = __webpack_require__(677);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pipes_pipes_module__ = __webpack_require__(72);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var FilesModule = /** @class */ (function () {
    function FilesModule() {
    }
    FilesModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */],
                __WEBPACK_IMPORTED_MODULE_12__pipes_pipes_module__["a" /* PipesModule */],
                __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateModule */],
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__document_item__["a" /* DocumentItem */],
                __WEBPACK_IMPORTED_MODULE_8__picture_load_directive__["a" /* PictureLoadDirective */],
                __WEBPACK_IMPORTED_MODULE_9__file_upload__["a" /* FileUpload */],
                __WEBPACK_IMPORTED_MODULE_10__approval_icon__["a" /* ApprovalIcon */],
                __WEBPACK_IMPORTED_MODULE_11__approval_info__["a" /* ApprovalInfo */],
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_6__document_item__["a" /* DocumentItem */],
                __WEBPACK_IMPORTED_MODULE_8__picture_load_directive__["a" /* PictureLoadDirective */],
                __WEBPACK_IMPORTED_MODULE_9__file_upload__["a" /* FileUpload */],
                __WEBPACK_IMPORTED_MODULE_10__approval_icon__["a" /* ApprovalIcon */],
                __WEBPACK_IMPORTED_MODULE_11__approval_info__["a" /* ApprovalInfo */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_7__files_service__["a" /* FilesService */],
                __WEBPACK_IMPORTED_MODULE_2__ionic_native_file_transfer__["a" /* FileTransfer */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_opener__["a" /* FileOpener */],
            ],
        })
    ], FilesModule);
    return FilesModule;
}());

//# sourceMappingURL=files.module.js.map

/***/ }),

/***/ 182:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__filter_module__ = __webpack_require__(498);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__filter_bar__ = __webpack_require__(499);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__filter_module__["a"]; });
/* unused harmony reexport FilterBar */



//# sourceMappingURL=index.js.map

/***/ }),

/***/ 183:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JobsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_moment__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_pipes__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_nl2br_pipe__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pipes_pipes_module__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_navigation__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_details__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_loading__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_notify__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_filter__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__jobs_page__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__jobs_main_page__ = __webpack_require__(487);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__job_card__ = __webpack_require__(688);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__tender_item__ = __webpack_require__(689);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__jobs_operations__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__jobs_service__ = __webpack_require__(466);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__job_details__ = __webpack_require__(468);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



















var Components = [
    __WEBPACK_IMPORTED_MODULE_12__jobs_page__["a" /* JobsPage */],
    __WEBPACK_IMPORTED_MODULE_14__job_card__["a" /* JobCard */],
    __WEBPACK_IMPORTED_MODULE_15__tender_item__["a" /* TenderItem */],
    __WEBPACK_IMPORTED_MODULE_18__job_details__["a" /* JobDetailsModal */],
    __WEBPACK_IMPORTED_MODULE_13__jobs_main_page__["a" /* JobsMainPage */]
];
var JobsModule = /** @class */ (function () {
    function JobsModule() {
    }
    JobsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: Components,
            entryComponents: Components,
            exports: Components,
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_13__jobs_main_page__["a" /* JobsMainPage */]),
                __WEBPACK_IMPORTED_MODULE_3_angular2_moment__["MomentModule"],
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_4_ngx_pipes__["b" /* NgObjectPipesModule */],
                __WEBPACK_IMPORTED_MODULE_5_nl2br_pipe__["a" /* Nl2BrPipeModule */],
                __WEBPACK_IMPORTED_MODULE_7__components_navigation__["a" /* NavigationModule */],
                __WEBPACK_IMPORTED_MODULE_8__components_details__["b" /* DetailsModule */],
                __WEBPACK_IMPORTED_MODULE_9__components_loading__["b" /* LoadingModule */],
                __WEBPACK_IMPORTED_MODULE_10__components_notify__["b" /* NotifyModule */],
                __WEBPACK_IMPORTED_MODULE_11__components_filter__["a" /* FilterModule */],
                __WEBPACK_IMPORTED_MODULE_6__pipes_pipes_module__["a" /* PipesModule */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_16__jobs_operations__["b" /* JobsOperations */],
                __WEBPACK_IMPORTED_MODULE_17__jobs_service__["a" /* JobsService */],
            ],
        })
    ], JobsModule);
    return JobsModule;
}());

//# sourceMappingURL=jobs.module.js.map

/***/ }),

/***/ 185:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export AssignmentState */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AssignmentOperations; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_social_sharing__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_call_number__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_api__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_details__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_confirm__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_loading__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_navigation__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__bills_preparation_preparation_service__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__bills_preparation_preparation_details__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__bills_invoices_invoices_service__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__bills_invoices_invoice_details__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__assignment_details__ = __webpack_require__(505);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__assignments_service__ = __webpack_require__(71);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

















var AssignmentState;
(function (AssignmentState) {
    AssignmentState[AssignmentState["Coming"] = 0] = "Coming";
    AssignmentState[AssignmentState["Available"] = 1] = "Available";
    AssignmentState[AssignmentState["Late"] = 2] = "Late";
    AssignmentState[AssignmentState["CheckedIn"] = 3] = "CheckedIn";
    AssignmentState[AssignmentState["CheckedOut"] = 4] = "CheckedOut";
    AssignmentState[AssignmentState["Prepared"] = 5] = "Prepared";
    AssignmentState[AssignmentState["Invoiced"] = 6] = "Invoiced";
    AssignmentState[AssignmentState["Done"] = 7] = "Done";
})(AssignmentState || (AssignmentState = {}));
/**
 *
 */
var AssignmentOperations = /** @class */ (function () {
    function AssignmentOperations(details, actions, social, translate, confirm, assignments, preparations, invoices, user, loading, tabs, caller) {
        var _this = this;
        this.details = details;
        this.actions = actions;
        this.social = social;
        this.translate = translate;
        this.confirm = confirm;
        this.assignments = assignments;
        this.preparations = preparations;
        this.invoices = invoices;
        this.user = user;
        this.loading = loading;
        this.tabs = tabs;
        this.caller = caller;
        this.available = {
            whatsapp: false
        };
        // check availability
        this.social.canShareVia('whatsapp').then(function () { return _this.available.whatsapp = true; });
    }
    AssignmentOperations.prototype.showDetails = function (tender) {
        return this.details.open(__WEBPACK_IMPORTED_MODULE_15__assignment_details__["a" /* AssignmentDetailsModal */], { tender: tender });
    };
    AssignmentOperations.prototype.makeCall = function (num) {
        return this.caller.callNumber(num, false);
    };
    AssignmentOperations.prototype.getStatus = function (tender) {
        var status = {
            header: 'today',
            button: 'check-in',
            state: AssignmentState.Coming,
            class: {
                today: __WEBPACK_IMPORTED_MODULE_5_moment__().isSame(tender.start_at, 'day'),
                available: __WEBPACK_IMPORTED_MODULE_5_moment__().isBetween(tender.checkin.available, tender.checkin.late),
                delayed: !tender.checkin.done && __WEBPACK_IMPORTED_MODULE_5_moment__().isBetween(tender.start_at, tender.checkin.late),
                late: !tender.checkin.done && __WEBPACK_IMPORTED_MODULE_5_moment__().isAfter(tender.checkin.late),
                checkedin: tender.checkin.done,
                checkedout: tender.checkout.done,
                prepared: tender.has_invoice_requirements,
                invoiced: tender.state === 'invoiced',
                done: tender.checkout.done && !tender.is_prepareable && tender.state !== 'invoiced',
            },
        };
        if (status.class.done) {
            status.header = 'done';
            status.button = 'done'; // hidden
            status.state = AssignmentState.Done;
        }
        else if (status.class.prepared) {
            status.header = 'prepared';
            status.button = 'create-invoice';
            status.state = AssignmentState.Prepared;
        }
        else if (status.class.checkedout) {
            status.header = 'checkedout';
            status.button = 'upload-report';
            status.state = AssignmentState.CheckedOut;
        }
        else if (status.class.checkedin) {
            status.header = 'checkedin';
            status.button = 'check-out';
            status.state = AssignmentState.CheckedIn;
        }
        else if (status.class.available) {
            status.header = 'now';
            status.button = 'check-in';
            status.state = AssignmentState.Available;
        }
        else if (status.class.late) {
            status.header = 'late';
            status.button = 'late-check-in';
            status.state = AssignmentState.Late;
        }
        return status;
    };
    AssignmentOperations.prototype.action = function (tender, status) {
        switch (status.state) {
            case AssignmentState.Done: {
                // nothing to do here
                return Promise.resolve(true);
            }
            case AssignmentState.Available: {
                return this.checkIn(tender);
            }
            case AssignmentState.Late: {
                return this.lateCheckIn(tender);
            }
            case AssignmentState.CheckedIn: {
                return this.checkOut(tender);
            }
            case AssignmentState.CheckedOut: {
                return this.reportAssignment(tender);
            }
            case AssignmentState.Prepared: {
                return this.createInvoice();
            }
            case AssignmentState.Invoiced: {
                return this.invoiceDetails(tender);
            }
            default: {
                return Promise.reject(false);
            }
        }
    };
    AssignmentOperations.prototype.checkIn = function (tender) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.confirm.create({
                context: 'assignments',
                title: 'check-in.title',
                message: 'check-in.message',
                item: tender,
                confirm: true,
                cancel: true,
                onConfirm: function () { return _this.onCheckinConfirm(tender).then(resolve, reject); },
                onCancel: function () { return reject(); }
            }).present();
        });
    };
    AssignmentOperations.prototype.lateCheckIn = function (tender) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.actions.create({
                title: _this.trans('late-check-in.title'),
                subTitle: _this.trans('late-check-in.message', tender),
                buttons: [{
                        text: _this.trans('late-check-in.via-sms.button'),
                        icon: 'text',
                        handler: function () { return _this.onShareSmsConfirm(tender, resolve, reject); },
                    }, {
                        text: _this.trans('late-check-in.via-whatsapp.button'),
                        icon: 'whatsapp',
                        cssClass: !_this.available.whatsapp && 'disabled',
                        handler: function () { return _this.onShareWhatsappConfirm(tender, resolve, reject); },
                    }, {
                        text: _this.translate.instant('buttons.cancel'),
                        role: 'cancel',
                        handler: function () { return reject(); },
                    }],
            }).present();
        });
    };
    AssignmentOperations.prototype.checkOut = function (tender) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.confirm.create({
                context: 'assignments',
                title: 'check-out.title',
                message: 'check-out.message',
                item: tender,
                confirm: true,
                cancel: true,
                onConfirm: function () { return _this.onCheckoutConfirm(tender).then(resolve, reject); },
                onCancel: function () { return reject(); }
            }).present();
        });
    };
    AssignmentOperations.prototype.reportAssignment = function (tender) {
        var _this = this;
        return new Promise(function (resolve) {
            var fetching = _this.loading.create('common.fetching-data', false);
            fetching.present();
            return _this.user.current().then(function (profile) {
                return _this.preparations.assignment(profile.roleId(), tender.assignment.id).then(function (assignment) {
                    _this.loading.hide(fetching, 100);
                    // mark as already fetched and pass to preparation
                    assignment.fetched = true;
                    var modal = _this.details.open(__WEBPACK_IMPORTED_MODULE_12__bills_preparation_preparation_details__["a" /* PreparationDetails */], { profile: profile, assignment: assignment });
                    modal.onDidDismiss(function (data) { return resolve(data); });
                });
            });
        });
    };
    AssignmentOperations.prototype.createInvoice = function () {
        return Promise.resolve(this.tabs.select('bills:invoice'));
    };
    AssignmentOperations.prototype.invoiceDetails = function (tender) {
        var _this = this;
        return new Promise(function (resolve) {
            var fetching = _this.loading.create('common.fetching-data', false);
            fetching.present();
            return _this.user.current().then(function (profile) {
                return _this.invoices.getByAssignment(profile.roleId(), tender.assignment.id).then(function (invoice) {
                    _this.loading.hide(fetching, 100);
                    // mark as already fetched and pass to preparation
                    invoice.fetched = true;
                    var modal = _this.details.open(__WEBPACK_IMPORTED_MODULE_14__bills_invoices_invoice_details__["a" /* InvoiceDetails */], { profile: profile, invoice: invoice });
                    modal.onDidDismiss(function (data) { return resolve(data); });
                });
            });
        });
    };
    AssignmentOperations.prototype.trans = function (identifier, values) {
        return this.translate.instant('assignments.' + identifier, values);
    };
    AssignmentOperations.prototype.message = function (tender, type) {
        var values = Object.assign(tender, {
            time: __WEBPACK_IMPORTED_MODULE_5_moment__().format('HH:mm'),
            jobName: tender.job.title,
            agentName: tender.agent && tender.agent.fullname || '',
            freelancerName: tender.freelancer.firstname + " " + tender.freelancer.lastname,
        });
        return this.trans("late-check-in.via-" + type + ".message", values);
    };
    AssignmentOperations.prototype.onCheckinConfirm = function (tender) {
        return this.assignments.checkin(tender).then(function () { return 'checkedin'; });
    };
    AssignmentOperations.prototype.onCheckoutConfirm = function (tender) {
        return this.assignments.checkout(tender).then(function () { return 'checkedout'; });
    };
    AssignmentOperations.prototype.onShareSmsConfirm = function (tender, resolve, reject) {
        var msg = this.message(tender, 'sms');
        var tel = tender.agent && tender.agent.mobile || '';
        this.social.shareViaSMS(msg, tel).then(function () { return resolve(false); }, reject);
    };
    AssignmentOperations.prototype.onShareWhatsappConfirm = function (tender, resolve, reject) {
        var msg = this.message(tender, 'whatsapp');
        // const tel = tender.agent && tender.agent.mobile || '';
        // this.social.shareViaWhatsAppToReceiver(tel, msg).then(() => resolve(false), reject);
        this.social.shareViaWhatsApp(msg).then(function () { return resolve(false); }, reject);
    };
    AssignmentOperations = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__components_details__["a" /* DetailsController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_social_sharing__["a" /* SocialSharing */], __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["d" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_8__components_confirm__["a" /* ConfirmController */], __WEBPACK_IMPORTED_MODULE_16__assignments_service__["a" /* AssignmentsService */], __WEBPACK_IMPORTED_MODULE_11__bills_preparation_preparation_service__["a" /* PreparationService */],
            __WEBPACK_IMPORTED_MODULE_13__bills_invoices_invoices_service__["a" /* InvoicesService */], __WEBPACK_IMPORTED_MODULE_6__components_api__["f" /* ApiUserService */], __WEBPACK_IMPORTED_MODULE_9__components_loading__["a" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_10__components_navigation__["b" /* TabsService */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_call_number__["a" /* CallNumber */]])
    ], AssignmentOperations);
    return AssignmentOperations;
}());

//# sourceMappingURL=assignment.operations.js.map

/***/ }),

/***/ 193:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 193;

/***/ }),

/***/ 22:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__navigation_module__ = __webpack_require__(659);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tab_switch_directive__ = __webpack_require__(463);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tabs_service__ = __webpack_require__(165);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__navigation_module__["a"]; });
/* unused harmony reexport TabSwitchDirective */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__tabs_service__["a"]; });




//# sourceMappingURL=index.js.map

/***/ }),

/***/ 24:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__confirm_controller__ = __webpack_require__(455);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__confirm_controller__["a"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ 258:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 258;

/***/ }),

/***/ 26:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__notify_module__ = __webpack_require__(663);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__notify_controller__ = __webpack_require__(470);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__nothing_found__ = __webpack_require__(469);
/* unused harmony reexport Toast */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__notify_module__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__notify_controller__["a"]; });
/* unused harmony reexport NothingFoundComponent */





//# sourceMappingURL=index.js.map

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return appConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return appFormats; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return appOptions; });
var appConfig = {
    // environment - used for enabling prod mode (dev error handler otherwise); @see app.module
    env: 'prod',
    // API base url
    //apiBaseUrl: ENV.API_URL,
    // apiBaseUrl: "http://3.127.178.10:90",
    // apiBaseUrl: "http://3.64.49.6:90",
    // apiBaseUrl: "http://18.159.190.204:90/"
    apiBaseUrl: "https://www.amploi.at:447/",
    //apiBaseUrl: "http://3.127.178.10",
    // path to refresh token
    refreshTokenUrl: '/auth/refresh-token',
    // default language
    defaultLang: 'de',
    // appointment check-in config
    checkinTolerance: {
        allowed: { minutes: ENV.ALLOWED_CHECKIN_BEFORE ? parseInt(ENV.ALLOWED_CHECKIN_BEFORE, 10) : -30 },
        delayed: { minutes: ENV.ALLOWED_CHECKIN_AFTER ? parseInt(ENV.ALLOWED_CHECKIN_AFTER, 10) : 10 },
    },
    // set coming-checkout default true
    notifications: {
        defaultEnabled: ['coming-checkout', 'tenders-matching'],
    },
    store: {
        android: {
            url: ENV.APP_STORE_ANDROID,
        },
        ios: {
            url: ENV.APP_STORE_IOS,
        }
    },
    maintenanceReload: ENV.MAINTENANCE_RELOAD,
};
var appFormats = {
    transform: {
        time: 'HH:mm',
        datetime: 'DD MMM YYYY, HH:mm',
        date: 'DD MMM YYYY',
    },
    prepare: {
        time: 'HH:mm',
        datetime: 'YYYY-MM-DD HH:mm:ss',
        date: 'YYYY-MM-DD',
    },
};
var appOptions = {
    jobs: {
        offer: {
            states: ['pending', 'declined'],
        }
    },
    bills: {
        invoices: {
            states: ['issued', 'approved', 'payment-authorized', 'money-transfered', 'rejected']
        },
    },
    certificates: {
        categories: ['product', 'brand', 'promotion'],
        recommendation: ['recommended', 'with_jobs']
    },
};
//# sourceMappingURL=app.config.js.map

/***/ }),

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileKind; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__document_item__ = __webpack_require__(492);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__picture_load_directive__ = __webpack_require__(497);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__files_module__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__files_service__ = __webpack_require__(93);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__files_module__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_3__files_service__["a"]; });
/* unused harmony reexport DocumentItem */
/* unused harmony reexport PictureLoadDirective */




var FileKind;
(function (FileKind) {
    FileKind[FileKind["Document"] = 0] = "Document";
    FileKind[FileKind["Picture"] = 1] = "Picture";
})(FileKind || (FileKind = {}));

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 455:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfirmController; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(5);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * @name ConfirmController
 * @description
 * A ConfirmController is a wrapper for AlertController having confirm/cancel options and
 * uses translated values for texts
 *
 * @usage
 * ```ts
 * import { ConfirmController } from '../components/confirm/confirm.controller';
 *
 * constructor(private confirm: ConfirmController) {
 *
 * }
 *
 * presentMessage() {
 *   let message = this.confirm.create({
 *     context: 'some.translatable',
 *     title: 'title',
 *     message: 'message',
 *     confirm: true
 *   });
 *   message.present();
 * }
 * ```
 *
 * @see IConfirmOptions
 *
 */
var ConfirmController = /** @class */ (function (_super) {
    __extends(ConfirmController, _super);
    function ConfirmController(app, config, translate) {
        var _this = _super.call(this, app, config) || this;
        _this.translate = translate;
        return _this;
    }
    ConfirmController.prototype.create = function (opts) {
        console.log('opts', opts);
        var buttons = []
            .concat(!opts.persistant &&
            this.button('cancel', opts.cancel || Boolean(opts.onCancel), opts.context, opts.onCancel, opts.buttonCssClass || 'default'))
            .concat(!opts.persistant &&
            this.button('confirm', opts.confirm || Boolean(opts.onConfirm), opts.context, opts.onConfirm, opts.buttonCssClass || 'primary'))
            .concat(opts.persistant &&
            this.button('confirm', 'link', opts.context, opts.onConfirm, opts.buttonCssClass || 'primary'))
            .filter(Boolean);
        return _super.prototype.create.call(this, Object.assign({}, opts, {
            title: opts.title && this.text(opts.title, opts.context),
            message: opts.message && this.text(opts.message, opts.context, opts.item),
            enableBackdropDismiss: !opts.persistant,
            buttons: buttons,
        }));
    };
    ConfirmController.prototype.text = function (text, context, item) {
        var isTranslated = /\s/.test(text);
        return (isTranslated && text) || this.translate.instant((context && context + '.' || '') + text, item);
    };
    ConfirmController.prototype.label = function (set, def) {
        return (set === true && def) || String(set);
    };
    ConfirmController.prototype.button = function (role, name, context, handler, cssClass) {
        return (name && [{
                text: this.translate.instant((context && context + '.' || '') + 'buttons.' + this.label(name, role)),
                role: role,
                handler: handler,
                cssClass: cssClass,
            }]) || [];
    };
    ConfirmController = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Config */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["d" /* TranslateService */]])
    ], ConfirmController);
    return ConfirmController;
}(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]));

//# sourceMappingURL=confirm.controller.js.map

/***/ }),

/***/ 456:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadingController; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * @name LoadingController
 * @description
 * A LoadingController is a wrapper for ionic LoadingController getting text identifier to translate and flag to auto dismiss on page change
 * Dismisses on page change.
 *
 * @usage
 * ```ts
 * import { LoadingController } from '../components/loading';
 *
 * constructor(private loading: LoadingController) {
 *     let loading = this.loading.create('some.translation.identifier', false);
 *     ...then(() => {
 *         this.loading.hide(loading); // or
 *         loading.dismiss();          // but this can throw an error of ionic framework; @see /ionic-team/ionic/issues/11776
 *     });
 *     // can be used to programatically dismiss all loaders (if not done automatically)
 *     loading.clear();
 * }
 * ```
 *
 * Contains helper for programmatic refresher show (need to pass Renderer2)
 *
 * ```html
 * <ion-refresher (ionRefresh)="doRefresh($event);" #refresher>
 * ```ts
 * // ...
 * @ViewChild('refresher') refresher: any;
 * // ...
 * doRefresh(this.loading.refresher(this.renderer, this.refresher));
 *
 */
var LoadingController = /** @class */ (function () {
    function LoadingController(translate, base) {
        this.translate = translate;
        this.base = base;
        this.loaders = [];
    }
    LoadingController.prototype.create = function (text, dismiss) {
        var _this = this;
        if (dismiss === void 0) { dismiss = true; }
        var loader = this.base.create({
            content: this.translate.instant(text),
            dismissOnPageChange: dismiss,
        });
        // keep loaders in local collection (remove on dismiss)
        this.loaders.push(loader);
        loader.onDidDismiss(function () { return _this.loaders.splice(_this.loaders.indexOf(loader, 1)); });
        return loader;
    };
    LoadingController.prototype.hide = function (instance, delay) {
        if (delay === void 0) { delay = 0; }
        setTimeout(function () {
            instance.dismiss().catch(function () {
                console.log('dismiss caught'); // tslint:disable-line no-console
            });
        }, delay);
    };
    /**
     * Simulates refresher opened programatically - until https://github.com/ionic-team/ionic/issues/10267
     */
    LoadingController.prototype.showRefresher = function (renderer, element) {
        // return if no refresher element given
        if (!element) {
            return;
        }
        // process otherwise
        var container = element.nativeElement;
        var content = container.previousSibling;
        renderer.addClass(container, 'refresher-active');
        renderer.setAttribute(container.children[0], 'state', 'refreshing');
        renderer.setStyle(content, 'transform', 'translateY(70px)');
        return {
            complete: function () {
                renderer.removeClass(container, 'refresher-active');
                renderer.setAttribute(container.children[0], 'state', 'inactive');
                renderer.setStyle(content, 'transform', 'translateY(0)');
            }
        };
    };
    LoadingController.prototype.clear = function () {
        // use any of local collection to dismiss all
        if (this.loaders[0]) {
            this.loaders[0].dismissAll();
        }
    };
    LoadingController = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["d" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* LoadingController */]])
    ], LoadingController);
    return LoadingController;
}());

//# sourceMappingURL=loading.controller.js.map

/***/ }),

/***/ 457:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiBase; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_jwt__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__ = __webpack_require__(458);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__api_config__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__api_interceptor__ = __webpack_require__(652);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__api_notify__ = __webpack_require__(459);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











/**
 *
 */
var ApiBase = /** @class */ (function (_super) {
    __extends(ApiBase, _super);
    function ApiBase(storage, http, events, translate, notify) {
        var _this = _super.call(this, storage, http, events, translate) || this;
        _this.storage = storage;
        _this.http = http;
        _this.events = events;
        _this.translate = translate;
        _this.notify = notify;
        return _this;
    }
    ApiBase.prototype.request = function (method, url, data, options) {
        var _this = this;
        var body = Object.assign({}, data);
        var path = __WEBPACK_IMPORTED_MODULE_8__api_config__["a" /* apiConfig */].baseUrl + this.path(url, body);
        var opts = this.options(method, body, options);
        return this.intercept(this.http.request(path, opts)).catch(function (err) {
            if (err === 'token:refreshed') {
                return _this.http.request(path, opts);
            }
            else {
                return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].throw(err);
            }
        });
    };
    /**
     * Encapsulates response within promise returning meta info
     *
     * @param response
     */
    ApiBase.prototype.meta = function (response) {
        var _this = this;
        return response.map(function (resp) { return _this.extract(resp, 'meta'); }).toPromise();
    };
    /**
     * Encapsulates response within promise handling notification on success/failure
     *
     * @param response
     * @param notify @see IApiNotify
     * @param full optional param to return the full resp including meta
     */
    ApiBase.prototype.promised = function (response, notify, full) {
        var _this = this;
        // unify notification settings
        var notification = typeof notify === 'string' && { operation: notify } || notify;
        // then process response (if jsonized - return enveloped date or all)
        return response.map(function (resp) { return _this.extract(resp, full ? '' : 'data'); }).toPromise().then(function (data) {
            // notify success if set flag or set only message
            if (notification && (notification.success || (notification.error === undefined && notification.success === undefined))) {
                _this.notify.present(notification.operation + '.success');
            }
            // resolve data
            return Promise.resolve(data);
        }).catch(function (err) {
            // unify err message
            var body = err && err.json && err.json() || {};
            var msg = err && (err.message || body.message);
            var errors = err && (err.errors || body.errors);
            // notify error if flag set or set only message
            if (notify && (notification.error || (notification.error === undefined && notification.success === undefined))) {
                _this.notify.present(msg);
            }
            // reject response
            return Promise.reject({ status: err.status, message: msg, errors: errors });
        });
    };
    ApiBase.prototype.getVersion = function () {
        var _this = this;
        var req = this.request('get', '/version').map(function (resp) {
            var data = resp.json();
            var maintenance = _this.transformMaintenance(data.maintenance);
            return Object.assign(data.data, { maintenance: maintenance });
        });
        return req.toPromise();
    };
    ApiBase.prototype.path = function (url, data, remove) {
        if (remove === void 0) { remove = true; }
        var params = url.match(/{\w+}/g);
        if (params && !data) {
            console.error('Data required for path ' + url); // tslint:disable-line no-console
            return;
        }
        (params || []).forEach(function (param) {
            var property = param.substring(1, param.length - 1);
            var value = data[property];
            if (value === undefined) {
                console.error('Property ' + property + ' missing for path ' + url); // tslint:disable-line no-console
                value = '';
            }
            url = url.replace(param, value);
            if (remove) {
                delete data[property];
            }
        });
        return url;
    };
    ApiBase.prototype.options = function (method, body, options) {
        var params = (options && options.params) || {};
        // adds includes
        if (options && options.includes) {
            params.include = options.includes.join(',');
        }
        // adds order
        if (options && options.order) {
            params.order_by = Object.keys(options.order).pop();
            params.order_dir = options.order[params.order_by] || 'asc';
        }
        // adds paging
        if (options && options.paging && options.paging.limit) {
            params.page = Math.floor((options.paging.offset || 0) / options.paging.limit) + 1;
            params.limit = options.paging.limit;
        }
        // adds search-term
        if (options && options.search && options.search.length >= (__WEBPACK_IMPORTED_MODULE_8__api_config__["a" /* apiConfig */].minSearchString || 0)) {
            params.search = options.search;
        }
        return {
            method: method,
            body: body,
            params: params,
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]((options && options.headers) || null),
            responseType: (options && options.responseType) || __WEBPACK_IMPORTED_MODULE_1__angular_http__["ResponseContentType"].Json,
        };
    };
    ApiBase.prototype.extract = function (data, type) {
        return data && data.json && (data.json() && data.json()[type] || data.json());
    };
    ApiBase = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3_angular2_jwt__["AuthHttp"], __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["f" /* Events */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["d" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_10__api_notify__["a" /* ApiNotifyController */]])
    ], ApiBase);
    return ApiBase;
}(__WEBPACK_IMPORTED_MODULE_9__api_interceptor__["a" /* ApiInterceptor */]));

//# sourceMappingURL=api.base.js.map

/***/ }),

/***/ 459:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiNotifyController; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 *
 */
var ApiNotifyController = /** @class */ (function () {
    function ApiNotifyController(translate, base) {
        this.translate = translate;
        this.base = base;
    }
    ApiNotifyController.prototype.present = function (text, duration) {
        if (duration === void 0) { duration = 2000; }
        return this.base.create({
            message: this.translate.instant(text),
            position: 'middle',
            duration: duration,
        }).present();
    };
    ApiNotifyController = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["d" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* ToastController */]])
    ], ApiNotifyController);
    return ApiNotifyController;
}());

//# sourceMappingURL=api.notify.js.map

/***/ }),

/***/ 460:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiResources; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_service__ = __webpack_require__(67);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

/**
 * ApiResources - offers update resources as operation bulk
 *
 */
var ApiResources = /** @class */ (function (_super) {
    __extends(ApiResources, _super);
    function ApiResources() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Updates set of items
     *
     * @param {array} set Set of items; It will use item properties to determine action:
     *                      - remove - to remove item (only if id set or operation = 'remove' set)
     *                      - id - to update item (except having strict operation = 'create' property)
     *                      - will create item otherwise
     * @param {object|string} methods Methods of api service to call on; if string given it will use 'create' + methods, etc
     * @param {object|boolean} notify
     *
     * @note Items set to remove will be executed first
     * @note For empty operations set it resolve immediately
     *
     * @returns {array} Initial array - created items filled with id
     */
    ApiResources.prototype.update = function (operations, endpoint, notify) {
        var _this = this;
        var requests = [];
        var removed = [];
        var methods = {
            create: this['create' + endpoint],
            update: this['update' + endpoint],
            remove: this['remove' + endpoint],
        };
        if (!operations.length) {
            return Promise.resolve();
        }
        operations.forEach(function (item) {
            if (item.remove || item.operation === 'remove') {
                if (item.id || item.operation === 'remove') {
                    removed.push(_this.promised(methods.remove.apply(_this, [item]), notify));
                }
            }
            else if (item.id && item.operation !== 'create') {
                requests.push(_this.promised(methods.update.apply(_this, [item]), notify));
            }
            else {
                requests.push(_this.promised(methods.create.apply(_this, [item]), notify).then(function (resp) {
                    item.id = resp && resp.id;
                    return item;
                }));
            }
        });
        return Promise.all(removed).then(function () { return Promise.all(requests); });
    };
    return ApiResources;
}(__WEBPACK_IMPORTED_MODULE_0__api_service__["a" /* NewApiService */]));

//# sourceMappingURL=api.resources.js.map

/***/ }),

/***/ 461:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiAuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__ = __webpack_require__(656);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_jwt__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__api_service__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__api_user__ = __webpack_require__(163);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ApiAuthService = /** @class */ (function () {
    function ApiAuthService(storage, api, user, events) {
        var _this = this;
        this.storage = storage;
        this.api = api;
        this.user = user;
        this.events = events;
        this.jwt = new __WEBPACK_IMPORTED_MODULE_5_angular2_jwt__["JwtHelper"]();
        this.user.setAuthenticatedCheck(function () { return _this.isAuthenticated(); });
    }
    /**
     * Checks app is authenticated by token
     *
     * @returns {Promise} Resolved for true, rejected otherwise
     */
    ApiAuthService.prototype.isAuthenticated = function () {
        // check only existing token until refresh time is encoded in payload
        return this.getToken().then(function (token) { return Boolean(token) ? Promise.resolve(true) : Promise.reject(false); });
    };
    ApiAuthService.prototype.login = function (credentials) {
        var _this = this;
        this.user.reset();
        return this.api.promised(this.api.login(credentials)).then(function (data) {
            return _this.setToken(data.token).then(function () {
                _this.events.publish('user:loggedin');
                return _this.user.current();
            });
        }, function (err) {
            var msg = err.errors && Object.values(err.errors).join() || err.message;
            var body = err && err.json && err.json() || {};
            return Promise.reject({
                status: body.status_code || err.status,
                message: msg,
            });
        });
    };
    ApiAuthService.prototype.resetPassword = function (email) {
        return this.api.promised(this.api.resetPassword({ email: email }));
    };
    ApiAuthService.prototype.logout = function () {
        this.user.reset();
        return this.resetToken();
    };
    ApiAuthService.prototype.getHeader = function () {
        var _this = this;
        return this.storage.get('token').then(function (token) {
            // for going-to-expire (5 min) token refresh it first, then store and return
            if (_this.jwt.isTokenExpired(token, 300)) {
                return _this.api.promised(_this.api.refreshToken({})).then(function (data) {
                    return _this.setToken(data.token).then(function () { return ({ Authorization: 'Bearer ' + data.token }); });
                });
            }
            else {
                return { Authorization: 'Bearer ' + token };
            }
        });
    };
    ApiAuthService.prototype.setToken = function (token) {
        return this.storage.set('token', token);
    };
    ApiAuthService.prototype.getToken = function () {
        return this.storage.get('token');
    };
    ApiAuthService.prototype.resetToken = function () {
        return this.storage.remove('token');
    };
    ApiAuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_6__api_service__["a" /* NewApiService */], __WEBPACK_IMPORTED_MODULE_7__api_user__["a" /* ApiUserService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Events */]])
    ], ApiAuthService);
    return ApiAuthService;
}());

//# sourceMappingURL=api.auth.js.map

/***/ }),

/***/ 462:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiTransform; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_config__ = __webpack_require__(68);


/**
 *
 */
var ApiTransform = /** @class */ (function () {
    function ApiTransform() {
    }
    /**
     * Transforms given utc hours to local hours (string HH:MI)
     */
    ApiTransform.time = function (time) {
        return __WEBPACK_IMPORTED_MODULE_0_moment__["utc"](time, __WEBPACK_IMPORTED_MODULE_1__api_config__["b" /* apiFormats */].prepare.time).local().format(__WEBPACK_IMPORTED_MODULE_1__api_config__["b" /* apiFormats */].transform.time);
    };
    /**
     * Transform given day (utc) to local date
     */
    ApiTransform.date = function (day) {
        return __WEBPACK_IMPORTED_MODULE_0_moment__["utc"](day).toDate();
    };
    /**
     * Transform given datetime (utc) to local date
     * Sets given hours (HH:mm) if set (to transform utc day start + string hours - see appointed_at datamodel)
     */
    ApiTransform.datetime = function (datetime, hours) {
        var add = {};
        // fix issue with summer/wintertime (PFY-4293)
        var local = __WEBPACK_IMPORTED_MODULE_0_moment__["utc"](datetime, __WEBPACK_IMPORTED_MODULE_1__api_config__["b" /* apiFormats */].prepare.datetime).toDate();
        if (hours) {
            var parts = hours.split(':');
            add.hours = +parts[0];
            add.minutes = +parts[1];
            return __WEBPACK_IMPORTED_MODULE_0_moment__(local).hours(add.hours).minutes(add.minutes).toDate();
        }
        return local;
    };
    return ApiTransform;
}());

//# sourceMappingURL=api.transform.js.map

/***/ }),

/***/ 463:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabSwitchDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tabs_service__ = __webpack_require__(165);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * @name
 * TabSwitchDirective
 *
 * @description
 * Directive for tab switching. Tab name must be known for AppTabs.
 *
 * @note
 * Tab name can contain subtab as ('main-tab:sub-tab') - @see TabsService
 *
 * @usage
 * ```html
 * <button ion-button tabSwitch="some-tab" dismissModal="true">Switch to some tab</button>
 * ```
 */
var TabSwitchDirective = /** @class */ (function () {
    function TabSwitchDirective(tabs, navigation) {
        this.tabs = tabs;
        this.navigation = navigation;
    }
    TabSwitchDirective.prototype.onClick = function () {
        this.tabs.select(this.target);
        if (this.dismiss && this.navigation.length()) {
            var main_1 = this.navigation.first();
            this.navigation.remove(main_1.index, this.navigation.length()).then(function () {
                main_1.dismiss();
            });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('tabSwitch'),
        __metadata("design:type", String)
    ], TabSwitchDirective.prototype, "target", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('dismissModal'),
        __metadata("design:type", Boolean)
    ], TabSwitchDirective.prototype, "dismiss", void 0);
    TabSwitchDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[tabSwitch]',
            host: {
                '(click)': 'onClick()',
            },
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__tabs_service__["a" /* TabsService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */]])
    ], TabSwitchDirective);
    return TabSwitchDirective;
}());

//# sourceMappingURL=tab.switch.directive.js.map

/***/ }),

/***/ 464:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResetPasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_loading__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_api__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_page__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_confirm__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ResetPasswordPage = /** @class */ (function () {
    function ResetPasswordPage(navigation, loading, confirm, auth) {
        this.navigation = navigation;
        this.loading = loading;
        this.confirm = confirm;
        this.auth = auth;
    }
    ResetPasswordPage.prototype.resetPassword = function () {
        var _this = this;
        this.resetting = this.loading.create('common.fetching-data', false);
        this.resetting.present();
        return this.auth.resetPassword(this.email).then(function () {
            _this.notify();
        }).catch(function (status) {
            _this.notify(status.errors);
        });
    };
    ResetPasswordPage.prototype.notify = function (error) {
        var _this = this;
        this.loading.hide(this.resetting, 100);
        this.confirm.create({
            context: 'auth.reset',
            title: error ? 'failed' : 'done',
            message: error ? error.email[0] : 'sent',
            confirm: true,
            onConfirm: function () {
                if (!error) {
                    _this.navigation.setRoot(__WEBPACK_IMPORTED_MODULE_4__login_page__["a" /* LoginPage */]);
                }
            },
        }).present();
    };
    ResetPasswordPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/login/reset.password.page.html"*/'<ion-content padding>\n  <button-back label="auth.reset.buttons.back"></button-back>\n  <form (submit)="resetPassword()" #local="ngForm">\n    <ion-list inset>\n      <p>\n        {{ \'auth.reset.info\' | translate }}\n      </p>\n      <ion-item>\n        <ion-label floating>{{ "auth.reset.email-placeholder" | translate }}</ion-label>\n        <ion-input type="email" name="mail" [(ngModel)]="email" required></ion-input>\n      </ion-item>\n      <button ion-button full color="button-primary" [disabled]="!local.form.valid">{{ "submit" | translate }}</button>\n    </ion-list>\n  </form>\n</ion-content>\n'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/login/reset.password.page.html"*/,
            selector: 'page-resetpassword'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__components_loading__["a" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_5__components_confirm__["a" /* ConfirmController */], __WEBPACK_IMPORTED_MODULE_3__components_api__["a" /* ApiAuthService */]])
    ], ResetPasswordPage);
    return ResetPasswordPage;
}());

//# sourceMappingURL=reset.password.page.js.map

/***/ }),

/***/ 465:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AssignmentsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_loading__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_api__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_app_animations__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__base_page__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__assignments_service__ = __webpack_require__(71);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var AssignmentsPage = /** @class */ (function (_super) {
    __extends(AssignmentsPage, _super);
    function AssignmentsPage(translate, loading, user, renderer, events, assignments) {
        var _this = _super.call(this, translate, loading, renderer, user) || this;
        _this.translate = translate;
        _this.loading = loading;
        _this.user = user;
        _this.renderer = renderer;
        _this.events = events;
        _this.assignments = assignments;
        _this.upcoming = true;
        _this.listenNotification();
        return _this;
    }
    AssignmentsPage.prototype.fetch = function (loaded, load) {
        var _this = this;
        if (load === void 0) { load = 5; }
        return this.assignments.list(this.profile.roleId(), this.upcoming, loaded && loaded.length, load).then(function (assignments) { return _this.setItems(loaded, assignments); });
    };
    AssignmentsPage.prototype.doRefresh = function (refresher) {
        _super.prototype.doRefresh.call(this, refresher);
        this.events.publish('messages:check');
    };
    AssignmentsPage.prototype.listenNotification = function () {
        var _this = this;
        this.events.subscribe('push:notification', function (type) {
            if (['coming-checkout'].includes(type)) {
                _this.doRefresh();
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('refresher'),
        __metadata("design:type", Object)
    ], AssignmentsPage.prototype, "refresher", void 0);
    AssignmentsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-assignments',template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/assignments/assignments.page.html"*/'<ion-content>\n  <ion-refresher (ionRefresh)="doRefresh($event);" #refresher>\n    <ion-refresher-content pulling-icon="ion-arrow-down-b positive" spinner="crescent" pullingText="{{ \'common.pull-to-refresh\' | translate }}"\n      refreshingText="{{ \'common.refreshing\' | translate }}">\n    </ion-refresher-content>\n  </ion-refresher>\n\n  <message-counter visible="new" update-strategy="{listen: \'event-name\'}"></message-counter>\n\n  <ion-list no-lines *ngIf="items && items.length">\n    <assignment-card *ngFor="let assignment of items; let i = index;" [assignment]="assignment" (refresh)="doRefresh()" [attr.expanded]="i === 0"\n      [@softItem]>\n    </assignment-card>\n    <ion-infinite-scroll (ionInfinite)="$event.waitFor(fetch(items, 5))" [enabled]="moreItems">\n      <ion-infinite-scroll-content loadingSpinner="crescent" loadingText="{{ \'common.fetching-data\' | translate }}">\n      </ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n  </ion-list>\n\n  <nothing-found *ngIf="items && !items.length" icon="ios-happy-outline" context="assignments.nothing-found" [values]="profile.data()"\n    redirect="jobs:matched">\n  </nothing-found>\n</ion-content>'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/assignments/assignments.page.html"*/,
            animations: __WEBPACK_IMPORTED_MODULE_5__app_app_animations__["a" /* animations */],
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["d" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_3__components_loading__["a" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__components_api__["f" /* ApiUserService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer2"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Events */], __WEBPACK_IMPORTED_MODULE_7__assignments_service__["a" /* AssignmentsService */]])
    ], AssignmentsPage);
    return AssignmentsPage;
}(__WEBPACK_IMPORTED_MODULE_6__base_page__["a" /* BasePage */]));

//# sourceMappingURL=assignments.page.js.map

/***/ }),

/***/ 466:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JobsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_api__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_collection__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__jobs_operations__ = __webpack_require__(89);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 *
 */
var JobsService = /** @class */ (function () {
    function JobsService(api, translate) {
        this.api = api;
        this.translate = translate;
    }
    /**
     * Gets list of jobs for given freelancer
     *
     * @param freelancerId
     * @param matching Matching flag
     */
    JobsService.prototype.list = function (freelancerId, matching, offset, limit, filtered) {
        var _this = this;
        if (matching === void 0) { matching = __WEBPACK_IMPORTED_MODULE_4__jobs_operations__["a" /* JobMatch */].Yes; }
        var options = {
            params: {
                is_matching: matching === __WEBPACK_IMPORTED_MODULE_4__jobs_operations__["a" /* JobMatch */].Yes || undefined,
                is_not_matching: matching === __WEBPACK_IMPORTED_MODULE_4__jobs_operations__["a" /* JobMatch */].No || undefined,
                date_from: __WEBPACK_IMPORTED_MODULE_2__components_api__["c" /* ApiPrepare */].datetime(filtered && filtered.dates && filtered.dates.start),
                date_to: __WEBPACK_IMPORTED_MODULE_2__components_api__["c" /* ApiPrepare */].datetime(filtered && filtered.dates && filtered.dates.end),
                zip_from: filtered && filtered.postcodes && filtered.postcodes.min || undefined,
                zip_to: filtered && filtered.postcodes && filtered.postcodes.max || undefined,
                certificate_id: filtered && filtered.certificate || undefined,
                contract_type_id: filtered && filtered.contractType || undefined,
            },
            paging: { offset: offset, limit: limit },
            search: filtered.search
        };
        return this.api.promised(this.api.getFreelancerJobs({ freelancerId: freelancerId }, options), undefined, true).then(function (resp) {
            return {
                data: resp.data.map(_this.transform, _this).sort(_this.byRangeDates),
                meta: resp.meta
            };
        });
    };
    /**
     * Gets given job for given freelancer
     *
     * @param freelancerId
     * @param jobId
     */
    JobsService.prototype.get = function (freelancerId, jobId) {
        var _this = this;
        var options = {
            params: { is_matching: true },
        };
        return this.api.promised(this.api.getFreelancerJob({ freelancerId: freelancerId, jobId: jobId }, options)).then(function (data) {
            return _this.transform(data);
        });
    };
    /**
     * Gets list of offers for given freelancer
     *
     * @param freelancerId
     * @param filtered
     */
    JobsService.prototype.offers = function (freelancerId, offset, limit, filtered) {
        var _this = this;
        var options = {
            params: {
                with_declined: filtered.state && (filtered.state.length === 0 || filtered.state.length === 2) || undefined,
                only_declined: filtered.state && filtered.state.length === 1 && filtered.state[0] === 'declined' || undefined,
                contract_type_id: filtered && filtered.contractType || undefined,
            },
            includes: ['tender', 'freelancer'],
            paging: { offset: offset, limit: limit },
            search: filtered.search
        };
        return this.api.promised(this.api.getOffers({ freelancerId: freelancerId }, options), undefined, true).then(function (resp) {
            return {
                data: resp.data.map(function (item) { return _this.transform(_this.unify(item, 'offered')); }).sort(_this.byRangeDates),
                meta: resp.meta
            };
        });
    };
    /*
    * Gets all certificates for the filter options
    */
    JobsService.prototype.certificates = function () {
        return this.api.promised(this.api.getAllCertificates(null, null));
    };
    /*
    * Gets all certificates for the filter options
    */
    JobsService.prototype.contractTypes = function () {
        var _this = this;
        return this.api.promised(this.api.getAllContractTypes(null, null)).then(function (resp) {
            return resp.map(function (item) { return _this.transformContractTypes(item); });
        });
    };
    /**
     * Unifies to job response structure
     */
    JobsService.prototype.unify = function (data, indicator) {
        // set coming from offers indicator
        data[indicator] = true;
        data.tender.data[indicator] = true;
        return Object.assign(data, {
            title: data.tender.data.snapshots.job.title,
            tenders: { data: [data.tender.data] },
            state: indicator === 'offered' && (data.deleted_at ? 'declined' : 'pending'),
            category: data.tender.data.snapshots.job.category,
            contract_type_identifier: data.tender.data.contract_type_identifier,
        });
    };
    /**
     * Transforms job data
     *
     * @param job
     */
    JobsService.prototype.transform = function (job) {
        var _a = this.extract(job.tenders.data), matching = _a.matching, range = _a.range, site = _a.site, assignment = _a.assignment, tenders = _a.tenders, project = _a.project, client = _a.client, mismatched = _a.mismatched;
        var shortTitle = job.title.split(' | ')[0];
        var contractType = job.contract_type_identifier && this.translate.instant('common.contract_types.' + job.contract_type_identifier);
        return tenders && Object.assign(job, { shortTitle: shortTitle, contractType: contractType, range: range, site: site, project: project, assignment: assignment, client: client, tenders: tenders, matching: matching, mismatched: mismatched });
    };
    /**
     * Transforms contract type
     *
     * @param contract type
     */
    JobsService.prototype.transformContractTypes = function (contractType) {
        contractType.name = contractType.identifier && this.translate.instant('common.contract_types.' + contractType.identifier);
        return contractType;
    };
    /**
     * Extracts data from tenders serie
     *
     * @param tenders
     */
    JobsService.prototype.extract = function (tenders) {
        var _this = this;
        var mismatched = {};
        var range = {
            dates: { start: null, end: null },
            rates: { min: 0, max: 0, sum: { min: 0, max: 0 } }
        };
        var matching = tenders && (tenders[0].is_matching || tenders[0].offered);
        return {
            range: range,
            matching: matching,
            mismatched: mismatched,
            site: tenders && tenders[0].snapshots.site,
            project: tenders && tenders[0].snapshots.project,
            client: tenders && tenders[0].snapshots.client,
            assignment: tenders && tenders[0].snapshots.assignment,
            tenders: (tenders || [])
                .map(function (tender) {
                tender.hasMoreFinancialInfo = (tender.snapshots.incentive_model && tender.snapshots.incentive_model.id) ||
                    (tender.snapshots.assignment.additional_costs && tender.snapshots.assignment.additional_costs.length);
                var start = __WEBPACK_IMPORTED_MODULE_2__components_api__["e" /* ApiTransform */].datetime(tender.snapshots.date.appointed_at, tender.snapshots.assignment.start_time);
                var end = __WEBPACK_IMPORTED_MODULE_2__components_api__["e" /* ApiTransform */].datetime(tender.snapshots.date.appointed_at, tender.snapshots.assignment.finish_time);
                // evaluate mismatching
                if (!matching) {
                    // mismatched certificates
                    if (tender.matching.certificates === false) {
                        var certificates = __WEBPACK_IMPORTED_MODULE_3__utils_collection__["a" /* Collection */].pluck(__WEBPACK_IMPORTED_MODULE_3__utils_collection__["a" /* Collection */].extract(tender, 'matching_details.certificates') || [], 'name');
                        mismatched.certificates = __WEBPACK_IMPORTED_MODULE_3__utils_collection__["a" /* Collection */].unique((mismatched.certificates || []).concat(certificates));
                    }
                    // mismatched cities and zip
                    if (tender.matching.cities === false || tender.matching.zip === false) {
                        mismatched.location = [_this.translate.instant('jobs.mismatched.unmatched-location')];
                    }
                    // mismatched legal certificates
                    if (tender.matching.legal === false) {
                        var legalCertificate = __WEBPACK_IMPORTED_MODULE_3__utils_collection__["a" /* Collection */].extract(tender, 'matching_details.legal');
                        mismatched.certificates = __WEBPACK_IMPORTED_MODULE_3__utils_collection__["a" /* Collection */].unique((mismatched.certificates || []).concat(legalCertificate.name));
                    }
                    // mismachted contract type
                    if (tender.matching.contract_type === false) {
                        var contractTypeIdentifier = __WEBPACK_IMPORTED_MODULE_3__utils_collection__["a" /* Collection */].extract(tender, 'contract_type_identifier');
                        mismatched.contractType = _this.translate.instant('common.contract_types.' + contractTypeIdentifier);
                    }
                }
                // set ranges
                if (!range.dates.start || range.dates.start > start) {
                    range.dates.start = start;
                }
                if (!range.dates.end || range.dates.end < end) {
                    range.dates.end = end;
                }
                if (!range.rates.min || range.rates.min > tender.daily_rate_min) {
                    range.rates.min = tender.daily_rate_min;
                }
                if (!range.rates.max || range.rates.max < tender.daily_rate_max) {
                    range.rates.max = tender.daily_rate_max;
                }
                range.rates.sum.min += tender.daily_rate_min;
                range.rates.sum.max += tender.daily_rate_max;
                // and extend object
                return Object.assign(tender, { start: start, end: end });
            })
                .sort(function (a, b) { return a.start - b.start; }),
        };
    };
    JobsService.prototype.byRangeDates = function (a, b) {
        return a.range.dates.start - b.range.dates.start;
    };
    JobsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__components_api__["g" /* NewApiService */], __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["d" /* TranslateService */]])
    ], JobsService);
    return JobsService;
}());

//# sourceMappingURL=jobs.service.js.map

/***/ }),

/***/ 467:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetailsController; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


/**
 * @name
 * DetailsController
 * @description
 * A DetailsController is a wrapper for ModalController implementing open action - presenting modal
 * with default options (full screen size, no backdrop, slide-in-right on leave).
 *
 * @usage
 * ```ts
 * import { DetailsController } from '../components/details';
 *
 * constructor(private details: DetailsController) {
 *
 * }
 *
 * openDetails() {
 *    this.details.open(DetailsPage, {some: 'optional-data}, {options: ['to-extend', or override]});
 * }
 * ```
 *
 */
var DetailsController = /** @class */ (function (_super) {
    __extends(DetailsController, _super);
    function DetailsController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Opens details page as modal
     *
     * @param component Page class
     * @param data Navigation data
     * @param options Modal options to extend/override
     */
    DetailsController.prototype.open = function (component, data, options) {
        var modal = this.create(component, data, Object.assign({
            showBackdrop: false,
            leaveAnimation: 'slide-in-right',
            cssClass: 'full',
        }, options || {}));
        modal.present();
        return modal;
    };
    DetailsController = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], DetailsController);
    return DetailsController;
}(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ModalController */]));

//# sourceMappingURL=details.controller.js.map

/***/ }),

/***/ 468:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JobDetailsModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_api__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_format__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_confirm__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_collection__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils_checklist__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_notify__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__messages_messages_service__ = __webpack_require__(91);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var JobDetailsModal = /** @class */ (function () {
    function JobDetailsModal(params, view, confirm, translate, messages, notify, user) {
        this.params = params;
        this.view = view;
        this.confirm = confirm;
        this.translate = translate;
        this.messages = messages;
        this.notify = notify;
        this.user = user;
        this.tenders = {};
        this.selectedAll = false;
        this.operations = this.params.get('operations');
        // initial data on open
        this.details = this.params.get('job');
        // prepare collection set
        this.tenders = __WEBPACK_IMPORTED_MODULE_7__utils_checklist__["a" /* Checklist */].prepare(this.details.tenders);
        // set user "state"
        this.restricted = this.user.get().isRestricted(this.details.contract_type_identifier);
    }
    JobDetailsModal.prototype.selected = function () {
        return __WEBPACK_IMPORTED_MODULE_7__utils_checklist__["a" /* Checklist */].selected(this.tenders);
    };
    JobDetailsModal.prototype.toggleOne = function () {
        this.selectedAll = this.selected().length === this.details.tenders.length;
    };
    JobDetailsModal.prototype.toggleAll = function () {
        if (this.selected().length === this.details.tenders.length) {
            __WEBPACK_IMPORTED_MODULE_7__utils_checklist__["a" /* Checklist */].reset(this.tenders);
        }
        else {
            __WEBPACK_IMPORTED_MODULE_7__utils_checklist__["a" /* Checklist */].set(this.tenders);
        }
    };
    JobDetailsModal.prototype.info = function (tender) {
        var _this = this;
        var incentives = tender.snapshots.incentive_model;
        var costs = tender.snapshots.assignment.additional_costs;
        // construct info parts
        var msg = [
            incentives && ['label', 'checkin', 'sales_report', 'picture_documentation']
                .map(function (key) { return _this.infoLine(_this.translate.instant("assignments.details.incentives." + key), incentives[key]); }).join(''),
            costs && costs.length && [this.infoLine(this.translate.instant('assignments.details.costs.label'))]
                .concat(costs.map(function (cost) { return _this.infoLine(cost.name, cost.value); })).join(''),
        ];
        // then show by confirm
        return this.confirm.create({
            context: 'assignments',
            title: 'details.additional',
            message: msg.filter(Boolean).join('<div class="divider"></div>'),
            item: tender,
            confirm: true,
            cssClass: 'assignment-info',
        }).present();
    };
    /**
     * Sends accept offer to api (within confirmation implemented in operations)
     */
    JobDetailsModal.prototype.acceptOffers = function () {
        var _this = this;
        if (!this.processing && this.operations) {
            var type_1 = 'accepted' + (this.selectedAll ? '-all' : '-partially');
            this.processing = true;
            this.operations.acceptOffers(this.details, this.selected()).then(function () {
                _this.dismiss(type_1);
            }).catch(function () {
                _this.processing = false;
            });
        }
    };
    /**
     * Sends reject offer to api
     */
    JobDetailsModal.prototype.rejectOffers = function () {
        var _this = this;
        if (!this.processing && this.operations) {
            var ids = __WEBPACK_IMPORTED_MODULE_6__utils_collection__["a" /* Collection */].ids(this.details.tenders); // all
            this.processing = true;
            this.operations.rejectOffers(this.details, ids).then(function () {
                _this.dismiss('rejected');
            }).catch(function () {
                _this.processing = false;
            });
        }
    };
    JobDetailsModal.prototype.dismiss = function (operation) {
        this.view.dismiss(operation);
    };
    JobDetailsModal.prototype.makeCall = function (num) {
        this.operations.makeCall(num);
    };
    JobDetailsModal.prototype.createMessage = function () {
        var _this = this;
        var subject = this.translate.instant('jobs.offer.question.create', this.details);
        var info = {
            title: this.translate.instant('jobs.offer.question.title'),
            info: this.translate.instant('jobs.offer.question.info'),
            placeholder: this.translate.instant('jobs.offer.question.placeholder'),
        };
        var additional = {
            job_id: this.details.id,
            tender_ids: this.selected(),
        };
        this.messages.create('Job', subject, '', additional, info, { subject: false }).then(function () {
            _this.notify.present('jobs.offer.question.sent');
        });
    };
    JobDetailsModal.prototype.infoLine = function (key, value) {
        var val = (value && __WEBPACK_IMPORTED_MODULE_4__utils_format__["a" /* Format */].numbers(value) + '€') || '';
        return "<div><span>" + key + "</span><span>" + val + "</span></div>";
    };
    JobDetailsModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/jobs/job.details.html"*/'<ion-content padding>\n  <button-back label="jobs.details.back"></button-back>\n  <ion-item class="head">\n    <ion-row>\n      <ion-col col-12>\n          <h2 text-wrap head-2>{{ details.shortTitle }}</h2>\n      </ion-col>\n      <ion-col col-12>\n        <p>{{ details.client.name }}</p>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>\n        <p class="category" *ngIf="details.category">\n          <ion-icon name="pricetag"></ion-icon>\n          <span>{{ \'common.categories.\' + details.category | translate }}</span>\n        </p>\n      </ion-col>\n      <ion-col *ngIf="details.contract_type_identifier">\n        <p class="category">\n          <ion-icon name="paper"></ion-icon>\n          <span>{{ \'common.contract_types.\' + details.contract_type_identifier | translate }}</span>\n        </p>\n      </ion-col>\n    </ion-row>\n  </ion-item>\n  <ion-item class="schedule">\n    <ion-row light>\n      <ion-icon name="home" padding-right></ion-icon>\n      {{ details.site.name + (details.site.number ? \' | \'+ details.site.number : \'\') }}\n    </ion-row>\n    <ion-row light>\n      <ion-icon name="pin" padding-right></ion-icon>\n      {{ details.site.zip + \' \' + details.site.city + \', \' + details.site.address }}\n    </ion-row>\n  </ion-item>\n\n  <ion-item text-wrap class="desc">\n    <h5 head-5>{{ \'jobs.details.description\' | translate }}</h5>\n    <p [innerHTML]="details.assignment.description | nl2br"></p>\n  </ion-item>\n\n  <ion-item text-wrap class="desc">\n    <h5 head-5>{{ \'jobs.details.briefing\' | translate }}</h5>\n    <p [innerHTML]="details.assignment.briefing | nl2br"></p>\n  </ion-item>\n\n  <ion-list class="dates" [ngClass]="{ offered: details.offered }">\n    <h5 head-5>{{ \'jobs.details.dates\' | translate }}</h5>\n    <ion-item *ngIf="!details.offered">\n      <ion-checkbox color="primary" (click)="toggleAll()" [(ngModel)]="selectedAll"></ion-checkbox>\n      <ion-label>\n        <p>{{ \'jobs.buttons.select-all\' | translate }}</p>\n      </ion-label>\n    </ion-item>\n    <ion-item *ngFor="let tender of details.tenders">\n      <ion-checkbox color="primary" [(ngModel)]="tenders[tender.id]" (ionChange)="toggleOne()"></ion-checkbox>\n      <ion-label>\n        <p>\n          <ion-icon name="calendar"></ion-icon>{{ tender.start | amDateFormat : \'DD.MM.YYYY\' }}\n        </p>\n        <p>\n          <ion-icon name="clock"></ion-icon>{{ tender.start | amDateFormat : \'HH:mm\' }} - {{ tender.end | amDateFormat : \'HH:mm\' }}<br>\n        </p>\n        <p>\n          {{ tender.daily_rate_min | toCurrency }} {{ tender.daily_rate_min !== tender.daily_rate_max && \' - \' + (tender.daily_rate_max  | toCurrency) || \'\' }}\n        </p>\n      </ion-label>\n      <ion-icon item-end name="information-circle" color="primary" *ngIf="tender.hasMoreFinancialInfo" tappable (click)="info(tender)"></ion-icon>\n    </ion-item>\n  </ion-list>\n\n  <ion-item no-lines text-wrap warning *ngIf="!details.offered && restricted">\n    {{ \'jobs.offer.info.\' + restricted | translate }}\n  </ion-item>\n\n  <div *ngIf="!details.offered" class="actions" text-right>\n    <button ion-button full color="button-primary" (click)="acceptOffers()" [disabled]="restricted || processing || !selected().length">\n      {{ \'jobs.buttons.accept\' | translate }}\n    </button>\n    <button ion-button clear color="button-default" (click)="rejectOffers()" [disabled]="processing">\n      {{ \'jobs.buttons.reject\' | translate }}\n    </button>\n    <button ion-button clear color="button-default" (click)="createMessage()" [disabled]="processing || !selected().length">\n      {{ \'jobs.offer.question.button\' | translate }}\n    </button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/jobs/job.details.html"*/,
            selector: 'page-job-details',
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* ViewController */], __WEBPACK_IMPORTED_MODULE_5__components_confirm__["a" /* ConfirmController */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["d" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_9__messages_messages_service__["a" /* MessagesService */], __WEBPACK_IMPORTED_MODULE_8__components_notify__["a" /* NotifyController */], __WEBPACK_IMPORTED_MODULE_3__components_api__["f" /* ApiUserService */]])
    ], JobDetailsModal);
    return JobDetailsModal;
}());

//# sourceMappingURL=job.details.js.map

/***/ }),

/***/ 469:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NothingFoundComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * @name
 * NothingFoundComponent
 *
 * @description
 * Component for nothing found information
 *
 * @param context Translation context - headline, message and button will be used (e.g. some.identifier.prefix.headline, etc)
 * @param values Interpolation values for translation (optional)
 * @param redirect Target tab for redirection (@see tabSwitch)
 *
 * @usage
 * ```html
 * <nothing-found context="some.identifier.prefix" values="{some: 'value'}" redirect="some-tab-name"></nothing-found>
 * ```
 *
 * @note Sets 'has-values' class to element if values is set
 */
var NothingFoundComponent = /** @class */ (function () {
    function NothingFoundComponent() {
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], NothingFoundComponent.prototype, "context", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], NothingFoundComponent.prototype, "values", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], NothingFoundComponent.prototype, "icon", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], NothingFoundComponent.prototype, "redirect", void 0);
    NothingFoundComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'nothing-found',template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/components/notify/nothing-found.html"*/'<div text-wrap text-center [attr.class]="values ? \'has-values\' : \'\'">\n  <ion-item text-center>\n    <ion-icon *ngIf="icon" [name]="icon"></ion-icon>\n    {{ context + \'.headline\' | translate : values || {} }}\n    <br>\n    <div [innerHtml]="context + \'.message\' | translate : values || {}"></div>\n  </ion-item>\n  <button *ngIf="redirect" ion-button clear color="button-default" [tabSwitch]="redirect">\n    {{ context + \'.button\' | translate : values }}\n  </button>\n</div>\n'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/components/notify/nothing-found.html"*/
        })
    ], NothingFoundComponent);
    return NothingFoundComponent;
}());

//# sourceMappingURL=nothing-found.js.map

/***/ }),

/***/ 470:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotifyController; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * @name NotifyController
 * @description
 * A NotifyController is a wrapper for ionic ToastController getting text identifier to translate and duration (default 2000ms)
 * Has also action method to show notification with button
 *
 * @usage
 * ```ts
 * import { NotifyController } from '../components/notify';
 *
 * constructor(private notify: NotifyController) {
 * }
 *
 * someAction() {
 *     this.notify.present('some.translation.identifier');
 *     // or
 *     this.notify.present('some.translation.identifier', 3000, {some: interpolation.params});
 * }
 *
 * otherAction() {
 *     // ...
 *     this.notify.action('some.text', 'button.identifier', () => {
 *         doSomething(); // called on tap button
 *     });
 * }
 *
 */
var NotifyController = /** @class */ (function () {
    function NotifyController(translate, base) {
        this.translate = translate;
        this.base = base;
    }
    NotifyController.prototype.present = function (text, duration, item) {
        if (duration === void 0) { duration = 2000; }
        if (item === void 0) { item = {}; }
        return this.base.create({
            message: this.translate.instant(text, item),
            position: 'middle',
            duration: duration,
        }).present();
    };
    NotifyController.prototype.action = function (text, button, handler, duration) {
        if (duration === void 0) { duration = 4000; }
        var toast = this.base.create({
            message: this.translate.instant(text),
            position: 'top',
            showCloseButton: true,
            closeButtonText: this.translate.instant(button),
            duration: duration,
        });
        toast.onDidDismiss(function (data, role) {
            // on button pressed
            if (role === 'close') {
                handler();
            }
        });
        return toast.present();
    };
    NotifyController = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["d" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* ToastController */]])
    ], NotifyController);
    return NotifyController;
}());

//# sourceMappingURL=notify.controller.js.map

/***/ }),

/***/ 471:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageCreate; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MessageCreate = /** @class */ (function () {
    function MessageCreate(view, params) {
        this.view = view;
        this.params = params;
        this.editable = { subject: true, content: true };
        this.messages = this.params.get('service');
        this.message = this.params.get('message') || {};
        this.header = this.params.get('header') || {};
        this.data = this.params.get('data');
        this.type = this.params.get('type');
        // update flags
        Object.assign(this.editable, this.params.get('editable') || {});
    }
    MessageCreate.prototype.send = function () {
        var _this = this;
        this.processing = true;
        this.messages.submit(this.type, this.message.subject, this.message.content, this.data).then(function () {
            _this.view.dismiss('sent');
        }).finally(function () { return _this.processing = false; });
    };
    MessageCreate = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/messages/message.create.html"*/'<ion-content padding>\n  <button-back label="messages.buttons.cancel"></button-back>\n  <form (submit)="send()" #local="ngForm">\n    <ion-list inset no-lines>\n      <h3 head-3>{{ header.title }}</h3>\n      <p>{{ header.info }}</p>\n      <ion-item>\n        <ion-label stacked>{{ "messages.fields.subject" | translate }}</ion-label>\n        <ion-textarea name="subject" [(ngModel)]="message.subject" rows="3" required [readonly]="!editable.subject"></ion-textarea>\n      </ion-item>\n      <ion-item>\n        <ion-label stacked>{{ "messages.fields.content" | translate }}</ion-label>\n        <ion-textarea  name="content" [(ngModel)]="message.content" [placeholder]="header.placeholder" required [readonly]="!editable.content"></ion-textarea>\n      </ion-item>\n    </ion-list>\n    <button ion-button full color="button-primary" [disabled]="!local.form.valid || processing">{{ \'messages.buttons.submit\' | translate }}</button>\n  </form>\n\n</ion-content>\n'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/messages/message.create.html"*/,
            selector: 'messages-create',
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */]])
    ], MessageCreate);
    return MessageCreate;
}());

//# sourceMappingURL=message.create.js.map

/***/ }),

/***/ 472:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_confirm__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_api__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__index__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_details__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__imprint_page__ = __webpack_require__(473);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__dataprivacy_page__ = __webpack_require__(167);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 *
 */
var SettingsPage = /** @class */ (function () {
    function SettingsPage(details, app, confirm, auth) {
        this.details = details;
        this.app = app;
        this.confirm = confirm;
        this.auth = auth;
        this.pages = {
            profile: __WEBPACK_IMPORTED_MODULE_4__index__["d" /* ProfilePage */],
            imprint: __WEBPACK_IMPORTED_MODULE_6__imprint_page__["a" /* ImprintPage */],
            privacy: __WEBPACK_IMPORTED_MODULE_7__dataprivacy_page__["a" /* DataprivacyPage */],
        };
    }
    SettingsPage.prototype.logout = function () {
        var _this = this;
        this.confirm.create({
            context: 'auth.logout',
            title: 'confirm',
            cancel: true,
            confirm: true,
            onConfirm: function () {
                _this.auth.logout().then(function () {
                    _this.app.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_4__index__["c" /* LoginPage */]);
                });
            },
        }).present();
    };
    SettingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-settings',template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/settings/settings.page.html"*/'<ion-content padding>\n  <ion-list>\n    <button ion-item [navPush]="pages.profile">\n      {{ \'settings.my-profile\' | translate }}\n      <ion-icon name="person" item-end></ion-icon>\n    </button>\n    <button ion-item [navPush]="pages.imprint">{{ \'settings.imprint\' | translate }}</button>\n    <button ion-item [navPush]="pages.privacy">{{ \'settings.dataprivacy\' | translate }}</button>\n    <push-notify-toggle label="push.settings.label-tenders-matching" type="tenders-matching" default=false></push-notify-toggle>\n    <push-notify-toggle label="push.settings.label-coming-checkout" type="coming-checkout" default=true></push-notify-toggle>\n    <button ion-item (click)="logout()">{{ \'auth.logout.action\' | translate }}</button>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/settings/settings.page.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__components_details__["a" /* DetailsController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_2__components_confirm__["a" /* ConfirmController */], __WEBPACK_IMPORTED_MODULE_3__components_api__["a" /* ApiAuthService */]])
    ], SettingsPage);
    return SettingsPage;
}());

//# sourceMappingURL=settings.page.js.map

/***/ }),

/***/ 473:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImprintPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dataprivacy_page__ = __webpack_require__(167);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var ImprintPage = /** @class */ (function () {
    function ImprintPage() {
        this.pages = {
            privacy: __WEBPACK_IMPORTED_MODULE_1__dataprivacy_page__["a" /* DataprivacyPage */],
        };
    }
    ImprintPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/settings/imprint.page.html"*/'<ion-content padding>\n  <button-back label="auth.reset.buttons.back"></button-back>\n  <h1>IMPRESSUM</h1>\n  <h2>KONTAKT</h2>\n  <ion-item no-padding>\n    <div class="col-md-4">\n      <p>AMPLOI ist eine Marke der<br>\n        elevate staffing GmbH</p>\n      <p>Stubenrauchstr. 72</p>\n      <p>12161 Berlin</p>\n    </div>\n    <div class="col-md-4">\n      <p>\n        Telefon +49 (0) 30 30 30 71 56<br>\n        Fax +49 (0) 30 41 76 29 22\n      </p>\n      <p>\n        <a href="mailto:info@amploi.de" title="info@amploi.de">info@amploi.de</a>\n      </p>\n    </div>\n    <ion-item no-lines no-padding>\n      <p>Geschäftsführer:<br>\n        Jonas Willuhn</p>\n      <p>Amtsgericht Berlin-Charlottenburg<br>\n        HRB: 177639B<br>\n        Ust-Ident-Nr. DE307276029</p>\n    </ion-item>\n  </ion-item>\n\n  <h2>RECHTLICHES</h2>\n\n  <h5 head-5>1. INHALT DES ONLINEANGEBOTES</h5>\n  <p>elevate staffing übernimmt keinerlei Gewähr für die Aktualität, Korrektheit, Vollständigkeit oder Qualität der bereitgestellten Informationen. Haftungsansprüche gegen den Autor, welche sich auf Schäden materieller oder ideeller Art beziehen, die durch die Nutzung oder Nichtnutzung der dargebotenen Informationen bzw. durch die Nutzung fehlerhafter und unvollständiger Informationen verursacht wurden, sind grundsätzlich ausgeschlossen, sofern seitens des Autors kein nachweislich vorsätzliches oder grob fahrlässiges Verschulden vorliegt. Alle Angebote sind freibleibend und unverbindlich. elevate staffing behält es sich ausdrücklich vor, Teile der Seiten oder das gesamte Angebot ohne gesonderte Ankündigung zu verändern, zu ergänzen, zu löschen oder die Veröffentlichung zeitweise oder endgültig einzustellen.</p>\n\n  <h5 head-5>2. VERWEISE UND LINKS</h5>\n  <p>Bei direkten oder indirekten Verweisen auf fremde Webseiten ("Hyperlinks"), die außerhalb des Verantwortungsbereiches des Autors liegen, würde eine Haftungsverpflichtung ausschließlich in dem Fall in Kraft treten, in dem elevate staffing von den Inhalten Kenntnis hat und es ihm technisch möglich und zumutbar wäre, die Nutzung im Falle rechtswidriger Inhalte zu verhindern.</p>\n  <p>elevate staffing erklärt hiermit ausdrücklich, dass zum Zeitpunkt der Linksetzung keine illegalen Inhalte auf den zu verlinkenden Seiten erkennbar waren. Auf die aktuelle und zukünftige Gestaltung, die Inhalte oder die Urheberschaft der verlinkten/verknüpften Seiten hat elevate staffing keinerlei Einfluss. Deshalb distanziert er sich hiermit ausdrücklich von allen Inhalten aller verlinkten /verknüpften Seiten, die nach der Linksetzung verändert wurden. Diese Feststellung gilt für alle innerhalb des eigenen Internetangebotes gesetzten Links und Verweise sowie für Fremdeinträge in vom Autor eingerichteten Gästebüchern, Diskussionsforen, Linkverzeichnissen, Mailinglisten und in allen anderen Formen von Datenbanken, auf deren Inhalt externe Schreibzugriffe möglich sind. Für illegale, fehlerhafte oder unvollständige Inhalte und insbesondere für Schäden, die aus der Nutzung oder Nichtnutzung solcherart dargebotener Informationen entstehen, haftet allein der Anbieter der Seite, auf welche verwiesen wurde, nicht derjenige, der über Links auf die jeweilige Veröffentlichung lediglich verweist.</p>\n\n  <h5 head-5>3. URHEBER- UND KENNZEICHENRECHT</h5>\n\n  <p>elevate staffing ist bestrebt, in allen Publikationen die Urheberrechte der verwendeten Bilder, Grafiken, Tondokumente, Videosequenzen und Texte zu beachten, von ihm selbst erstellte Bilder, Grafiken, Tondokumente, Videosequenzen und Texte zu nutzen oder auf lizenzfreie Grafiken, Tondokumente, Videosequenzen und Texte zurückzugreifen.</p>\n  <p>Alle innerhalb des Internetangebotes genannten und ggf. durch Dritte geschützten Marken- und Warenzeichen unterliegen uneingeschränkt den Bestimmungen des jeweils gültigen Kennzeichenrechts und den Besitzrechten der jeweiligen eingetragenen Eigentümer. Allein aufgrund der bloßen Nennung ist nicht der Schluss zu ziehen, dass Markenzeichen nicht durch Rechte Dritter geschützt sind! Das Copyright für veröffentlichte, vom Autor selbst erstellte Objekte bleibt allein beim Autor der Seiten. Eine Vervielfältigung oder Verwendung solcher Grafiken, Tondokumente, Videosequenzen und Texte in anderen elektronischen oder gedruckten Publikationen ist ohne ausdrückliche Zustimmung des Autors nicht gestattet.</p>\n\n  <h5 head-5>4 DATENSCHUTZ</h5>\n  <p>Die aktuelle Datenschutzerklärung kann <a [navPush]="pages.privacy"><u>hier</u></a> eingesehen und ausgedruckt werden.</p>\n\n  <h5 head-5>5. RECHTSWIRKSAMKEIT DIESES HAFTUNGSAUSSCHLUSSES</h5>\n\n  <p>Dieser Haftungsausschluss ist als Teil des Internetangebotes zu betrachten, von dem aus auf diese Seite verwiesen wurde. Sofern Teile oder einzelne Formulierungen dieses Textes der geltenden Rechtslage nicht, nicht mehr oder nicht vollständig entsprechen sollten, bleiben die übrigen Teile des Dokumentes in ihrem Inhalt und ihrer Gültigkeit davon unberührt.</p>\n\n</ion-content>\n'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/settings/imprint.page.html"*/
        })
    ], ImprintPage);
    return ImprintPage;
}());

//# sourceMappingURL=imprint.page.js.map

/***/ }),

/***/ 474:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_loading__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_api__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__profile_service__ = __webpack_require__(168);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 *
 */
var ProfilePage = /** @class */ (function () {
    function ProfilePage(loading, user, freelancer) {
        this.loading = loading;
        this.user = user;
        this.freelancer = freelancer;
        this.fetching = this.loading.create('common.fetching-data', false);
        this.fetching.present();
    }
    ProfilePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.user.current().then(function (user) {
            return _this.freelancer.get(user.roleId()).then(function (profile) {
                _this.profile = profile;
                _this.profile.email = user.email();
                _this.loading.hide(_this.fetching);
            });
        }).catch(function () {
            _this.fetching.dismiss();
        });
    };
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-profile',template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/profile/profile.page.html"*/'<ion-content *ngIf="profile">\n  <button-back label="settings.page-name"></button-back>\n  <div id="picture">\n    <img [pictureLoad]="profile.face_picture_id" />\n  </div>\n  <ion-item>\n    <h3 head-3>{{ \'common.gender.\' + profile.gender | translate }} {{ profile.firstname }} {{ profile.lastname }}</h3>\n    <h4>{{ profile.profession }}</h4>\n    <rating [ngModel]="profile.avg_assignment_rating" [readonly]="true"></rating>\n  </ion-item>\n  <ion-item>\n    <ion-row light text-nowrap>\n      <ion-icon name="home" padding-right></ion-icon>\n      <span>{{ profile.zip }} {{ profile.city }}, {{ profile.country }}</span>\n    </ion-row>\n    <ion-row light text-nowrap>\n      <ion-icon name="pin" padding-right></ion-icon>\n      <span>{{ profile.address }}</span>\n    </ion-row>\n    <ion-row light text-nowrap>\n      <ion-icon name="phone-portrait" padding-right></ion-icon>\n      <span>{{ profile.mobile }}</span>\n    </ion-row>\n    <ion-row light *ngIf="profile.alternative_phone" text-nowrap>\n      <ion-icon name="call" padding-right></ion-icon>\n      <span>{{ profile.alternative_phone }}</span>\n    </ion-row>\n    <ion-row light text-nowrap>\n      <ion-icon name="mail" padding-right></ion-icon>\n      <span>{{ profile.email }}</span>\n    </ion-row>\n    <ion-row light text-nowrap>\n      <ion-icon name="paper" padding-right></ion-icon>\n      <span>{{ \'profile.contract_types.title\' | translate }}</span>\n    </ion-row>\n    <ion-row *ngFor="let type of profile.contract_types || []">\n      <span>{{ \'common.contract_types.\' + type | translate }}</span><br/>\n    </ion-row>\n  </ion-item>\n</ion-content>\n'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/profile/profile.page.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__components_loading__["a" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__components_api__["f" /* ApiUserService */], __WEBPACK_IMPORTED_MODULE_3__profile_service__["a" /* ProfileService */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.page.js.map

/***/ }),

/***/ 475:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CertificatesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__all_certificates_page__ = __webpack_require__(169);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CertificatesPage = /** @class */ (function () {
    function CertificatesPage(events) {
        this.events = events;
        this.tabs = {};
        // then define all types
        this.tabs.all = { title: 'certificates.tabs.all', component: __WEBPACK_IMPORTED_MODULE_2__all_certificates_page__["a" /* AllCertificatesPage */], icon: 'bookmark', params: { type: 'all' } };
        this.tabs.mine = { title: 'certificates.tabs.mine', component: __WEBPACK_IMPORTED_MODULE_2__all_certificates_page__["a" /* AllCertificatesPage */], icon: 'heart', params: { type: 'mine' } };
        this.tabs.exclusive = { title: 'certificates.tabs.exclusive', component: __WEBPACK_IMPORTED_MODULE_2__all_certificates_page__["a" /* AllCertificatesPage */], icon: 'flame', params: { type: 'exclusive' } };
        // event handlers
        this.listenTabSelect();
    }
    CertificatesPage.prototype.listenTabSelect = function () {
        var _this = this;
        this.events.subscribe('tabs:select', function (tab, subtab) {
            if (tab === 'certificates') {
                _this.subtabs.select(_this.tabIndex(subtab));
            }
        });
    };
    CertificatesPage.prototype.tabIndex = function (name) {
        return Object.keys(this.tabs).indexOf(name);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('subtabs'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* Tabs */])
    ], CertificatesPage.prototype, "subtabs", void 0);
    CertificatesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/certificates/certificates.page.html"*/'<ion-content>\n  <ion-tabs tabsPlacement="top" #subtabs>\n    <ion-tab *ngFor="let page of tabs | values" tabTitle="{{ page.title | translate }}" [tabIcon]="page.icon" [root]="page.component" [rootParams]="page.params"></ion-tab>\n  </ion-tabs>\n</ion-content>\n'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/certificates/certificates.page.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Events */]])
    ], CertificatesPage);
    return CertificatesPage;
}());

//# sourceMappingURL=certificates.page.js.map

/***/ }),

/***/ 476:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExamResultPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__exam_main_page__ = __webpack_require__(172);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ExamResultPage = /** @class */ (function () {
    function ExamResultPage(navigation, params) {
        this.navigation = navigation;
        this.params = params;
        this.result = this.params.get('result');
        this.examId = this.params.get('id');
    }
    ExamResultPage.prototype.percentage = function () {
        return ((this.result.questions_ok / this.result.questions) * 100).toFixed(0);
    };
    ExamResultPage.prototype.restartTest = function () {
        this.navigation.push(__WEBPACK_IMPORTED_MODULE_2__exam_main_page__["a" /* ExamMainPage */], { id: this.examId });
    };
    ExamResultPage.prototype.backToTrainings = function () {
        this.navigation.popTo(this.navigation.getByIndex(0));
    };
    ExamResultPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-exam-result',template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/exam/exam.result.page.html"*/'<ion-content padding>\n  <div class="result">\n    <div text-center>\n      <ion-item text-center text-wrap>\n        <ion-icon name="{{ result.passed ? \'ios-checkmark-circle-outline\' : \'ios-sad-outline\' }}"></ion-icon>\n        {{ \'exam.results.\' + (result.passed ? \'passed\' : \'failed\') | translate }}\n      </ion-item>\n      <ion-item class="result" no-lines text-center text-wrap>\n        <h3 class="percents">{{ percentage() }}%</h3>\n        <p>{{ \'exam.results.questions\' | translate }}: {{ result.questions }}</p>\n        <p>{{ \'exam.results.correct\' | translate }}: {{ result.questions_ok }}</p>\n        <p>{{ \'exam.results.wrong\' | translate }}: {{ result.questions_nok }}</p>\n      </ion-item>\n      <ion-item *ngIf="!result.passed" class="nok-questions" no-lines text-wrap>\n        <p>{{ \'exam.results.failed-questions\' | translate }}</p>\n        <ul>\n          <li *ngFor="let question of result.question_nok_questions" [innerHTML]="question"></li>\n        </ul>\n      </ion-item>\n\n      <button *ngIf="!result.passed" color="button-primary" ion-button solid full (click)="restartTest()">\n        {{ \'exam.results.restart-test\' | translate }}\n      </button>\n      <button *ngIf="!result.passed" color="default" ion-button clear float-right (click)="backToTrainings()">\n        {{ \'exam.results.back-to-training\' | translate }}\n      </button>\n      <button *ngIf="result.passed" color="button-primary" ion-button solid full\n              tabSwitch="certificates" dismissModal="true">\n        {{ \'exam.results.back-to-certificates\' | translate }}\n      </button>\n    </div>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/exam/exam.result.page.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */]])
    ], ExamResultPage);
    return ExamResultPage;
}());

//# sourceMappingURL=exam.result.page.js.map

/***/ }),

/***/ 477:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExamService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_api__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 *
 */
var ExamService = /** @class */ (function () {
    function ExamService(api) {
        this.api = api;
    }
    /**
     * Gets exam object
     *
     * @param examId
     */
    ExamService.prototype.get = function (examId) {
        var _this = this;
        var options = {
            includes: ['exam', 'exam.questions', 'exam.questions.answers', 'exam.certificate.training']
        };
        return this.api.promised(this.api.getExam({ id: examId }, options)).then(function (data) {
            return _this.transform(data);
        });
    };
    /**
     * Submits the exam instance
     *
     * @param instanceId Exam instance id
     * @param answers
     *
     */
    ExamService.prototype.submitTest = function (instanceId, answers) {
        return this.api.promised(this.api.submitTest({ exam_instance_id: instanceId, answers: answers }));
    };
    /**
     * Transforms exam data
     */
    ExamService.prototype.transform = function (data) {
        var exam = data.exam.data;
        return Object.assign(data, {
            exam: exam,
            questions: exam.questions.data.map(function (item) {
                return {
                    text: item.question,
                    answers: item.answers.data,
                };
            })
        });
    };
    ExamService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__components_api__["g" /* NewApiService */]])
    ], ExamService);
    return ExamService;
}());

//# sourceMappingURL=exam.service.js.map

/***/ }),

/***/ 478:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BillsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__preparation_preparation_page__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__invoices_invoices_page__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__invoices_create_invoice__ = __webpack_require__(486);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BillsPage = /** @class */ (function () {
    function BillsPage(events) {
        this.events = events;
        this.tabs = {};
        this.tabs.preparation = { title: 'bills.preparation.tab-name', component: __WEBPACK_IMPORTED_MODULE_2__preparation_preparation_page__["a" /* PreparationPage */], icon: 'clipboard' };
        this.tabs.invoice = { title: 'bills.invoice.tab-name', component: __WEBPACK_IMPORTED_MODULE_4__invoices_create_invoice__["a" /* CreateInvoicePage */], icon: 'create' };
        this.tabs.invoices = { title: 'bills.invoices.tab-name', component: __WEBPACK_IMPORTED_MODULE_3__invoices_invoices_page__["a" /* InvoicesPage */], icon: 'filing' };
        this.listenTabSelect();
    }
    BillsPage.prototype.listenTabSelect = function () {
        var _this = this;
        this.events.subscribe('tabs:select', function (tab, subtab) {
            if (tab === 'bills') {
                _this.subtabs.select(_this.tabIndex(subtab));
            }
        });
    };
    BillsPage.prototype.tabIndex = function (name) {
        return Object.keys(this.tabs).indexOf(name);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('subtabs'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* Tabs */])
    ], BillsPage.prototype, "subtabs", void 0);
    BillsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-bills',template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/bills/bills.page.html"*/'<ion-content>\n  <ion-tabs tabsPlacement="top" #subtabs>\n    <ion-tab *ngFor="let page of tabs | values" tabTitle="{{ page.title | translate }}" [tabIcon]="page.icon" [root]="page.component"></ion-tab>\n  </ion-tabs>\n</ion-content>'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/bills/bills.page.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Events */]])
    ], BillsPage);
    return BillsPage;
}());

//# sourceMappingURL=bills.page.js.map

/***/ }),

/***/ 479:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SurveyType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SurveyModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__navigation__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__validators__ = __webpack_require__(480);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__survey_service__ = __webpack_require__(482);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__survey_page__ = __webpack_require__(483);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var SurveyType = {
    Questionnaire: 'questionnaire',
    Feedback: 'feedback',
};
var Components = [
    __WEBPACK_IMPORTED_MODULE_6__survey_page__["a" /* SurveyPage */],
];
var SurveyModule = /** @class */ (function () {
    function SurveyModule() {
    }
    SurveyModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: Components,
            entryComponents: Components,
            exports: Components,
            imports: [
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_6__survey_page__["a" /* SurveyPage */]),
                __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_3__navigation__["a" /* NavigationModule */],
                __WEBPACK_IMPORTED_MODULE_4__validators__["a" /* ValidatorsModule */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__survey_service__["a" /* SurveyService */],
            ],
        })
    ], SurveyModule);
    return SurveyModule;
}());

//# sourceMappingURL=survey.module.js.map

/***/ }),

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BasePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_collection__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * "Abstract" base page component to share init entry for page - showing loader, fetching data, etc.
 * Page template has to have #refresher ref
 *
 * Derived class contstructor must inject
 * `protected translate: TranslateService, protected loading: LoadingController, protected renderer: Renderer2, protected user: ApiUserService`
 * and call
 * `super(translate, loading, renderer, user);`
 *
 */
var BasePage = /** @class */ (function () {
    function BasePage(translate, loading, renderer, user) {
        this.translate = translate;
        this.loading = loading;
        this.renderer = renderer;
        this.user = user;
        this.filtered = {};
        this.moreItems = false;
    }
    BasePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.user.current().then(function (user) {
            _this.profile = user;
            // omit initial load if filtered - will be triggered from there
            if (!_this.filters) {
                _this.load();
            }
        });
    };
    BasePage.prototype.load = function () {
        var _this = this;
        this.fetching = this.loading.create('common.fetching-data', false);
        this.fetching.present();
        return this.fetch().then(function () {
            _this.loading.hide(_this.fetching, 100);
        });
    };
    BasePage.prototype.filter = function (filtered) {
        this.filtered = filtered;
        this.load();
    };
    BasePage.prototype.onFilterOpened = function (isOpen) {
        this.filterOpened = isOpen;
    };
    BasePage.prototype.fetch = function (loaded, load) {
        return new Promise(function () { return true; });
    };
    BasePage.prototype.doRefresh = function (refresher) {
        if (!refresher) {
            refresher = this.loading.showRefresher(this.renderer, this.refresher);
        }
        this.fetch()
            .then(function () { return refresher && refresher.complete(); })
            .catch(function () { return refresher && refresher.complete(); });
    };
    BasePage.prototype.ionViewWillLeave = function () {
        this.loading.hide(this.fetching);
    };
    BasePage.prototype.setItems = function (current, items, property) {
        if (property === void 0) { property = 'id'; }
        this.items = __WEBPACK_IMPORTED_MODULE_1__utils_collection__["a" /* Collection */].unique((current ? this.items : []).concat(items.data || items), property);
        this.moreItems = !items.meta || this.items.length < items.meta.pagination.total;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('refresher'),
        __metadata("design:type", Object)
    ], BasePage.prototype, "refresher", void 0);
    return BasePage;
}());

//# sourceMappingURL=base.page.js.map

/***/ }),

/***/ 480:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__validators_module__ = __webpack_require__(664);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__currency_validator__ = __webpack_require__(481);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__validators_module__["a"]; });
/* unused harmony reexport CurrencyValidator */



//# sourceMappingURL=index.js.map

/***/ }),

/***/ 481:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export validateCurrency */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CurrencyValidator; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(23);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var pattern = /^[+-]?([0]|[1-9][0-9]{0,9}([\\.,]{1}[0-9]{1,2})?|[0][\\.,]{1}[0-9]{1,2})$/;
var error = { currency: true };
function validateCurrency(input) {
    return (input.value === null || input.value === '') || String(input.value).length && pattern.test(input.value) ? null : error;
}
var CurrencyValidator = /** @class */ (function () {
    function CurrencyValidator() {
    }
    CurrencyValidator = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[validateCurrency][ngModel]',
            providers: [
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["NG_VALIDATORS"], useValue: validateCurrency, multi: true },
            ]
        })
    ], CurrencyValidator);
    return CurrencyValidator;
}());

//# sourceMappingURL=currency.validator.js.map

/***/ }),

/***/ 482:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SurveyService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_collection__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


/**
 *
 */
var SurveyService = /** @class */ (function () {
    function SurveyService() {
    }
    /**
     * Transforms questionnaire data to internal survey model
     *
     * @param data
     * @param type
     */
    SurveyService.prototype.transform = function (data, type) {
        if (data[type]) {
            var instance = type + "_instance";
            data[type] = {
                id: data[type].id,
                questions: data[instance] && data[instance].instance || data[type].questionnaire || data[type] || [],
                instance: data[instance] && data[instance].id,
                approval: data[instance] && data[instance].approval && data[instance].approval.data,
                type: type,
            };
        }
    };
    /**
     * Prepares internal survey model to api survey instance data/request model
     *
     * @param data
     */
    SurveyService.prototype.prepare = function (data) {
        return {
            id: data.instance,
            type: data.type,
            instance: (data.questions || []).map(function (item) { return __WEBPACK_IMPORTED_MODULE_1__utils_collection__["a" /* Collection */].only(item, ['question', 'answer', 'type', 'comment']); })
        };
    };
    SurveyService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], SurveyService);
    return SurveyService;
}());

//# sourceMappingURL=survey.service.js.map

/***/ }),

/***/ 483:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SurveyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_collection__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__survey_module__ = __webpack_require__(479);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * @name SurveyPage
 * @description
 * A SurveyPage is a ionic modal page to display survey data.
 *
 * @note Service has transform/prepare adapted to feedback/questionnaire datamodel.
 *
 * @usage
 * ```ts
 * import { DetailsController } from '../components/details';
 * import { SurveyPage, SurveyService, SurveyType } from '../components/survey';
 *
 * constructor(private modal: DetailsController, private surveys: SurveyService) {
 * }
 *
 * someAction() {
 *     const data = {
 *         questionnaire: { id: 1, questionnaire: [{question: ...}] },
 *         questionnaire_instance: { id: 1, instance: [{question: ...}] },
 *         feedback: [{question: ...}],
 *         feedback_instance: { id: 1, instance: [{question: ...}] },
 *     };
 *     // to transform api data to internal survey model - expecting as above
 *     const questionnaire = this.surveys.transform(quest, SurveyType.Questionnaire);
 *     const modal: Modal = this.modal.open(SurveyPage, {
 *           // definition with survey id, questions, instance (if already exists)
 *           instance: questionnaire,
 *           // save handler getting filled in data - returning promise - once resolved will dismiss the survey page
 *           save: (data: ISurvey) => this.someHandler(data),
 *       });
 *   // then on dismiss (called with save handler response) some operation available
 *   modal.onDidDismiss((instance) => doSomething());
 * }
 *
 * someHandler(data: ISurvey): Promise<any> {
 *     // to prepare internal survey model to api one
 *     const params = this.surveys.prepare(data);
 *     // ... call api method
 * }
 *
 */
var SurveyPage = /** @class */ (function () {
    function SurveyPage(navigation, view, translate, params) {
        this.navigation = navigation;
        this.view = view;
        this.translate = translate;
        this.params = params;
        // get params
        this.instance = __WEBPACK_IMPORTED_MODULE_3__utils_collection__["a" /* Collection */].copy(this.params.get('instance'));
        this.save = this.params.get('save');
    }
    SurveyPage.prototype.onSubmit = function () {
        var _this = this;
        this.processing = true;
        this.save(this.instance)
            .then(function () { return _this.view.dismiss(_this.instance); })
            .finally(function () { return _this.processing = false; });
    };
    SurveyPage.prototype.disagreeCommentRequired = function (question) {
        return this.instance.type === __WEBPACK_IMPORTED_MODULE_4__survey_module__["b" /* SurveyType */].Questionnaire && (question.answer === 'false' || question.answer === false);
    };
    SurveyPage.prototype.answersDone = function () {
        return this.instance.questions.filter(function (q) { return q.answer !== undefined && q.answer !== ''; }).length === this.instance.questions.length;
    };
    SurveyPage.prototype.disagreeCommentsDone = function () {
        return this.instance.type === __WEBPACK_IMPORTED_MODULE_4__survey_module__["b" /* SurveyType */].Questionnaire ?
            this.instance.questions.filter(function (q) { return (q.answer === false || q.answer === 'false') && !q.comment; }).length === 0 :
            undefined;
    };
    SurveyPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-survey',template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/components/survey/survey.page.html"*/'<ion-content padding>\n\n  <button-back label="survey.abort"></button-back>\n\n  <h4>{{ \'survey.\' + instance.type + \'.title\' | translate }} </h4>\n  <p>{{ \'survey.\' + instance.type + \'.description\' | translate }} </p>\n\n  <form #form="ngForm" (ngSubmit)="onSubmit()" no-lines>\n    <ion-item-group *ngFor="let item of instance.questions; let i = index;" no-lines>\n      <ion-list-header no-lines>{{ \'survey.\' + instance.type + \'.question\' | translate : { num: i + 1 } }}</ion-list-header>\n      <ion-item text-wrap no-lines no-padding class="question">{{ item.question }}</ion-item>\n      <ion-item *ngIf="item.type === \'boolean\'" no-lines class="answer" no-padding>\n        <ion-grid item-content>\n          <ion-row radio-group [(ngModel)]="item.answer" [name]="\'answer-\' + i" required>\n            <ion-col col-6>\n              <ion-item no-lines>\n                <ion-label>{{ \'survey.\' + instance.type + \'.answer.true\' | translate }}</ion-label>\n                <ion-radio value="true" mode="md" item-left></ion-radio>\n              </ion-item>\n            </ion-col>\n            <ion-col col-6>\n              <ion-item no-lines>\n                <ion-label>{{ \'survey.\' + instance.type + \'.answer.false\' | translate }}</ion-label>\n                <ion-radio value="false" mode="md" item-left></ion-radio>\n              </ion-item>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-item>\n      <ion-item *ngIf="item.type === \'string\'" class="answer" no-padding>\n        <ion-label stacked color="gray">{{ \'survey.\' + instance.type + \'.answer.label\' | translate : { num: i + 1 } }}</ion-label>\n        <ion-textarea [(ngModel)]="item.answer" [name]="\'answer-\' + i" required\n            [placeholder]="\'survey.\' + instance.type + \'.answer.required\' | translate">\n        </ion-textarea>\n      </ion-item>\n      <ion-item *ngIf="item.type !== \'string\'" class="comment" no-padding>\n        <ion-label stacked color="gray">{{ \'survey.\' + instance.type + \'.comment.label\' | translate : { num: i + 1 } }}</ion-label>\n        <ion-textarea [(ngModel)]="item.comment" [name]="\'comment-\' + i" [required]="disagreeCommentRequired(item)"\n            [placeholder]="disagreeCommentRequired(item) ? (\'survey.\' + instance.type + \'.comment.required\' | translate) : \'\'">\n        </ion-textarea>\n      </ion-item>\n    </ion-item-group>\n    <ion-item no-lines no-padding class="submit">\n      <submit-validator context="survey" [check]="{\n        \'answer-missing\': answersDone(),\n        \'disagree-comment-missing\': disagreeCommentsDone()\n      }">\n      </submit-validator>\n      <button ion-button color="button-primary" type="submit" block [disabled]="processing">\n        {{ \'survey.\' + instance.type + \'.submit\' | translate }}\n      </button>\n    </ion-item>\n  </form>\n\n</ion-content>\n'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/components/survey/survey.page.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["d" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */]])
    ], SurveyPage);
    return SurveyPage;
}());

//# sourceMappingURL=survey.page.js.map

/***/ }),

/***/ 484:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RevenueReportDetails; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_is__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_collection__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RevenueReportDetails = /** @class */ (function () {
    function RevenueReportDetails(params, view, currency) {
        this.params = params;
        this.view = view;
        this.currency = currency;
        this.assignment = this.params.get('assignment');
        this.saleslots = this.assignment.saleslots;
        this.disabled = this.params.get('disabled');
        this.revenue = __WEBPACK_IMPORTED_MODULE_4__utils_collection__["a" /* Collection */].copy(this.assignment.revenue);
    }
    RevenueReportDetails.prototype.ngOnInit = function () {
        var _this = this;
        var mapped = {};
        if (!this.revenue || __WEBPACK_IMPORTED_MODULE_3__utils_is__["a" /* Is */].empty(this.revenue)) {
            this.revenue = {
                sales_volume: this.saleslots.map(function (slot) { return ({ saleslot: slot.name, value: 0 }); })
            };
        }
        else {
            // map existing slots
            this.revenue.sales_volume.forEach(function (slot, idx) { return mapped[slot.saleslot] = idx; });
            // check if something other in revenue
            this.saleslots.forEach(function (slot) {
                if (mapped[slot.name] === undefined) {
                    var idx = _this.revenue.sales_volume.push({ saleslot: slot.name, value: 0 });
                    mapped[slot.name] = idx - 1;
                }
            });
        }
    };
    RevenueReportDetails.prototype.onSet = function () {
        this.view.dismiss(Object.assign(this.revenue, { changed: true, sum: this.sum(this.revenue) }));
    };
    RevenueReportDetails.prototype.sum = function (revenue) {
        var values = __WEBPACK_IMPORTED_MODULE_4__utils_collection__["a" /* Collection */].pluck(revenue && revenue.sales_volume, 'value');
        var sum = values.reduce(function (acc, item) { return acc + Number(item); }, 0);
        return revenue && this.currency.transform(sum, 'EUR', true) || '';
    };
    RevenueReportDetails = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/bills/preparation/revenue.report.details.html"*/'<ion-content padding>\n  <button-back label="bills.preparation.details.back"></button-back>\n\n  <ion-item class="head">\n    <h2 text-wrap head-2>{{ \'bills.preparation.details.revenue.headline\' | translate }}</h2>\n  </ion-item>\n\n  <form #form="ngForm">\n\n    <ion-item *ngFor="let slot of revenue.sales_volume; let i = index;" class="revenue">\n      <ion-label text-nowrap>{{ slot.saleslot }}</ion-label>\n      <ion-input type="number" [(ngModel)]="slot.value" validateCurrency [readonly]="disabled" [name]="\'rev-\' + i">\n      </ion-input>\n    </ion-item>\n\n    <ion-item text-wrap no-lines>\n      <button ion-button full solid strong color="button-primary" (click)="onSet()" [attr.disabled]="!form.valid || disabled || undefined">\n        {{ \'bills.preparation.details.revenue.set\' | translate }}\n      </button>\n    </ion-item>\n  </form>\n</ion-content>\n'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/bills/preparation/revenue.report.details.html"*/,
            selector: 'revenue-report-details',
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["p" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["v" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1__angular_common__["CurrencyPipe"]])
    ], RevenueReportDetails);
    return RevenueReportDetails;
}());

//# sourceMappingURL=revenue.report.details.js.map

/***/ }),

/***/ 485:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GenerateInvoiceDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_collection__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_is__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__profile_profile_service__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_confirm__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__incentive__ = __webpack_require__(666);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__invoices_service__ = __webpack_require__(49);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var GenerateInvoiceDetailsPage = /** @class */ (function () {
    function GenerateInvoiceDetailsPage(params, view, freelancer, confirm, invoices, currency) {
        var _this = this;
        this.params = params;
        this.view = view;
        this.freelancer = freelancer;
        this.confirm = confirm;
        this.invoices = invoices;
        this.currency = currency;
        this.assignments = [];
        this.addresses = { selected: 0 };
        this.profile = this.params.get('profile');
        this.invoice = this.params.get('invoice');
        var chosen = this.params.get('selected');
        // only selected
        this.assignments = __WEBPACK_IMPORTED_MODULE_3__utils_collection__["a" /* Collection */].copy(this.params.get('assignments').filter(function (item) { return chosen.includes(item.id); }));
        // preparing charging parts
        this.assignments.forEach(function (item) {
            var incentives = item.incentives ||
                item.incentive_model && Object.values(__WEBPACK_IMPORTED_MODULE_3__utils_collection__["a" /* Collection */].only(item.incentive_model, __WEBPACK_IMPORTED_MODULE_7__incentive__["a" /* Incentive */].types(), __WEBPACK_IMPORTED_MODULE_7__incentive__["a" /* Incentive */].transform));
            var costs_on_time = item.costs_on_time
                || { value: parseFloat(item.min_estimated_costs).toFixed(2), disabled: !item.wage || parseFloat(item.wage) === 0 };
            Object.assign(item, { incentives: incentives, costs_on_time: costs_on_time });
        });
        // get full profile for addresses
        this.freelancer.get(this.profile.roleId()).then(function (profile) {
            _this.addresses.list = profile.addresses;
        });
    }
    GenerateInvoiceDetailsPage.prototype.total = function () {
        var _this = this;
        this.assignments.forEach(function (item) {
            var ratio = __WEBPACK_IMPORTED_MODULE_4__utils_is__["a" /* Is */].true(_this.invoice.includes_taxes) ? (item.vat) / 100 : 0;
            item.costs_summary =
                parseFloat(item.costs_on_time.value) +
                    (item.incentives || []).reduce(_this.onlySelectedValue, 0) +
                    (item.additional_costs || []).reduce(_this.onlySelectedValue, 0);
            item.taxes = Math.round(item.costs_summary * 100 * ratio) / 100;
        });
        var net = __WEBPACK_IMPORTED_MODULE_3__utils_collection__["a" /* Collection */].sum(this.assignments, 'costs_summary');
        var vat = __WEBPACK_IMPORTED_MODULE_3__utils_collection__["a" /* Collection */].sum(this.assignments, 'taxes');
        var gross = Math.round(100 * (vat + net)) / 100;
        return { net: net, gross: gross, vat: vat };
    };
    GenerateInvoiceDetailsPage.prototype.onGenerate = function () {
        var _this = this;
        this.confirm.create({
            context: 'bills.generate',
            title: 'confirm',
            message: 'message',
            item: {
                number: this.invoice.number,
                total: this.currency.transform(this.total().gross, 'EUR', true),
            },
            confirm: true,
            cancel: true,
            onConfirm: function () { return _this.onGenerateConfirmed(); },
        }).present();
    };
    GenerateInvoiceDetailsPage.prototype.onGenerateConfirmed = function () {
        var _this = this;
        var total = this.total();
        return this.invoices.generate(this.profile.roleId(), this.invoice, this.assignments, total, this.addresses.selected).then(function (document) {
            _this.view.dismiss({ assignments: _this.assignments, document: document, total: total });
        });
    };
    GenerateInvoiceDetailsPage.prototype.onlySelectedValue = function (prev, item) {
        return prev + (item && item.selected && parseFloat(item.value) || 0);
    };
    GenerateInvoiceDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'generate-invoice-details',template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/bills/invoices/generate.invoice.details.html"*/'<ion-content padding>\n  <button-back label="bills.generate.buttons.cancel"></button-back>\n\n  <ion-item class="head" no-lines>\n    <h2 head-2>{{ \'bills.generate.title\' | translate }}</h2>\n  </ion-item>\n\n  <form #form="ngForm">\n    <ion-item-group *ngFor="let assignment of assignments; let i = index;">\n      <ion-item class="head">\n        <h3 head-3>{{ assignment.start_at | amDateFormat : \'DD.MM.YYYY\' }}</h3>\n      </ion-item>\n      <ion-item text-wrap>\n        <ion-label>{{ \'bills.generate.costs-on-time\' | translate }}</ion-label>\n        <ion-input type="number" class="currency-input" [(ngModel)]="assignment.costs_on_time.value" validateCurrency [name]="\'costs_on_time_\' + i" required\n          [disabled]="assignment.costs_on_time.disabled">\n        </ion-input>\n      </ion-item>\n      <ion-item *ngIf="assignment.additional_costs">\n        <h5 head-5>{{ \'bills.generate.additional-costs\' | translate }}</h5>\n        <ion-item-group>\n          <ion-item *ngFor="let cost of assignment.additional_costs" no-lines>\n            <ion-checkbox [(ngModel)]="cost.selected" [ngModelOptions]="{standalone: true}" item-start></ion-checkbox>\n            <p item-content>{{ cost.name }}</p>\n            <p item-end>{{ cost.value | toCurrency }}</p>\n          </ion-item>\n        </ion-item-group>\n      </ion-item>\n      <ion-item *ngIf="assignment.incentives">\n        <h5 head-5>{{ \'bills.generate.incentives\' | translate }}</h5>\n        <ion-item-group>\n          <ion-item *ngFor="let incentive of assignment.incentives" no-lines>\n            <ion-checkbox [(ngModel)]="incentive.selected" [ngModelOptions]="{standalone: true}" item-start></ion-checkbox>\n            <p item-content>{{ \'bills.incentives.\' + incentive.name | translate }}</p>\n            <p item-end>{{ incentive.value | toCurrency }}</p>\n          </ion-item>\n        </ion-item-group>\n      </ion-item>\n    </ion-item-group>\n\n    <ion-row *ngIf="invoice.includes_taxes === \'true\'">\n      <ion-item class="head">\n        <ion-label>{{ \'bills.generate.net\' | translate }}</ion-label>\n        <div item-end>{{ total().net | toCurrency }}</div>\n      </ion-item>\n      <ion-item class="head">\n        <ion-label>{{ \'bills.generate.vat\' | translate }}</ion-label>\n        <div item-end>{{ total().vat | toCurrency }}</div>\n      </ion-item>\n      <ion-item class="head">\n        <ion-label>{{ \'bills.generate.gross\' | translate }}</ion-label>\n        <div item-end>{{ total().gross | toCurrency }}</div>\n      </ion-item>\n    </ion-row>\n\n    <ion-item class="head" *ngIf="invoice.includes_taxes === \'false\'">\n      <ion-label>{{ \'bills.generate.total\' | translate }}</ion-label>\n      <div item-end>{{ total().gross | toCurrency }}</div>\n    </ion-item>\n\n    <ion-item-group radio-group [(ngModel)]="addresses.selected" name="address-index" required>\n      <ion-item class="head" text-wrap no-lines>\n        {{ \'bills.generate.select-address\' | translate }}\n      </ion-item>\n      <ng-container *ngIf="addresses.list">\n        <ion-item *ngFor="let address of addresses.list; let i = index;" text-wrap>\n          <ion-radio item-end [value]="i" mode="md"></ion-radio>\n          <address item-content>\n            <span>{{ address.address }}</span><br>\n            <span *ngIf="address.addressaddition">\n              {{ address.addressaddition }}<br>\n            </span>\n            <span>{{ address.zip }}</span> <span>{{ address.city }}</span><br>\n          </address>\n        </ion-item>\n      </ng-container>\n      <ion-item *ngIf="!addresses.list">\n        <ion-spinner></ion-spinner>\n      </ion-item>\n    </ion-item-group>\n\n    <button ion-button full color="button-primary" (click)="onGenerate()" [disabled]="!form.valid">\n      {{ \'bills.generate.buttons.generate\' | translate }}\n    </button>\n  </form>\n</ion-content>\n'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/bills/invoices/generate.invoice.details.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["p" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["v" /* ViewController */], __WEBPACK_IMPORTED_MODULE_5__profile_profile_service__["a" /* ProfileService */], __WEBPACK_IMPORTED_MODULE_6__components_confirm__["a" /* ConfirmController */],
            __WEBPACK_IMPORTED_MODULE_8__invoices_service__["a" /* InvoicesService */], __WEBPACK_IMPORTED_MODULE_1__angular_common__["CurrencyPipe"]])
    ], GenerateInvoiceDetailsPage);
    return GenerateInvoiceDetailsPage;
}());

//# sourceMappingURL=generate.invoice.details.js.map

/***/ }),

/***/ 486:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateInvoicePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base_page__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_details__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_loading__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_api__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_app_animations__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__invoices_service__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__create_invoice_details__ = __webpack_require__(178);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var CreateInvoicePage = /** @class */ (function (_super) {
    __extends(CreateInvoicePage, _super);
    function CreateInvoicePage(translate, loading, user, renderer, details, invoices) {
        var _this = _super.call(this, translate, loading, renderer, user) || this;
        _this.translate = translate;
        _this.loading = loading;
        _this.user = user;
        _this.renderer = renderer;
        _this.details = details;
        _this.invoices = invoices;
        _this.jobs = undefined;
        return _this;
    }
    CreateInvoicePage.prototype.fetch = function (loaded, load) {
        var _this = this;
        if (load === void 0) { load = 10; }
        return this.invoices.jobs(this.profile.roleId(), 'invoiceable', loaded && loaded.length, load).then(function (jobs) { return _this.setItems(loaded, jobs); });
    };
    CreateInvoicePage.prototype.showDetails = function (selected) {
        var _this = this;
        var modal = this.details.open(__WEBPACK_IMPORTED_MODULE_8__create_invoice_details__["a" /* CreateInvoiceDetailsPage */], { job: selected, profile: this.profile });
        modal.onDidDismiss(function (job) {
            // means submitted
            if (job) {
                _this.doRefresh();
            }
        });
    };
    CreateInvoicePage.prototype.doRefresh = function (refresher) {
        _super.prototype.doRefresh.call(this, refresher);
    };
    CreateInvoicePage.prototype.onChange = function (job) {
        this.doRefresh();
    };
    CreateInvoicePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'create-invoice',template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/bills/invoices/create.invoice.html"*/'<ion-content>\n  <ion-refresher (ionRefresh)="doRefresh($event);" #refresher>\n    <ion-refresher-content pulling-icon="ion-arrow-down-b positive" spinner="crescent" pullingText="{{ \'common.pull-to-refresh\' | translate }}"\n      refreshingText="{{ \'common.refreshing\' | translate }}">\n    </ion-refresher-content>\n  </ion-refresher>\n\n  <ion-list no-lines *ngIf="items && items.length">\n    <tender-item *ngFor="let job of items" [tender]="job" tappable (click)="showDetails(job)" (changed)="onChange($event)" [@softItem]></tender-item>\n    <ion-infinite-scroll (ionInfinite)="$event.waitFor(fetch(items, 10))" [enabled]="moreItems">\n      <ion-infinite-scroll-content loadingSpinner="crescent" loadingText="{{ \'common.fetching-data\' | translate }}">\n      </ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n  </ion-list>\n\n  <nothing-found *ngIf="items && !items.length" context="bills.invoice.nothing-found" redirect="bills:preparation"></nothing-found>\n</ion-content>\n'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/bills/invoices/create.invoice.html"*/,
            animations: __WEBPACK_IMPORTED_MODULE_6__app_app_animations__["a" /* animations */]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["d" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_4__components_loading__["a" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_5__components_api__["f" /* ApiUserService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer2"],
            __WEBPACK_IMPORTED_MODULE_3__components_details__["a" /* DetailsController */], __WEBPACK_IMPORTED_MODULE_7__invoices_service__["a" /* InvoicesService */]])
    ], CreateInvoicePage);
    return CreateInvoicePage;
}(__WEBPACK_IMPORTED_MODULE_2__base_page__["a" /* BasePage */]));

//# sourceMappingURL=create.invoice.js.map

/***/ }),

/***/ 487:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JobsMainPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__jobs_page__ = __webpack_require__(166);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var JobsMainPage = /** @class */ (function () {
    function JobsMainPage(events) {
        var _this = this;
        this.events = events;
        this.tabs = {};
        // types for tabs with icon config
        var types = { matched: 'heart', offers: 'open', unmatched: 'more' };
        // then define all types
        Object.keys(types).forEach(function (type) {
            // tslint:disable-next-line object-literal-shorthand
            _this.tabs[type] = { title: "jobs." + type, component: __WEBPACK_IMPORTED_MODULE_2__jobs_page__["a" /* JobsPage */], icon: types[type], params: { type: type } };
        });
        // event handlers
        this.listenNotification();
        this.listenTabSelect();
    }
    JobsMainPage.prototype.listenNotification = function () {
        var _this = this;
        this.events.subscribe('push:notification', function (type) {
            if (['tenders-matching'].includes(type)) {
                _this.subtabs.select(_this.tabIndex('matched'));
            }
        });
    };
    JobsMainPage.prototype.listenTabSelect = function () {
        var _this = this;
        this.events.subscribe('tabs:select', function (tab, subtab) {
            if (tab === 'jobs') {
                _this.subtabs.select(_this.tabIndex(subtab));
            }
        });
    };
    JobsMainPage.prototype.tabIndex = function (name) {
        return Object.keys(this.tabs).indexOf(name);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('subtabs'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* Tabs */])
    ], JobsMainPage.prototype, "subtabs", void 0);
    JobsMainPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'jobs-main-page',template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/jobs/jobs.main.page.html"*/'<ion-content>\n  <ion-tabs tabsPlacement="top" #subtabs>\n    <ion-tab *ngFor="let page of tabs | values" tabTitle="{{ page.title | translate }}" [tabIcon]="page.icon"\n      [root]="page.component" [rootParams]="page.params">\n    </ion-tab>\n  </ion-tabs>\n</ion-content>\n'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/jobs/jobs.main.page.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Events */]])
    ], JobsMainPage);
    return JobsMainPage;
}());

//# sourceMappingURL=jobs.main.page.js.map

/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InvoicesService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_api__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_collection__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_format__ = __webpack_require__(69);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 *
 */
var InvoicesService = /** @class */ (function () {
    function InvoicesService(api, resources) {
        this.api = api;
        this.resources = resources;
    }
    /**
     * Gets list of invoices for given freelancer
     *
     * @param freelancerId
     */
    InvoicesService.prototype.list = function (freelancerId, offset, limit, filtered) {
        var _this = this;
        var options = {
            includes: ['document', 'assignments.date.job.site', 'creator', 'assignments.documents', 'approval'],
            order: { issued_at: 'desc' },
            paging: { offset: offset, limit: limit },
            params: {
                date_from: __WEBPACK_IMPORTED_MODULE_1__components_api__["c" /* ApiPrepare */].datetime(filtered && filtered.dates && filtered.dates.start),
                date_to: __WEBPACK_IMPORTED_MODULE_1__components_api__["c" /* ApiPrepare */].datetime(filtered && filtered.dates && filtered.dates.end),
                state: filtered && filtered.state || undefined,
            },
            search: filtered.search
        };
        return this.api.promised(this.api.getFreelancerInvoices({ freelancerId: freelancerId }, options), undefined, true).then(function (resp) {
            return {
                data: resp.data.map(function (item) { return _this.transform(item); }),
                meta: resp.meta
            };
        });
    };
    /**
     * Gets single invoice
     *
     * @param freelancerId
     * @param invoiceId
     */
    InvoicesService.prototype.get = function (freelancerId, invoiceId) {
        var _this = this;
        var options = {
            includes: ['document', 'assignments.incentive_model', 'assignments.date.job.site', 'creator', 'approval'],
        };
        return this.api.promised(this.api.getInvoice({ freelancerId: freelancerId, invoiceId: invoiceId }, options)).then(function (data) {
            return _this.transform(data);
        });
    };
    /**
     * Gets single invoice by assignment_id
     *
     * @param freelancerId
     * @param assignmentId
     */
    InvoicesService.prototype.getByAssignment = function (freelancerId, assignmentId) {
        var _this = this;
        var options = {
            includes: ['invoices.document', 'invoices.assignments.incentive_model', 'invoices.assignments.date.job.site',
                'invoices.creator', 'invoices.approval'],
        };
        return this.api.promised(this.api.getFreelancerAssignment({ freelancerId: freelancerId, assignmentId: assignmentId }, options)).then(function (data) {
            var invoices = __WEBPACK_IMPORTED_MODULE_2__utils_collection__["a" /* Collection */].extract(data, 'invoices') || [];
            return invoices.length && _this.transform(invoices[0]) || {};
        });
    };
    /**
     * Gets list of jobs for given freelancer
     *
     * @param freelancerId
     * @param type Assignments type (done|invoiceable)
     */
    InvoicesService.prototype.jobs = function (freelancerId, type, offset, limit) {
        var _this = this;
        var options = {
            includes: ['site', 'dates.assignments.incentive_model', 'project.client'],
            params: {},
            paging: { offset: offset, limit: limit }
        };
        // only
        options.params["only_" + type] = true;
        return this.api.promised(this.api.getFreelancerJobsAssignments({ freelancerId: freelancerId }, options), undefined, true).then(function (resp) {
            return {
                data: resp.data.map(function (job) { return _this.transformJob(job); }).sort(_this.byStart),
                meta: resp.meta
            };
        });
    };
    /**
     * Gets given job for given freelancer
     *
     * @param freelancerId
     * @param jobId
     */
    InvoicesService.prototype.job = function (freelancerId, jobId, type) {
        var _this = this;
        var options = {
            includes: ['site', 'dates.assignments.documents.approval.creator', 'dates.assignments.revenues.creator', 'dates.assignments.invoices',
                'project.client', 'documents'],
            params: {},
        };
        options.params["only_" + type] = true;
        return this.api.promised(this.api.getFreelancerJobAssignments({ freelancerId: freelancerId, jobId: jobId }, options)).then(function (data) {
            return _this.transformJob(data);
        });
    };
    /**
     * Submits invoice
     *
     * @param invoice
     * @param freelancerId
     */
    InvoicesService.prototype.submit = function (invoice, freelancerId) {
        var _this = this;
        var prepared = {};
        var fields = ['id', 'number', 'comment', 'total', 'includes_taxes', 'assignment_ids', 'document_id', 'approval', 'with_discount'];
        prepared = __WEBPACK_IMPORTED_MODULE_2__utils_collection__["a" /* Collection */].only(invoice, fields);
        // merge invoice data with clear issued as ignored by api
        var data = Object.assign({ freelancerId: freelancerId }, prepared, { issued_at: undefined });
        __WEBPACK_IMPORTED_MODULE_2__utils_collection__["a" /* Collection */].boolify(data, ['includes_taxes', 'with_discount']);
        data.total = invoice.total; // always use gross value
        return this.resources.update([data], 'FreelancerInvoice', 'bills.invoice.submit').then(function (submitted) {
            // create update approval then
            var approval = Object.assign(invoice.approval || {}, { invoiceId: data.id || submitted[0], state: 'pending' });
            return _this.resources.update([approval], 'InvoiceApproval');
        });
    };
    /**
     * Sends generate invoice request
     *
     * @param freelancerId
     * @param invoice
     * @param assignments
     * @param total
     * @param address
     */
    InvoicesService.prototype.generate = function (freelancerId, invoice, assignments, total, address) {
        var _this = this;
        var _a = __WEBPACK_IMPORTED_MODULE_2__utils_collection__["a" /* Collection */].boolify(invoice, ['with_discount', 'includes_taxes']), with_discount = _a.with_discount, includes_taxes = _a.includes_taxes;
        var data = {
            freelancerId: freelancerId, with_discount: with_discount, includes_taxes: includes_taxes,
            total: total.gross,
            number: invoice.number,
            freelancer_address_index: address,
            assignment_details: assignments.map(function (assignment) {
                // pluck names
                var incentives = __WEBPACK_IMPORTED_MODULE_2__utils_collection__["a" /* Collection */].pluck((assignment.incentives || []).filter(_this.onlySelected), 'name');
                var additional = __WEBPACK_IMPORTED_MODULE_2__utils_collection__["a" /* Collection */].pluck((assignment.additional_costs || []).filter(_this.onlySelected), 'name');
                // then prepare only set
                return {
                    id: assignment.id,
                    costs_on_time: !assignment.costs_on_time.disabled && parseFloat(assignment.costs_on_time.value) || undefined,
                    incentives: incentives.length && incentives || undefined,
                    additional_costs: additional.length && additional || undefined,
                };
            }),
        };
        return this.api.promised(this.api.generateFreelancerInvoice(data), 'bills.generate');
    };
    /**
     * Helper to filter selected property set
     *
     * @param item
     */
    InvoicesService.prototype.onlySelected = function (item) {
        return item.selected;
    };
    /**
     * Transforms invoice data
     *
     * @param invoice
     */
    InvoicesService.prototype.transform = function (invoice) {
        var assignments = __WEBPACK_IMPORTED_MODULE_2__utils_collection__["a" /* Collection */].extract(invoice, 'assignments') || [];
        var job = assignments.length && __WEBPACK_IMPORTED_MODULE_2__utils_collection__["a" /* Collection */].extract(assignments[0], 'date.job') || { title: '' }; // job from first assignemnt
        var site = __WEBPACK_IMPORTED_MODULE_2__utils_collection__["a" /* Collection */].extract(job, 'site');
        var approval = __WEBPACK_IMPORTED_MODULE_2__utils_collection__["a" /* Collection */].extract(invoice, 'approval');
        // shortened title
        job.title = job.title.split(' | ')[0];
        // assignments start sort
        assignments.forEach(function (item) {
            item.start_at = __WEBPACK_IMPORTED_MODULE_1__components_api__["e" /* ApiTransform */].datetime(item.appointed_at, item.start_time);
            delete item.date.data.job; // to avoid circular structure
        });
        assignments.sort(this.byStart);
        // summary date converts
        if (invoice.summary) {
            __WEBPACK_IMPORTED_MODULE_2__utils_collection__["a" /* Collection */].datify(invoice.summary, ['from', 'to']);
            invoice.summary.from = __WEBPACK_IMPORTED_MODULE_3__utils_format__["a" /* Format */].date(invoice.summary.from);
            invoice.summary.to = __WEBPACK_IMPORTED_MODULE_3__utils_format__["a" /* Format */].date(invoice.summary.to);
        }
        invoice.issued_at = __WEBPACK_IMPORTED_MODULE_1__components_api__["e" /* ApiTransform */].datetime(invoice.issued_at);
        // stringify booleans
        __WEBPACK_IMPORTED_MODULE_2__utils_collection__["a" /* Collection */].stringify(invoice, ['with_discount', 'includes_taxes']);
        return Object.assign(invoice, { assignments: assignments, job: job, site: site, approval: approval });
    };
    /**
     * Transforms job data - unifies to job-card data
     *
     * @param job
     */
    InvoicesService.prototype.transformJob = function (job) {
        var _a = this.extract(job), count = _a.count, range = _a.range, assignments = _a.assignments;
        var title = job.title.split(' | ')[0];
        return Object.assign(job, { job: job, title: title, count: count, range: range, assignments: assignments }, {
            site: job.site && job.site.data,
            client: job.project && job.project.data.client && job.project.data.client.data || {},
            project: job.project && job.project.data || {},
            start_at: range.dates.start,
            start_time: assignments[0] && assignments[0].start_time,
            finish_time: assignments[0] && assignments[0].finish_time,
        });
    };
    /**
     * Extracts data from job
     *
     * @param job
     */
    InvoicesService.prototype.extract = function (job) {
        var assignments = [];
        var count = { all: 0, done: 0 };
        var range = {
            dates: { start: null, end: null },
            rates: { min: 0, max: 0, sum: { min: 0, max: 0 } },
        };
        // assignments stats
        __WEBPACK_IMPORTED_MODULE_2__utils_collection__["a" /* Collection */].pluck(job.dates.data, 'assignments', 'data').forEach(function (item) {
            var assignment = Object.assign(item, {
                start_at: __WEBPACK_IMPORTED_MODULE_1__components_api__["e" /* ApiTransform */].datetime(item.appointed_at, item.start_time),
                end_at: __WEBPACK_IMPORTED_MODULE_1__components_api__["e" /* ApiTransform */].datetime(item.appointed_at, item.finish_time),
                disabled: !item.is_done,
            });
            count.all++;
            count.done += item.is_done ? 1 : 0;
            // set ranges
            if (!range.dates.start || range.dates.start > assignment.start_at) {
                range.dates.start = assignment.start_at;
            }
            if (!range.dates.end || range.dates.end < assignment.end_at) {
                range.dates.end = assignment.end_at;
            }
            var minEstimated = parseFloat(assignment.min_estimated_costs);
            var maxEstimated = parseFloat(assignment.max_estimated_costs);
            if (!range.rates.min || range.rates.min > minEstimated) {
                range.rates.min = minEstimated;
            }
            if (!range.rates.max || range.rates.max < maxEstimated) {
                range.rates.max = maxEstimated;
            }
            range.rates.sum.min += minEstimated;
            range.rates.sum.max += maxEstimated;
            assignments.push(assignment);
        });
        return {
            assignments: assignments.sort(this.byStart),
            count: count, range: range
        };
    };
    InvoicesService.prototype.byStart = function (a, b) {
        if (a.range) {
            return a.range.dates.start - b.range.dates.start;
        }
        else {
            return a.start - b.start;
        }
    };
    InvoicesService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__components_api__["g" /* NewApiService */], __WEBPACK_IMPORTED_MODULE_1__components_api__["d" /* ApiResources */]])
    ], InvoicesService);
    return InvoicesService;
}());

//# sourceMappingURL=invoices.service.js.map

/***/ }),

/***/ 490:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppMaintenance; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_api__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_loading__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_config__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AppMaintenance = /** @class */ (function () {
    function AppMaintenance(api, events, params, loading) {
        this.api = api;
        this.events = events;
        this.params = params;
        this.loading = loading;
        this.recheck(this.params.data.info);
        this.loading.clear();
    }
    AppMaintenance.prototype.check = function () {
        var _this = this;
        this.api.getVersion().then(function () { return _this.finished(); }, function (data) { return _this.recheck(data.json().maintenance); });
    };
    AppMaintenance.prototype.finished = function () {
        this.events.publish('api:maintenance', false);
    };
    AppMaintenance.prototype.recheck = function (current) {
        var _this = this;
        var maintenanceReload = parseInt(__WEBPACK_IMPORTED_MODULE_5__app_config__["a" /* appConfig */].maintenanceReload, 10);
        this.current = current;
        var planned = __WEBPACK_IMPORTED_MODULE_2_moment__(this.current.end).diff(__WEBPACK_IMPORTED_MODULE_2_moment__["now"](), 'seconds');
        if (planned > 0 && planned < maintenanceReload) {
            // if planned finish is earlier than next reload, do it on planned time (but not in the past)
            setTimeout(function () { return _this.check(); }, planned * 1000);
        }
        else {
            // after defined period otherwise
            setTimeout(function () { return _this.check(); }, maintenanceReload * 1000);
        }
    };
    AppMaintenance = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-app-maintenance',template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/app/app.maintenance.html"*/'<ion-content>\n  <nothing-found icon="ios-close-circle-outline" context="app.maintenance" [values]="current"></nothing-found>\n</ion-content>\n'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/app/app.maintenance.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__components_api__["g" /* NewApiService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__components_loading__["a" /* LoadingController */]])
    ], AppMaintenance);
    return AppMaintenance;
}());

//# sourceMappingURL=app.maintenance.js.map

/***/ }),

/***/ 491:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TrainingDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__ = __webpack_require__(453);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_notify__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_files__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_loading__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__exam_exam_instructions_page__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_details__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__certificates_service__ = __webpack_require__(170);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var TrainingDetailsPage = /** @class */ (function () {
    function TrainingDetailsPage(config, certificates, details, sanitizer, params, files, loading, notify, iab) {
        var _this = this;
        this.config = config;
        this.certificates = certificates;
        this.details = details;
        this.sanitizer = sanitizer;
        this.params = params;
        this.files = files;
        this.loading = loading;
        this.notify = notify;
        this.iab = iab;
        this.passed = false;
        this.pictures = [];
        this.passed = this.params.get('passed');
        this.fetching = this.loading.create('common.fetching-data');
        this.fetching.present();
        this.certificates.get(this.params.get('id')).then(function (result) {
            _this.certificate = result;
            _this.training = Object.assign(result.training.data, {
                content: _this.sanitizer.bypassSecurityTrustHtml(_this.wrapContent(result.training.data.content)),
            });
            _this.examId = result.exam.data.id;
            _this.loading.hide(_this.fetching);
        });
    }
    /**
     * Opens exam
     */
    TrainingDetailsPage.prototype.startExam = function () {
        return this.details.open(__WEBPACK_IMPORTED_MODULE_7__exam_exam_instructions_page__["a" /* ExamInstructionsPage */], { id: this.examId });
    };
    TrainingDetailsPage.prototype.ngOnDestroy = function () {
        this.pictures.map(function (picture) { return picture.revoke(); });
        this.pictures.length = 0;
    };
    /**
     * Wraps content html within replaced platform specific
     */
    TrainingDetailsPage.prototype.wrapContent = function (content) {
        return content
            .replace(/(<a.+>.+?<\/a>)/gm, this.wrapButton.bind(this))
            .replace(/href="\/documents\/([0-9]+)" download="(.+?)\.([a-z]+?)"/gm, this.wrapDocument.bind(this))
            .replace(/href=["\'](?!\/documents\/)([^"\'\s>]+)["\']/gm, this.wrapExternalLink.bind(this))
            .replace(/<img (.*?)src="\/pictures\/([0-9]+)\/.+?"(.*?)>/g, this.wrapImage.bind(this));
    };
    /**
     * Wraps button with platform styling
     */
    TrainingDetailsPage.prototype.wrapButton = function (matched) {
        var matches = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            matches[_i - 1] = arguments[_i];
        }
        var style = this.config.get('mode');
        return "\n            <button class=\"disable-hover button button-" + style + " button-clear button-clear-" + style + " button-full button-full-" + style + "\">\n              <span class=\"button-inner\">" + matches[0] + "</span>\n              <div class=\"button-effect\"></div>\n            </button>\n        ";
    };
    TrainingDetailsPage.prototype.wrapDocument = function (matched) {
        var _this = this;
        var matches = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            matches[_i - 1] = arguments[_i];
        }
        var docId = "doc-" + matches[0];
        setTimeout(function () {
            var doc = document.getElementById(docId);
            if (doc) {
                doc.addEventListener('click', function () {
                    var mime = "application/" + matches[2];
                    var filename = (matches[1] + "." + matches[2]).replace(/%[0-9]{1,2}|\s/g, '_');
                    var params = { id: +matches[0], original_filename: filename, mime: mime };
                    _this.fetching = _this.loading.create('common.fetching-data', false);
                    _this.fetching.present();
                    _this.files.download(params)
                        .then(function (path) { return _this.files.open(path, mime); })
                        .catch(function () { return _this.notify.present('errors.download-failed'); })
                        .finally(function () { return _this.loading.hide(_this.fetching); });
                });
            }
        });
        return "id=\"" + docId + "\"";
    };
    TrainingDetailsPage.prototype.wrapExternalLink = function (matched) {
        var _this = this;
        var matches = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            matches[_i - 1] = arguments[_i];
        }
        var anchorId = "anc-" + matches[1];
        setTimeout(function () {
            var anchor = document.getElementById(anchorId);
            if (anchor) {
                anchor.addEventListener('click', function (event) {
                    event.preventDefault();
                    _this.iab.create(encodeURI(matches[0]));
                });
            }
        });
        return "href=\"#\" id=\"" + anchorId + "\"";
    };
    /**
     * Wraps images within fetching in authorized context
     */
    TrainingDetailsPage.prototype.wrapImage = function (matched) {
        var _this = this;
        var matches = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            matches[_i - 1] = arguments[_i];
        }
        var picId = "pic-" + matches[1];
        // fetches image and sets blob url as src
        this.files.fetchPicture(matches[1]).then(function (picture) {
            var url = picture.url();
            var img = document.getElementById(picId);
            if (img) {
                img.src = url;
            }
            _this.pictures.push(picture);
        });
        return "\n            <img id=\"" + picId + "\"" + matches[2] + ">\n        ";
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('content'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], TrainingDetailsPage.prototype, "content", void 0);
    TrainingDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-training-details',template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/certificates/training.details.page.html"*/'<ion-content padding>\n  <button-back label="buttons.back"></button-back>\n\n  <ng-container *ngIf="certificate">\n    <h1 class="title">{{ certificate.name }}</h1>\n    <h3>{{ certificate.teaser }}</h3>\n    <p>{{ certificate.description }}</p>\n\n    <div class="details" [innerHTML]="training.content" #content></div>\n\n    <button *ngIf="!passed && training" color="button-primary" ion-button solid full (click)="startExam()">\n      {{ \'certificates.start-test\' | translate }}\n    </button>\n  </ng-container>\n\n</ion-content>\n'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/certificates/training.details.page.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Config */], __WEBPACK_IMPORTED_MODULE_9__certificates_service__["a" /* CertificatesService */], __WEBPACK_IMPORTED_MODULE_8__components_details__["a" /* DetailsController */], __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */], __WEBPACK_IMPORTED_MODULE_5__components_files__["c" /* FilesService */], __WEBPACK_IMPORTED_MODULE_6__components_loading__["a" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__components_notify__["a" /* NotifyController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__["a" /* InAppBrowser */]])
    ], TrainingDetailsPage);
    return TrainingDetailsPage;
}());

//# sourceMappingURL=training.details.page.js.map

/***/ }),

/***/ 492:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DocumentItem; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_util_noop__ = __webpack_require__(493);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_util_noop___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_util_noop__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__notify__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__files_service__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__index__ = __webpack_require__(43);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 *
 */
var DocumentItem = /** @class */ (function () {
    function DocumentItem(zone, files, notify, ref) {
        this.zone = zone;
        this.files = files;
        this.notify = notify;
        this.ref = ref;
        this.remove = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.edit = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.icons = { edit: 'create', remove: 'trash' };
    }
    DocumentItem.prototype.ngOnInit = function () {
        this.type = this.document && this.document.mime.split(/\//)[1];
    };
    DocumentItem.prototype.ngAfterViewInit = function () {
        this.action = this.ref.nativeElement.getAttribute('action');
    };
    DocumentItem.prototype.onClick = function () {
        switch (this.action) {
            case 'remove':
                this.remove.emit(this.document);
                break;
            case 'edit':
                this.edit.emit(this.document);
                break;
            default:
                Object(__WEBPACK_IMPORTED_MODULE_1_rxjs_util_noop__["noop"])();
        }
    };
    /**
     * Opens document (downloading first)
     */
    DocumentItem.prototype.open = function (event) {
        var _this = this;
        // to allow action if defined
        event.stopPropagation();
        // only if not downloading already
        if (!this.downloading) {
            this.downloaded = '0';
            this.downloading = true;
            this.files.download(this.document, __WEBPACK_IMPORTED_MODULE_4__index__["a" /* FileKind */].Document, function (t) { return _this.onProgress(t); }).then(function (path) {
                // removes download indicator after a while
                setTimeout(function () {
                    _this.downloaded = undefined;
                    _this.downloading = false;
                }, 2000);
                // open file
                return _this.files.open(path, _this.document.mime);
            }).catch(function (error) {
                if (Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["isDevMode"])()) {
                    console.log('error', error); // tslint:disable-line no-console
                }
                _this.downloaded = undefined;
                _this.downloading = false;
                _this.notify.present('errors.download-failed');
            });
        }
    };
    /**
     * On download progress handler
     */
    DocumentItem.prototype.onProgress = function (transfered) {
        var _this = this;
        if (transfered) {
            this.zone.run(function () { return _this.downloaded = transfered.percent.toFixed(0); });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], DocumentItem.prototype, "document", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], DocumentItem.prototype, "info", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], DocumentItem.prototype, "click", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], DocumentItem.prototype, "remove", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], DocumentItem.prototype, "edit", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('click'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DocumentItem.prototype, "onClick", null);
    DocumentItem = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'document-item',template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/components/files/document.item.html"*/'<ion-item>\n  <ion-thumbnail item-start>\n    {{ type }}\n  </ion-thumbnail>\n  <h2 text-nowrap>{{ document.original_filename }}</h2>\n  <p>\n    {{ document.size | filesize }}\n    <span *ngIf="downloading">({{ downloaded }}%)</span>\n  </p>\n  <p class="info" text-nowrap *ngIf="info">\n    {{ info }}\n  </p>\n  <div item-end [ngClass]="document.approval && document.approval.state">\n    <ion-icon name="{{ icons[action] }}" color="button-primary" [ngClass]="{hide: downloading || !action}"></ion-icon>\n    <ion-icon name="eye" color="button-primary" (click)="open($event)" [ngClass]="{hide: downloading}"></ion-icon>\n    <ion-spinner [ngClass]="{hide: !downloading}"></ion-spinner>\n  </div>\n</ion-item>\n<ion-item *ngIf="document.approval && document.approval.state !== \'pending\'" no-lines>\n  <approval-info [approval]="document.approval"></approval-info>\n</ion-item>\n'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/components/files/document.item.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_3__files_service__["a" /* FilesService */], __WEBPACK_IMPORTED_MODULE_2__notify__["a" /* NotifyController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
    ], DocumentItem);
    return DocumentItem;
}());

//# sourceMappingURL=document.item.js.map

/***/ }),

/***/ 497:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PictureLoadDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__files__ = __webpack_require__(43);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * @name
 * PictureLoadDirective
 *
 * @description
 * Directive for getting picture by api request.
 *
 * @param pictureLoad Picture id
 * @param PictureSize Optional picture size; medium default
 * @param PictureType Optional picture type; square default
 *
 * @note
 * Uses api service and expects getPicture({id: string}) method there
 *
 * @usage
 * ```html
 * <img [pictureLoad]="picture.id" pictureSize="medium" />
 * ```
 */
var PictureLoadDirective = /** @class */ (function () {
    function PictureLoadDirective(sanitizer, injector, ref, renderer) {
        this.sanitizer = sanitizer;
        this.injector = injector;
        this.ref = ref;
        this.renderer = renderer;
        this.size = 'medium';
        this.variant = 'squared';
        this.imageUrl = '';
        this.renderer.setElementClass(this.ref.nativeElement, 'picture-load', true);
    }
    PictureLoadDirective.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (!this.files) {
            this.files = this.injector.get(__WEBPACK_IMPORTED_MODULE_2__files__["c" /* FilesService */]);
        }
        if (changes.id && changes.id.currentValue) {
            this.ngOnDestroy();
            this.files.fetchPicture(changes.id.currentValue, this.size, this.variant).then(function (picture) {
                _this.picture = picture;
                _this.imageUrl = _this.sanitizer.bypassSecurityTrustUrl(picture.url());
            });
        }
    };
    PictureLoadDirective.prototype.ngOnDestroy = function () {
        if (this.picture) {
            this.picture.revoke();
            this.picture = undefined;
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('pictureLoad'),
        __metadata("design:type", String)
    ], PictureLoadDirective.prototype, "id", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('pictureSize'),
        __metadata("design:type", String)
    ], PictureLoadDirective.prototype, "size", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('pictureType'),
        __metadata("design:type", String)
    ], PictureLoadDirective.prototype, "variant", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('src'),
        __metadata("design:type", Object)
    ], PictureLoadDirective.prototype, "imageUrl", void 0);
    PictureLoadDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[pictureLoad]',
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]])
    ], PictureLoadDirective);
    return PictureLoadDirective;
}());

//# sourceMappingURL=picture.load.directive.js.map

/***/ }),

/***/ 498:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_pipes__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__details__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__filter_bar__ = __webpack_require__(499);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__filter_search__ = __webpack_require__(681);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__filter_date_range__ = __webpack_require__(682);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__filter_range__ = __webpack_require__(683);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__filter_select__ = __webpack_require__(684);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__filter_buttons__ = __webpack_require__(685);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var FilterModule = /** @class */ (function () {
    function FilterModule() {
    }
    FilterModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__filter_bar__["a" /* FilterBar */],
                __WEBPACK_IMPORTED_MODULE_6__filter_search__["a" /* FilterSearch */],
                __WEBPACK_IMPORTED_MODULE_8__filter_range__["a" /* FilterRange */],
                __WEBPACK_IMPORTED_MODULE_9__filter_select__["a" /* FilterSelect */],
                __WEBPACK_IMPORTED_MODULE_10__filter_buttons__["a" /* FilterButtons */],
                __WEBPACK_IMPORTED_MODULE_7__filter_date_range__["a" /* FilterDateRange */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3_ngx_pipes__["b" /* NgObjectPipesModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */],
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_4__details__["b" /* DetailsModule */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_5__filter_bar__["a" /* FilterBar */]
            ],
            providers: [],
        })
    ], FilterModule);
    return FilterModule;
}());

//# sourceMappingURL=filter.module.js.map

/***/ }),

/***/ 499:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterBar; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * @name
 * FilterBar
 * @description
 * Component for display filters - search + additional
 *
 * @param context Translation context - will use context.filters.name.xxx identifiers (xxx - label, placeholder, etc)
 * @param filters Filters set - key named filters within type (select, range, daterange, buttons), set, options and none (optional for select)
 * @param on-apply Event consumer - getting {[name]: set/selected values}
 *
 * @note Options for select can be given as string - then Options.list util will be used
 * @note Clear button calls apply with cleared values
 *
 * @usage
 * ```ts
 * filters IFilterBarItems;
 * this.filters = {
 *   search: { set: '', type: 'search' },
 *   some: { set: undefined, type: 'buttons' },
 *   // ...
 * };
 *
 * filter(filtered: IFilter) {
 *   // do some staff with
 * }
 * ```
 *
 * ```html
 * <filter-bar [filters]="filters" (on-apply)="filter($evant)"></filter-bar>
 * ```
 */
var FilterBar = /** @class */ (function () {
    function FilterBar() {
        this.applying = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"](); // tslint:disable-line no-output-rename
        this.filterOpened = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"](); // tslint:disable-line no-output-rename
        this.selected = {};
        this.items = {};
    }
    FilterBar.prototype.ngOnInit = function () {
        var _this = this;
        // init pre-selected values
        Object.keys(this.filters).map(function (key) {
            _this.selected[key] = _this.filters[key].set;
        });
        // then apply deferred
        setTimeout(function () { return _this.apply(); });
    };
    FilterBar.prototype.init = function (key, exposed) {
        this.items[key] = exposed;
    };
    FilterBar.prototype.set = function (key, value) {
        this.selected[key] = value;
    };
    FilterBar.prototype.apply = function () {
        this.checkFiltered();
        this.applying.emit(this.selected);
        this.close();
    };
    FilterBar.prototype.checkFiltered = function () {
        var _this = this;
        this.filtered = Object.keys(this.items).map(function (key) { return _this.items[key].filtered(); }).filter(Boolean).join(', ');
    };
    FilterBar.prototype.clear = function () {
        var _this = this;
        Object.keys(this.items).map(function (key) {
            _this.items[key].clear();
        });
        this.apply();
    };
    FilterBar.prototype.open = function () {
        this.opened = true;
        this.filterOpened.emit(this.opened);
    };
    FilterBar.prototype.close = function () {
        this.opened = false;
        this.filterOpened.emit(this.opened);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('context'),
        __metadata("design:type", String)
    ], FilterBar.prototype, "context", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('filters'),
        __metadata("design:type", Object)
    ], FilterBar.prototype, "filters", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])('on-apply'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], FilterBar.prototype, "applying", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])('filter-opened'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], FilterBar.prototype, "filterOpened", void 0);
    FilterBar = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'filter-bar',template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/components/filter/filter.bar.html"*/'<div class="background" [ngClass]="{opened: opened}" (click)="close()"></div>\n<ion-card [ngClass]="{opened: opened}">\n  <div class="filtered" [ngClass]="{active: filtered && filtered.length}">\n    {{ context + \'.filters.active\' | translate }} - {{ filtered }}\n  </div>\n  <button class="open" ion-button icon-only outline float-right  (click)="open()">\n    <ion-icon name="search"></ion-icon>\n  </button>\n  <button class="close" ion-button icon-only outline float-right (click)="close()">\n    <ion-icon name="close"></ion-icon>\n  </button>\n  <div padding>\n    <form (ngSubmit)="apply()">\n      <ng-container *ngFor="let key of filters | keys">\n        <h3>{{ context + \'.filters.\' + key + \'.label\' | translate }}</h3>\n        <filter-search *ngIf="filters[key].type === \'search\'"\n          [name]="key" [context]="context" [set]="filters[key].set" (init)="init(key, $event)" (action)="set(key, $event)">\n        </filter-search>\n        <filter-date-range *ngIf="filters[key].type === \'daterange\'"\n          [name]="key" [context]="context" [set]="filters[key].set" (init)="init(key, $event)" (action)="set(key, $event)">\n        </filter-date-range>\n        <filter-range *ngIf="filters[key].type === \'range\'"\n          [name]="key" [context]="context" [set]="filters[key].set" (init)="init(key, $event)" (action)="set(key, $event)">\n        </filter-range>\n        <filter-select *ngIf="filters[key].type === \'select\'"\n          [name]="key" [context]="context" [set]="filters[key].set" [options]="filters[key].options" [none]="filters[key].options"\n          (init)="init(key, $event)" (action)="set(key, $event)">\n        </filter-select>\n        <filter-buttons *ngIf="filters[key].type === \'buttons\'"\n          [name]="key" [context]="context" [set]="filters[key].set" [options]="filters[key].options"\n          (init)="init(key, $event)" (action)="set(key, $event)">\n        </filter-buttons>\n      </ng-container>\n      <ion-buttons>\n        <button type="submit" ion-button float-right color="button-primary" solid small>\n          {{ \'buttons.apply\' | translate }}\n        </button>\n        <button type="button" ion-button clear float-right color="primary" small (click)="clear()">\n          {{ \'buttons.clear\' | translate }}\n        </button>\n      </ion-buttons>\n    </form>\n  </div>\n</ion-card>'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/components/filter/filter.bar.html"*/,
        })
    ], FilterBar);
    return FilterBar;
}());

//# sourceMappingURL=filter.bar.js.map

/***/ }),

/***/ 500:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Options; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_app_config__ = __webpack_require__(42);

/*
 * Utils class Format
 */
var Options = /** @class */ (function () {
    function Options() {
    }
    /**
     * Returns config options by dotted path - from properties defined in appOptions
     *
     * @returns Array of id/name (translated by key + option)
     */
    Options.list = function (key, translate) {
        if (!Options.options) {
            Options.options = Options.generate(__WEBPACK_IMPORTED_MODULE_0__app_app_config__["c" /* appOptions */]);
        }
        return (Options.options[key] || []).map(function (opt) { return ({
            id: opt,
            name: translate.instant(key + '.' + opt),
        }); });
    };
    /**
     * Generates dot array flat list
     */
    Options.generate = function (element, path) {
        var o = {};
        path = (path && path + '.') || '';
        if (typeof element === 'object') {
            for (var key in element) {
                if (element.hasOwnProperty(key)) {
                    if (typeof element[key] === 'object' && !Array.isArray(element[key])) {
                        var temp = Options.generate(element[key], key);
                        for (var l in temp) {
                            if (temp.hasOwnProperty(l)) {
                                o[path + l] = temp[l];
                            }
                        }
                    }
                    else {
                        o[path + key] = element[key];
                    }
                }
            }
        }
        return o;
    };
    return Options;
}());

//# sourceMappingURL=options.js.map

/***/ }),

/***/ 502:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BillsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_moment__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angular2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ngx_pipes__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_nl2br_pipe__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pipes_pipes_module__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_files__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__jobs_jobs_module__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_navigation__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_details__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_notify__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_filter__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_survey__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_validators__ = __webpack_require__(480);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__bills_page__ = __webpack_require__(478);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__assignment_select__ = __webpack_require__(690);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__preparation_preparation_page__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__preparation_preparation_details__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__preparation_revenue_report_details__ = __webpack_require__(484);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__preparation_preparation_service__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__invoices_invoices_page__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__invoices_invoices_service__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__invoices_invoice_item__ = __webpack_require__(691);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__invoices_invoice_details__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__invoices_create_invoice__ = __webpack_require__(486);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__invoices_create_invoice_details__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__invoices_generate_invoice_details__ = __webpack_require__(485);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





























var Components = [
    __WEBPACK_IMPORTED_MODULE_16__bills_page__["a" /* BillsPage */],
    __WEBPACK_IMPORTED_MODULE_24__invoices_invoice_item__["a" /* InvoiceItem */],
    __WEBPACK_IMPORTED_MODULE_18__preparation_preparation_page__["a" /* PreparationPage */],
    __WEBPACK_IMPORTED_MODULE_25__invoices_invoice_details__["a" /* InvoiceDetails */],
    __WEBPACK_IMPORTED_MODULE_26__invoices_create_invoice__["a" /* CreateInvoicePage */],
    __WEBPACK_IMPORTED_MODULE_19__preparation_preparation_details__["a" /* PreparationDetails */],
    __WEBPACK_IMPORTED_MODULE_20__preparation_revenue_report_details__["a" /* RevenueReportDetails */],
    __WEBPACK_IMPORTED_MODULE_22__invoices_invoices_page__["a" /* InvoicesPage */],
    __WEBPACK_IMPORTED_MODULE_17__assignment_select__["a" /* AssignmentSelect */],
    __WEBPACK_IMPORTED_MODULE_27__invoices_create_invoice_details__["a" /* CreateInvoiceDetailsPage */],
    __WEBPACK_IMPORTED_MODULE_28__invoices_generate_invoice_details__["a" /* GenerateInvoiceDetailsPage */],
];
var BillsModule = /** @class */ (function () {
    function BillsModule() {
    }
    BillsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: Components,
            entryComponents: Components,
            exports: Components,
            imports: [
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_16__bills_page__["a" /* BillsPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_4_angular2_moment__["MomentModule"],
                __WEBPACK_IMPORTED_MODULE_6_nl2br_pipe__["a" /* Nl2BrPipeModule */],
                __WEBPACK_IMPORTED_MODULE_10__components_navigation__["a" /* NavigationModule */],
                __WEBPACK_IMPORTED_MODULE_8__components_files__["b" /* FilesModule */],
                __WEBPACK_IMPORTED_MODULE_9__jobs_jobs_module__["a" /* JobsModule */],
                __WEBPACK_IMPORTED_MODULE_11__components_details__["b" /* DetailsModule */],
                __WEBPACK_IMPORTED_MODULE_12__components_notify__["b" /* NotifyModule */],
                __WEBPACK_IMPORTED_MODULE_13__components_filter__["a" /* FilterModule */],
                __WEBPACK_IMPORTED_MODULE_5_ngx_pipes__["b" /* NgObjectPipesModule */],
                __WEBPACK_IMPORTED_MODULE_14__components_survey__["a" /* SurveyModule */],
                __WEBPACK_IMPORTED_MODULE_15__components_validators__["a" /* ValidatorsModule */],
                __WEBPACK_IMPORTED_MODULE_7__pipes_pipes_module__["a" /* PipesModule */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CurrencyPipe"],
                __WEBPACK_IMPORTED_MODULE_23__invoices_invoices_service__["a" /* InvoicesService */],
                __WEBPACK_IMPORTED_MODULE_21__preparation_preparation_service__["a" /* PreparationService */],
            ],
        })
    ], BillsModule);
    return BillsModule;
}());

//# sourceMappingURL=bills.module.js.map

/***/ }),

/***/ 503:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessagesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_moment__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_navigation__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_details__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__message_counter__ = __webpack_require__(693);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__message_card__ = __webpack_require__(694);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__messages_list__ = __webpack_require__(504);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__message_create__ = __webpack_require__(471);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__messages_service__ = __webpack_require__(91);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var Components = [
    __WEBPACK_IMPORTED_MODULE_6__message_counter__["a" /* MessageCounter */],
    __WEBPACK_IMPORTED_MODULE_7__message_card__["a" /* MessageCard */],
    __WEBPACK_IMPORTED_MODULE_8__messages_list__["a" /* MessagesList */],
    __WEBPACK_IMPORTED_MODULE_9__message_create__["a" /* MessageCreate */],
];
var MessagesModule = /** @class */ (function () {
    function MessagesModule() {
    }
    MessagesModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: Components,
            entryComponents: Components,
            exports: Components,
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_6__message_counter__["a" /* MessageCounter */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_3_angular2_moment__["MomentModule"],
                __WEBPACK_IMPORTED_MODULE_5__components_details__["b" /* DetailsModule */],
                __WEBPACK_IMPORTED_MODULE_4__components_navigation__["a" /* NavigationModule */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_10__messages_service__["a" /* MessagesService */],
            ],
        })
    ], MessagesModule);
    return MessagesModule;
}());

//# sourceMappingURL=messages.module.js.map

/***/ }),

/***/ 504:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessagesList; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_loading__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_api__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_animations__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__base_page__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__messages_service__ = __webpack_require__(91);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MessagesList = /** @class */ (function (_super) {
    __extends(MessagesList, _super);
    function MessagesList(translate, loading, user, renderer, messages) {
        var _this = _super.call(this, translate, loading, renderer, user) || this;
        _this.translate = translate;
        _this.loading = loading;
        _this.user = user;
        _this.renderer = renderer;
        _this.messages = messages;
        return _this;
    }
    MessagesList.prototype.fetch = function () {
        var _this = this;
        return this.messages.list().then(function (messages) { return _this.entries = messages; });
    };
    MessagesList.prototype.doRefresh = function (refresher) {
        _super.prototype.doRefresh.call(this, refresher);
    };
    MessagesList.prototype.onRemove = function (message) {
        var _this = this;
        this.entries.splice(this.entries.indexOf(message), 1);
        this.messages.remove(message.id).then(function () {
            _this.fetch();
        });
    };
    MessagesList = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/messages/messages.list.html"*/'<ion-content>\n  <ion-refresher (ionRefresh)="doRefresh($event);" #refresher>\n    <ion-refresher-content pulling-icon="ion-arrow-down-b positive" spinner="crescent"\n                           pullingText="{{ \'common.pull-to-refresh\' | translate }}" refreshingText="{{ \'common.refreshing\' | translate }}">\n    </ion-refresher-content>\n  </ion-refresher>\n  <button-back label="messages.buttons.back"></button-back>\n\n  <ion-list no-lines *ngIf="entries && entries.length">\n    <message-card *ngFor="let message of entries" [message]="message" (removed)="onRemove(message)" [@softItem]></message-card>\n  </ion-list>\n\n  <ion-card *ngIf="entries && !entries.length" padding text-center>\n    {{ \'common.nothing-found\' | translate }}\n  </ion-card>\n\n</ion-content>\n'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/messages/messages.list.html"*/,
            selector: 'messages-list',
            animations: __WEBPACK_IMPORTED_MODULE_4__app_app_animations__["a" /* animations */],
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["d" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_2__components_loading__["a" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__components_api__["f" /* ApiUserService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer2"],
            __WEBPACK_IMPORTED_MODULE_6__messages_service__["a" /* MessagesService */]])
    ], MessagesList);
    return MessagesList;
}(__WEBPACK_IMPORTED_MODULE_5__base_page__["a" /* BasePage */]));

//# sourceMappingURL=messages.list.js.map

/***/ }),

/***/ 505:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AssignmentDetailsModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_api__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assignments_service__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__assignment_operations__ = __webpack_require__(185);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AssignmentDetailsModal = /** @class */ (function () {
    function AssignmentDetailsModal(params, view, user, assignments, operations) {
        var _this = this;
        this.params = params;
        this.view = view;
        this.user = user;
        this.assignments = assignments;
        this.operations = operations;
        // initial data on open
        this.details = this.params.get('tender');
        // then request detailed for assignment
        this.user.current().then(function (profile) {
            _this.assignments.get(profile.roleId(), _this.details.id).then(function (assignment) {
                assignment.documents = (assignment.documents || []).filter(function (doc) { return ['template-report', 'briefing'].indexOf(doc.type) >= 0; });
                _this.details = assignment;
            });
        });
    }
    AssignmentDetailsModal.prototype.dismiss = function (operation) {
        this.view.dismiss(operation);
    };
    AssignmentDetailsModal.prototype.makeCall = function (num) {
        this.operations.makeCall(num);
    };
    AssignmentDetailsModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/assignments/assignment.details.html"*/'<ion-content padding>\n  <button-back label="assignments.details.back"></button-back>\n  <ion-item class="head">\n    <ion-row>\n      <ion-col col-12>\n        <h2 text-wrap head-2>{{ details.job.title }}</h2>\n      </ion-col>\n      <ion-col col-12>\n        <p>{{ details.client.name }}</p>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>\n        <p class="category" *ngIf="details.category">\n          <ion-icon name="pricetag"></ion-icon>\n          <span>{{ \'common.categories.\' + details.category | translate }}</span>\n        </p>\n      </ion-col>\n      <ion-col *ngIf="details.contract_type_identifier">\n        <p class="category">\n          <ion-icon name="paper"></ion-icon>\n          <span>{{ \'common.contract_types.\' + details.contract_type_identifier | translate }}</span>\n        </p>\n      </ion-col>\n    </ion-row>\n  </ion-item>\n  <ion-item class="schedule">\n    <ion-row light>\n      <ion-icon name="calendar" padding-right></ion-icon>\n      {{ details.start_at | amDateFormat : \'DD.MM.YYYY\' }}\n    </ion-row>\n    <ion-row light>\n      <ion-icon name="clock" padding-right></ion-icon>\n      {{ details.start_time }} - {{ details.finish_time }}\n    </ion-row>\n    <ion-row light>\n      <ion-icon name="home" padding-right></ion-icon>\n      {{ details.site.name + (details.site.number ? \' | \'+ details.site.number : \'\') }}\n    </ion-row>\n    <ion-row light>\n      <ion-icon name="pin" padding-right></ion-icon>\n      {{ details.site.zip + \' \' + details.site.city + \', \' + details.site.address }}\n    </ion-row>\n    <ion-row light>\n      <ion-icon name="cash" padding-right></ion-icon>\n      {{ details.daily_rate_min | toCurrency }}\n      {{ details.daily_rate_min !== details.daily_rate_max ? \' - \' + (details.daily_rate_max | toCurrency) : \'\' }}\n    </ion-row>\n  </ion-item>\n\n  <ion-item text-wrap class="desc">\n    <h5 head-5>{{ \'assignments.details.description\' | translate }}</h5>\n    <p [innerHTML]="details.assignment.description | nl2br"></p>\n  </ion-item>\n\n  <ion-item text-wrap class="desc">\n    <h5 head-5>{{ \'assignments.details.briefing\' | translate }}</h5>\n    <p [innerHTML]="details.assignment.briefing | nl2br"></p>\n  </ion-item>\n\n  <ion-item text-wrap class="desc incentives" *ngIf="details.incentive_model">\n    <h5 head-5>{{ \'assignments.details.incentives.label\' | translate }}</h5>\n    <div *ngFor="let key of [\'checkin\', \'sales_report\', \'picture_documentation\']">\n      <span>{{ \'assignments.details.incentives.\' + key | translate }}</span>\n      <span>{{ details.incentives[key] | toCurrency }} €</span>\n    </div>\n  </ion-item>\n\n  <ion-item text-wrap class="desc costs" *ngIf="details.additional_costs">\n    <h5 head-5>{{ \'assignments.details.costs.label\' | translate }}</h5>\n    <div *ngFor="let key of details.costs | keys">\n      <span>{{ key }}</span>\n      <span>{{ details.costs[key] | toCurrency }} €</span>\n    </div>\n  </ion-item>\n\n  <ion-item text-wrap class="desc wage" *ngIf="details.wage && details.wage > 0">\n    <div>\n      <span>\n        <h5 head-5>{{ \'assignments.details.wage\' | translate }}</h5>\n      </span>\n      <span>{{ details.wage | toCurrency }}</span>\n    </div>\n  </ion-item>\n\n  <ion-item text-wrap class="docs">\n    <h5 head-5>{{ \'assignments.details.documents.headline\' | translate }}</h5>\n    <div *ngIf="details.documents">\n      <p>{{ \'assignments.details.documents.description.\' + (details.documents.length ? \'exists\' : \'none\') | translate }}</p>\n      <ion-list *ngIf="details.documents.length">\n        <document-item *ngFor="let document of details.documents" [document]="document"></document-item>\n      </ion-list>\n    </div>\n    <ion-spinner *ngIf="!details.documents" center></ion-spinner>\n  </ion-item>\n\n  <ion-item text-wrap class="contact" *ngIf="details.agent">\n    <h5 head-5>{{ \'assignments.details.contact\' | translate }}</h5>\n    <p>{{ details.agent.fullname }}</p>\n    <ion-row light *ngIf="details.agent.email">\n      <ion-icon name="mail" padding-right></ion-icon>\n      <a href="mailto:{{ details.agent.email }}">{{ details.agent.email }}</a>\n    </ion-row>\n    <ion-row light *ngIf="details.agent.mobile">\n      <ion-icon name="phone-portrait" padding-right></ion-icon>\n      <span tappable (click)="makeCall(details.agent.mobile)">{{ details.agent.mobile }}</span>\n    </ion-row>\n  </ion-item>\n\n</ion-content>\n'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/assignments/assignment.details.html"*/,
            selector: 'page-assignment-details'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__components_api__["f" /* ApiUserService */], __WEBPACK_IMPORTED_MODULE_3__assignments_service__["a" /* AssignmentsService */],
            __WEBPACK_IMPORTED_MODULE_4__assignment_operations__["a" /* AssignmentOperations */]])
    ], AssignmentDetailsModal);
    return AssignmentDetailsModal;
}());

//# sourceMappingURL=assignment.details.js.map

/***/ }),

/***/ 506:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(507);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_promise_prototype_finally__ = __webpack_require__(521);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_promise_prototype_finally___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_promise_prototype_finally__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_module__ = __webpack_require__(545);



Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_module__["a" /* AppModule */]);
Object(__WEBPACK_IMPORTED_MODULE_1_promise_prototype_finally__["shim"])();
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 525:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 545:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createTranslateLoader */
/* unused harmony export TranslateModuleOptions */
/* unused harmony export IonicModuleOptions */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(546);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser_animations__ = __webpack_require__(549);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angular2_moment__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angular2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_angular2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_social_sharing__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_call_number__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ngx_translate_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ngx_translate_http_loader__ = __webpack_require__(612);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_ngx_translate_messageformat_compiler__ = __webpack_require__(614);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_image_picker__ = __webpack_require__(450);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_camera__ = __webpack_require__(451);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_app_version__ = __webpack_require__(452);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_in_app_browser__ = __webpack_require__(453);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_ngx_pipes__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_firebase__ = __webpack_require__(454);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__app_config__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__app_main__ = __webpack_require__(629);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__components_api__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__components_popover_popover_module__ = __webpack_require__(671);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__components_confirm__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__components_push_push_module__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_login_login_module__ = __webpack_require__(673);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_certificates_certificates_module__ = __webpack_require__(674);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_exam_exam_module__ = __webpack_require__(686);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__app_tabs__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__app_maintenance__ = __webpack_require__(490);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__components_loading__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__components_notify__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__pages_jobs_jobs_module__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__pages_bills_bills_module__ = __webpack_require__(502);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__pages_assignments_assignments_module__ = __webpack_require__(692);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__pages_messages_messages_module__ = __webpack_require__(503);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__pages_settings_settings_module__ = __webpack_require__(696);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__pages_profile_profile_module__ = __webpack_require__(697);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__components_files_files_module__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__pipes_pipes_module__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__components_filter_filter_module__ = __webpack_require__(498);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




















// import { FCM } from '@ionic-native/fcm';
























// for ngx-translate to use the files from assets folder
function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_13__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var TranslateModuleOptions = {
    loader: {
        provide: __WEBPACK_IMPORTED_MODULE_12__ngx_translate_core__["b" /* TranslateLoader */],
        useFactory: (createTranslateLoader),
        deps: [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */]],
    },
    compiler: {
        provide: __WEBPACK_IMPORTED_MODULE_12__ngx_translate_core__["a" /* TranslateCompiler */],
        useClass: __WEBPACK_IMPORTED_MODULE_14_ngx_translate_messageformat_compiler__["a" /* TranslateMessageFormatCompiler */]
    },
};
var IonicModuleOptions = {
    scrollAssist: false,
    autoFocusAssist: false,
    tabsHideOnSubPages: true,
};
var providers = [
    __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
    __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__["a" /* SplashScreen */],
    __WEBPACK_IMPORTED_MODULE_10__ionic_native_social_sharing__["a" /* SocialSharing */],
    __WEBPACK_IMPORTED_MODULE_11__ionic_native_call_number__["a" /* CallNumber */],
    __WEBPACK_IMPORTED_MODULE_25__components_confirm__["a" /* ConfirmController */],
    __WEBPACK_IMPORTED_MODULE_33__components_loading__["a" /* LoadingController */],
    __WEBPACK_IMPORTED_MODULE_34__components_notify__["a" /* NotifyController */],
    __WEBPACK_IMPORTED_MODULE_15__ionic_native_image_picker__["a" /* ImagePicker */],
    __WEBPACK_IMPORTED_MODULE_16__ionic_native_camera__["a" /* Camera */],
    __WEBPACK_IMPORTED_MODULE_17__ionic_native_app_version__["a" /* AppVersion */],
    __WEBPACK_IMPORTED_MODULE_18__ionic_native_in_app_browser__["a" /* InAppBrowser */],
    __WEBPACK_IMPORTED_MODULE_20__ionic_native_firebase__["a" /* Firebase */]
    // FCM
];
if (__WEBPACK_IMPORTED_MODULE_21__app_config__["a" /* appConfig */].env !== 'prod') {
    providers.push({ provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_8_ionic_angular__["h" /* IonicErrorHandler */] });
}
else {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            bootstrap: [__WEBPACK_IMPORTED_MODULE_8_ionic_angular__["g" /* IonicApp */]],
            providers: providers,
            declarations: [
                __WEBPACK_IMPORTED_MODULE_22__app_main__["a" /* AppMain */],
                __WEBPACK_IMPORTED_MODULE_30__pages__["b" /* AppPagesDeclarations */],
                __WEBPACK_IMPORTED_MODULE_31__app_tabs__["a" /* AppTabs */],
                __WEBPACK_IMPORTED_MODULE_32__app_maintenance__["a" /* AppMaintenance */],
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_22__app_main__["a" /* AppMain */],
                __WEBPACK_IMPORTED_MODULE_30__pages__["b" /* AppPagesDeclarations */],
                __WEBPACK_IMPORTED_MODULE_31__app_tabs__["a" /* AppTabs */],
                __WEBPACK_IMPORTED_MODULE_32__app_maintenance__["a" /* AppMaintenance */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_8_ionic_angular__["i" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_22__app_main__["a" /* AppMain */], IonicModuleOptions, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_12__ngx_translate_core__["c" /* TranslateModule */].forRoot(TranslateModuleOptions),
                __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["a" /* IonicStorageModule */].forRoot({ name: 'p4u', storeName: 'local', driverOrder: ['localstorage'] }),
                __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_http__["HttpModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_19_ngx_pipes__["b" /* NgObjectPipesModule */], __WEBPACK_IMPORTED_MODULE_19_ngx_pipes__["a" /* NgArrayPipesModule */],
                __WEBPACK_IMPORTED_MODULE_9_angular2_moment__["MomentModule"],
                __WEBPACK_IMPORTED_MODULE_23__components_api__["b" /* ApiModule */],
                __WEBPACK_IMPORTED_MODULE_26__components_push_push_module__["a" /* PushModule */],
                __WEBPACK_IMPORTED_MODULE_27__pages_login_login_module__["a" /* LoginModule */],
                __WEBPACK_IMPORTED_MODULE_34__components_notify__["b" /* NotifyModule */],
                __WEBPACK_IMPORTED_MODULE_28__pages_certificates_certificates_module__["a" /* CertificatesModule */],
                __WEBPACK_IMPORTED_MODULE_29__pages_exam_exam_module__["a" /* ExamModule */],
                __WEBPACK_IMPORTED_MODULE_35__pages_jobs_jobs_module__["a" /* JobsModule */],
                __WEBPACK_IMPORTED_MODULE_36__pages_bills_bills_module__["a" /* BillsModule */],
                __WEBPACK_IMPORTED_MODULE_37__pages_assignments_assignments_module__["a" /* AssignmentsModule */],
                __WEBPACK_IMPORTED_MODULE_38__pages_messages_messages_module__["a" /* MessagesModule */],
                __WEBPACK_IMPORTED_MODULE_39__pages_settings_settings_module__["a" /* SettingsModule */],
                __WEBPACK_IMPORTED_MODULE_40__pages_profile_profile_module__["a" /* ProfileModule */],
                __WEBPACK_IMPORTED_MODULE_41__components_files_files_module__["a" /* FilesModule */],
                __WEBPACK_IMPORTED_MODULE_42__pipes_pipes_module__["a" /* PipesModule */],
                __WEBPACK_IMPORTED_MODULE_24__components_popover_popover_module__["a" /* PopoverModule */],
                __WEBPACK_IMPORTED_MODULE_43__components_filter_filter_module__["a" /* FilterModule */]
            ],
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 599:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 299,
	"./af.js": 299,
	"./ar": 300,
	"./ar-dz": 301,
	"./ar-dz.js": 301,
	"./ar-kw": 302,
	"./ar-kw.js": 302,
	"./ar-ly": 303,
	"./ar-ly.js": 303,
	"./ar-ma": 304,
	"./ar-ma.js": 304,
	"./ar-sa": 305,
	"./ar-sa.js": 305,
	"./ar-tn": 306,
	"./ar-tn.js": 306,
	"./ar.js": 300,
	"./az": 307,
	"./az.js": 307,
	"./be": 308,
	"./be.js": 308,
	"./bg": 309,
	"./bg.js": 309,
	"./bm": 310,
	"./bm.js": 310,
	"./bn": 311,
	"./bn-bd": 312,
	"./bn-bd.js": 312,
	"./bn.js": 311,
	"./bo": 313,
	"./bo.js": 313,
	"./br": 314,
	"./br.js": 314,
	"./bs": 315,
	"./bs.js": 315,
	"./ca": 316,
	"./ca.js": 316,
	"./cs": 317,
	"./cs.js": 317,
	"./cv": 318,
	"./cv.js": 318,
	"./cy": 319,
	"./cy.js": 319,
	"./da": 320,
	"./da.js": 320,
	"./de": 152,
	"./de-at": 321,
	"./de-at.js": 321,
	"./de-ch": 322,
	"./de-ch.js": 322,
	"./de.js": 152,
	"./dv": 323,
	"./dv.js": 323,
	"./el": 324,
	"./el.js": 324,
	"./en-au": 325,
	"./en-au.js": 325,
	"./en-ca": 326,
	"./en-ca.js": 326,
	"./en-gb": 327,
	"./en-gb.js": 327,
	"./en-ie": 328,
	"./en-ie.js": 328,
	"./en-il": 329,
	"./en-il.js": 329,
	"./en-in": 330,
	"./en-in.js": 330,
	"./en-nz": 331,
	"./en-nz.js": 331,
	"./en-sg": 332,
	"./en-sg.js": 332,
	"./eo": 333,
	"./eo.js": 333,
	"./es": 334,
	"./es-do": 335,
	"./es-do.js": 335,
	"./es-mx": 336,
	"./es-mx.js": 336,
	"./es-us": 337,
	"./es-us.js": 337,
	"./es.js": 334,
	"./et": 338,
	"./et.js": 338,
	"./eu": 339,
	"./eu.js": 339,
	"./fa": 340,
	"./fa.js": 340,
	"./fi": 341,
	"./fi.js": 341,
	"./fil": 342,
	"./fil.js": 342,
	"./fo": 343,
	"./fo.js": 343,
	"./fr": 344,
	"./fr-ca": 345,
	"./fr-ca.js": 345,
	"./fr-ch": 346,
	"./fr-ch.js": 346,
	"./fr.js": 344,
	"./fy": 347,
	"./fy.js": 347,
	"./ga": 348,
	"./ga.js": 348,
	"./gd": 349,
	"./gd.js": 349,
	"./gl": 350,
	"./gl.js": 350,
	"./gom-deva": 351,
	"./gom-deva.js": 351,
	"./gom-latn": 352,
	"./gom-latn.js": 352,
	"./gu": 353,
	"./gu.js": 353,
	"./he": 354,
	"./he.js": 354,
	"./hi": 355,
	"./hi.js": 355,
	"./hr": 356,
	"./hr.js": 356,
	"./hu": 357,
	"./hu.js": 357,
	"./hy-am": 358,
	"./hy-am.js": 358,
	"./id": 359,
	"./id.js": 359,
	"./is": 360,
	"./is.js": 360,
	"./it": 361,
	"./it-ch": 362,
	"./it-ch.js": 362,
	"./it.js": 361,
	"./ja": 363,
	"./ja.js": 363,
	"./jv": 364,
	"./jv.js": 364,
	"./ka": 365,
	"./ka.js": 365,
	"./kk": 366,
	"./kk.js": 366,
	"./km": 367,
	"./km.js": 367,
	"./kn": 368,
	"./kn.js": 368,
	"./ko": 369,
	"./ko.js": 369,
	"./ku": 370,
	"./ku.js": 370,
	"./ky": 371,
	"./ky.js": 371,
	"./lb": 372,
	"./lb.js": 372,
	"./lo": 373,
	"./lo.js": 373,
	"./lt": 374,
	"./lt.js": 374,
	"./lv": 375,
	"./lv.js": 375,
	"./me": 376,
	"./me.js": 376,
	"./mi": 377,
	"./mi.js": 377,
	"./mk": 378,
	"./mk.js": 378,
	"./ml": 379,
	"./ml.js": 379,
	"./mn": 380,
	"./mn.js": 380,
	"./mr": 381,
	"./mr.js": 381,
	"./ms": 382,
	"./ms-my": 383,
	"./ms-my.js": 383,
	"./ms.js": 382,
	"./mt": 384,
	"./mt.js": 384,
	"./my": 385,
	"./my.js": 385,
	"./nb": 386,
	"./nb.js": 386,
	"./ne": 387,
	"./ne.js": 387,
	"./nl": 388,
	"./nl-be": 389,
	"./nl-be.js": 389,
	"./nl.js": 388,
	"./nn": 390,
	"./nn.js": 390,
	"./oc-lnc": 391,
	"./oc-lnc.js": 391,
	"./pa-in": 392,
	"./pa-in.js": 392,
	"./pl": 393,
	"./pl.js": 393,
	"./pt": 394,
	"./pt-br": 395,
	"./pt-br.js": 395,
	"./pt.js": 394,
	"./ro": 396,
	"./ro.js": 396,
	"./ru": 397,
	"./ru.js": 397,
	"./sd": 398,
	"./sd.js": 398,
	"./se": 399,
	"./se.js": 399,
	"./si": 400,
	"./si.js": 400,
	"./sk": 401,
	"./sk.js": 401,
	"./sl": 402,
	"./sl.js": 402,
	"./sq": 403,
	"./sq.js": 403,
	"./sr": 404,
	"./sr-cyrl": 405,
	"./sr-cyrl.js": 405,
	"./sr.js": 404,
	"./ss": 406,
	"./ss.js": 406,
	"./sv": 407,
	"./sv.js": 407,
	"./sw": 408,
	"./sw.js": 408,
	"./ta": 409,
	"./ta.js": 409,
	"./te": 410,
	"./te.js": 410,
	"./tet": 411,
	"./tet.js": 411,
	"./tg": 412,
	"./tg.js": 412,
	"./th": 413,
	"./th.js": 413,
	"./tk": 414,
	"./tk.js": 414,
	"./tl-ph": 415,
	"./tl-ph.js": 415,
	"./tlh": 416,
	"./tlh.js": 416,
	"./tr": 417,
	"./tr.js": 417,
	"./tzl": 418,
	"./tzl.js": 418,
	"./tzm": 419,
	"./tzm-latn": 420,
	"./tzm-latn.js": 420,
	"./tzm.js": 419,
	"./ug-cn": 421,
	"./ug-cn.js": 421,
	"./uk": 422,
	"./uk.js": 422,
	"./ur": 423,
	"./ur.js": 423,
	"./uz": 424,
	"./uz-latn": 425,
	"./uz-latn.js": 425,
	"./uz.js": 424,
	"./vi": 426,
	"./vi.js": 426,
	"./x-pseudo": 427,
	"./x-pseudo.js": 427,
	"./yo": 428,
	"./yo.js": 428,
	"./zh-cn": 429,
	"./zh-cn.js": 429,
	"./zh-hk": 430,
	"./zh-hk.js": 430,
	"./zh-mo": 431,
	"./zh-mo.js": 431,
	"./zh-tw": 432,
	"./zh-tw.js": 432
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 599;

/***/ }),

/***/ 629:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppMain; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_app_version__ = __webpack_require__(452);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment_timezone__ = __webpack_require__(630);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment_timezone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_moment_timezone__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_moment_locale_de__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_moment_locale_de___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_moment_locale_de__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_confirm__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_api__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_notify__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__utils_version__ = __webpack_require__(667);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_push__ = __webpack_require__(668);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_navigation__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__app_tabs__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__app_config__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__app_maintenance__ = __webpack_require__(490);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_firebase__ = __webpack_require__(454);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__assets_i18n_de_json__ = __webpack_require__(670);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__assets_i18n_de_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_19__assets_i18n_de_json__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



















// import { FCM } from '@ionic-native/fcm';

var AppMain = /** @class */ (function () {
    function AppMain(push, tabs, translate, platform, status, splash, events, confirm, user, notify, api, auth, app, firebase) {
        var _this = this;
        this.push = push;
        this.tabs = tabs;
        this.translate = translate;
        this.platform = platform;
        this.status = status;
        this.splash = splash;
        this.events = events;
        this.confirm = confirm;
        this.user = user;
        this.notify = notify;
        this.api = api;
        this.auth = auth;
        this.app = app;
        this.firebase = firebase;
        this.pages = __WEBPACK_IMPORTED_MODULE_8__pages__["a" /* AppPages */];
        // set default lang
        translate.setDefaultLang(__WEBPACK_IMPORTED_MODULE_16__app_config__["a" /* appConfig */].defaultLang);
        // set fixed local time zone to Berlin
        __WEBPACK_IMPORTED_MODULE_6_moment_timezone__["tz"].setDefault('Europe/Berlin');
        // set handlers
        this.handlers = {
            'tenders-matching': function (payload) { return _this.onNotification(payload); },
            'coming-checkout': function (payload) { return _this.onNotification(payload); }
        };
    }
    AppMain.prototype.ngOnInit = function () {
        this.onPlatformReady();
        this.navigateRoot();
        this.listenUnauthorized();
        this.listenDeactivated();
        this.listenLoggedIn();
        this.listenApiMaintenance();
        this.listenApiNoConnection();
    };
    AppMain.prototype.onPlatformReady = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.status.overlaysWebView(false);
            _this.status.styleDefault();
            _this.splash.hide();
            // this.fcm.getToken().then(token => {
            //     localStorage.setItem('token', token);
            //     console.log('token', token);
            // });
            // this.translate.setDefaultLang(appConfig.defaultLang);
            //this.translate.use(appConfig.defaultLang);
            var jsonSeData = __WEBPACK_IMPORTED_MODULE_19__assets_i18n_de_json___default.a;
            _this.translate.setTranslation('de', jsonSeData, true);
            _this.firebase.getToken()
                .then(function (token) { return console.log("The token is " + token); }) // save the token server-side and use it to push notifications to this device
                .catch(function (error) { return console.error('Error getting token', error); });
            _this.firebase.onNotificationOpen()
                .subscribe(function (data) { return console.log("User opened a notification " + data); });
        });
    };
    AppMain.prototype.onNotification = function (payload) {
        this.events.publish('push:notification', payload.type);
        this.selectTabBy(payload.type);
    };
    AppMain.prototype.selectTabBy = function (notification) {
        var _this = this;
        this.pages.forEach(function (tab) {
            if (tab.notification && tab.notification.includes(notification)) {
                _this.tabs.select(tab.name);
            }
        });
    };
    AppMain.prototype.listenLoggedIn = function () {
        var _this = this;
        this.events.subscribe('user:loggedin', function () {
            _this.push.init(_this.handlers);
        });
    };
    AppMain.prototype.listenUnauthorized = function () {
        var _this = this;
        this.events.subscribe('user:unauthorized', function (reason) {
            _this.auth.logout();
            _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_8__pages__["c" /* LoginPage */], { reason: reason });
        });
    };
    AppMain.prototype.listenDeactivated = function () {
        var _this = this;
        this.events.subscribe('user:deactivated', function (reason) {
            _this.accountMessage('deactivated', reason);
        });
    };
    AppMain.prototype.listenApiMaintenance = function () {
        var _this = this;
        this.events.subscribe('api:maintenance', function (info) {
            // in maintenance if info set
            if (info) {
                if (!_this.maintenance) {
                    _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_17__app_maintenance__["a" /* AppMaintenance */], { info: info });
                    _this.maintenance = true;
                }
            }
            else {
                // reload all to reset full flow
                window.location.reload();
            }
        });
    };
    AppMain.prototype.listenApiNoConnection = function () {
        var _this = this;
        this.events.subscribe('api:network-issue', function () {
            _this.notify.present('app.network-issue.message', 3000);
        });
    };
    AppMain.prototype.navigateRoot = function () {
        var _this = this;
        this.checkVersion().then(function (valid) {
            if (valid === true) {
                _this.regularStartup();
            }
            else if (valid) {
                _this.appMessage(valid === 'network-issue' ? 'network-issue' : 'maintenance', valid);
            }
            else {
                _this.appMessage('update');
            }
        });
    };
    AppMain.prototype.regularStartup = function () {
        var _this = this;
        this.auth.isAuthenticated().then(function () {
            _this.checkUser().then(function () {
                _this.push.init(_this.handlers);
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_15__app_tabs__["a" /* AppTabs */];
            });
        }, function () {
            _this.rootPage = __WEBPACK_IMPORTED_MODULE_8__pages__["c" /* LoginPage */];
        });
    };
    AppMain.prototype.checkUser = function () {
        var _this = this;
        return this.user.current().then(function (user) {
            if (user.isDeactivated()) {
                _this.accountMessage('deactivated', user.data().deactivated_reason);
            }
            return user;
        });
    };
    AppMain.prototype.checkVersion = function () {
        var _this = this;
        return this.api.getVersion().then(function (api) {
            return _this.app.getVersionNumber().then(function (local) {
                var valid = __WEBPACK_IMPORTED_MODULE_12__utils_version__["a" /* Version */].calculate(local) >= __WEBPACK_IMPORTED_MODULE_12__utils_version__["a" /* Version */].calculate(api.required.flapp);
                // check maintenance info
                if (valid && api.maintenance) {
                    return api.maintenance;
                }
                return valid;
            }, function () { return api.maintenance || true; }); // non-cordova env fallback
        }, function (err) {
            return err.status === 0 ? 'network-issue' : true;
        });
    };
    AppMain.prototype.accountMessage = function (type, message) {
        this.confirm.create({
            title: 'profile.' + type + '.title',
            message: message + ' ',
            confirm: true,
        }).present();
    };
    AppMain.prototype.appMessage = function (reason, params) {
        this.confirm.create({
            context: "app." + reason,
            item: params,
            title: 'title',
            message: 'message',
            persistant: true,
            cssClass: reason,
            onConfirm: this.confirmHandler(reason),
        }).present();
    };
    AppMain.prototype.confirmHandler = function (reason) {
        var _this = this;
        switch (reason) {
            case 'update': {
                return function () {
                    var link = _this.platform.is('android') && __WEBPACK_IMPORTED_MODULE_16__app_config__["a" /* appConfig */].store.android.url || __WEBPACK_IMPORTED_MODULE_16__app_config__["a" /* appConfig */].store.ios.url;
                    window.open(link, '_system', 'location=yes');
                    // to block dismiss
                    return false;
                };
            }
            case 'network-issue': {
                return function () {
                    window.location.reload(true);
                    // to block dismiss
                    return false;
                };
            }
            default: {
                return function () {
                    _this.regularStartup();
                };
            }
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Nav */])
    ], AppMain.prototype, "nav", void 0);
    AppMain = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/app/app.main.html"*/'<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/app/app.main.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_13__components_push__["a" /* PushService */], __WEBPACK_IMPORTED_MODULE_14__components_navigation__["b" /* TabsService */], __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["d" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Events */], __WEBPACK_IMPORTED_MODULE_9__components_confirm__["a" /* ConfirmController */], __WEBPACK_IMPORTED_MODULE_10__components_api__["f" /* ApiUserService */],
            __WEBPACK_IMPORTED_MODULE_11__components_notify__["a" /* NotifyController */], __WEBPACK_IMPORTED_MODULE_10__components_api__["g" /* NewApiService */], __WEBPACK_IMPORTED_MODULE_10__components_api__["a" /* ApiAuthService */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_app_version__["a" /* AppVersion */],
            __WEBPACK_IMPORTED_MODULE_18__ionic_native_firebase__["a" /* Firebase */]])
    ], AppMain);
    return AppMain;
}());

//# sourceMappingURL=app.main.js.map

/***/ }),

/***/ 633:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__loading_controller__ = __webpack_require__(456);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__countown_timer__ = __webpack_require__(634);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var LoadingModule = /** @class */ (function () {
    function LoadingModule() {
    }
    LoadingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateModule */],
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__countown_timer__["a" /* CountownTimer */],
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_4__countown_timer__["a" /* CountownTimer */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_3__loading_controller__["a" /* LoadingController */],
            ],
        })
    ], LoadingModule);
    return LoadingModule;
}());

//# sourceMappingURL=loading.module.js.map

/***/ }),

/***/ 634:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CountownTimer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_timer__ = __webpack_require__(635);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_timer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_timer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_take__ = __webpack_require__(445);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_take___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_take__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Directive for counting down given time.
 *
 * @param time Time in seconds
 * @param label Translate identifier
 *
 * @example
 * <countdown-time [time]="some.time" label="some.label"></countdown-time>
 */
var CountownTimer = /** @class */ (function () {
    function CountownTimer() {
        this.label = 'common.countdown';
    }
    CountownTimer.prototype.ngOnInit = function () {
        var _this = this;
        this.counter = __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].timer(0, 1000)
            .take(this.time + 1)
            .map(function () { return _this.time--; });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Number)
    ], CountownTimer.prototype, "time", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], CountownTimer.prototype, "label", void 0);
    CountownTimer = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'countdown-timer',
            template: "{{ label | translate }} {{ counter | async }} {{ 'common.seconds' | translate }}",
        })
    ], CountownTimer);
    return CountownTimer;
}());

//# sourceMappingURL=countown.timer.js.map

/***/ }),

/***/ 645:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getAuthHttp */
/* unused harmony export ApiProvider */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api_user__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__api_service__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__api_resources__ = __webpack_require__(460);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__api_auth__ = __webpack_require__(461);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__api_transform__ = __webpack_require__(462);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__api_notify__ = __webpack_require__(459);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










function getAuthHttp(http, storage) {
    return new __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__["AuthHttp"](new __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__["AuthConfig"]({
        tokenName: 'token',
        noJwtError: true,
        noClientCheck: true,
        tokenGetter: (function () { return storage.get('token'); }),
    }), http);
}
var ApiProvider = {
    provide: __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__["AuthHttp"],
    useFactory: getAuthHttp,
    deps: [__WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]],
};
var ApiModule = /** @class */ (function () {
    function ApiModule() {
    }
    ApiModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [],
            imports: [],
            exports: [],
            providers: [ApiProvider, __WEBPACK_IMPORTED_MODULE_5__api_service__["a" /* NewApiService */], __WEBPACK_IMPORTED_MODULE_6__api_resources__["a" /* ApiResources */], __WEBPACK_IMPORTED_MODULE_7__api_auth__["a" /* ApiAuthService */], __WEBPACK_IMPORTED_MODULE_4__api_user__["a" /* ApiUserService */], __WEBPACK_IMPORTED_MODULE_8__api_transform__["a" /* ApiTransform */], __WEBPACK_IMPORTED_MODULE_9__api_notify__["a" /* ApiNotifyController */]],
        })
    ], ApiModule);
    return ApiModule;
}());

//# sourceMappingURL=api.module.js.map

/***/ }),

/***/ 652:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiInterceptor; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_catch__ = __webpack_require__(458);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_retry__ = __webpack_require__(653);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_retry___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_retry__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_throw__ = __webpack_require__(655);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_collection__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_format__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__api_config__ = __webpack_require__(68);







// Not translatable api errors - app side in in api.errors
var errors = ['Token has expired'];
/**
 *
 */
var ApiInterceptor = /** @class */ (function () {
    function ApiInterceptor(storage, http, events, translate) {
        var _this = this;
        this.errors = {};
        this.events = events;
        this.http = http;
        this.storage = storage;
        this.translate = translate;
        // init (defered) not translateable api messages
        setTimeout(function () {
            return errors.forEach(function (msg) { return _this.errors[msg] = _this.translate.instant('api.errors.' + msg); });
        });
    }
    ApiInterceptor.prototype.intercept = function (observable) {
        var _this = this;
        return observable.catch(function (err) {
            if (err.status === 401) {
                // requests refreshing token if not in progress yet
                if (!_this.refreshingToken) {
                    _this.refreshingToken = new Promise(function (resolve, reject) {
                        // checking if the current token exist.
                        return _this.storage.get('token').then(function (token) {
                            if (token) {
                                return _this.http.get(__WEBPACK_IMPORTED_MODULE_6__api_config__["a" /* apiConfig */].baseUrl + __WEBPACK_IMPORTED_MODULE_6__api_config__["a" /* apiConfig */].refreshTokenUrl).toPromise().then(function (resp) {
                                    return _this.storage.set('token', resp.json().token).then(function () {
                                        // rejecting as handled in base to repeat
                                        reject('token:refreshed');
                                        _this.refreshingToken = undefined;
                                    });
                                }, function () {
                                    // emit event to logout if token refresh failed
                                    var data = err.json();
                                    var msg = data && data.message;
                                    _this.events.publish('user:unauthorized', msg && _this.errors[msg] || msg || data);
                                    reject('token:rejected');
                                    _this.refreshingToken = undefined;
                                });
                            }
                            else {
                                // response with the original error otherwise.
                                reject(err);
                            }
                        });
                    });
                }
                return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].fromPromise(_this.refreshingToken);
            }
            else {
                // checking maintenance / user disabled
                var data = err.json();
                if (err.status === 503) {
                    _this.events.publish('api:maintenance', _this.transformMaintenance(data.maintenance));
                }
                else if (err.status === 406) {
                    var msg = data && data.message;
                    _this.events.publish('user:unauthorized', msg && _this.errors[msg] || msg || data);
                }
                else if (err.status === 0) {
                    _this.events.publish('api:network-issue');
                }
                return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].throw(err);
            }
        });
    };
    ApiInterceptor.prototype.transformMaintenance = function (data) {
        return data && Object.assign(data, __WEBPACK_IMPORTED_MODULE_4__utils_collection__["a" /* Collection */].datify(data, ['start', 'end']), {
            startAt: (data.start && __WEBPACK_IMPORTED_MODULE_5__utils_format__["a" /* Format */].datetime(data.start)) || this.translate.instant('app.maintenance.ad-hoc'),
            endAt: (data.end && __WEBPACK_IMPORTED_MODULE_5__utils_format__["a" /* Format */].datetime(data.end)) || this.translate.instant('app.maintenance.ad-hoc')
        });
    };
    return ApiInterceptor;
}());

//# sourceMappingURL=api.interceptor.js.map

/***/ }),

/***/ 658:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiPrepare; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_config__ = __webpack_require__(68);


/**
 *
 */
var ApiPrepare = /** @class */ (function () {
    function ApiPrepare() {
    }
    /**
     * Transform given datetime (local) to utc formatted
     */
    ApiPrepare.datetime = function (datetime) {
        return datetime && __WEBPACK_IMPORTED_MODULE_0_moment__(datetime || new Date()).utc().format(__WEBPACK_IMPORTED_MODULE_1__api_config__["b" /* apiFormats */].prepare.datetime) || undefined;
    };
    return ApiPrepare;
}());

//# sourceMappingURL=api.prepare.js.map

/***/ }),

/***/ 659:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavigationModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tab_switch_directive__ = __webpack_require__(463);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__button_back__ = __webpack_require__(660);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tabs_service__ = __webpack_require__(165);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var NavigationModule = /** @class */ (function () {
    function NavigationModule() {
    }
    NavigationModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__button_back__["a" /* ButtonBack */],
                __WEBPACK_IMPORTED_MODULE_3__tab_switch_directive__["a" /* TabSwitchDirective */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */],
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateModule */],
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_4__button_back__["a" /* ButtonBack */],
                __WEBPACK_IMPORTED_MODULE_3__tab_switch_directive__["a" /* TabSwitchDirective */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__tabs_service__["a" /* TabsService */],
            ],
        })
    ], NavigationModule);
    return NavigationModule;
}());

//# sourceMappingURL=navigation.module.js.map

/***/ }),

/***/ 660:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ButtonBack; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * @name
 * ButtonBack
 * @description
 * Component for rendering back button
 *
 * @param label for translation
 *
 * @usage
 * ```html
 * <button-back label="some.label.to.translate"></button-back>
 * ```
 */
var ButtonBack = /** @class */ (function () {
    function ButtonBack() {
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('label'),
        __metadata("design:type", String)
    ], ButtonBack.prototype, "label", void 0);
    ButtonBack = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'button-back',template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/components/navigation/button.back.html"*/'<button color="main" ion-button clear icon-left navPop>\n  <ion-icon name="arrow-round-back"></ion-icon>\n  {{ label | translate }}\n</button>'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/components/navigation/button.back.html"*/,
        })
    ], ButtonBack);
    return ButtonBack;
}());

//# sourceMappingURL=button.back.js.map

/***/ }),

/***/ 661:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetailsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__details_controller__ = __webpack_require__(467);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__item_details__ = __webpack_require__(662);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var DetailsModule = /** @class */ (function () {
    function DetailsModule() {
    }
    DetailsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__item_details__["a" /* ItemDetails */],
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__item_details__["a" /* ItemDetails */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_1__details_controller__["a" /* DetailsController */],
            ],
        })
    ], DetailsModule);
    return DetailsModule;
}());

//# sourceMappingURL=details.module.js.map

/***/ }),

/***/ 662:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ItemDetails; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Items details content toggle
 *
 * @usage
 * ```html
 * <ion-item>
 *   <h2>Some label</h2>
 *   <div itemDetails>
 *     Some details
 *   </div>
 * </ion-item>
 * ```
 */
var ItemDetails = /** @class */ (function () {
    function ItemDetails(config, ref) {
        this.config = config;
        this.ref = ref;
        this.opened = false;
        this.element = this.ref.nativeElement;
        this.mode = this.config.get('mode');
    }
    ItemDetails.prototype.onClick = function (target) {
        if (this.label === target || this.label.contains(target) || this.icon === target) {
            this.toggle();
        }
    };
    ItemDetails.prototype.ngAfterViewInit = function () {
        this.item = this.element.parentElement;
        this.label = this.element.previousElementSibling || this.element;
        this.item.classList.add('has-item-details');
        this.createIcon();
    };
    ItemDetails.prototype.createIcon = function () {
        this.icon = document.createElement('ion-icon');
        this.icon.className = "icon icon-" + this.mode + " ion-" + this.mode + "-arrow-dropright item-icon";
        this.item.insertBefore(this.icon, this.element);
    };
    ItemDetails.prototype.toggle = function () {
        if (this.opened) {
            this.close();
        }
        else {
            this.open();
        }
    };
    ItemDetails.prototype.open = function () {
        var _this = this;
        this.item.classList.add('details-opening');
        setTimeout(function () { return _this.item.classList.add('details-opened'); }, 300);
        this.opened = true;
    };
    ItemDetails.prototype.close = function () {
        var _this = this;
        this.item.classList.remove('details-opened');
        setTimeout(function () { return _this.item.classList.remove('details-opening'); }, 25);
        this.opened = false;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('document:click', ['$event.target']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Element]),
        __metadata("design:returntype", void 0)
    ], ItemDetails.prototype, "onClick", null);
    ItemDetails = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[itemDetails]'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Config */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
    ], ItemDetails);
    return ItemDetails;
}());

//# sourceMappingURL=item.details.js.map

/***/ }),

/***/ 663:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotifyModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__navigation__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__nothing_found__ = __webpack_require__(469);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__notify_controller__ = __webpack_require__(470);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var NotifyModule = /** @class */ (function () {
    function NotifyModule() {
    }
    NotifyModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */],
                __WEBPACK_IMPORTED_MODULE_3__navigation__["a" /* NavigationModule */],
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__nothing_found__["a" /* NothingFoundComponent */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__notify_controller__["a" /* NotifyController */],
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_4__nothing_found__["a" /* NothingFoundComponent */],
            ],
        })
    ], NotifyModule);
    return NotifyModule;
}());

//# sourceMappingURL=notify.module.js.map

/***/ }),

/***/ 664:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ValidatorsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__currency_validator__ = __webpack_require__(481);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__submit_validator__ = __webpack_require__(665);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var Components = [
    __WEBPACK_IMPORTED_MODULE_2__currency_validator__["a" /* CurrencyValidator */],
    __WEBPACK_IMPORTED_MODULE_3__submit_validator__["a" /* SubmitValidator */],
];
var ValidatorsModule = /** @class */ (function () {
    function ValidatorsModule() {
    }
    ValidatorsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: Components,
            exports: Components,
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            ],
            providers: [],
        })
    ], ValidatorsModule);
    return ValidatorsModule;
}());

//# sourceMappingURL=validators.module.js.map

/***/ }),

/***/ 665:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubmitValidator; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Helper component to validate conditions, displaying errors on submit click try; sets button disable styled.
 *
 * @param context Translation namespace [context].errors.[field] will be used for error messages
 * @param check Check object definition - will evaluate if (strictly) false to display error
 * @param form Optional form reference if 'validity' check is defined - will check and display validation rules on form controls
 *     Will use [context].errors.[field].[rule] for translation
 *
 * @example
 *
 * <form #form="ngForm">
 *   <!-- form elements -->
 *   <submit-validator context="some.context" [form]="form" [check]="{
 *     validity: form.value,
 *     some: someValue === 'custom-value' ? checkCondition > 0 : undefined
 *   }">
 *   </submit-validator>
 *   <button ...></button>
 *
 *   @note Button must be next sibling; button type is changed to button/submit accordingly
 */
var SubmitValidator = /** @class */ (function () {
    function SubmitValidator(translate, element, renderer) {
        var _this = this;
        this.translate = translate;
        this.element = element;
        this.renderer = renderer;
        this.submitting = false;
        this.errors = [];
        this.clickListener = {
            handleEvent: function (e) { return _this.onButtonClick(e); },
        };
    }
    SubmitValidator.prototype.ngAfterViewInit = function () {
        this.button = this.element.nativeElement.nextElementSibling;
        if (this.button && this.button.tagName === 'BUTTON') {
            this.button.addEventListener('click', this.clickListener);
            this.ngOnChanges();
        }
    };
    SubmitValidator.prototype.ngOnChanges = function () {
        var _this = this;
        // from check
        var checked = Object.keys(this.check)
            .map(function (key) { return key !== 'validity' && _this.check[key] === false && _this.translate.instant(_this.context + ".errors." + key); })
            .filter(Boolean);
        // and from form validators
        var controled = Object.keys(this.form && this.check.validity !== undefined && this.form.controls || {})
            .map(function (key) { return _this.form.controls[key].invalid === true &&
            _this.translate.instant(_this.context + ".errors." + key + "." + Object.keys(_this.form.controls[key].errors).shift()); })
            .filter(Boolean);
        // concated
        this.errors = controled.concat(checked);
        // then set button class (incl. type to handle click as submit if valid)
        if (this.button) {
            if (this.errors.length > 0) {
                this.renderer.addClass(this.button, 'disabled');
                this.button.type = 'button';
            }
            else {
                this.renderer.removeClass(this.button, 'disabled');
                this.button.type = 'submit';
            }
        }
    };
    SubmitValidator.prototype.onButtonClick = function (event) {
        this.submitting = true;
        if (this.errors.length) {
            event.preventDefault();
        }
    };
    SubmitValidator.prototype.ngOnDestroy = function () {
        if (this.button) {
            this.renderer.removeClass(this.button, 'disabled');
            this.button.removeEventListener('click', this.clickListener);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class.submitting'),
        __metadata("design:type", Boolean)
    ], SubmitValidator.prototype, "submitting", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], SubmitValidator.prototype, "context", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], SubmitValidator.prototype, "check", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_forms__["NgForm"])
    ], SubmitValidator.prototype, "form", void 0);
    SubmitValidator = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'submit-validator',
            template: '<div *ngFor="let err of errors">{{ err }}</div>',
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["d" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer2"]])
    ], SubmitValidator);
    return SubmitValidator;
}());

//# sourceMappingURL=submit.validator.js.map

/***/ }),

/***/ 666:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Incentive; });
/**
 * @name
 * Incentive
 *
 * @description
 * Helper class with incentive related functionality
 *
 */
var Incentive = /** @class */ (function () {
    function Incentive() {
    }
    /**
     * Returns all allowed incentive identifiers
     */
    Incentive.types = function () {
        return Object.keys(Incentive.allowed);
    };
    /**
     * Transforms property based value into object with name and value
     */
    Incentive.transform = function (value, name) {
        return { name: name, value: value };
    };
    // Allowed/handled incentive types with check fulfill definition (method getting assignment, tbc)
    Incentive.allowed = {
        checkin: function () { return true; },
        picture_documentation: function () { return true; },
        sales_report: function () { return true; },
    };
    return Incentive;
}());

//# sourceMappingURL=incentive.js.map

/***/ }),

/***/ 667:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Version; });
/*
 * Utils class Version
 */
var Version = /** @class */ (function () {
    function Version() {
    }
    /**
     * Returns number representation of string version (maj * 10000 + min * 100 + patch)
     */
    Version.calculate = function (version) {
        var multipliers = [10000, 100, 1];
        return String(version).split('.').reduce(function (sum, part, idx) {
            return sum + multipliers[idx] * parseInt(part, 10);
        }, 0);
    };
    return Version;
}());

//# sourceMappingURL=version.js.map

/***/ }),

/***/ 668:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__push_service__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__push_module__ = __webpack_require__(180);
/* unused harmony reexport PushModule */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__push_service__["a"]; });



//# sourceMappingURL=index.js.map

/***/ }),

/***/ 669:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PushNotifyToggle; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__push_service__ = __webpack_require__(179);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * @name
 * PushNotifyToggle
 * @description
 * Toggle component for push notifications
 *
 * @param type for subscription
 *
 * @usage
 * ```html
 * <push-notify-toggle label="push.settings.label" type="tenders-matching"></push-notify-toggle>
 * ```
 */
var PushNotifyToggle = /** @class */ (function () {
    function PushNotifyToggle(push) {
        this.push = push;
    }
    PushNotifyToggle.prototype.ngOnInit = function () {
        var _this = this;
        this.push.isSubscribed(this.type).then(function (res) {
            _this.isSubscribed = res;
        });
    };
    PushNotifyToggle.prototype.handlePush = function () {
        this.push.set(this.type, this.isSubscribed);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], PushNotifyToggle.prototype, "type", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], PushNotifyToggle.prototype, "label", void 0);
    PushNotifyToggle = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'push-notify-toggle',template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/components/push/push.notify.toggle.html"*/'<ion-item [hidden]="isSubscribed === undefined">\n    <ion-label>{{ label | translate }}</ion-label>\n    <ion-toggle [(ngModel)]="isSubscribed" (ionChange)="handlePush()"></ion-toggle>\n</ion-item>'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/components/push/push.notify.toggle.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__push_service__["a" /* PushService */]])
    ], PushNotifyToggle);
    return PushNotifyToggle;
}());

//# sourceMappingURL=push.notify.toggle.js.map

/***/ }),

/***/ 67:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewApiService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_base__ = __webpack_require__(457);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_config__ = __webpack_require__(68);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


/**
 * ApiService - defines method accessible API calls
 *
 * @advanced Each method like:
 * public someMethod(data: any, options?: ApiRequestOptions): Observable<Response> {
 *   return this.request('get', '/path/to/endpoint', data, options);
 * }
 */
var NewApiService = /** @class */ (function (_super) {
    __extends(NewApiService, _super);
    function NewApiService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NewApiService.prototype.getDocumentUrl = function (data) {
        return __WEBPACK_IMPORTED_MODULE_1__api_config__["a" /* apiConfig */].baseUrl + this.path((data && '/documents/{id}') || '/documents', data, false);
    };
    NewApiService.prototype.getPictureUrl = function (data, base) {
        if (base === void 0) { base = true; }
        return this.path('/pictures/{id}', data, false);
    };
    NewApiService.prototype.login = function (data) {
        return this.request('post', '/auth/login', data);
    };
    NewApiService.prototype.resetPassword = function (data) {
        return this.request('post', '/auth/reset-password', data);
    };
    NewApiService.prototype.refreshToken = function (data) {
        return this.request('get', __WEBPACK_IMPORTED_MODULE_1__api_config__["a" /* apiConfig */].refreshTokenUrl, data);
    };
    NewApiService.prototype.getCurrentUser = function () {
        return this.request('get', '/users/current');
    };
    NewApiService.prototype.getFreelancer = function (data, options) {
        return this.request('get', '/freelancers/{freelancerId}', data, options);
    };
    NewApiService.prototype.getFreelancerAssignment = function (data, options) {
        return this.request('get', '/freelancers/{freelancerId}/assignments/{assignmentId}', data, options);
    };
    NewApiService.prototype.getFreelancerAssignments = function (data, options) {
        return this.request('get', '/freelancers/{id}/assignments', data, options);
    };
    NewApiService.prototype.getFreelancerJobs = function (data, options) {
        return this.request('get', '/freelancers/{freelancerId}/jobs', data, options);
    };
    NewApiService.prototype.getFreelancerJob = function (data, options) {
        return this.request('get', '/freelancers/{freelancerId}/jobs/{jobId}', data, options);
    };
    NewApiService.prototype.getFreelancerJobsAssignments = function (data, options) {
        return this.request('get', '/freelancers/{freelancerId}/jobs/assignments', data, options);
    };
    NewApiService.prototype.getFreelancerJobAssignments = function (data, options) {
        return this.request('get', '/freelancers/{freelancerId}/jobs/{jobId}/assignments', data, options);
    };
    NewApiService.prototype.getFreelancerTenders = function (data, options) {
        return this.request('get', '/freelancers/{id}/tenders', data, options);
    };
    NewApiService.prototype.getOffers = function (data, options) {
        return this.request('get', '/offers', data, options);
    };
    NewApiService.prototype.createCheckin = function (data, options) {
        return this.request('post', '/freelancers/{freelancerId}/assignments/{assignmentId}/checkins', data, options);
    };
    NewApiService.prototype.updateCheckin = function (data, options) {
        return this.request('post', '/freelancers/{freelancerId}/assignments/{assignmentId}/checkins/{checkinId}', data, options);
    };
    NewApiService.prototype.getPicture = function (data, options) {
        return this.request('get', '/pictures/{id}', data, options);
    };
    NewApiService.prototype.submitOffer = function (data, options) {
        return this.request('post', '/offers', data, options);
    };
    NewApiService.prototype.submitOffers = function (data, options) {
        return this.request('put', '/offers', data, options);
    };
    NewApiService.prototype.rejectTender = function (data, options) {
        return this.request('post', '/tenders/{id}/denials', data, options);
    };
    NewApiService.prototype.getFreelancerCertificates = function (data, options) {
        return this.request('get', '/freelancers/{id}/certificates', data, options);
    };
    NewApiService.prototype.getAllCertificates = function (data, options) {
        return this.request('get', '/certificates', data, options);
    };
    NewApiService.prototype.getCertificate = function (data, options) {
        return this.request('get', '/certificates/{id}', data, options);
    };
    NewApiService.prototype.getExam = function (data, options) {
        return this.request('post', '/exams/{id}/instances', data, options);
    };
    NewApiService.prototype.submitTest = function (data, options) {
        return this.request('post', '/exams/result', data, options);
    };
    NewApiService.prototype.registerDevice = function (data, options) {
        return this.request('post', '/users/{id}/device/register', data, options);
    };
    NewApiService.prototype.unregisterDevice = function (data, options) {
        return this.request('post', '/users/{id}/device/unregister', data, options);
    };
    NewApiService.prototype.updateDevice = function (data, options) {
        return this.request('post', '/users/{id}/device/update', data, options);
    };
    NewApiService.prototype.createAssignmentDocument = function (data, options) {
        return this.request('post', '/assignments/{assignment_id}/documents', data, options);
    };
    NewApiService.prototype.updateAssignmentDocument = function (data, options) {
        return this.request('post', '/assignments/{assignment_id}/documents/{document_id}', data, options);
    };
    NewApiService.prototype.removeAssignmentDocument = function (data, options) {
        return this.request('delete', '/assignments/{assignment_id}/documents/{document_id}', data, options);
    };
    NewApiService.prototype.createFreelancerRevenue = function (data, options) {
        return this.request('post', '/freelancers/{freelancerId}/revenues', data, options);
    };
    NewApiService.prototype.updateFreelancerRevenue = function (data, options) {
        return this.request('post', '/freelancers/{freelancerId}/revenues/{id}', data, options);
    };
    NewApiService.prototype.removeFreelancerRevenue = function (data, options) {
        return this.request('delete', '/freelancers/{freelancerId}/revenues/{id}', data, options);
    };
    NewApiService.prototype.getMessages = function (data, options) {
        return this.request('get', '/messages', data, options);
    };
    NewApiService.prototype.removeMessage = function (data, options) {
        return this.request('delete', '/messages/{id}', data, options);
    };
    NewApiService.prototype.createJobMessage = function (data, options) {
        return this.request('post', '/jobs/{job_id}/messages', data, options);
    };
    NewApiService.prototype.getFreelancerInvoices = function (data, options) {
        return this.request('get', '/freelancers/{freelancerId}/invoices', data, options);
    };
    NewApiService.prototype.getInvoice = function (data, options) {
        return this.request('get', '/freelancers/{freelancerId}/invoices/{invoiceId}', data, options);
    };
    NewApiService.prototype.createFreelancerInvoice = function (data, options) {
        return this.request('post', '/freelancers/{freelancerId}/invoices', data, options);
    };
    NewApiService.prototype.createDocumentApproval = function (data, options) {
        return this.request('post', '/documents/{documentId}/approvals', data, options);
    };
    NewApiService.prototype.createInvoiceApproval = function (data, options) {
        return this.request('post', '/invoices/{invoiceId}/approvals', data, options);
    };
    NewApiService.prototype.updateInvoiceApproval = function (data, options) {
        return this.request('post', '/invoices/{invoiceId}/approvals/{id}', data, options);
    };
    NewApiService.prototype.updateFreelancerInvoice = function (data, options) {
        return this.request('post', '/freelancers/{freelancerId}/invoices/{id}', data, options);
    };
    NewApiService.prototype.createFreelancerAssignmentSurveyInstance = function (data, options) {
        return this.request('post', '/freelancers/{freelancerId}/assignments/{assignmentId}/survey_instances', data, options);
    };
    NewApiService.prototype.updateFreelancerAssignmentSurveyInstance = function (data, options) {
        return this.request('post', '/freelancers/{freelancerId}/assignments/{assignmentId}/survey_instances/{id}', data, options);
    };
    NewApiService.prototype.generateFreelancerInvoice = function (data, options) {
        return this.request('post', '/freelancers/{freelancerId}/invoices/generate', data, options);
    };
    NewApiService.prototype.updateSurveyApproval = function (data, options) {
        return this.request('post', '/survey-instances/{survey_instance_id}/approvals/{id}', data, options);
    };
    NewApiService.prototype.getAllContractTypes = function (data, options) {
        return this.request('get', '/contract-types', data, options);
    };
    return NewApiService;
}(__WEBPACK_IMPORTED_MODULE_0__api_base__["a" /* ApiBase */]));

//# sourceMappingURL=api.service.js.map

/***/ }),

/***/ 670:
/***/ (function(module, exports) {

module.exports = {"CERTIFICATE":"ZERTIFIKATE","JOBS":"JOBS","CONTACT":"KONTAKT","LANGUAGE":"SPRACHE","JANUARY":"JANUAR","February":"FEBRUAR","March":"MÄRZ","April":"APRIL","May":"MAI","June":"JUNI","July":"JULI","August":"AUGUST","September":"SEPTEMBER","October":"OKTOBER","November":"NOVEMBER","December":"DEZEMBER","late_check_in":"Verspätete Check-in","check_in":"Check-in","close":"schließen","push_notification":"Push-Benachrichtigung","terms_and_conditions":"Geschäftsbedingungen","all_certificates":"Alle Zertifikate","my_certificate":"Meine Zertifikate","all_certs_intro":"Hier können Sie lernen, effizienter zu sein und sich selbst für mehr Jobs zu bewerben. Glückliches Lernen!","my_certs_intro":"Hier finden Sie Ihre Zertifikate, die Sie bestanden haben.","contact":"Kontakt","subject":"Betreff","message":"Nachricht","submit":"Absenden","head_office":"Hauptbüro","yes":"Ja","cancel":"Abbrechen","loading_content":"Laden, bitte warten!","authenticating":"Authentifizieren..","dismiss":"entlassen","from":"von","to":"bis","on":"Am","done":"Anwenden","api":{"errors":{"tokenExpired":"Token ist abgelaufen und kann nicht mehr verwendet werden, bitte melde dich erneut an.","Token has expired":"Token ist abgelaufen und kann nicht mehr verwendet werden, bitte melde dich erneut an."}},"app":{"update":{"title":"Update notwendig","message":"Entschuldigung, aber deine App ist nicht mehr aktuell. Bitte lade die neuste App aus dem Store herunter.","buttons":{"link":"Im Store öffnen"}},"maintenance":{"title":"Wartungsfenster des Portals","headline":"Wartungsfenster des Portals","start":"Beginn","end":"geplantes Ende","ad-hoc":"ungeplant","message":"Wartung aufgrund \"{reason}\"<div><span>Beginn: </span>{startAt}</div><div><span>geplantes Ende: </span>{endAt}</div>","buttons":{"link":"OK"}},"network-issue":{"title":"Netzwerkproblem","message":"Scheint, dass das Netzwerk oder der Dienst nicht verfügbar ist. Überprüfe deine Netzwerkeinstellungen.","buttons":{"link":"Versuch es noch einmal"}}},"common":{"none":"Keine","system":"System","fetching-data":"Daten abrufen","remaining":"verbleibend","late":"spät","pull-to-refresh":"Ziehen zum Aktualisieren","refreshing":"Daten abrufen","nothing-found":"Nichts gefunden","countdown":"Auslösen in","seconds":"Sekunden","gender":{"null":"","M":"Herr","F":"Frau"},"approval":{"accepted":{"title":"Akzeptiert","message":"{time}<br>{comment}","buttons":{"confirm":"OK"},"info":"Akzeptiert {hasComment, plural, =1{({comment})} other{}}"},"rejected":{"title":"Abgelehnt","message":"{time}<br>{comment}","buttons":{"confirm":"OK"},"info":"Abgelehnt ({comment})"}},"categories":{"label":"Kategorie","none":"Keine","fragrance":"Duft","care":"Pflege","visa":"Visa","cabin":"Kabine","spray":"Sprayeinsatz","flyer":"Flyer","wrap":"Einpackservice","teasing":"Teasing"},"contract_types":{"freelancer":"Gewerbeschein","tax_card":"Lohnsteuerkarte"}},"buttons":{"confirm":"OK","cancel":"Abbrechen","back":"Zurück","apply":"Anwenden","clear":"Löschen"},"auth":{"error":"Authentifizierungsfehler","login":{"email-placeholder":"E-Mail","password-placeholder":"Passwort","password-forgotten":"Passwort vergessen?","show-password":"Passwort anzeigen","button":"Anmelden"},"logout":{"action":"Ausloggen","confirm":"Bist du sicher, dass du dich ausloggen möchtest?","buttons":{"confirm":"Ja","cancel":"Abbrechen"}},"reset":{"email-placeholder":"E-Mail-Addresse","check-credentials":"Bitte überprüfe die Anmeldedaten.","info":"Bitte gebe deine registrierte E-Mail-Adresse an, um dein Passwort zurückzusetzen. Dann wird ein Link zur Bestätigung an deine E-Mail-Adresse gesendet.","sent":"Der Link zum Bestätigen wurde an deine E-Mail-Adresse gesendet.","done":"Gesendet","failed":"Authorisierungsfehler","buttons":{"confirm":"OK","back":"Zurück"}}},"errors":{"general":"Etwas ist schief gelaufen, bitte versuche es später noch einmal.","login-failed":"Anmeldung fehlgeschlagen!","network-failure":"Netzwerkfehler","download-failed":"Download fehlgeschlagen","upload-failed":"Hochladen fehlgeschlagen","invalid_credentials":"Ungültige Anmeldedaten.","not_confirmed_registration":"Registrierung noch nicht bestätigt. Bitte schaue in dein Postfach und klicke auf den Link zur Bestätigung."},"warnings":{"login-restricted":"Eingeschränkter Zugriff","onboarding-login":"Du hast nur eingeschränkten Zugriff, da du dich noch im Onboarding befindest."},"files":{"upload":{"inprogress":"Hochladen - {progress}%...","select":{"title":"Datei auswählen","warning":"Du musst den Zugriff auf deine Dateien und Kamera erlauben.","error":"Auswahl fehlgeschlagen","localstorage":"aus Dateien","camera":"von der Kamera"}}},"profile":{"deactivated":{"title":"Dein Konto wurde deaktiviert."},"contract_types":{"title":"Vertragsarten:"}},"assignments":{"tab-name":"Meine Jobs","header":{"today":"Heute","now":"Jetzt","late":"Du bist leider zu spät.","checkedin":"Super, du bist eingecheckt.","checkedout":"Schönen Feierabend.","prepared":"Schönen Feierabend.","invoiced":"Schönen Feierabend.","done":"Schönen Feierabend."},"nothing-found":{"headline":"Hallo {firstname}!","message":"Keine Jobs? Zeit dich zu bewerben.","button":"Zu den Angeboten"},"buttons":{"check-in":"Check-In","late-check-in":"Verspäteter Check-In","check-out":"Check-Out","upload-report":"Einsatzbericht hochladen","create-invoice":"Rechnung erstellen","invoice-details":"Rechnung ansehen","confirm":"OK","cancel":"Abbrechen"},"details":{"description":"Beschreibung","briefing":"Allgemeines Briefing","contact":"Verantwortlicher Agent","back":"Meine Jobs","documents":{"headline":"Dokumente","description":{"none":"Es sind keine Dokumente beigefügt.","exists":"Öffne das Dokument um es zu lesen."}},"additional":"Info","incentives":{"label":"Pauschalen","checkin":"Bei Anmeldung","sales_report":"Umsatzmeldung","picture_documentation":"Foto-Dokumentation"},"costs":{"label":"Vergütung"},"wage":"Stundensatz","fees":"Mögliches Honorar"},"check-in":{"title":"Check-In","message":"Bist du sicher, dass du bei {siteName} einchecken willst?"},"late-check-in":{"title":"Verspäteter Check-In","message":"Bist du sicher, dass du bei {siteName} einchecken willst?","via-sms":{"button":"SMS senden","message":"Hallo {agentName}, ich habe {jobName} um {time} eingecheckt.\n\n{freelancerName}"},"via-whatsapp":{"button":"WhatsApp","message":"Hallo {agentName}, ich habe {jobName} um {time} eingecheckt.\n\n{freelancerName}"}},"check-out":{"title":"Check-Out","message":"Bist du sicher, dass du bei {siteName} auschecken willst?"}},"offers":{"filters":{"active":"Gefilterte Angebote","search":{"short":"Suche","label":"Jobname, Einsatzort oder Filiale","placeholder":"mind. 3 Zeichen"},"state":{"label":"Status des Angebots","short":"Status"},"contractType":{"label":"Vertragstyp"}},"nothing-found":{"headline":"","message":"Keine von dir abgegebenen Angebote gefunden.","button":"Zu den Jobangeboten"}},"jobs":{"tab-name":"Angebote","matched":"Meine Jobangebote","unmatched":"Weitere Jobangebote","offers":"Abgegebene Angebote","dates":"{number} Termine vom {start} bis {end}","done":"{done} von {all} Einsätzen bearbeitet","nothing-found":{"headline":"","message":"Keine passenden Jobs verfügbar.","button":"Zu den Zertifikaten"},"filters":{"active":"Gefilterte Jobs","search":{"short":"Suche","label":"Jobname, Einsatzort oder Filiale","placeholder":"mind. 3 Zeichen"},"dates":{"short":"Termine","label":"Termine","start-placeholder":"von","end-placeholder":"bis"},"postcodes":{"short":"Postleitzahl","label":"Postleitzahl des Einsatzortes","min-placeholder":"von","max-placeholder":"bis"},"certificate":{"short":"Zertifikate","label":"Zertifikate"},"state":{"label":"Status des Angebots","short":"Status"},"contractType":{"label":"Vertragstyp"}},"details":{"description":"Beschreibung","briefing":"Allgemeines Briefing","dates":"Termine","back":"Angebote"},"buttons":{"select-all":"Alle auswählen","accept":"Angebot abgeben","reject":"Ausschreibung ablehnen","cancel":"Rückgängig"},"offer":{"question":{"button":"Du hast noch eine Frage?","create":"Frage zum Job '{title}'","title":"Rückfragen","info":"Du hast eine Frage zu den ausgewählten Ausschreibungen?","placeholder":"Gib hier bitte deine Frage ein.","sent":"Frage gesendet"},"accept":{"title":"Angebot abgeben","message.single":"Bist du sicher, dass du ein verbindliches Angebot abgeben möchtest?","message.multi":"Bist du sicher, dass du ein verbindliches Angebot für {selected} Angebote abgeben möchtest?","success":"Angebot erfolgreich abgegeben."},"reject":{"title":"Ausschreibungen ablehnen","message.single":"Bist du sicher, dass du dieses Angebot ablehnen möchtest?","message.multi":"Bist du sicher, dass du diese Angebote ablehnen möchtest?","countdown":"Ablauf in","success":"Ausschreibung abgelehnt"},"buttons":{"cancel":"Abbrechen","confirm":"Bestätigen"},"info":{"legal-blocked":"Du kannst keine Angebote abgeben, da uns noch Unterlagen von dir fehlen oder diese von uns noch nicht geprüft wurden.","gtc-blocked":"Du kannst keine Angebote abgeben, du hast die neuen AGB noch nicht akzeptiert.","pending":"Wir prüfen aktuell deine Angaben zu diesem Vertragstyp. Du kannst wieder Angebote abgeben, sobald wir deine Änderungen geprüft haben."},"states":{"pending":"In Arbeit","declined":"Abgelehnt"}},"mismatched":{"title":"Nicht übereinstimmende Kriterien","certificates":"Fehlende Zertifikate","cities":"Städte","zip":"Postleitzahl","location":"Standort","unmatched-location":"Nicht übereinstimmende Stadt oder Postleitzahl.","contractType":"Nicht übereinstimmender Vertragstyp","buttons":{"cancel":"Abbrechen"}}},"bills":{"tab-name":"Rechnungen","incentives":{"checkin":"Anmeldung am Einsatztag","sales_report":"Umsatzmeldung eingereicht","picture_documentation":"Foto-Dokumentation eingereicht"},"preparation":{"tab-name":"Vorbereitung","details":{"templates":{"headline":"Vorlagen","description":"Vorlagen herunterladen, ausfüllen, ausdrucken und unterschrieben wieder hochladen."},"feedback":{"headline":"Feedback","description":"","button":{"add":"Feedback beantworten","edit":"Feedback bearbeiten"},"submit":{"success":"Das Feedback wurde gespeichert.","error":"Das Feedback konnte nicht gespeichert werden."}},"questionnaire":{"headline":"Stellungnahme","description":"Bevor du den Einsatzbericht und die Umsatzmeldung eingeben kannst, benötigen wir von dir noch einige Angaben.","button":{"add":"Stellungnahme abgeben","edit":"Stellungnahme bearbeiten"},"submit":{"success":"Die Angaben wurden gespeichert.","error":"Die Angaben konnten nicht gespeichert werden."}},"report":{"headline":"Einsatzbericht","document":"Dokument","upload":"Datei hochladen","update":"Datei austauschen","save":"Speichern","confirm":{"title":"Speichern?","message":"Möchtest Du den Einsatzbericht speichern?"},"buttons":{"confirm":"Speichern","cancel":"Abbrechen"},"submit":{"success":"Einsatzbericht eingereicht"},"remove":{"confirm":{"title":"Löschen?","message":"Möchtest Du den Einsatzbericht löschen?"},"buttons":{"confirm":"Löschen","cancel":"Abbrechen"},"success":"Einsatzbericht gelöscht"}},"picture-documentation":{"headline":"Fotodokumentation","document":"Dokument","upload":"Datei hochladen","update":"Datei austauschen","confirm":{"title":"Speichern?","message":"Möchtest Du das Foto speichern?"},"buttons":{"confirm":"Speichern","cancel":"Abbrechen"},"submit":{"success":"Fotodokumentation eingereicht"},"remove":{"confirm":{"title":"Löschen?","message":"Möchtest Du das Foto löschen?"},"buttons":{"confirm":"Löschen","cancel":"Abbrechen"},"success":"Fotodokumentation gelöscht"}},"revenue":{"headline":"Umsatzmeldung","add":"Umsatzmeldung hinzufügen","set":"Speichern","total":"Gesamt","none":"Nicht vorhanden","comment":"Kommentar"},"back":"Abbrechen","close":"Fertig"},"submit":{"success":"Einsatzbericht eingereicht","revenue.success":"Umsatzmeldung eingereicht"},"nothing-found":{"headline":"","message":"Du hast keine Jobs zur Vorbereitung.","button":"Zu den Angeboten"}},"invoices":{"tab-name":"Überblick","submit":"Einsenden","job":"Job","assignments":"{number} {number, select, 1{Termin <small>({from})</small>} other{Termine <br><small>({from} - {to})}}</small>","nothing-found":{"headline":"","message":"Du hast noch keine Rechnung erstellt.","button":"Erstelle eine Rechnung"},"back":"Zurück","states":{"issued":"In Bearbeitung","approved":"Freigegeben","payment-authorized":"Zahlung angewiesen","money-transfered":"Zahlung erfolgt","rejected":"Zurückgewiesen"},"filters":{"active":"Gefilterte Rechnungen","search":{"short":"Suche","label":"Rechnungsnummer und Kommentar","placeholder":"mind. 3 Zeichen"},"dates":{"short":"Einsendedatum","label":"Einsendedatum","start-placeholder":"von","end-placeholder":"bis"},"state":{"short":"Status","label":"Status"},"contractType":{"label":"Vertragstyp"}}},"invoice":{"tab-name":"Neue Rechnung","title":{"create":"Rechnung erstellen","edit":"Rechnung bearbeiten","details":"Rechnungsdetails"},"edit":"Rechnung bearbeiten","number":"Rechnungsnummer","total":"Rechnungssumme","total-sconto-hint":"(abzgl. Skonto)","issued-at":"Einsendedatum","status":{"label":"Status","draft":"Entwurf","issued":"In Bearbeitung","approved":"Freigegeben","payment-authorized":"Zahlung angewiesen","money-transfered":"Zahlung erfolgt","rejected":"Zurückgewiesen"},"saved_by":"Gespeichert von","comment":"Kommentar","document":"Rechnungsdokument","discount":{"label":"Skonto-Zahlung","hint":"4% Abzug bei einer Überweisung innerhalb von 7 Banktagen."},"tax":{"label":"Umsatzsteuerpflichtig","with":"ja","without":"nein","hint":"<h5>Wann bin ich umsatzsteuerpflichtig?</h5><div><small>grundsätzlich ist jeder Unternehmer umsatzsteuerpflichtig</small><br/><br/><small>Rechnungen von Kleinunternehmern dürfen keine Umsatzsteuer ausweisen, ein entsprechender Rechtshinweis ist unabdingbar (§ 19 UStG)</small><br/><br/><small>für die Kleinunternehmerregelung dürfen folgende Grenzen nicht überschritten werden: 22.000 Euro (Stand 01.01.2020) im vorangegangen oder aktuellen Geschäftsjahr sowie 50.000 Euro im Folgejahr</small><br/><br/><small>unternehmerische Pflicht zur Kontrolle: werden die Grenzen überschritten, so greift im Folgejahr automatisch die Umsatzsteuerpflicht (das Finanzamt muss darauf nicht gesondert aufmerksam machen)</small><br/><br/></div>"},"assignments":"Einsätze","submit":{"success":"Rechnung eingereicht"},"back":"Abbrechen","nothing-found":{"headline":"Du hast keine Jobs, die in Rechnung gestellt werden können.","message":"Bitte lade zuerst Einsatzbericht und Stellungnahme für deine abgeschlossenen Einsätze hoch.","button":"Zur Vorbereitung"},"buttons":{"confirm":"OK","cancel":"Abbrechen","submit":"Speichern und Rechnung einsenden","generate":"Weiter"},"upload":{"select":"Dokumentquelle definieren","generate":"Rechnung generieren","own":"Rechnung hochladen","button":"Datei hochladen"},"rejected":{"headline":"Die Rechnung wurde zurückgewiesen","hint-preparation":"Bitte kontrolliere alle einsatzbezogenen Dokumente, z.B. Einsatzbericht und überarbeite diese falls nötig.","hint-invoice":"Bitte überarbeite deine Angaben im Rechnungsformular (Button 'Bearbeiten'), lade ggf. ein neues Rechnungsdokument hoch und reiche die Rechnung durch den Button 'Einsenden' erneut bei uns ein.","button":"Dokumente zur Rechnungsstellung bearbeiten"},"errors":{"number":{"required":"Rechnungsnummer fehlt."},"includes_taxes":{"required":"Angabe zur Umsatzsteuerpflicht fehlt."},"upload":{"required":"Rechnungsdokument fehlt."},"total":{"required":"Gesamtsumme der Rechnung fehlt."},"selected":"Auswahl der Einsätze fehlt.","document":"Dokument muss hochgeladen werden.","assignments":"Die ausgewählten Einsätze sind noch nicht vollständig bearbeitet. Im Bereich Vorbereitung kannst du die Einsätze bearbeiten."}},"generate":{"title":"Rechnungsgenerator","toggle":"Verwende den Rechnungsgenerator","costs-on-time":"Aufwandspauschale (nach Stunden)","additional-costs":"Vergütungen","incentives":"Pauschalen","gross":"Rechnungssumme (brutto)","net":"Rechnungssumme (netto)","vat":"Umsatzsteuer","total":"Rechnungssumme","select-address":"Bitte wähle die Adresse aus, die du als Anschrift in der Rechnung verwenden möchtest:","confirm":"Rechnungsvorschau erzeugen?","message":"Möchtest du das Rechnungsdokument mit der Nummer {number} über {total} erzeugen?","buttons":{"generate":"Weiter","confirm":"Ja, erzeugen","cancel":"Abbrechen"},"success":"Das Rechnungsdokument wurde erstellt und hinzugefügt. Du kannst mit dem Rechnungsstellungsvorgang fortfahren.","error":"Die Dokumentgenerierung ist fehlgeschlagen."}},"certificates":{"tab-name":"Akademie","tabs":{"all":"Alle Zertifikate","mine":"Meine Zertifikate","exclusive":"Einsatzschulungen"},"categories":{"product":"Produkt","brand":"Marke","fragrance":"Duft","care":"Pflege","cosmetics":"Kosmetik","promotion":"Promotion","sale":"Verkauf","legal":"Recht"},"recommendation":{"recommended":"Empfohlen","with_jobs":"Mit Jobs"},"card":{"jobs":"+{job_count_by_tenders} {job_count_by_tenders, plural, =1{Job} other{Jobs}}"},"nothing-found":{"mine":{"headline":"","message":"Du hast noch kein Zertifikat!","button":"Zu den Zertifikaten"},"all":{"headline":"","message":"Kein Zertifikat!","button":""},"exclusive":{"headline":"","message":"Keine Einsatzschulungen vorhanden.","button":""}},"start-test":"Starte den Test!","filters":{"active":"Gefilterte Zertifikate","search":{"short":"Suche","label":"Name, Kurz- oder Langbeschreibung","placeholder":"mind. 3 Zeichen"},"category":{"short":"Kategorie","label":"Kategorie des Zertifikats"},"recommendation":{"short":"Empfehlung","label":"Merkmale des Zertifikats"}}},"settings":{"tab-name":"Einstellungen","my-profile":"Mein Profil","page-name":"Einstellungen","imprint":"Impressum","dataprivacy":"Datenschutzerklärung"},"exam":{"instruction":{"headline":"Hinweise zum Test","description":"<p>Im nächsten Schritt werden dir die Testfragen mit möglichen Antworten angezeigt.</p><ul><li>Bitte lies die Frage sorgfältig durch und wähle danach <strong>eine oder mehrere Antworten</strong> aus.</li><li>Mit einem Klick auf den <strong>'Weiter'</strong>-Button kommst du zur nächsten Frage.</li><li>Mit einem Klick auf den <strong>'Zurück'</strong>-Button, kannst du zur vorherigen Frage zurückkehren.</li></ul><p>Nach der letzten Frage wird dir eine Zusammenfassung des Tests mit allen Fragen und deinen Antworten angezeigt.<br/>Hier kannst du nochmal deine Antworten überprüfen und gegebenfalls korrigieren.</p><p>Bitte sende abschließend deine Antworten an uns durch Klick auf den <strong>'Antworten senden'</strong>- Button.</p><p>Das Ergebnis wird dir sofort angezeigt.<br/>Solltest du den Test nicht bestanden haben, kannst du ihn problemlos wiederholen.</p><h4 class=\"text-uppercase\"><strong>Viel Erfolg!</strong></h4>"},"buttons":{"next":"Weiter","back":"Zurück","submit":"Antworten senden","confirm":"Ok","cancel":"Abbrechen"},"test":"Test: {name}","question":"Frage {num} von {all}","submit":"Möchtest Du deine Antworten jetzt senden?","results":{"passed":"Herzlichen Glückwunsch! Du hast den Test bestanden.","failed":"Leider hast du den Test nicht bestanden.","failed-questions":"Folgende Fragen solltest du dir vorher nochmal genauer anschauen:","result":"Ergebnis","questions":"Anzahl Fragen","correct":"Richtige Antworten","wrong":"Falsche Antworten","status":"Status","restart-test":"Test wiederholen","back-to-training":"Zurück zur Schulung","back-to-certificates":"Zurück zu den Zertifikaten"}},"push":{"settings":{"label-tenders-matching":"Benachrichtigungen: Angebote","label-coming-checkout":"Benachrichtigungen: Auschecken"},"button":{"open":"Anzeigen","cancel":"Abbrechen"},"notification":{"tenders-matching":"Du hast neue Job-Angebote."},"no-permission":"Push-Benachrichtigungen haben keine Berechtigungen."},"survey":{"abort":"Abbrechen","feedback":{"title":"Feedback","description":"Bitte gib uns noch eine Rückmeldung, wie dein Einsatz abgelaufen ist. Vielen Dank!","question":"Frage {num}","comment":{"label":"Begründung/Kommentar zur Frage {num}"},"answer":{"required":"Antwort mit freiem Text","true":"Ja","false":"Nein"},"submit":"Speichern"},"questionnaire":{"title":"Stellungnahme","description":"Bitte beantworte die nachfolgenden Fragen wahrheitsgemäß. Solltest du eine Frage mit 'nein' beantworten müssen, nenne uns bitte eine Begründung dafür. Vielen Dank!","question":"Frage {num}","comment":{"label":"Begründung/Kommentar zur Frage {num}","required":"Bitte gib eine Begründung für deine Antwort an."},"answer":{"true":"Stimmt","false":"Stimmt nicht"},"submit":"Speichern"},"errors":{"answer-missing":"Nicht alle Antworten gegeben","disagree-comment-missing":"Kommentar für negative Antwort erforderlich"}},"messages":{"counter":"Du hast {total, plural, =0{keine neuen} =1{eine neue} other{neue}} {total, plural, =1{Nachricht} other{Nachrichten}}.","fields":{"subject":"Betreff","content":"Inhalt"},"buttons":{"back":"Zurück","cancel":"Abbrechen","submit":"Absenden"}},"filter":{"search":{"placeHolder":"mind. 3 Zeichen"},"jobs":{"type":"Klasse der Ausschreibung","dates":"Termine","postcodes":"Postleitzahl des Einsatzortes","certificate":"Zertifikat"},"certificates":{"category":"Kategorie des Zertifikats","recommendation":"Merkmale des Zertifikats","attributes":"Merkmale des Zertifikats"},"date-range":{"min":"von","max":"bis","label":{"job":"Termine"}},"input-range":{"min":"von","max":"bis","label":{"zip":"Postleitzahl des Einsatzortes"}},"select":{"label":{"certificate":"Zertifikat"}}}}

/***/ }),

/***/ 671:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopoverModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__popover__ = __webpack_require__(672);
/* tslint:disable */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var PopoverModule = /** @class */ (function () {
    function PopoverModule() {
    }
    PopoverModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__popover__["a" /* Popover */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__popover__["a" /* Popover */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateModule */],
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3__popover__["a" /* Popover */]
            ]
        })
    ], PopoverModule);
    return PopoverModule;
}());

//# sourceMappingURL=popover.module.js.map

/***/ }),

/***/ 672:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Popover; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* tslint:disable */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { Storage } from '@ionic/storage';
/**
 * Generated class for the Popover component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
var Popover = /** @class */ (function () {
    function Popover(viewCtrl) {
        this.viewCtrl = viewCtrl;
        this.toggleStatus = localStorage.getItem('toggleStatus');
    }
    Popover.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    Popover.prototype.notify = function (event) {
        localStorage.setItem('toggleStatus', event.checked);
    };
    Popover = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'popover',template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/components/popover/popover.html"*/'<ion-item>\n  <ion-label>{{"push_notification" |translate}}</ion-label>\n  <ion-toggle color="main" [(ngModel)]="toggleStatus" (ionChange)="notify($event)"></ion-toggle>\n</ion-item>\n<ion-item (click)="close()">{{"terms_and_conditions"|translate}}</ion-item>'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/components/popover/popover.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* ViewController */]])
    ], Popover);
    return Popover;
}());

//# sourceMappingURL=popover.js.map

/***/ }),

/***/ 673:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_navigation__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_page__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__reset_password_page__ = __webpack_require__(464);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var Components = [
    __WEBPACK_IMPORTED_MODULE_4__login_page__["a" /* LoginPage */],
    __WEBPACK_IMPORTED_MODULE_5__reset_password_page__["a" /* ResetPasswordPage */],
];
var LoginModule = /** @class */ (function () {
    function LoginModule() {
    }
    LoginModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: Components,
            entryComponents: Components,
            exports: Components,
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_4__login_page__["a" /* LoginPage */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_3__components_navigation__["a" /* NavigationModule */],
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateModule */].forChild()
            ],
        })
    ], LoginModule);
    return LoginModule;
}());

//# sourceMappingURL=login.module.js.map

/***/ }),

/***/ 674:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CertificatesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_pipes__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_navigation__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__certificates_page__ = __webpack_require__(475);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__all_certificates_page__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__training_details_page__ = __webpack_require__(491);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__certificate_card__ = __webpack_require__(680);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__certificates_service__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_files_files_module__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_notify__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_filter__ = __webpack_require__(182);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var Components = [
    __WEBPACK_IMPORTED_MODULE_5__certificates_page__["a" /* CertificatesPage */],
    __WEBPACK_IMPORTED_MODULE_6__all_certificates_page__["a" /* AllCertificatesPage */],
    __WEBPACK_IMPORTED_MODULE_7__training_details_page__["a" /* TrainingDetailsPage */],
    __WEBPACK_IMPORTED_MODULE_8__certificate_card__["a" /* CertificateCard */],
];
var CertificatesModule = /** @class */ (function () {
    function CertificatesModule() {
    }
    CertificatesModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: Components,
            entryComponents: Components,
            exports: Components,
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_5__certificates_page__["a" /* CertificatesPage */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_3_ngx_pipes__["b" /* NgObjectPipesModule */],
                __WEBPACK_IMPORTED_MODULE_4__components_navigation__["a" /* NavigationModule */],
                __WEBPACK_IMPORTED_MODULE_10__components_files_files_module__["a" /* FilesModule */],
                __WEBPACK_IMPORTED_MODULE_11__components_notify__["b" /* NotifyModule */],
                __WEBPACK_IMPORTED_MODULE_12__components_filter__["a" /* FilterModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_9__certificates_service__["a" /* CertificatesService */],
            ],
        })
    ], CertificatesModule);
    return CertificatesModule;
}());

//# sourceMappingURL=certificates.module.js.map

/***/ }),

/***/ 675:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileUpload; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_image_picker__ = __webpack_require__(450);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(451);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__files_service__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__index__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__notify__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_util_noop__ = __webpack_require__(493);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_util_noop___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_util_noop__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









/**
 * Directive renders button with given label to upload file (of given type).
 * Emits uploaded event with uploaded document meta info.
 * Can by styled outline within button 'optional' property.
 *
 * @example
 * <file-upload [type]="document" [label]="some.trans.ident" (uploaded)="onUpload(file)" [disabled]="true" [button]="optional">
 */
var FileUpload = /** @class */ (function () {
    function FileUpload(zone, files, platform, actions, picker, camera, translate, notify) {
        var _this = this;
        this.zone = zone;
        this.files = files;
        this.platform = platform;
        this.actions = actions;
        this.picker = picker;
        this.camera = camera;
        this.translate = translate;
        this.notify = notify;
        this.label = 'files.upload.select.button';
        this.button = 'primary';
        this.uploaded = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.permissions = true;
        this.progress = '';
        this.win = window;
        this.picker.hasReadPermission().then(function (permitted) {
            if (permitted) {
                _this.permissions = false;
            }
        });
    }
    FileUpload.prototype.ngOnInit = function () {
        this.type = 'picture' === this.fileKind && __WEBPACK_IMPORTED_MODULE_6__index__["a" /* FileKind */].Picture || __WEBPACK_IMPORTED_MODULE_6__index__["a" /* FileKind */].Document;
    };
    FileUpload.prototype.select = function () {
        var _this = this;
        this.choose().then(function (file) {
            if (file) {
                _this.progress = '0';
                _this.uploading = true;
                _this.files.upload(file, _this.type, function (t) { return _this.onProgress(t); }).then(function (meta) {
                    if (meta) {
                        _this.uploaded.emit(meta);
                    }
                    else {
                        _this.notify.present('errors.upload-failed');
                    }
                    _this.uploading = false;
                });
            }
        }, __WEBPACK_IMPORTED_MODULE_8_rxjs_util_noop__["noop"]);
    };
    FileUpload.prototype.choose = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.actions.create({
                title: _this.trans('select.title'),
                subTitle: !_this.permissions && _this.trans('select.warning'),
                buttons: [{
                        text: _this.trans('select.localstorage'),
                        icon: 'image',
                        handler: function () { return _this.onSelectPicture(resolve, reject); },
                    }, {
                        text: _this.trans('select.camera'),
                        icon: 'camera',
                        handler: function () { return _this.onSelectCamera(resolve, reject); },
                    }, {
                        text: _this.translate.instant('buttons.cancel'),
                        role: 'cancel',
                        handler: function () { return reject(); },
                    }],
            }).present();
        });
    };
    /**
     * Select picture handler
     */
    FileUpload.prototype.onSelectPicture = function (resolve, reject) {
        var _this = this;
        var options = {
            maximumImagesCount: 1,
        };
        return this.picker.getPictures(options).then(function (files) {
            if (files && files !== 'OK' && files[0]) {
                // update flag on success select - to not show warning next time
                _this.permissions = true;
                resolve(_this.localFilePath(files[0]));
            }
            else {
                // omit permission dialog
                resolve(files && files === 'OK');
            }
        }, function () { return reject; });
    };
    /**
     * Select camera handler
     */
    FileUpload.prototype.onSelectCamera = function (resolve, reject) {
        var _this = this;
        var options = {
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            allowEdit: true,
            quality: 95
        };
        this.camera.getPicture(options).then(function (uri) {
            resolve(_this.localFilePath(uri));
        }, function () { return reject; });
    };
    /**
     * On download progress handler
     */
    FileUpload.prototype.onProgress = function (transfered) {
        var _this = this;
        if (transfered) {
            this.zone.run(function () { return _this.progress = transfered.percent.toFixed(0); });
        }
    };
    /**
     * Translates string with prefix
     */
    FileUpload.prototype.trans = function (identifier, values) {
        return this.translate.instant('files.upload.' + identifier, values);
    };
    /**
     * converts filepath for wkwebview usage on ios
     *
     * @param path
     */
    FileUpload.prototype.localFilePath = function (path) {
        if (this.platform.is('ios')) {
            path = this.win.Ionic.WebView.convertFileSrc(path);
            path = path.replace('_app_file_/', '');
        }
        else {
            path = Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* normalizeURL */])(path);
        }
        return path;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('type'),
        __metadata("design:type", String)
    ], FileUpload.prototype, "fileKind", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], FileUpload.prototype, "disabled", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], FileUpload.prototype, "label", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], FileUpload.prototype, "button", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], FileUpload.prototype, "uploaded", void 0);
    FileUpload = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'file-upload',template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/components/files/file.upload.html"*/'<ion-item [ngClass]="{uploading: uploading}">\n  <button ion-button type="button" full [color]="button === \'optional\' ? \'button-default\' : \'button-primary\'" (click)="select()" [attr.disabled]="disabled || undefined" [ngClass]="{outline: button === \'optional\'}">\n    {{ label | translate }}\n  </button>\n  <div class="status">\n    <ion-spinner></ion-spinner>\n    <span>{{ \'files.upload.inprogress\' | translate : {progress: progress} }}</span>\n  </div>\n</ion-item>\n'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/components/files/file.upload.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_5__files_service__["a" /* FilesService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_image_picker__["a" /* ImagePicker */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["d" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_7__notify__["a" /* NotifyController */]])
    ], FileUpload);
    return FileUpload;
}());

//# sourceMappingURL=file.upload.js.map

/***/ }),

/***/ 676:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApprovalIcon; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_confirm___ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Renders approval icon - including "cover" element with confirm displayed on click.
 *
 * @param approval
 */
var ApprovalIcon = /** @class */ (function () {
    function ApprovalIcon(confirm) {
        this.confirm = confirm;
    }
    /**
     * Opens info
     */
    ApprovalIcon.prototype.open = function (event) {
        // to block report edit
        event.stopPropagation();
        // extend for translation
        var item = Object.assign(this.approval, {
            approver: this.approval.creator.name,
            time: this.approval.createdAt,
            comment: this.approval.comment || '',
        });
        this.confirm.create({
            context: 'common.approval.' + this.approval.state,
            title: 'title',
            message: 'message',
            item: item,
            confirm: true
        }).present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], ApprovalIcon.prototype, "approval", void 0);
    ApprovalIcon = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'approval-icon',template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/components/files/approval.icon.html"*/'<span *ngIf="approval && approval.state !== \'pending\'" [ngClass]="approval.state"></span>\n<div class="info" (click)="open($event)"></div>\n'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/components/files/approval.icon.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__components_confirm___["a" /* ConfirmController */]])
    ], ApprovalIcon);
    return ApprovalIcon;
}());

//# sourceMappingURL=approval.icon.js.map

/***/ }),

/***/ 677:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApprovalInfo; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * Renders approval info with icon.
 *
 * @param approval Approval data - within comment property
 */
var ApprovalInfo = /** @class */ (function () {
    function ApprovalInfo() {
    }
    ApprovalInfo.prototype.ngOnInit = function () {
        this.hasComment = this.approval && this.approval.comment && this.approval.comment.length && 1;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], ApprovalInfo.prototype, "approval", void 0);
    ApprovalInfo = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'approval-info',template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/components/files/approval.info.html"*/'<div *ngIf="approval && approval.state !== \'pending\'">\n  <span [ngClass]="approval.state"></span>\n  {{ \'common.approval.\' + approval.state + \'.info\' | translate : { comment: approval.comment, hasComment: hasComment } }}\n</div>\n'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/components/files/approval.info.html"*/,
        })
    ], ApprovalInfo);
    return ApprovalInfo;
}());

//# sourceMappingURL=approval.info.js.map

/***/ }),

/***/ 678:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilesizePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 *
 */
var FilesizePipe = /** @class */ (function () {
    function FilesizePipe() {
    }
    /**
     *
     */
    FilesizePipe.prototype.transform = function (value, precision) {
        if (precision === void 0) { precision = 2; }
        var units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB'];
        var res = Number(value);
        var i = 0;
        while (res >= 1000) {
            res /= 1000;
            i++;
        }
        return res.toFixed(precision).toLocaleString() + units[i];
    };
    FilesizePipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'filesize',
        })
    ], FilesizePipe);
    return FilesizePipe;
}());

//# sourceMappingURL=filesize.js.map

/***/ }),

/***/ 679:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToCurrencyPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_format__ = __webpack_require__(69);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


/**
 * Generated class for the ToCurrencyPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var ToCurrencyPipe = /** @class */ (function () {
    function ToCurrencyPipe() {
    }
    /**
     * Takes a value and transforms it to german currency formatted string.
     */
    ToCurrencyPipe.prototype.transform = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var retNumber = Number(value);
        return isNaN(retNumber) ? value : __WEBPACK_IMPORTED_MODULE_1__utils_format__["a" /* Format */].numbers(value) + '€' || '';
    };
    ToCurrencyPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'toCurrency',
        })
    ], ToCurrencyPipe);
    return ToCurrencyPipe;
}());

//# sourceMappingURL=to-currency.js.map

/***/ }),

/***/ 68:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return apiConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return apiFormats; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_app_config__ = __webpack_require__(42);

var apiConfig = {
    baseUrl: __WEBPACK_IMPORTED_MODULE_0__app_app_config__["a" /* appConfig */].apiBaseUrl,
    refreshTokenUrl: __WEBPACK_IMPORTED_MODULE_0__app_app_config__["a" /* appConfig */].refreshTokenUrl,
    minSearchString: 3,
};
var apiFormats = {
    transform: __WEBPACK_IMPORTED_MODULE_0__app_app_config__["b" /* appFormats */].transform,
    prepare: __WEBPACK_IMPORTED_MODULE_0__app_app_config__["b" /* appFormats */].prepare,
};
//# sourceMappingURL=api.config.js.map

/***/ }),

/***/ 680:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CertificateCard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__training_details_page__ = __webpack_require__(491);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_details__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CertificateCard = /** @class */ (function () {
    function CertificateCard(details) {
        this.details = details;
    }
    /**
     * Shows details
     */
    CertificateCard.prototype.showDetails = function (trainingId) {
        return this.details.open(__WEBPACK_IMPORTED_MODULE_1__training_details_page__["a" /* TrainingDetailsPage */], { id: trainingId, passed: this.passed });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], CertificateCard.prototype, "certificate", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], CertificateCard.prototype, "passed", void 0);
    CertificateCard = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/certificates/certificate.card.html"*/'<ion-card text-wrap tappable (click)="showDetails(certificate.id)">\n  <ion-item>\n    <ion-thumbnail item-start>\n      <img [pictureLoad]="certificate.picture_id" pictureType="icon">\n    </ion-thumbnail>\n    <ion-row>\n      <h3 text-nowrap head-3> {{ certificate.name }} </h3>\n    </ion-row>\n    <ion-row>\n      <p> {{ certificate.teaser }} </p>\n    </ion-row>\n    <ion-row light class="footer">\n      <ion-col col-6>\n        <ion-icon name="pricetag" medium></ion-icon>\n        {{ \'certificates.categories.\' + certificate.category | translate }}\n      </ion-col>\n      <ion-col>\n        <button *ngIf="certificate.job_count_by_tenders > 0" class="jobs" ion-button clear small>\n          {{ \'certificates.card.jobs\' | translate : certificate }}\n        </button>\n      </ion-col>\n    </ion-row>\n  </ion-item>\n</ion-card>\n'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/certificates/certificate.card.html"*/,
            selector: 'certificate-card',
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__components_details__["a" /* DetailsController */]])
    ], CertificateCard);
    return CertificateCard;
}());

//# sourceMappingURL=certificate.card.js.map

/***/ }),

/***/ 681:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterSearch; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__filter_base__ = __webpack_require__(73);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Internal sub-component of filter-bar
 *
 */
var FilterSearch = /** @class */ (function (_super) {
    __extends(FilterSearch, _super);
    function FilterSearch(translate) {
        var _this = _super.call(this, translate) || this;
        _this.translate = translate;
        return _this;
    }
    FilterSearch.prototype.ngOnInit = function () {
        this.text = this.initial || '';
        _super.prototype.ngOnInit.call(this);
    };
    FilterSearch.prototype.value = function () {
        return this.text;
    };
    FilterSearch.prototype.filtered = function () {
        return _super.prototype.filtered.call(this, this.text);
    };
    FilterSearch.prototype.clear = function () {
        this.text = '';
        this.set();
    };
    FilterSearch = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'filter-search',template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/components/filter/filter.search.html"*/'<ion-searchbar [(ngModel)]="text" (ionInput)="set()" placeholder="{{ context + \'.filters.search.placeholder\' | translate }}"></ion-searchbar>'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/components/filter/filter.search.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["d" /* TranslateService */]])
    ], FilterSearch);
    return FilterSearch;
}(__WEBPACK_IMPORTED_MODULE_2__filter_base__["a" /* FilterBase */]));

//# sourceMappingURL=filter.search.js.map

/***/ }),

/***/ 682:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterDateRange; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__filter_base__ = __webpack_require__(73);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Internal sub-component of filter-bar
 *
 */
var FilterDateRange = /** @class */ (function (_super) {
    __extends(FilterDateRange, _super);
    function FilterDateRange(translate) {
        var _this = _super.call(this, translate) || this;
        _this.translate = translate;
        return _this;
    }
    FilterDateRange.prototype.ngOnInit = function () {
        this.start = this.initial && this.initial.start;
        this.end = this.initial && this.initial.end;
        _super.prototype.ngOnInit.call(this);
    };
    FilterDateRange.prototype.value = function () {
        return {
            start: this.start,
            end: this.end,
        };
    };
    FilterDateRange.prototype.filtered = function () {
        return (this.start || this.end) && _super.prototype.filtered.call(this, [this.start || '...', this.end || '...'].join(' - '));
    };
    FilterDateRange.prototype.clear = function () {
        this.start = null;
        this.end = null;
        this.set();
    };
    FilterDateRange = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'filter-date-range',template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/components/filter/filter.date.range.html"*/'<ion-row no-padding>\n  <ion-col>\n    <button ion-button icon-left clear small>\n      <ion-icon name="calendar"></ion-icon>\n      <ion-datetime no-padding displayFormat="DD.MM.YYYY" (ionChange)="set()" [(ngModel)]="start"\n        [placeholder]="context + \'.filters.\' + name + \'.start-placeholder\' | translate"\n        [doneText]="\'done\' | translate" [cancelText]="\'cancel\' | translate">\n      </ion-datetime>\n    </button>\n  </ion-col>\n  <ion-col>\n    <button ion-button icon-left clear small>\n      <ion-icon name="calendar"></ion-icon>\n      <ion-datetime no-padding displayFormat="DD.MM.YYYY" (ionChange)="set()" [(ngModel)]="end"\n        [placeholder]="context + \'.filters.\' + name + \'.end-placeholder\' | translate"\n        [doneText]="\'done\' | translate" [cancelText]="\'cancel\' | translate">\n      </ion-datetime>\n    </button>\n  </ion-col>\n</ion-row>\n'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/components/filter/filter.date.range.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["d" /* TranslateService */]])
    ], FilterDateRange);
    return FilterDateRange;
}(__WEBPACK_IMPORTED_MODULE_2__filter_base__["a" /* FilterBase */]));

//# sourceMappingURL=filter.date.range.js.map

/***/ }),

/***/ 683:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterRange; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__filter_base__ = __webpack_require__(73);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Internal sub-component of filter-bar
 *
 */
var FilterRange = /** @class */ (function (_super) {
    __extends(FilterRange, _super);
    function FilterRange(translate) {
        var _this = _super.call(this, translate) || this;
        _this.translate = translate;
        return _this;
    }
    FilterRange.prototype.ngOnInit = function () {
        this.min = this.initial && this.initial.min;
        this.max = this.initial && this.initial.max;
        _super.prototype.ngOnInit.call(this);
    };
    FilterRange.prototype.value = function () {
        return {
            min: this.min,
            max: this.max,
        };
    };
    FilterRange.prototype.filtered = function () {
        return (this.min || this.max) && _super.prototype.filtered.call(this, [this.min || '...', this.max || '...'].join(' - '));
    };
    FilterRange.prototype.clear = function () {
        this.min = '';
        this.max = '';
        this.set();
    };
    FilterRange = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'filter-range',template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/components/filter/filter.range.html"*/'<ion-row no-padding>\n  <ion-input type="number" [(ngModel)]="min"  (ionBlur)="set()"\n    [placeholder]="context + \'.filters.\' + name + \'.min-placeholder\' | translate">\n  </ion-input>\n  <ion-input type="number" [(ngModel)]="max"  (ionBlur)="set()"\n    [placeholder]="context + \'.filters.\' + name + \'.max-placeholder\' | translate">\n  </ion-input>\n</ion-row>\n'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/components/filter/filter.range.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["d" /* TranslateService */]])
    ], FilterRange);
    return FilterRange;
}(__WEBPACK_IMPORTED_MODULE_2__filter_base__["a" /* FilterBase */]));

//# sourceMappingURL=filter.range.js.map

/***/ }),

/***/ 684:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterSelect; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_collection__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_options__ = __webpack_require__(500);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__filter_base__ = __webpack_require__(73);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Internal sub-component of filter-bar
 */
var FilterSelect = /** @class */ (function (_super) {
    __extends(FilterSelect, _super);
    function FilterSelect(translate) {
        var _this = _super.call(this, translate) || this;
        _this.translate = translate;
        return _this;
    }
    FilterSelect.prototype.ngOnInit = function () {
        this.id = this.initial;
        if (typeof this.items === 'string') {
            this.items = __WEBPACK_IMPORTED_MODULE_3__utils_options__["a" /* Options */].list(this.items, this.translate);
        }
        if (this.none && !this.initial) {
            this.id = 0; // to set selected none option
        }
        _super.prototype.ngOnInit.call(this);
    };
    FilterSelect.prototype.value = function () {
        return this.id;
    };
    FilterSelect.prototype.filtered = function () {
        return this.id && (__WEBPACK_IMPORTED_MODULE_2__utils_collection__["a" /* Collection */].find(this.items, { id: this.id }) || {}).name;
    };
    FilterSelect.prototype.clear = function () {
        this.id = undefined;
        this.set();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('options'),
        __metadata("design:type", Object)
    ], FilterSelect.prototype, "items", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('none'),
        __metadata("design:type", Boolean)
    ], FilterSelect.prototype, "none", void 0);
    FilterSelect = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'filter-select',template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/components/filter/filter.select.html"*/'<ion-row>\n  <ion-col col-12>\n    <div class="form-group">\n      <ion-select [(ngModel)]="id" interface="popover" (ionChange)="set()" [okText]="\'buttons.confirm\' | translate" [cancelText]="\'buttons.cancel\' | translate">\n        <ion-option *ngIf="none" [value]="0" text-wrap>{{ \'common.none\' | translate }}</ion-option>\n        <ion-option *ngFor="let opt of items" [value]="opt.id" text-wrap>{{ opt.name }}</ion-option>\n      </ion-select>\n    </div>\n  </ion-col>\n</ion-row>'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/components/filter/filter.select.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["d" /* TranslateService */]])
    ], FilterSelect);
    return FilterSelect;
}(__WEBPACK_IMPORTED_MODULE_4__filter_base__["a" /* FilterBase */]));

//# sourceMappingURL=filter.select.js.map

/***/ }),

/***/ 685:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterButtons; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_collection__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_options__ = __webpack_require__(500);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_checklist__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__filter_base__ = __webpack_require__(73);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Internal sub-component of filter-bar
 */
var FilterButtons = /** @class */ (function (_super) {
    __extends(FilterButtons, _super);
    function FilterButtons(translate) {
        var _this = _super.call(this, translate) || this;
        _this.translate = translate;
        return _this;
    }
    FilterButtons.prototype.ngOnInit = function () {
        var _this = this;
        if (typeof this.items === 'string') {
            this.list = __WEBPACK_IMPORTED_MODULE_3__utils_options__["a" /* Options */].list(this.items, this.translate);
            this.items = __WEBPACK_IMPORTED_MODULE_4__utils_checklist__["a" /* Checklist */].prepare(this.list);
            // pre-select if set
            (this.initial || []).forEach(function (selected) { return _this.items[selected] = true; });
        }
        _super.prototype.ngOnInit.call(this);
    };
    FilterButtons.prototype.value = function () {
        return __WEBPACK_IMPORTED_MODULE_4__utils_checklist__["a" /* Checklist */].selected(this.items);
    };
    FilterButtons.prototype.filtered = function () {
        var _this = this;
        var selected = __WEBPACK_IMPORTED_MODULE_4__utils_checklist__["a" /* Checklist */].selected(this.items);
        return selected.length && selected.map(function (id) { return __WEBPACK_IMPORTED_MODULE_2__utils_collection__["a" /* Collection */].find(_this.list, { id: id }).name; }).join(', ');
    };
    FilterButtons.prototype.clear = function () {
        __WEBPACK_IMPORTED_MODULE_4__utils_checklist__["a" /* Checklist */].reset(this.items);
        this.set();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('options'),
        __metadata("design:type", Object)
    ], FilterButtons.prototype, "items", void 0);
    FilterButtons = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'filter-buttons',template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/components/filter/filter.buttons.html"*/'<ion-row>\n  <div *ngFor="let opt of list" class="filter-button">\n    <label>\n      <input [(ngModel)]="items[opt.id]" type="checkbox" (change)="set()">\n      <span>{{ opt.name }}</span>\n    </label>\n  </div>\n</ion-row>'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/components/filter/filter.buttons.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["d" /* TranslateService */]])
    ], FilterButtons);
    return FilterButtons;
}(__WEBPACK_IMPORTED_MODULE_5__filter_base__["a" /* FilterBase */]));

//# sourceMappingURL=filter.buttons.js.map

/***/ }),

/***/ 686:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExamModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_navigation__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__exam_instructions_page__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__exam_result_page__ = __webpack_require__(476);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__exam_main_page__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__exam_service__ = __webpack_require__(477);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var Components = [
    __WEBPACK_IMPORTED_MODULE_4__exam_instructions_page__["a" /* ExamInstructionsPage */],
    __WEBPACK_IMPORTED_MODULE_5__exam_result_page__["a" /* ExamResultPage */],
    __WEBPACK_IMPORTED_MODULE_6__exam_main_page__["a" /* ExamMainPage */],
];
var ExamModule = /** @class */ (function () {
    function ExamModule() {
    }
    ExamModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: Components,
            entryComponents: Components,
            exports: Components,
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_4__exam_instructions_page__["a" /* ExamInstructionsPage */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_3__components_navigation__["a" /* NavigationModule */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_7__exam_service__["a" /* ExamService */],
            ],
        })
    ], ExamModule);
    return ExamModule;
}());

//# sourceMappingURL=exam.module.js.map

/***/ }),

/***/ 688:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JobCard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_collection__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__jobs_operations__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_confirm_confirm_controller__ = __webpack_require__(455);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var actionDelay = 3000;
var JobCard = /** @class */ (function () {
    function JobCard(operations, confirm, translate) {
        this.operations = operations;
        this.confirm = confirm;
        this.translate = translate;
        this.removed = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.changed = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.process = false;
        this.pending = undefined;
        this.status = {};
        this.delay = actionDelay / 1000;
    }
    JobCard.prototype.ngOnInit = function () {
        this.setStatus();
    };
    /**
     * Shows details
     */
    JobCard.prototype.showDetails = function () {
        var _this = this;
        if (this.job.matching) {
            this.operations.showDetails(this.job).onDidDismiss(function (operation) {
                // on dismiss after rejected or accepted
                if (operation === 'accepted-partially') {
                    _this.changed.emit(_this.job);
                }
                else if (operation) {
                    _this.removed.emit(_this.job);
                }
            });
        }
        else {
            this.confirm.create({
                title: 'jobs.mismatched.title',
                message: this.mismatchedMsg(),
                cancel: true,
                cssClass: 'mismatched-info',
            }).present();
        }
    };
    /**
     * Handles cancel action
     */
    JobCard.prototype.cancel = function (event, item) {
        if (event) {
            event.stopPropagation();
        }
        if (item) {
            item.close();
        }
        if (this.pending) {
            clearTimeout(this.pending);
            this.pending = undefined;
        }
        this.processing(false);
        return true;
    };
    /**
     * Sends accept offer to api (within confirmation implemented in operations)
     *
     * @param item
     * @param event
     */
    JobCard.prototype.accept = function (event, item) {
        var _this = this;
        if (event) {
            this.cancel(event, item);
        }
        if (!this.processing()) {
            var ids = __WEBPACK_IMPORTED_MODULE_1__utils_collection__["a" /* Collection */].ids(this.job.tenders);
            this.processing(true);
            this.operations.acceptOffers(this.job, ids).then(function () {
                _this.cancel();
                _this.removed.emit(_this.job);
            }).catch(function () {
                _this.cancel();
            });
        }
    };
    /**
     * Sends reject offer to api
     *
     * @param event
     */
    JobCard.prototype.reject = function (event) {
        var _this = this;
        event.stopPropagation();
        if (!this.processing() && !this.pending) {
            this.pending = setTimeout(function () {
                var ids = __WEBPACK_IMPORTED_MODULE_1__utils_collection__["a" /* Collection */].ids(_this.job.tenders);
                _this.processing(true);
                _this.operations.rejectOffers(_this.job, ids, false).then(function () {
                    _this.cancel();
                    _this.removed.emit(_this.job);
                }).catch(function () {
                    _this.processing(false);
                });
            }, actionDelay);
        }
    };
    /**
     * Sets card status
     */
    JobCard.prototype.setStatus = function () {
        this.status = this.operations.getStatus(this.job);
    };
    /**
     * Setter/getter of processing item (API operations)
     *
     * @param set Processing flag
     */
    JobCard.prototype.processing = function (set) {
        if (set === undefined) {
            return this.process;
        }
        else {
            this.process = set;
            if (this.status.class) {
                this.status.class.processing = set;
            }
        }
    };
    JobCard.prototype.mismatchedMsg = function () {
        var _this = this;
        return Object.entries(this.job.mismatched).map(function (entry) {
            var key = entry[0], value = entry[1];
            var criteria = _this.translate.instant('jobs.mismatched.' + key);
            var values = (!Array.isArray(value) ? [value] : value).join(', ');
            return "<div>" + criteria + "</div><div>" + values + "</div>";
        }).join('');
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], JobCard.prototype, "job", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], JobCard.prototype, "removed", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], JobCard.prototype, "changed", void 0);
    JobCard = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/jobs/job.card.html"*/'<ion-card tappable (click)="showDetails()" [ngClass]="status.class">\n  <ion-spinner></ion-spinner>\n  <ion-item-sliding #slidingItem>\n\n    <!-- copy of tender-item.html (almost, as without calendar part) as item-sliding requires ion-item child -->\n    <ion-item class="tender-item">\n      <ion-row class="head">\n        <h3 text-nowrap head-3>{{ job.shortTitle }}</h3>\n        <p text-nowrap>{{ job.client.name }}</p>\n        <ion-col>\n          <p class="category" *ngIf="job.category">\n            <ion-icon name="pricetag"></ion-icon>\n            <span>{{ \'common.categories.\' + job.category | translate }}</span>\n          </p>\n        </ion-col>\n        <ion-col [class.mismatching]="!job.matching && (job.mismatched.contractType)" *ngIf="job.contract_type_identifier">\n          <p class="category">\n            <ion-icon name="paper"></ion-icon>\n            <span>{{ \'common.contract_types.\' + job.contract_type_identifier | translate }}</span>\n          </p>\n        </ion-col>\n      </ion-row>\n      <ion-row class="schedule" light>\n        <ion-col col-12 normal>\n          <ion-icon name="ios-calendar-outline" medium></ion-icon>\n          <span *ngIf="job.tenders.length === 1">{{ job.range.dates.start | amDateFormat : \'DD MMMM, YYYY\' }}</span>\n          <span *ngIf="job.tenders.length > 1">{{ \'jobs.dates\' | translate : {\n            number: job.tenders.length,\n            start: (job.range.dates.start | amDateFormat : \'DD MMM\'),\n            end: (job.range.dates.end | amDateFormat : \'DD MMM YYYY\')\n          } }}</span>\n        </ion-col>\n        <ion-col col-6>\n          <ion-icon name="ios-clock-outline" medium></ion-icon>\n          {{ job.range.dates.start | amDateFormat : \'HH:mm\' }} - {{ job.range.dates.end | amDateFormat : \'HH:mm\' }}\n        </ion-col>\n        <ion-col col-6 text-right class="rates">\n          {{ job.range.rates.max | toCurrency }}\n        </ion-col>\n        <ion-col col-12 text-nowrap>\n          <ion-icon name="ios-home-outline" medium></ion-icon>\n          {{ job.site.name + (job.site.number ? \' | \'+ job.site.number : \'\') }}\n        </ion-col>\n        <ion-col col-12 text-nowrap [class.mismatching]="!job.matching && (job.mismatched.location)">\n          <ion-icon name="ios-pin-outline" medium></ion-icon>\n          {{ job.site.zip + \' \' + job.site.city + \', \' + job.site.address }}\n        </ion-col>\n        <ion-col *ngIf="!job.matching && job.mismatched.certificates && job.mismatched.certificates.length" class="mismatching" col-12 text-nowrap>\n          <ion-icon name="ios-alert-outline" small></ion-icon>\n          {{ \'jobs.mismatched.certificates\' | translate }}: {{ job.mismatched.certificates.length }}\n        </ion-col>\n        <ion-col *ngIf="job.offered && job.state" class="state {{ job.state }}" col-12 text-nowrap>\n          {{ \'jobs.offer.states.\' + job.state | translate }}\n        </ion-col>\n      </ion-row>\n    </ion-item>\n\n    <ion-item-options *ngIf="job.matching && !job.offered" side="left">\n      <button ion-button expandable (click)="accept($event, slidingItem)" color="success">\n        <div>\n          <ion-icon name="ios-thumbs-up"></ion-icon>\n          {{ \'jobs.buttons.accept\' | translate }}\n        </div>\n      </button>\n    </ion-item-options>\n\n    <ion-item-options *ngIf="job.matching && !job.offered" side="right" [ngClass]="{pending: pending}">\n      <button ion-button expandable (click)="pending && cancel($event, slidingItem) || reject($event)" class="reject">\n        <div>\n          <ion-icon name="ios-thumbs-down"></ion-icon>\n          {{ \'jobs.buttons.reject\' | translate }}\n        </div>\n        <div class="pending">\n          <ion-icon name="ios-refresh"></ion-icon>\n          {{ \'jobs.buttons.cancel\' | translate }}\n          <ng-container *ngIf="pending">\n            <countdown-timer [time]="delay" label="jobs.offer.reject.countdown"></countdown-timer>\n          </ng-container>\n        </div>\n      </button>\n    </ion-item-options>\n  </ion-item-sliding>\n</ion-card>\n'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/jobs/job.card.html"*/,
            selector: 'job-card'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__jobs_operations__["b" /* JobsOperations */], __WEBPACK_IMPORTED_MODULE_4__components_confirm_confirm_controller__["a" /* ConfirmController */], __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["d" /* TranslateService */]])
    ], JobCard);
    return JobCard;
}());

//# sourceMappingURL=job.card.js.map

/***/ }),

/***/ 689:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TenderItem; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TenderItem = /** @class */ (function (_super) {
    __extends(TenderItem, _super);
    function TenderItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], TenderItem.prototype, "tender", void 0);
    TenderItem = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/jobs/tender.item.html"*/'<ion-item>\n  <ion-row class="head">\n    <h3 text-nowrap head-3>{{ tender.job.title }}</h3>\n    <p>{{ tender.client.name }}</p>\n    <ion-col>\n      <div class="category" *ngIf="tender.category">\n        <ion-icon name="pricetag"></ion-icon>\n        <span>{{ \'common.categories.\' + tender.category | translate }}</span>\n      </div>\n    </ion-col>\n    <ion-col>\n      <div class="category" *ngIf="tender.contract_type_identifier">\n        <ion-icon name="paper"></ion-icon>\n        <span>{{ \'common.contract_types.\' + tender.contract_type_identifier | translate }}</span>\n      </div>\n    </ion-col>\n  </ion-row>\n  <ion-row class="schedule" light>\n    <ion-col col-12 normal>\n      <ion-icon name="ios-calendar-outline" medium></ion-icon>\n      <span *ngIf="!tender.count">{{ tender.start_at | amDateFormat : \'DD MMMM YYYY\' }}</span>\n      <span *ngIf="tender.count && tender.count.done === 1">{{ tender.range.dates.start | amDateFormat : \'DD MMMM YYYY\' }}</span>\n      <span *ngIf="tender.count && tender.count.done > 1">{{ \'jobs.dates\' | translate : {\n        number: tender.count.done,\n        start: (tender.range.dates.start | amDateFormat : \'DD MMM\'),\n        end: (tender.range.dates.end | amDateFormat : \'DD MMM YYYY\')\n      } }}</span>\n    </ion-col>\n    <ion-col col-6>\n      <ion-icon name="ios-clock-outline" medium></ion-icon>\n      {{ tender.start_time }} - {{ tender.finish_time }}\n    </ion-col>\n    <ion-col col-6 text-right *ngIf="!tender.count || (tender.count && (tender.count.done === 1 || tender.range))">\n      <span *ngIf="tender.range">\n        {{ tender.range.rates.sum.min | toCurrency }}\n        {{ (tender.range.rates.sum.min !== tender.range.rates.sum.max) ? \' - \'  + (tender.range.rates.sum.max | toCurrency) : \'\' }}\n      </span>\n      <span *ngIf="!tender.range">\n        {{ tender.daily_rate_min | toCurrency }}\n        {{ (tender.daily_rate_min !== tender.daily_rate_max) ? \' - \'  + (tender.daily_rate_max | toCurrency) : \'\' }}\n      </span>\n    </ion-col>\n    <ion-col col-12 text-nowrap class="long">\n      <ion-icon name="ios-home-outline" medium></ion-icon>\n      {{ tender.site.name + (tender.site.number ? \' | \'+ tender.site.number : \'\') }}\n    </ion-col>\n    <ion-col col-12 text-nowrap>\n      <ion-icon name="ios-pin-outline" medium></ion-icon>\n      {{ tender.site.zip + \' \' + tender.site.city + \', \' + tender.site.address }}\n    </ion-col>\n  </ion-row>\n  <ion-icon name="warning" *ngIf="tender.warning"></ion-icon>\n</ion-item>\n'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/jobs/tender.item.html"*/,
            selector: 'tender-item',
        })
    ], TenderItem);
    return TenderItem;
}(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Item */]));

//# sourceMappingURL=tender.item.js.map

/***/ }),

/***/ 69:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Format; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_app_config__ = __webpack_require__(42);


/*
 * Utils class Format
 */
var Format = /** @class */ (function () {
    function Format() {
    }
    /**
     * Returns datetime formatted (configured in the app)
     */
    Format.datetime = function (value) {
        return __WEBPACK_IMPORTED_MODULE_0_moment__(value).local().format(__WEBPACK_IMPORTED_MODULE_1__app_app_config__["b" /* appFormats */].transform.datetime);
    };
    /**
     * Returns date formatted (configured in the app)
     */
    Format.date = function (value) {
        return __WEBPACK_IMPORTED_MODULE_0_moment__(value).local().format(__WEBPACK_IMPORTED_MODULE_1__app_app_config__["b" /* appFormats */].transform.date);
    };
    /**
     * Returns formatted number (fixed 2 decimals and comma separator)
     */
    Format.numbers = function (value) {
        var val = typeof value === 'string' ? Number(value.replace(/,/g, '.').replace(/ /g, '')) : value;
        return val.toFixed(2).replace('.', ',');
    };
    return Format;
}());

//# sourceMappingURL=format.js.map

/***/ }),

/***/ 690:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AssignmentSelect; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_checklist__ = __webpack_require__(90);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AssignmentSelect = /** @class */ (function () {
    function AssignmentSelect() {
        this.selectedChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.disabled = {};
    }
    AssignmentSelect.prototype.ngOnInit = function () {
        var _this = this;
        this.assignments = this.assignments || [];
        // prepare checklist model
        this.chosen = __WEBPACK_IMPORTED_MODULE_1__utils_checklist__["a" /* Checklist */].prepare(this.assignments);
        (this.selected || []).map(function (id) { return _this.chosen[id] = true; });
    };
    AssignmentSelect.prototype.ngOnChanges = function (changes) {
        if (changes.disable) {
            this.updateDisabled();
        }
    };
    AssignmentSelect.prototype.onToggle = function () {
        this.selected = __WEBPACK_IMPORTED_MODULE_1__utils_checklist__["a" /* Checklist */].selected(this.chosen).map(Number);
        this.selectedChange.emit(this.selected);
    };
    AssignmentSelect.prototype.updateDisabled = function () {
        var _this = this;
        var disabled = {};
        this.assignments.forEach(function (assignment) {
            if (assignment.disabled || _this.disable) {
                disabled[assignment.id] = true;
            }
        });
        this.disabled = disabled;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Array)
    ], AssignmentSelect.prototype, "assignments", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Array)
    ], AssignmentSelect.prototype, "selected", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('disabled'),
        __metadata("design:type", Boolean)
    ], AssignmentSelect.prototype, "disable", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], AssignmentSelect.prototype, "action", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], AssignmentSelect.prototype, "selectedChange", void 0);
    AssignmentSelect = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'assignment-select',template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/bills/assignment.select.html"*/'<ion-item-group>\n  <ion-item *ngFor="let assignment of assignments">\n    <ion-label>{{ assignment.start_at | amDateFormat : \'DD.MM.YYYY\' }}</ion-label>\n    <ion-checkbox [disabled]="disabled[assignment.id]" [(ngModel)]="chosen[assignment.id]" (ionChange)="onToggle()"></ion-checkbox>\n    <div *ngIf="action && (!action.enabled || action.enabled(assignment))" ngClass="{\'has-button\': action.handler}" item-end>\n      <span *ngIf="action.info">{{ action.info(assignment) }}</span>\n      <button ion-button item-end outline *ngIf="action.handler" [attr.disabled]="!chosen[assignment.id] || undefined" (click)="action.handler(assignment)">\n        {{ action.label }}\n      </button>\n    </div>\n  </ion-item>\n</ion-item-group>'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/bills/assignment.select.html"*/,
        })
    ], AssignmentSelect);
    return AssignmentSelect;
}());

//# sourceMappingURL=assignment.select.js.map

/***/ }),

/***/ 691:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InvoiceItem; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var InvoiceItem = /** @class */ (function (_super) {
    __extends(InvoiceItem, _super);
    function InvoiceItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], InvoiceItem.prototype, "invoice", void 0);
    InvoiceItem = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/bills/invoices/invoice.item.html"*/'<ion-item>\n  <ion-thumbnail class="cal-date" item-start>\n    <h2>{{ invoice.issued_at | amDateFormat : \'DD\' }}</h2>\n    <p>{{ invoice.issued_at | amDateFormat : \'MMMM\' }}</p>\n    <p>{{ invoice.issued_at | amDateFormat : \'YYYY\' }}</p>\n  </ion-thumbnail>\n  <ion-row class="head">\n    <h5 light>{{ \'bills.invoice.number\' | translate }}</h5>\n    <h3 text-nowrap head-3>{{ invoice.number }}</h3>\n    <p text-wrap light>{{ invoice.comment }}</p>\n  </ion-row>\n  <ion-row light class="schedule">\n    <ion-col col-12>\n      <ion-icon name="calendar" medium></ion-icon>\n      <p [innerHTML]="\'bills.invoices.assignments\' | translate : invoice.summary"></p>\n    </ion-col>\n    <ion-col col-5>\n      {{ invoice.total | toCurrency }}\n      <span class="total_sconto_hint" *ngIf="invoice.with_discount === \'true\'">{{ \'bills.invoice.total-sconto-hint\' | translate }}</span>\n    </ion-col>\n    <ion-col col-7 [ngClass]="invoice.state" text-end>\n      {{ \'bills.invoice.status.\' + invoice.state | translate }}\n    </ion-col>\n  </ion-row>\n</ion-item>\n'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/bills/invoices/invoice.item.html"*/,
            selector: 'invoice-item',
        })
    ], InvoiceItem);
    return InvoiceItem;
}(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Item */]));

//# sourceMappingURL=invoice.item.js.map

/***/ }),

/***/ 692:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AssignmentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_moment__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_pipes__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_nl2br_pipe__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pipes_pipes_module__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_notify__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_files__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_details__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_navigation__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__jobs_jobs_module__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__messages_messages_module__ = __webpack_require__(503);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__bills_bills_module__ = __webpack_require__(502);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__assignments_service__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__assignments_page__ = __webpack_require__(465);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__assignment_details__ = __webpack_require__(505);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__assignment_card__ = __webpack_require__(695);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__assignment_operations__ = __webpack_require__(185);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



















var Components = [
    __WEBPACK_IMPORTED_MODULE_15__assignments_page__["a" /* AssignmentsPage */],
    __WEBPACK_IMPORTED_MODULE_17__assignment_card__["a" /* AssignmentCard */],
    __WEBPACK_IMPORTED_MODULE_16__assignment_details__["a" /* AssignmentDetailsModal */],
];
var AssignmentsModule = /** @class */ (function () {
    function AssignmentsModule() {
    }
    AssignmentsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: Components,
            entryComponents: Components,
            exports: Components,
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_15__assignments_page__["a" /* AssignmentsPage */]),
                __WEBPACK_IMPORTED_MODULE_3_angular2_moment__["MomentModule"],
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_11__jobs_jobs_module__["a" /* JobsModule */],
                __WEBPACK_IMPORTED_MODULE_12__messages_messages_module__["a" /* MessagesModule */],
                __WEBPACK_IMPORTED_MODULE_10__components_navigation__["a" /* NavigationModule */],
                __WEBPACK_IMPORTED_MODULE_9__components_details__["b" /* DetailsModule */],
                __WEBPACK_IMPORTED_MODULE_8__components_files__["b" /* FilesModule */],
                __WEBPACK_IMPORTED_MODULE_13__bills_bills_module__["a" /* BillsModule */],
                __WEBPACK_IMPORTED_MODULE_4_ngx_pipes__["b" /* NgObjectPipesModule */],
                __WEBPACK_IMPORTED_MODULE_5_nl2br_pipe__["a" /* Nl2BrPipeModule */],
                __WEBPACK_IMPORTED_MODULE_7__components_notify__["b" /* NotifyModule */],
                __WEBPACK_IMPORTED_MODULE_6__pipes_pipes_module__["a" /* PipesModule */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_14__assignments_service__["a" /* AssignmentsService */],
                __WEBPACK_IMPORTED_MODULE_18__assignment_operations__["a" /* AssignmentOperations */],
            ],
        })
    ], AssignmentsModule);
    return AssignmentsModule;
}());

//# sourceMappingURL=assignments.module.js.map

/***/ }),

/***/ 693:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageCounter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_details__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__messages_service__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__messages_list__ = __webpack_require__(504);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Directive for displaying number of unread messages within possibility to open list
 *
 * @param visible If visible 'always' or 'new' (for new only; default)
 * @param update-strategy When to update - {listen: 'messages:check'} available (default)
 *
 * @example
 * <message-counter visible="always" update-strategy="{listen: 'event-name'}"></message-counter>
 */
var MessageCounter = /** @class */ (function () {
    function MessageCounter(details, messages, events) {
        this.details = details;
        this.messages = messages;
        this.events = events;
        this.visible = 'new';
        this.strategy = { listen: 'messages:check' };
        this.total = 0;
    }
    MessageCounter.prototype.ngOnInit = function () {
        var _this = this;
        // check first
        this.check();
        // then init checking by strategy
        if (this.strategy.listen) {
            this.events.subscribe(this.strategy.listen, function () { return _this.check(); });
        }
    };
    MessageCounter.prototype.check = function () {
        var _this = this;
        this.messages.amount().then(function (total) { return _this.total = total; });
    };
    MessageCounter.prototype.open = function () {
        var _this = this;
        var details = this.details.open(__WEBPACK_IMPORTED_MODULE_4__messages_list__["a" /* MessagesList */]);
        details.onDidDismiss(function () { return _this.check(); });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], MessageCounter.prototype, "visible", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], MessageCounter.prototype, "strategy", void 0);
    MessageCounter = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'message-counter',template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/messages/message.counter.html"*/'<ion-item *ngIf="visible === \'always\' || total > 0" (click)="open()">\n  {{ \'messages.counter\' | translate : { total: total } }}\n  <ion-icon item-end name="chatbubbles" color="button-primary">\n    <ion-badge color="more">{{ total }}</ion-badge>\n  </ion-icon>\n</ion-item>\n'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/messages/message.counter.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__components_details__["a" /* DetailsController */], __WEBPACK_IMPORTED_MODULE_3__messages_service__["a" /* MessagesService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Events */]])
    ], MessageCounter);
    return MessageCounter;
}());

//# sourceMappingURL=message.counter.js.map

/***/ }),

/***/ 694:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageCard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MessageCard = /** @class */ (function () {
    function MessageCard() {
        this.removed = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    /**
     * Triggers remove
     */
    MessageCard.prototype.remove = function (event) {
        this.removed.emit();
        event.stopPropagation();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], MessageCard.prototype, "message", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], MessageCard.prototype, "removed", void 0);
    MessageCard = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/messages/message.card.html"*/'<ion-card>\n  <ion-item>\n    <ion-thumbnail class="cal-date" item-start>\n      <h2>{{ message.created_at | amDateFormat : \'DD\' }}</h2>\n      <p>{{ message.created_at | amDateFormat : \'MMMM\' }}</p>\n      <small>{{ message.created_at | amDateFormat : \'HH:mm\' }}</small>\n    </ion-thumbnail>\n    <ion-row class="head">\n      <h3 head-3>{{ message.subject }}</h3>\n      <p>{{ message.sender.fullname }}</p>\n    </ion-row>\n    <ion-row class="contact" light>\n      <p>{{ message.sender.email }}</p>\n    </ion-row>\n  </ion-item>\n  <ion-item class="details" light text-wrap>\n    <div itemDetails>\n      <p>{{ message.content }}</p>\n      <ion-icon name="trash" color="primary" class="remove" tappable (click)="remove($event)"></ion-icon>\n    </div>\n  </ion-item>\n</ion-card>\n'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/messages/message.card.html"*/,
            selector: 'message-card',
        })
    ], MessageCard);
    return MessageCard;
}());

//# sourceMappingURL=message.card.js.map

/***/ }),

/***/ 695:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AssignmentCard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_social_sharing__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assignment_operations__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__assignments_service__ = __webpack_require__(71);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AssignmentCard = /** @class */ (function () {
    function AssignmentCard(alertCtrl, socialSharing, element, operations, assignments) {
        this.alertCtrl = alertCtrl;
        this.socialSharing = socialSharing;
        this.element = element;
        this.operations = operations;
        this.assignments = assignments;
        this.refresh = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.status = {};
    }
    AssignmentCard.prototype.ngAfterViewInit = function () {
        this.expanded = this.element.nativeElement.getAttribute('expanded') === 'true';
        this.assignment.siteName = this.assignment.site.name;
        this.recheckStatus();
    };
    /**
     * Shows details
     */
    AssignmentCard.prototype.showDetails = function () {
        return this.operations.showDetails(this.assignment);
    };
    /**
     * Calls main action
     */
    AssignmentCard.prototype.action = function () {
        var _this = this;
        if (!this.processing) {
            this.processing = true;
            return this.operations.action(this.assignment, this.status).then(function () {
                return _this.update().then(function () {
                    _this.processing = false;
                    if (_this.assignment.reported) {
                        _this.refresh.emit();
                    }
                });
            }).catch(function () {
                _this.processing = false;
            });
        }
    };
    /**
     * Destroy handler
     */
    AssignmentCard.prototype.ngOnDestroy = function () {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    };
    /**
     * Updates assignemnt after operation
     */
    AssignmentCard.prototype.update = function () {
        var _this = this;
        return this.assignments.get(this.assignment.freelancer.id, this.assignment.id, false).then(function (assignment) {
            _this.assignment = assignment;
            _this.setStatus(false);
            return assignment;
        });
    };
    /**
     * Sets card status
     */
    AssignmentCard.prototype.setStatus = function (recheck) {
        if (recheck === void 0) { recheck = true; }
        this.status = this.operations.getStatus(this.assignment);
        if (this.expanded && recheck) {
            this.recheckStatus(10);
        }
    };
    /**
     * Sets recheck card status timeout
     */
    AssignmentCard.prototype.recheckStatus = function (secs) {
        var _this = this;
        this.timeout = setTimeout(function () {
            _this.setStatus();
        }, secs * 1000);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], AssignmentCard.prototype, "assignment", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], AssignmentCard.prototype, "refresh", void 0);
    AssignmentCard = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/assignments/assignment.card.html"*/'<ion-card tappable (click)="showDetails()" [ngClass]="status.class">\n  <ion-item class="counting">\n    <ion-thumbnail item-start>\n      <ion-icon medium></ion-icon>\n    </ion-thumbnail>\n    <ion-row class="head">\n      <h3 head-3>\n        <span class="today">\n          <span>{{ \'assignments.header.\' + status.header | translate }}</span>\n          <span>{{ assignment.start_at | amTimeAgo : status.header === \'now\' }}</span>\n          <span class="remain">{{ \'common.remaining\' | translate }}</span>\n          <span class="late">{{ \'common.late\' | translate }}</span>\n        </span>\n        <span class="future">{{ assignment.start_at | amDateFormat : \'DD MMM\' }}, {{ assignment.start_time }}</span>\n      </h3>\n    </ion-row>\n  </ion-item>\n\n  <tender-item [tender]="assignment"></tender-item>\n\n  <button class="action" (click)="$event.stopPropagation(); action()">\n    {{ \'assignments.buttons.\' + status.button | translate }}\n  </button>\n</ion-card>'/*ion-inline-end:"/Users/stackappinfotech/Desktop/vijay_ionic/ionic_3_ios/src/pages/assignments/assignment.card.html"*/,
            selector: 'assignment-card',
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_social_sharing__["a" /* SocialSharing */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"],
            __WEBPACK_IMPORTED_MODULE_3__assignment_operations__["a" /* AssignmentOperations */], __WEBPACK_IMPORTED_MODULE_4__assignments_service__["a" /* AssignmentsService */]])
    ], AssignmentCard);
    return AssignmentCard;
}());

//# sourceMappingURL=assignment.card.js.map

/***/ }),

/***/ 696:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_navigation__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_push_push_module__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__settings_page__ = __webpack_require__(472);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__imprint_page__ = __webpack_require__(473);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__dataprivacy_page__ = __webpack_require__(167);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var Components = [
    __WEBPACK_IMPORTED_MODULE_5__settings_page__["a" /* SettingsPage */],
    __WEBPACK_IMPORTED_MODULE_6__imprint_page__["a" /* ImprintPage */],
    __WEBPACK_IMPORTED_MODULE_7__dataprivacy_page__["a" /* DataprivacyPage */],
];
var SettingsModule = /** @class */ (function () {
    function SettingsModule() {
    }
    SettingsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: Components,
            entryComponents: Components,
            exports: Components,
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_5__settings_page__["a" /* SettingsPage */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_3__components_navigation__["a" /* NavigationModule */],
                __WEBPACK_IMPORTED_MODULE_4__components_push_push_module__["a" /* PushModule */],
            ]
        })
    ], SettingsModule);
    return SettingsModule;
}());

//# sourceMappingURL=settings.module.js.map

/***/ }),

/***/ 697:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_rating__ = __webpack_require__(698);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_rating___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ngx_rating__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_navigation__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_files__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__profile_service__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__profile_page__ = __webpack_require__(474);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var ProfileModule = /** @class */ (function () {
    function ProfileModule() {
    }
    ProfileModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__profile_page__["a" /* ProfilePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_7__profile_page__["a" /* ProfilePage */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_3_ngx_rating__["RatingModule"],
                __WEBPACK_IMPORTED_MODULE_4__components_navigation__["a" /* NavigationModule */],
                __WEBPACK_IMPORTED_MODULE_5__components_files__["b" /* FilesModule */],
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_7__profile_page__["a" /* ProfilePage */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__profile_service__["a" /* ProfileService */],
            ],
        })
    ], ProfileModule);
    return ProfileModule;
}());

//# sourceMappingURL=profile.module.js.map

/***/ }),

/***/ 70:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return animations; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_animations__ = __webpack_require__(107);
/* tslint:disable */

var animations = [
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["i" /* trigger */])('softItem', [
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["h" /* transition */])(':enter', [
            Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["g" /* style */])({ opacity: 0 }),
            Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["e" /* animate */])('300ms', Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["g" /* style */])({ opacity: 1 }))
        ]),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["h" /* transition */])(':leave', [
            Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["g" /* style */])({ opacity: 1 }),
            Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["e" /* animate */])('200ms', Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["g" /* style */])({ opacity: 0 })),
            Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["e" /* animate */])('100ms', Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["g" /* style */])({ height: 0 }))
        ])
    ])
];
//# sourceMappingURL=app.animations.js.map

/***/ }),

/***/ 71:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AssignmentsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_format__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_api__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_config__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 *
 */
var AssignmentsService = /** @class */ (function () {
    function AssignmentsService(api) {
        this.api = api;
    }
    /**
     * Gets all freelancer assignments
     *
     * @param freelancerId
     * @param upcoming Getting only upcoming items
     */
    AssignmentsService.prototype.list = function (freelancerId, upcoming, offset, limit) {
        var _this = this;
        if (upcoming === void 0) { upcoming = false; }
        var options = {
            params: upcoming ? { only_upcoming: true } : { only_passed: true },
            includes: ['checkins', 'documents'],
            order: { appointed_at: 'asc' },
            paging: { offset: offset, limit: limit }
        };
        return this.api.promised(this.api.getFreelancerAssignments({ id: freelancerId }, options), undefined, true).then(function (resp) {
            return {
                data: resp.data.map(function (item) { return _this.transform(item); }),
                meta: resp.meta
            };
        });
    };
    /**
     * Gets single freelancer assignment
     *
     * @param freelancerId
     * @param assignmentId
     * @param full True (default) includes full info; base only (checkins) otherwise
     */
    AssignmentsService.prototype.get = function (freelancerId, assignmentId, full) {
        var _this = this;
        if (full === void 0) { full = true; }
        var options = {
            includes: full ? ['certificate', 'documents', 'checkins'] : ['checkins', 'documents'],
        };
        return this.api.promised(this.api.getFreelancerAssignment({ freelancerId: freelancerId, assignmentId: assignmentId }, options)).then(function (data) {
            return _this.transform(data);
        });
    };
    AssignmentsService.prototype.checkin = function (assignment) {
        var params = {
            freelancerId: assignment.freelancer.id,
            assignmentId: assignment.id,
        };
        return this.api.promised(this.api.createCheckin(params));
    };
    AssignmentsService.prototype.checkout = function (assignment) {
        var checkin = this.lastCheckin(assignment);
        var data = Object.assign(checkin, {
            freelancerId: assignment.freelancer.id,
            assignmentId: assignment.id,
            checkinId: checkin.id,
            finished_at: __WEBPACK_IMPORTED_MODULE_3__components_api__["c" /* ApiPrepare */].datetime(new Date()),
        });
        return this.api.promised(this.api.updateCheckin(data));
    };
    AssignmentsService.prototype.transform = function (assignment) {
        var start = __WEBPACK_IMPORTED_MODULE_3__components_api__["e" /* ApiTransform */].datetime(assignment.date.data.appointed_at, assignment.start_time);
        var job = assignment.date.data.job.data;
        var incentives = assignment.incentive_model && this.numbers(assignment.incentive_model);
        var costs = assignment.additional_costs && this.numbers(assignment.additional_costs);
        job.title = job.title.split(' | ')[0];
        return Object.assign(assignment, {
            assignment: assignment,
            job: job,
            incentives: incentives,
            costs: costs,
            start_time: assignment.start_time,
            finish_time: assignment.finish_time,
            freelancer: assignment.freelancer && assignment.freelancer.data,
            documents: assignment.documents && assignment.documents.data,
            daily_rate_min: assignment.offer.data.tender.data.daily_rate_min,
            daily_rate_max: assignment.offer.data.tender.data.daily_rate_max,
            offer: assignment.offer.data,
            project: assignment.date.data.job.data.project.data,
            client: assignment.date.data.job.data.project.data.client.data,
            site: assignment.date.data.job.data.site.data,
            start_at: start,
            checkin: {
                available: __WEBPACK_IMPORTED_MODULE_1_moment__(start).add(__WEBPACK_IMPORTED_MODULE_4__app_app_config__["a" /* appConfig */].checkinTolerance.allowed).toDate(),
                late: __WEBPACK_IMPORTED_MODULE_1_moment__(start).add(__WEBPACK_IMPORTED_MODULE_4__app_app_config__["a" /* appConfig */].checkinTolerance.delayed).toDate(),
                done: this.isCheckedIn(assignment),
            },
            checkout: {
                done: this.isCheckedOut(assignment),
            },
            reported: this.isReported(assignment),
            contract_type_identifier: assignment.contract_type && assignment.contract_type.identifier,
            is_prepareable: assignment.is_prepareable,
        });
    };
    AssignmentsService.prototype.numbers = function (set) {
        var res = {};
        if (Array.isArray(set)) {
            set.forEach(function (item) { return res[item.name] = __WEBPACK_IMPORTED_MODULE_2__utils_format__["a" /* Format */].numbers(item.value); });
        }
        else {
            Object.keys(set).forEach(function (key) { return res[key] = __WEBPACK_IMPORTED_MODULE_2__utils_format__["a" /* Format */].numbers(set[key]); });
        }
        return res;
    };
    AssignmentsService.prototype.lastCheckin = function (assignment) {
        var max = assignment.checkins && assignment.checkins.data.length;
        return max && assignment.checkins.data[max - 1];
    };
    AssignmentsService.prototype.isCheckedIn = function (assignment) {
        return assignment.checkins && assignment.checkins.data.length;
    };
    AssignmentsService.prototype.isCheckedOut = function (assignment) {
        var last = this.lastCheckin(assignment);
        return last && last.finished_at;
    };
    AssignmentsService.prototype.isReported = function (assignment) {
        return assignment.documents && assignment.documents.data.some(function (doc) { return doc.type === 'report'; });
    };
    AssignmentsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__components_api__["g" /* NewApiService */]])
    ], AssignmentsService);
    return AssignmentsService;
}());

//# sourceMappingURL=assignments.service.js.map

/***/ }),

/***/ 72:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PipesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__filesize_filesize__ = __webpack_require__(678);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__to_currency_to_currency__ = __webpack_require__(679);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PipesModule = /** @class */ (function () {
    function PipesModule() {
    }
    PipesModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_1__filesize_filesize__["a" /* FilesizePipe */],
                __WEBPACK_IMPORTED_MODULE_2__to_currency_to_currency__["a" /* ToCurrencyPipe */],
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_1__filesize_filesize__["a" /* FilesizePipe */],
                __WEBPACK_IMPORTED_MODULE_2__to_currency_to_currency__["a" /* ToCurrencyPipe */],
            ],
        })
    ], PipesModule);
    return PipesModule;
}());

//# sourceMappingURL=pipes.module.js.map

/***/ }),

/***/ 73:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterBase; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * Base class for filters
 */
var FilterBase = /** @class */ (function () {
    function FilterBase(translate) {
        this.translate = translate;
        this.init = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.action = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    /**
     * Initializes internal interface with parent
     */
    FilterBase.prototype.ngOnInit = function () {
        this.init.emit({
            clear: this.clear.bind(this),
            filtered: this.filtered.bind(this),
        });
        this.set();
    };
    /**
     * Common set method
     */
    FilterBase.prototype.set = function () {
        this.selected = this.value();
        this.action.emit(this.selected);
    };
    /**
     * "Super" filtered method - called from inherited classes within those value - returns "short name: value" for filter bar
     */
    FilterBase.prototype.filtered = function (value) {
        return value && [this.translate.instant(this.context + '.filters.' + this.name + '.short'), value].join(': ');
    };
    /**
     * "Abstract" clear method
     */
    FilterBase.prototype.clear = function () {
    };
    /**
     * "Abstract" value method
     */
    FilterBase.prototype.value = function () {
        return {};
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('name'),
        __metadata("design:type", String)
    ], FilterBase.prototype, "name", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('context'),
        __metadata("design:type", String)
    ], FilterBase.prototype, "context", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('set'),
        __metadata("design:type", Object)
    ], FilterBase.prototype, "initial", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])('init'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], FilterBase.prototype, "init", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])('action'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], FilterBase.prototype, "action", void 0);
    return FilterBase;
}());

//# sourceMappingURL=filter.base.js.map

/***/ }),

/***/ 88:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppPages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AppPagesDeclarations; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_login_login_page__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_assignments_assignments_page__ = __webpack_require__(465);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_jobs_jobs_page__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_settings_settings_page__ = __webpack_require__(472);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_profile_profile_page__ = __webpack_require__(474);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_certificates_all_certificates_page__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_certificates_certificates_page__ = __webpack_require__(475);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_exam_exam_instructions_page__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_bills_bills_page__ = __webpack_require__(478);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__bills_preparation_preparation_page__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_bills_invoices_invoices_page__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_jobs_jobs_main_page__ = __webpack_require__(487);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__pages_login_login_page__["a"]; });
/* unused harmony reexport AssignmentsPage */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_4__pages_profile_profile_page__["a"]; });
/* unused harmony reexport CertificatesPage */
/* unused harmony reexport AllCertificatesPage */
/* unused harmony reexport SettingsPage */
/* unused harmony reexport JobsPage */
/* unused harmony reexport JobsMainPage */
/* unused harmony reexport BillsPage */
/* unused harmony reexport PreparationPage */
/* unused harmony reexport InvoicesPage */
/* unused harmony reexport ExamInstructionsPage */












var AppPages = [
    { name: 'assignments', component: __WEBPACK_IMPORTED_MODULE_1__pages_assignments_assignments_page__["a" /* AssignmentsPage */], icon: 'calendar', tab: true },
    { name: 'jobs', component: __WEBPACK_IMPORTED_MODULE_11__pages_jobs_jobs_main_page__["a" /* JobsMainPage */], icon: 'briefcase', tab: true, notification: ['tenders-matching'] },
    { name: 'bills', component: __WEBPACK_IMPORTED_MODULE_8__pages_bills_bills_page__["a" /* BillsPage */], icon: 'calculator', tab: true },
    { name: 'certificates', component: __WEBPACK_IMPORTED_MODULE_6__pages_certificates_certificates_page__["a" /* CertificatesPage */], icon: 'bookmark', tab: true },
    { name: 'settings', component: __WEBPACK_IMPORTED_MODULE_3__pages_settings_settings_page__["a" /* SettingsPage */], icon: 'settings', tab: true },
];
var AppPagesDeclarations = [];

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 89:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export JobState */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JobMatch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return JobsOperations; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_call_number__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_details__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_api__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_confirm__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__job_details__ = __webpack_require__(468);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var JobState;
(function (JobState) {
    JobState[JobState["Matching"] = 0] = "Matching";
    JobState[JobState["NotMatching"] = 1] = "NotMatching";
    JobState[JobState["Applied"] = 2] = "Applied";
})(JobState || (JobState = {}));
var JobMatch;
(function (JobMatch) {
    JobMatch[JobMatch["All"] = 0] = "All";
    JobMatch[JobMatch["Yes"] = 1] = "Yes";
    JobMatch[JobMatch["No"] = 2] = "No";
})(JobMatch || (JobMatch = {}));
/**
 *
 */
var JobsOperations = /** @class */ (function () {
    function JobsOperations(details, confirm, api, user, caller) {
        this.details = details;
        this.confirm = confirm;
        this.api = api;
        this.user = user;
        this.caller = caller;
    }
    JobsOperations.prototype.showDetails = function (job) {
        return this.details.open(__WEBPACK_IMPORTED_MODULE_5__job_details__["a" /* JobDetailsModal */], { job: job, operations: this });
    };
    JobsOperations.prototype.makeCall = function (num) {
        return this.caller.callNumber(num, false);
    };
    JobsOperations.prototype.getStatus = function (job) {
        var state = job.matching ? JobState.Matching : JobState.NotMatching;
        var status = {
            state: state,
            class: {
                matching: state === JobState.Matching,
                mismatched: state === JobState.NotMatching,
            },
        };
        Object.entries(job.mismatched).forEach(function (entry) {
            var key = entry[0];
            status.class["mismatched-" + key] = true;
        });
        if (job.offered) {
            status.state = JobState.Applied;
        }
        return status;
    };
    /**
     * Shows alert and sends offers on confirm
     *
     * @param job
     * @param ids Assignment ids
     */
    JobsOperations.prototype.acceptOffers = function (job, ids) {
        return this.confirmation('accept', job, ids);
    };
    /**
     * Reject all offers
     *
     * @param job
     * @param ids Assignment ids
     */
    JobsOperations.prototype.rejectOffers = function (job, ids, confirm) {
        if (confirm === void 0) { confirm = true; }
        if (confirm) {
            return this.confirmation('reject', job, ids);
        }
        else {
            return this.tenders('reject', ids);
        }
    };
    /**
     * Displays confirmation and performs action
     *
     * @param type Operation - accept or reject
     * @param job
     * @param ids Assignment ids
     */
    JobsOperations.prototype.confirmation = function (type, job, ids) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.confirm.create({
                context: 'jobs.offer',
                title: type + ".title",
                message: type + ".message." + (ids.length === 1 ? 'single' : 'multi'),
                item: Object.assign(job, { selected: ids.length }),
                onConfirm: function () { return _this.tenders(type, ids).then(resolve, reject); },
                onCancel: function () { return reject(); }
            }).present();
        });
    };
    /**
     * Internal method creating bulk of requests
     *
     * @param type Operation - accept or reject
     * @param params Common params
     * @param ids Assignment ids
     */
    JobsOperations.prototype.tenders = function (type, ids) {
        var _this = this;
        var requests = [];
        var params = { freelancer_id: this.user.get().roleId() };
        if (type === 'accept') {
            // for accept prepere serie of data and send one request
            var data = ids.map(function (id) { return Object.assign({ tender_id: id }, params); });
            requests = [this.api.promised(this.api.submitOffers(data), 'jobs.offer.accept')];
        }
        else {
            // serie of requests otherwise
            requests = ids.map(function (id) {
                var data = Object.assign({ id: id, tender_id: id, reason: 'FLAPP' }, params);
                return _this.api.promised(_this.api.rejectTender(data));
            });
        }
        return Promise.all(requests);
    };
    JobsOperations = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__components_details__["a" /* DetailsController */], __WEBPACK_IMPORTED_MODULE_4__components_confirm__["a" /* ConfirmController */], __WEBPACK_IMPORTED_MODULE_3__components_api__["g" /* NewApiService */], __WEBPACK_IMPORTED_MODULE_3__components_api__["f" /* ApiUserService */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_native_call_number__["a" /* CallNumber */]])
    ], JobsOperations);
    return JobsOperations;
}());

//# sourceMappingURL=jobs.operations.js.map

/***/ }),

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Checklist; });
/*
 * Utils class checklist - f.e. working as checklist model for checkboxes
 */
var Checklist = /** @class */ (function () {
    function Checklist() {
    }
    /**
     * Prepares collection of property values from array as an object keys within boolean valye (false initially); property 'id' by default
     *
     * @param src Source array
     * @param property Property to be key value
     *
     * @example
     * const src = [{id: 100}, {id: 222}];
     * const coll = collection.prepare(src);
     * // coll === {100: false, 222: false};
     */
    Checklist.prepare = function (src, property) {
        if (property === void 0) { property = 'id'; }
        var items = {};
        src.map(function (item) { return items[item[property]] = false; });
        return items;
    };
    /**
     * Returns all set (to true) keys as array
     */
    Checklist.selected = function (set) {
        return Object.keys(set).filter(function (item) { return set[item]; });
    };
    /**
     * Sets all "selections" in collection
     */
    Checklist.set = function (set) {
        Object.keys(set).forEach(function (item) { return set[item] = true; });
    };
    /**
     * Resets all "selections" in collection
     */
    Checklist.reset = function (set) {
        Object.keys(set).forEach(function (item) { return set[item] = false; });
    };
    return Checklist;
}());

//# sourceMappingURL=checklist.js.map

/***/ }),

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessagesService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_api__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_details__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__message_create__ = __webpack_require__(471);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 *
 */
var MessagesService = /** @class */ (function () {
    function MessagesService(api, details, translate) {
        this.api = api;
        this.details = details;
        this.translate = translate;
    }
    /**
     * Creates message modal
     *
     * @param type Message type (Job currently)
     * @param subject
     * @param content
     * @param additional Additional params to send
     * @param editable Explicitely false to block part of message
     */
    MessagesService.prototype.create = function (type, subject, content, additional, header, editable) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var message = { subject: subject, content: content };
            var details = _this.details.open(__WEBPACK_IMPORTED_MODULE_4__message_create__["a" /* MessageCreate */], { type: type, message: message, header: header, editable: editable, data: additional, service: _this });
            details.onDidDismiss(function (action) { return action ? resolve(action) : reject(); });
        });
    };
    /**
     * Get amount of unread messages
     */
    MessagesService.prototype.amount = function () {
        var limit = { page: 1, limit: 1 };
        return this.api.meta(this.api.getMessages(limit)).then(function (meta) { return meta.pagination.total; });
    };
    /**
     * Gets list of messages for current user
     */
    MessagesService.prototype.list = function () {
        var _this = this;
        var options = {
            includes: ['sender', 'question'],
            order: { created_at: 'desc' },
        };
        return this.api.promised(this.api.getMessages({}, options)).then(function (data) {
            return data.map(_this.transform, _this);
        });
    };
    /**
     * Submits message
     *
     * @param type Message type (Job currently)
     * @param subject
     * @param content
     * @param additional Additional params to send
     */
    MessagesService.prototype.submit = function (type, subject, content, additional) {
        var data = Object.assign({ subject: subject, content: content }, additional);
        var method = "create" + type + "Message";
        return this.api.promised(this.api[method](data));
    };
    /**
     *
     */
    MessagesService.prototype.remove = function (id) {
        return this.api.promised(this.api.removeMessage({ id: id }));
    };
    /**
     * Transforms message
     *
     * @param message
     */
    MessagesService.prototype.transform = function (message) {
        var sender = message.sender && message.sender.data;
        var type = (message.reference_model || '').split(/\\/).pop();
        return Object.assign(message, {
            type: type,
            created_at: __WEBPACK_IMPORTED_MODULE_2__components_api__["e" /* ApiTransform */].datetime(message.created_at),
            sender: sender && Object.assign(sender, sender.agent && sender.agent.data || {}) || { fullname: this.translate.instant('common.system') },
            recipient: message.recipient && message.recipient.data,
            question: message.question && message.question.data,
        });
    };
    MessagesService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__components_api__["g" /* NewApiService */], __WEBPACK_IMPORTED_MODULE_3__components_details__["a" /* DetailsController */], __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["d" /* TranslateService */]])
    ], MessagesService);
    return MessagesService;
}());

//# sourceMappingURL=messages.service.js.map

/***/ }),

/***/ 92:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PreparationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_api__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_collection__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_survey__ = __webpack_require__(174);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 *
 */
var PreparationService = /** @class */ (function () {
    function PreparationService(api, resources, surveys, currency) {
        this.api = api;
        this.resources = resources;
        this.surveys = surveys;
        this.currency = currency;
    }
    /**
     * Fetches all freelancer's assignments
     *
     * @param freelancerId
     */
    PreparationService.prototype.assignments = function (freelancerId, offset, limit) {
        var _this = this;
        var options = {
            includes: ['date.job.site', 'date.job.project.client'],
            params: { order_by: 'appointed_at', order_dir: 'asc', only_prepareable: true },
            paging: { offset: offset, limit: limit }
        };
        return this.api.promised(this.api.getFreelancerAssignments({ id: freelancerId }, options), undefined, true).then(function (resp) {
            return {
                data: resp.data.map(_this.transform, _this),
                meta: resp.meta
            };
        });
    };
    /**
     * Fetches single freelancer's assignment
     *
     * @param freelancerId
     * @param assignmentId
     */
    PreparationService.prototype.assignment = function (freelancerId, assignmentId) {
        var _this = this;
        var options = {
            includes: ['date.job.site', 'date.job.project.client', 'documents.approval', 'revenues', 'questionnaire',
                'questionnaire_instance', 'feedback_instance.approval'],
        };
        return this.api.promised(this.api.getFreelancerAssignment({ freelancerId: freelancerId, assignmentId: assignmentId }, options)).then(function (resp) { return _this.transform(resp); });
    };
    /**
     * Submits assignment related documents
     *
     * @param id
     * @param report Report document
     * @param previous Previous report document
     * @param revenue
     */
    PreparationService.prototype.submitDocuments = function (id, type, reports, previous) {
        var operations = [];
        var prevId = previous[type] && previous[type].id;
        var currId = reports[type] && reports[type].id;
        // if document changed remove from previous doc
        if (prevId && currId !== prevId) {
            this.addOperation(operations, prevId, id, 'remove', type);
        }
        // and/or add if new
        if (currId && currId !== prevId) {
            this.addOperation(operations, reports[type].id, id, 'create', type);
        }
        // updates resources - assignment documents
        return this.resources.update(operations, 'AssignmentDocument');
    };
    /**
     * Submits assignment related data
     *
     * @param id
     * @param report Report document
     * @param previous Previous report document
     * @param revenue
     */
    PreparationService.prototype.submit = function (id, reports, previous, revenue) {
        var _this = this;
        var operations = [];
        Object.keys(reports).forEach(function (type) {
            var prevId = previous[type] && previous[type].id;
            var currId = reports[type].id;
            // if document changed remove from previous doc
            if (prevId && currId !== prevId) {
                _this.addOperation(operations, prevId, id, 'remove', type);
            }
            // and/or add if new
            if (currId && currId !== prevId) {
                _this.addOperation(operations, reports[type].id, id, 'create', type);
            }
        });
        // updates resources - assignment documents
        return this.resources.update(operations, 'AssignmentDocument').then(function () {
            // then revenues (only changed)
            if (revenue && revenue.changed) {
                return _this.resources.update([revenue], 'FreelancerRevenue');
            }
            else {
                return Promise.resolve();
            }
        });
    };
    PreparationService.prototype.submitSurvey = function (data, assignment) {
        var _this = this;
        var params = Object.assign(this.surveys.prepare(data), {
            freelancerId: assignment.freelancer.id,
            assignmentId: assignment.id
        });
        return this.resources.update([params], 'FreelancerAssignmentSurveyInstance', "bills.preparation.details." + data.type + ".submit").then(function (response) {
            if (data.type === 'feedback' && data.approval) {
                var approval = Object.assign(data.approval, { state: 'pending' });
                return _this.resources.update([approval], 'SurveyApproval').then(function () { return Object.assign(data, { instance: response[0].id }); });
            }
            else {
                return Object.assign(data, { instance: response[0].id });
            }
        });
    };
    PreparationService.prototype.submitRevenue = function (revenue) {
        // then revenues (only changed)
        if (revenue && revenue.changed) {
            return this.resources.update([revenue], 'FreelancerRevenue');
        }
        else {
            return Promise.resolve();
        }
    };
    PreparationService.prototype.addOperation = function (operations, docId, assignmentId, operation, opType) {
        operations.push({
            document_id: docId,
            assignment_id: assignmentId,
            type: opType,
            operation: operation,
        });
    };
    /**
     * Transforms assignment data - unifies to tender-card data
     *
     * @param assignment
     */
    PreparationService.prototype.transform = function (assignment) {
        var reports = {};
        // extract data from includes
        var flat = __WEBPACK_IMPORTED_MODULE_3__utils_collection__["a" /* Collection */].flatify(assignment, ['date', 'freelancer', 'date.job', 'date.job.project', 'date.job.project.client',
            'date.job.site', 'date.job.saleslots', 'questionnaire', 'questionnaire_instance', 'feedback', 'feedback_instance',
            'offer.tender.daily_rate_min', 'offer.tender.daily_rate_max']);
        var templates = {};
        var revenue = assignment.revenues && assignment.revenues.data[0];
        var documents = assignment.documents && assignment.documents.data.map(function (document) { return setDocuments(document); });
        var title = flat.job.title.split(' | ')[0];
        var warning = assignment.state === 'invoiced' ? !assignment.has_invoice_requirements : undefined;
        var incentives = assignment.incentive_model && this.numbers(assignment.incentive_model);
        var costs = assignment.additional_costs && this.numbers(assignment.additional_costs);
        // sum if exists
        if (revenue) {
            revenue.sum = assignment.revenues.data[0].total;
        }
        // adapt questionnaire/feedback to survey model
        this.surveys.transform(flat, __WEBPACK_IMPORTED_MODULE_4__components_survey__["d" /* SurveyType */].Questionnaire);
        this.surveys.transform(flat, __WEBPACK_IMPORTED_MODULE_4__components_survey__["d" /* SurveyType */].Feedback);
        // unify structure (including job.title for tender-item)
        return Object.assign(assignment, flat, { job: { title: title, id: flat.job.id } }, {
            title: title, documents: documents, templates: templates, reports: reports, revenue: revenue, warning: warning, incentives: incentives, costs: costs
        }, {
            start_at: __WEBPACK_IMPORTED_MODULE_2__components_api__["e" /* ApiTransform */].datetime(flat.date.appointed_at, assignment.start_time),
            contract_type_identifier: assignment.contract_type && assignment.contract_type.identifier
        });
        // Sets document connected data
        function setDocuments(document) {
            if (document.type === 'template-report') {
                templates.report = document;
            }
            if (document.type === 'report' || document.type === 'picture-documentation') {
                reports[document.type] = Object.assign(document, { approval: document.approval && document.approval.data });
            }
            return document;
        }
    };
    PreparationService.prototype.numbers = function (set) {
        var res = {};
        if (Array.isArray(set)) {
            set.forEach(function (item) { return res[item.name] = item.value; });
        }
        else {
            Object.keys(set).forEach(function (key) { return res[key] = set[key]; });
        }
        return res;
    };
    PreparationService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__components_api__["g" /* NewApiService */], __WEBPACK_IMPORTED_MODULE_2__components_api__["d" /* ApiResources */], __WEBPACK_IMPORTED_MODULE_4__components_survey__["c" /* SurveyService */], __WEBPACK_IMPORTED_MODULE_1__angular_common__["CurrencyPipe"]])
    ], PreparationService);
    return PreparationService;
}());

//# sourceMappingURL=preparation.service.js.map

/***/ }),

/***/ 93:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilesService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_file_transfer__ = __webpack_require__(494);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_file_opener__ = __webpack_require__(495);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file__ = __webpack_require__(496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_api__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__index__ = __webpack_require__(43);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Files operation service
 */
var FilesService = /** @class */ (function () {
    function FilesService(api, auth, transfer, file, opener) {
        this.api = api;
        this.auth = auth;
        this.transfer = transfer;
        this.file = file;
        this.opener = opener;
        this.worker = window.URL || URL;
    }
    /**
     * Downloads file in user auth context
     *
     * @param source File info
     * @param kind File kind (determines endpoint); default: document
     * @param onProgress Optional callback method getting IFileProgress while downloading
     *
     * @returns Downloaded file location
     */
    FilesService.prototype.download = function (source, kind, onProgress) {
        var _this = this;
        if (kind === void 0) { kind = __WEBPACK_IMPORTED_MODULE_6__index__["a" /* FileKind */].Document; }
        var url = this.url(kind, source);
        var file = this.transfer.create();
        // get auth header
        return this.auth.getHeader().then(function (header) {
            var options = {
                headers: Object.assign(header, {
                    'Content-Type': source.mime,
                }),
            };
            // register progress handler
            if (onProgress) {
                file.onProgress(function (progress) { return onProgress(_this.transferred(progress)); });
            }
            // then download
            return file.download(url, _this.file.dataDirectory + source.original_filename, false, options).then(function (entry) { return entry.toURL(); });
        });
    };
    /**
     * Uploads file in user auth context
     *
     * @param source File storage uri
     * @param kind File kind (determines endpoint); default: document
     * @param onProgress Optional callback method getting IFileProgress while downloading
     *
     * @returns Uploaded file meta data
     */
    FilesService.prototype.upload = function (source, kind, onProgress) {
        var _this = this;
        if (kind === void 0) { kind = __WEBPACK_IMPORTED_MODULE_6__index__["a" /* FileKind */].Document; }
        var url = this.url(kind);
        var file = this.transfer.create();
        // get auth header
        return this.auth.getHeader().then(function (header) {
            var options = {
                fileKey: 'file',
                fileName: source.split('/').pop(),
                headers: header,
            };
            // register progress handler
            if (onProgress) {
                file.onProgress(function (progress) { return onProgress(_this.transferred(progress)); });
            }
            // then upload
            return file.upload(source, url, options).then(function (data) { return data && data.response && JSON.parse(data.response).data; }, function () {
                file.abort();
                return false;
            });
        });
    };
    /**
     * Opens file
     *
     * @param path
     * @param mime
     */
    FilesService.prototype.open = function (path, mime) {
        return this.opener.open(path, mime);
    };
    /**
     * Fetches picture in user auth context and return object within
     * - url() - gets blob url
     * - revoke() - revokes picture data
     */
    FilesService.prototype.fetchPicture = function (id, size, variant) {
        var _this = this;
        if (size === void 0) { size = 'medium'; }
        if (variant === void 0) { variant = 'square'; }
        return this.api.getPicture({ id: id }, {
            params: { size: size, variant: variant },
            responseType: __WEBPACK_IMPORTED_MODULE_4__angular_http__["ResponseContentType"].Blob,
        })
            .map(function (res) {
            return new Blob([res.blob()], { type: 'image/png' });
        })
            .toPromise().then(function (res) {
            var url = _this.worker.createObjectURL(res);
            return {
                url: function () { return url; },
                revoke: function () { return _this.worker.revokeObjectURL(url); },
            };
        });
    };
    /**
     * Returns api url per file kind
     */
    FilesService.prototype.url = function (kind, data) {
        switch (kind) {
            case __WEBPACK_IMPORTED_MODULE_6__index__["a" /* FileKind */].Picture: return this.api.getPictureUrl(data);
            default: return this.api.getDocumentUrl(data);
        }
    };
    /**
     * Calculates transfer progress
     */
    FilesService.prototype.transferred = function (progress) {
        return progress.lengthComputable && {
            loaded: progress.loaded,
            total: progress.total,
            percent: progress.loaded * 100 / progress.total,
        };
    };
    FilesService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__components_api__["g" /* NewApiService */], __WEBPACK_IMPORTED_MODULE_5__components_api__["a" /* ApiAuthService */], __WEBPACK_IMPORTED_MODULE_1__ionic_native_file_transfer__["a" /* FileTransfer */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_file_opener__["a" /* FileOpener */]])
    ], FilesService);
    return FilesService;
}());

//# sourceMappingURL=files.service.js.map

/***/ })

},[506]);
//# sourceMappingURL=main.js.map