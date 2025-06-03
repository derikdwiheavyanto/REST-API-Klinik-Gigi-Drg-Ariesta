

export const config = {
    port: process.env.PORT || 8001,
    logLevel: process.env.LOG_LEVEL || 'info',
    secretKeyJwt: process.env.SECRET_KEY_JWT,
    secretRefreshKeyJwt: process.env.SECRET_REFRESH_KEY_JWT,
    baseUrl: process.env.BASE_URL,
}