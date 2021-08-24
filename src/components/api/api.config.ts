import { appConfig, appFormats } from '../../app/app.config';

export const apiConfig = {
    baseUrl: appConfig.apiBaseUrl,
    refreshTokenUrl: appConfig.refreshTokenUrl,
    minSearchString: 3,
};

export const apiFormats = {
    transform: appFormats.transform,
    prepare: appFormats.prepare,
};
