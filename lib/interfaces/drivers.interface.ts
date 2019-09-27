import * as SESTransport from 'nodemailer/lib/ses-transport';
import * as JSONTransport from 'nodemailer/lib/json-transport';
import * as SMTPTransport from 'nodemailer/lib/smtp-transport';
import { NodemailerDrivers } from '../constants/drivers.constants';
import * as SendmailTransport from 'nodemailer/lib/sendmail-transport';

export interface INodemailerTransportDrivers {
  [NodemailerDrivers.SES]: SESTransport | SESTransport.Options;
  [NodemailerDrivers.JSON]: JSONTransport | JSONTransport.Options;
  [NodemailerDrivers.SMTP]: SMTPTransport | SMTPTransport.Options | string;
  [NodemailerDrivers.SENDMAIL]: SendmailTransport | SendmailTransport.Options;
}

export interface INodemailerDefaultsDrivers {
  [NodemailerDrivers.SES]: SESTransport.Options;
  [NodemailerDrivers.JSON]: JSONTransport.Options;
  [NodemailerDrivers.SMTP]: SMTPTransport.Options;
  [NodemailerDrivers.SENDMAIL]: SendmailTransport.Options;
}

export type NodemailerTransportDrivers<
  T extends NodemailerDrivers
> = INodemailerTransportDrivers[T];

export type NodemailerDefaultsDrivers<
  T extends NodemailerDrivers
> = INodemailerDefaultsDrivers[T];
