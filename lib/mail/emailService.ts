import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { Validity } from '../tools';
import { SmtpConfigurationError } from './smtpConfigurationError';
import { MailServerError } from './mailServerError';
import { emailConfig } from './emailConfig';

const MIN_LENGTH_USERNAME = 6;
const MIN_LENGTH_PASSWORD = 8;
const notProduction = process.env.NODE_ENV !== 'production';

// create reusable transporter object using the default SMTP transport
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createTransporterFromConfiguration = (smtpConfig: any) => nodemailer.createTransport({ ...smtpConfig });

export class EmailService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly options: any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  constructor(options: any) {
    options.usernameMin = options.usernameMin || MIN_LENGTH_USERNAME;
    options.passwordMin = options.passwordMin || MIN_LENGTH_PASSWORD;

    if (!Validity.isValidString(options.host as string, 2)) throw new SmtpConfigurationError('invalid host');
    if (!Validity.isValidString(options.username as string, options.usernameMin))
      throw new SmtpConfigurationError('invalid user name for authentication');
    if (!Validity.isValidPassword(options.password as string) || !Validity.isValidString(options.password as string, options.passwordMin))
      throw new SmtpConfigurationError('invalid password for authentication');

    this.options = emailConfig(options);
  }

  createTransporter(): Mail<SMTPTransport.SentMessageInfo> {
    // create reusable transporter object using the default SMTP transport
    return createTransporterFromConfiguration(this.options);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  closeTransporter(transporter: any): void {
    // only needed when using pooled connections
    transporter.close();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async sendEmail(message: Mail.Options): Promise<any> {
    const err_message = 'cannot send email: invalid';
    if (!message || !message.from || !message.to || !message.subject || (!message.text && !message.html))
      return Promise.reject(new Error(`${err_message} message`));

    if (!Validity.isValidString(message.from as string, 6)) return new Error(`${err_message} 'from' email`);
    if (message.to) {
      if (typeof message.to === 'string') {
        if (!Validity.isValidString(message.to, 6)) return new Error(`${err_message} 'to' email(s)`);
      } else if (Array.isArray(message.to)) {
        message.to.forEach((item) => {
          if (typeof item === 'string') {
            if (!Validity.isValidString(item as string, 6)) return new Error(`${err_message} 'to' email(s)`);
          }
        });
      }
    }

    if (message.cc) {
      if (typeof message.cc === 'string') {
        if (!Validity.isValidString(message.cc, 6)) return new Error(`${err_message} 'cc' email(s)`);
      } else if (Array.isArray(message.cc)) {
        message.cc.forEach((item) => {
          if (typeof item === 'string') {
            if (!Validity.isValidString(item as string, 6)) return new Error(`${err_message} 'cc' email(s)`);
          }
        });
      }
    }

    if (message.bcc) {
      if (typeof message.bcc === 'string') {
        if (!Validity.isValidString(message.bcc, 6)) return new Error(`${err_message} 'bcc' email(s)`);
      } else if (Array.isArray(message.bcc)) {
        message.bcc.forEach((item) => {
          if (typeof item === 'string') {
            if (!Validity.isValidString(item as string, 6)) return new Error(`${err_message} 'bcc' email(s)`);
          }
        });
      }
    }

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport(this.options);
    try {
      await transporter.verify();
      const info = await transporter.sendMail(message);
      transporter.close(); // only needed when using pooled connections
      return info;
    } catch (err) {
      const { code, command, responseCode, response, stack } = err;
      let msg = `code = ${code}, command = ${command}, responseCode = ${responseCode}, response = ${response}`;
      if (notProduction) {
        msg = `${msg}, stack = ${stack}`;
      }
      return Promise.reject(new MailServerError(msg));
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  async sendOneOfEmails(transporter: any, message: Mail.Options): Promise<any> {
    const notProduction = process.env.NODE_ENV !== 'production';

    try {
      await transporter.verify();
      const info = await transporter.sendMail(message);

      const { rejected, response, envelope, messageId } = info;

      return {
        envelope: envelope,
        response: response,
        messageId: messageId,
        ok: rejected.length <= 0 ? 1 : 0,
      };
    } catch (err) {
      const { code, command, responseCode, response, stack } = err;
      let msg = `code = ${code}, command = ${command}, responseCode = ${responseCode}, response = ${response}`;
      if (notProduction) {
        msg = `${msg}, stack = ${stack}`;
      }
      return Promise.reject(new MailServerError(msg));
    }
  }

  static async send(
    message: Mail.Options,
    host = process.env.EMAIL_HOST,
    username = process.env.EMAIL_USERNAME,
    password = process.env.EMAIL_PASSWORD,
    smtpPort?: number,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> {
    // =============================================
    // See more at:
    // https://nodemailer.com/smtp/

    const emailService = new EmailService({
      username: username,
      password: password,
      host: host,
      smtpPort: smtpPort || 587,
      secure: false,
      rejectUnauthorized: false,
      usernameMin: MIN_LENGTH_USERNAME,
      passwordMin: MIN_LENGTH_PASSWORD,
    });
    return await emailService.sendEmail(message);
  }
}
