declare const emailConfig: (options?: {
    username: string | undefined;
    password: string | undefined;
    host: string | undefined;
    smtpPort: number;
    secure: boolean;
    rejectUnauthorized: boolean;
}) => any;
export { emailConfig };
