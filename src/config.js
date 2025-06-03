

export const config = {
    port: process.env.PORT || 8001,
    logLevel: process.env.LOG_LEVEL || 'info',
    secretKeyJwt: process.env.SECRET_KEY_JWT,
    baseUrl: process.env.BASE_URL,
}