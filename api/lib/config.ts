export default {
    logging: 'debug',
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
