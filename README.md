# NestJS Mailer

Mailer module for NestJS

<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="380" alt="Nest Logo" />
  </a>
</p>

## Packages

- [Nodemailer](https://www.npmjs.com/package/nodemailer/v/6.6.2) - nodemailer (v6.6.2)

## Installation

```bash
npm install --save @crowdlinker/nestjs-mailer nodemailer
npm install --save-dev @types/nodemailer
// or
// yarn add @crowdlinker/nestjs-mailer nodemailer
// yarn add -D @types/nodemailer
```

## Usage

### Importing the Module

#### Synchronous

```js
import { NodemailerModule } from '@crowdlinker/nestjs-mailer';
import { NodemailerDrivers } from '@crowdlinker/nestjs-mailer';
import { NodemailerOptions } from '@crowdlinker/nestjs-mailer';

@Module({
  imports: [
    NodemailerModule.forRoot({
      transport: {
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: 'ccdff3b99c83ec',
          pass: 'a700a7eafe1e28',
        },
      },
      defaults: {
        from: 'Hello @Crowdlinker <hello@crowdlinker.com>',
      },
    } as NodemailerOptions<NodemailerDrivers.SMTP>),
  ],
})
```

#### Asynchronous

```js
import { NodemailerModule } from '@crowdlinker/nestjs-mailer';
import { NodemailerOptions } from '@crowdlinker/nestjs-mailer';

@Module({
  imports: [
    NodemailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        ({
          transport: {
            host: configService.host,
            port: configService.port,
            secure: configService.secure,
            auth: {
              user: configService.username,
              pass: configService.password,
            },
          },
          defaults: {
            from: 'Hello @Crowdlinker <hello@crowdlinker.com>',
          },
        } as NodemailerOptions<NodemailerDrivers.SMTP>),
      inject: [ConfigService],
    }),
  ],
})
```

### Importing in a Class/Service

```js
import { Nodemailer } from '@crowdlinker/nestjs-mailer';

class MailService {
  constructor(
    private readonly nodemailer: Nodemailer<NodemailerDrivers.SMTP>
  ) {}

  async mail(to, subject, text, html) {
    this.nodemailer.sendMail({ to, subject, text, html });
  }
}
```

### Drivers

You can use the following drivers

1. `NodemailerDrivers.SES` - https://nodemailer.com/transports/ses/
2. `NodemailerDrivers.JSON` - https://nodemailer.com/transports/stream/
3. `NodemailerDrivers.SMTP` - https://nodemailer.com/smtp/
4. `NodemailerDrivers.SENDMAIL` - https://nodemailer.com/transports/sendmail/

## Important Points To Note

- Code is written in Typescript (v3.9.10)

## Contributors

- Team @Crowdlinker ([Github](https://github.com/CrowdLinker) | [Bitbucket](https://bitbucket.org/crowdlinker/))
