import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ResponseMessages } from 'src/common/constants/response-messages.constant';

@Injectable()
export class MailService {
  private readonly domain: string;

  constructor(
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {
    this.domain = this.configService.get<string>('domain');
  }

  public async sendConfirmationEmail(email: string, token: string) {
    const subject = 'Confirm your email';

    try {
      await this.mailerService.sendMail({
        from: this.configService.get('emailService.auth.user'),
        to: email,
        subject,
        context: {
          link: `http://${this.domain}/api/auth/confirm/${token}`,
        },
        template: 'confirmation.ejs',
      });
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_SEND_CONFIRMATION_EMAIL,
      );
    }
  }
}
