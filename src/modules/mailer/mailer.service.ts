import { Injectable } from '@nestjs/common';
import { join } from "path";
import { MailerService as Nodemailer } from '@nestjs-modules/mailer/dist/mailer.service';

import { generate } from 'rand-token';

import { SUBJECT, TEMPLATES_NAME } from '../../constants/mailer.constant';

@Injectable()
export class MailerService {
  constructor(
    private readonly mailer: Nodemailer
  ) {}

  async sendMail(template: TEMPLATES_NAME, data: any = {}, email:  string): Promise<void> {
    await this.mailer.sendMail({
      to: process.env.MAILER_MAIL_FROM,
      from: email,
      subject: SUBJECT[template],
      template: join(process.cwd(), `src/modules/mailer/templates/${template}.html`),
      context: data,
    });
  }

  protected generateTimestamp(expired: number = 5): number {
    const currentDate: Date = new Date();
    currentDate.setMinutes(currentDate.getMinutes() + expired);
    return currentDate.getTime();
  }

  generateConfirmationUrl() {
    const token: string = generate(30);
    const timestamp: number = this.generateTimestamp();

    return {
      url: `${process.env.API_DOMAIN}/email/${token}_${timestamp}/confirm`,
      token
    };
  }
}
