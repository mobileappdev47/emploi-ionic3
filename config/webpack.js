/**
 * Sets .env based variables available in ts
 */
var path = require('path');
var webpack = require('webpack');
var appScriptsDir = process.env.IONIC_APP_SCRIPTS_DIR;
var config = require(path.join(appScriptsDir, 'config', 'webpack.config.js'));
var env = process.env.IONIC_ENV || 'dev';

require('dotenv').config();

config.plugins = (config[env].plugins && config[env].plugins || []).push(
    new webpack.DefinePlugin({
        ENV: {
            API_URL: `'${process.env.API_URL}'`,
            APP_STORE_ANDROID: `'${process.env.APP_STORE_ANDROID}'`,
            APP_STORE_IOS: `'${process.env.APP_STORE_IOS}'`,
            MAINTENANCE_RELOAD: `'${process.env.MAINTENANCE_RELOAD}'`,
            INVOICE_TAX: `'${process.env.INVOICE_TAX}'`,
            ALLOWED_CHECKIN_BEFORE: process.env.ALLOWED_CHECKIN_BEFORE !== undefined && `'${process.env.ALLOWED_CHECKIN_BEFORE}'`,
            ALLOWED_CHECKIN_AFTER: process.env.ALLOWED_CHECKIN_AFTER !== undefined && `'${process.env.ALLOWED_CHECKIN_AFTER}'`
        }
    })
);

if (env === 'prod') {
    // This helps ensure the builds are consistent if source hasn't changed:
    config[env].plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
}

module.exports = config;
