// coming from .env via config/webpack.js
declare const ENV: {
    API_URL: string;
    APP_STORE_ANDROID: string;
    APP_STORE_IOS: string;
    MAINTENANCE_RELOAD: string;
    INVOICE_TAX: string;
    ALLOWED_CHECKIN_BEFORE: string;
    ALLOWED_CHECKIN_AFTER: string;
};

export const appConfig = {
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

export const appFormats = {
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

export const appOptions = {
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
