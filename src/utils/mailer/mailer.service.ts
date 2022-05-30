import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';

import { TEMPLATES_NAME } from './constants';

@Injectable()
export class Mailer {
    constructor(
        private readonly mailer: MailerService
    ) {}

    public async sendMail(template: TEMPLATES_NAME, data: any = {}): Promise<void> {
        await this.mailer.sendMail({
            to: 'wtf.evgesha@gmail.com',
            from: 'wtf.evgesha@gmail.com',
            subject: 'test',
            template: join(process.cwd(), `src/utils/mailer/templates/${template}.html`),
            context: data,
        })
    }
}
