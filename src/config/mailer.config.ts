import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

export const MailerConfig = {
    transport: process.env.MAILER_TRANSPORT,
    defaults: {
        from: process.env.MAILER_MAIL_FROM
    },
    template: {
        dir: __dirname + 'templates',
        adapter: new PugAdapter(),
        options: {
            strict: true
        }
    }
}
