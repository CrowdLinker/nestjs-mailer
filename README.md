# NestJS Mailer

Mailer module for NestJS

<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="380" alt="Nest Logo" />
  </a>
</p>

## Packages

- [Nodemailer](https://www.npmjs.com/package/nodemailer/v/6.3.0) - nodemailer (v6.3.0)

## Installation

```bash
npm install --save @crowdlinker/nestjs-mailer
// or
// yarn add @crowdlinker/nestjs-mailer
```

## Usage

### Synchronous

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

### Asynchronous

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

## Important Points To Note

- Code is written in Typescript (v3.6.3)

## Contributors

- Team @Crowdlinker ([Github](https://github.com/CrowdLinker) | [Bitbucket](https://bitbucket.org/crowdlinker/))
