"use strict";
// See more at:
// https://nodemailer.com/smtp/
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailConfig = void 0;
// import SMTPConnection from 'nodemailer/lib/smtp-connection';
const emailConfig = (options = {
    username: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD,
    host: process.env.EMAIL_HOST,
    smtpPort: 587,
    secure: false,
    rejectUnauthorized: false,
}) => {
    return {
        // Is the hostname or IP address to connect to (defaults to ‘localhost’)
        host: options.host,
        // Is the port to connect to (defaults to 587 if is secure is false or 465 if true)
        port: options.smtpPort,
        // If true the connection will use TLS when connecting to server.
        // If false (the default) then TLS is used if server supports the STARTTLS extension.
        // In most cases set this value to true if you are connecting to port 465.
        // For port 587 or 25 keep it false.
        secure: options.smtpPort === 465,
        // Defines authentication data
        auth: {
            user: options.username,
            pass: options.password,
        },
        // Defines additional node.js TLSSocket options to be passed to the socket constructor, eg. {rejectUnauthorized: true}.
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: options.rejectUnauthorized,
        },
    };
};
exports.emailConfig = emailConfig;
//# sourceMappingURL=emailConfig.js.map