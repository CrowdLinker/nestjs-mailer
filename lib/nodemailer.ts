import {
  Transporter,
  SendMailOptions,
  createTransport,
  SentMessageInfo,
} from 'nodemailer';
import { Inject } from '@nestjs/common';
import { NodemailerOptions } from './interfaces';
import { NODEMAILER_OPTIONS, NodemailerDrivers } from './constants';

/**
 * Class related to handling nodemailer tasks.
 *
 * @class
 */
export class Nodemailer<T extends NodemailerDrivers> {
  /**
   * Nodemailer Transporter
   *
   * @private
   */
  private transporter: Transporter;

  /**
   * Create an instance of class.
   *
   * @constructor
   *
   * @param {NodemailerOptions} config
   */
  constructor(
    @Inject(NODEMAILER_OPTIONS) private readonly options: NodemailerOptions<T>,
  ) {
    this.transporter = createTransport(options.transport, options.defaults);
  }

  /**
   * Nodemailer's sendMail() function.
   *
   * @async
   *
   * @param {SendMailOptions} options
   */
  async sendMail(options: SendMailOptions): Promise<SentMessageInfo> {
    return await this.transporter.sendMail(options);
  }
}
