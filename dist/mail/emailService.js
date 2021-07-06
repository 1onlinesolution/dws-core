"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const tools_1 = require("../tools");
const smtpConfigurationError_1 = require("./smtpConfigurationError");
const mailServerError_1 = require("./mailServerError");
const emailConfig_1 = require("./emailConfig");
const MIN_LENGTH_USERNAME = 6;
const MIN_LENGTH_PASSWORD = 8;
const notProduction = process.env.NODE_ENV !== 'production';
// create reusable transporter object using the default SMTP transport
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createTransporterFromConfiguration = (smtpConfig) => nodemailer_1.default.createTransport({ ...smtpConfig });
class EmailService {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    constructor(options) {
        options.usernameMin = options.usernameMin || MIN_LENGTH_USERNAME;
        options.passwordMin = options.passwordMin || MIN_LENGTH_PASSWORD;
        if (!tools_1.Validity.isValidString(options.host, 2))
            throw new smtpConfigurationError_1.SmtpConfigurationError('invalid host');
        if (!tools_1.Validity.isValidString(options.username, options.usernameMin))
            throw new smtpConfigurationError_1.SmtpConfigurationError('invalid user name for authentication');
        if (!tools_1.Validity.isValidPassword(options.password) || !tools_1.Validity.isValidString(options.password, options.passwordMin))
            throw new smtpConfigurationError_1.SmtpConfigurationError('invalid password for authentication');
        this.options = emailConfig_1.emailConfig(options);
    }
    createTransporter() {
        // create reusable transporter object using the default SMTP transport
        return createTransporterFromConfiguration(this.options);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    closeTransporter(transporter) {
        // only needed when using pooled connections
        transporter.close();
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async sendEmail(message) {
        const err_message = 'cannot send email: invalid';
        if (!message || !message.from || !message.to || !message.subject || (!message.text && !message.html))
            return Promise.reject(new Error(`${err_message} message`));
        if (!tools_1.Validity.isValidString(message.from, 6))
            return new Error(`${err_message} 'from' email`);
        if (message.to) {
            if (typeof message.to === 'string') {
                if (!tools_1.Validity.isValidString(message.to, 6))
                    return new Error(`${err_message} 'to' email(s)`);
            }
            else if (Array.isArray(message.to)) {
                message.to.forEach((item) => {
                    if (typeof item === 'string') {
                        if (!tools_1.Validity.isValidString(item, 6))
                            return new Error(`${err_message} 'to' email(s)`);
                    }
                });
            }
        }
        if (message.cc) {
            if (typeof message.cc === 'string') {
                if (!tools_1.Validity.isValidString(message.cc, 6))
                    return new Error(`${err_message} 'cc' email(s)`);
            }
            else if (Array.isArray(message.cc)) {
                message.cc.forEach((item) => {
                    if (typeof item === 'string') {
                        if (!tools_1.Validity.isValidString(item, 6))
                            return new Error(`${err_message} 'cc' email(s)`);
                    }
                });
            }
        }
        if (message.bcc) {
            if (typeof message.bcc === 'string') {
                if (!tools_1.Validity.isValidString(message.bcc, 6))
                    return new Error(`${err_message} 'bcc' email(s)`);
            }
            else if (Array.isArray(message.bcc)) {
                message.bcc.forEach((item) => {
                    if (typeof item === 'string') {
                        if (!tools_1.Validity.isValidString(item, 6))
                            return new Error(`${err_message} 'bcc' email(s)`);
                    }
                });
            }
        }
        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer_1.default.createTransport(this.options);
        try {
            await transporter.verify();
            const info = await transporter.sendMail(message);
            transporter.close(); // only needed when using pooled connections
            return info;
        }
        catch (err) {
            const { code, command, responseCode, response, stack } = err;
            let msg = `code = ${code}, command = ${command}, responseCode = ${responseCode}, response = ${response}`;
            if (notProduction) {
                msg = `${msg}, stack = ${stack}`;
            }
            return Promise.reject(new mailServerError_1.MailServerError(msg));
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    async sendOneOfEmails(transporter, message) {
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
        }
        catch (err) {
            const { code, command, responseCode, response, stack } = err;
            let msg = `code = ${code}, command = ${command}, responseCode = ${responseCode}, response = ${response}`;
            if (notProduction) {
                msg = `${msg}, stack = ${stack}`;
            }
            return Promise.reject(new mailServerError_1.MailServerError(msg));
        }
    }
    static async send(message, host = process.env.EMAIL_HOST, username = process.env.EMAIL_USERNAME, password = process.env.EMAIL_PASSWORD, smtpPort) {
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
exports.EmailService = EmailService;
//# sourceMappingURL=emailService.js.map