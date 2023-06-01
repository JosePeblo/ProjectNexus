export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PN_MONGO_HOST: string;
            PN_ACC_JWT_SECRET: string;
            PN_MAIL_HOST: string;
            PN_MAIL_ACC: string;
            PN_MAIL_PSW: string
        }
    }
}