import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
export declare class EmailService {
    private readonly options;
    constructor(options: any);
    createTransporter(): Mail<SMTPTransport.SentMessageInfo>;
    closeTransporter(transporter: any): void;
    sendEmail(message: Mail.Options): Promise<any>;
    sendOneOfEmails(transporter: any, message: Mail.Options): Promise<any>;
    static send(message: Mail.Options, host?: string | undefined, username?: string | undefined, password?: string | undefined, smtpPort?: number): Promise<any>;
}
