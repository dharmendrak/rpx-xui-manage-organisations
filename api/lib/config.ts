export default {
    cookies: {
        token: '__auth__',
    },
    exceptionOptions: {
        maxLines: 1,
    },
    indexUrl: '/',
    logging: 'debug',
    maxLogLine: 160,
    microservice: 'jui_webapp',
    protocol: 'http',
    s2s: 'http://rpe-service-auth-provider-aat.service.core-compute-aat.internal',
    secureCookie: false,
    services: {
        idam: {
            idamApiUrl: 'https://preprod-idamapi.reform.hmcts.net:3511',
            idamClientID: 'juiwebapp',
            idamLoginUrl: 'https://idam.preprod.ccidam.reform.hmcts.net/login',
            indexUrl: '/',
            oauthCallbackUrl: '/oauth2/callback',
        },
    },
    sessionSecret: 'secretSauce',
}
