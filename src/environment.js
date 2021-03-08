const dev = {
    clientId: 'geoactio_client',
    OPServer: 'https://security.gsesoftware.com',
    redirectURL: 'https://localhost:3000/',
    scope: 'openid profile',
    userInfoEndpoint: '/connect/userinfo',
    extra: {prompt: 'consent', access_type: 'offline'}
};

const prod = {

};

const config = process.env.REACT_APP_STAGE === 'production'
    ? prod
    : dev;

export default {
    // Add common config values here
    ...config
};
