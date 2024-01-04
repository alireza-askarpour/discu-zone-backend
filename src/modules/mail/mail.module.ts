import { join, resolve } from 'path';
import { MailService } from './mail.service';
import { ConfigService } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        console.log({
          host: config.get<string>('emailService.host'),
          port: config.get<number>('emailService.port'),
          auth: {
            user: config.get<string>('emailService.auth.user'),
            pass: config.get<string>('emailService.auth.pass'),
          },
        });

        return {
          transport: {
            host: config.get<string>('emailService.host'),
            port: config.get<number>('emailService.port'),
            auth: {
              user: config.get<string>('emailService.auth.user'),
              pass: config.get<string>('emailService.auth.pass'),
            },
            pool: true,
            secure: true,
            tls: true,
          },
          template: {
            dir: join(resolve(), 'src', 'modules', 'mail', 'templates'),
            adapter: new EjsAdapter(),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
