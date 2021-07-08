import { emailConfig, EmailService } from '../index';

const isIntegrationTest = process.env.NODE_ENV === 'test_integration';

describe.skip('*** Integration tests *** EmailService', () => {
  test('...sendEmail sends one email', async () => {
    if (isIntegrationTest) {
      const message = {
        from: process.env.EMAIL_USERNAME,
        to: process.env.EMAIL_USERNAME,
        subject: 'Testing EmailService',
        text: 'This email is the result of testing (emailService.integration.test.ts)',
      };

      const config = emailConfig();
      const emailService = new EmailService({ ...config });
      emailService
        .sendEmail(message)
        .then((result) => {
          const { accepted, rejected, response } = result;
          expect(rejected.length).toBe(0);
          expect(accepted.length).toBe(1);
          expect(accepted[0]).toBe(message.to);
          expect(response.includes('250 2.0.0 Ok: queued as')).toBeTruthy();
        })
        .catch((err) => {
          expect(err).not.toBeNull();
        });
    }
  });

  test('...send sends one email', async () => {
    if (isIntegrationTest) {
      const message = {
        from: process.env.EMAIL_USERNAME,
        to: process.env.EMAIL_USERNAME,
        subject: 'Testing EmailService',
        text: 'This email is the result of testing (emailService.integration.test.ts)',
      };

      EmailService.send(message, process.env.EMAIL_HOST, process.env.EMAIL_USERNAME, process.env.EMAIL_PASSWORD)
        .then((result) => {
          const { accepted, rejected, response } = result;
          expect(rejected.length).toBe(0);
          expect(accepted.length).toBe(1);
          expect(accepted[0]).toBe(message.to);
          expect(response.includes('250 2.0.0 Ok: queued as')).toBeTruthy();
        })
        .catch((err) => {
          expect(err).not.toBeNull();
        });
    }
  });

  test('...send sends multiple emails', async () => {
    if (isIntegrationTest) {
      const message = {
        from: process.env.EMAIL_USERNAME,
        to: `${process.env.EMAIL_USERNAME},${process.env.EMAIL_USERNAME2}`,
        subject: 'Testing EmailService',
        text: 'This email is the result of testing (emailService.integration.test.ts)',
      };

      EmailService.send(message, process.env.EMAIL_HOST, process.env.EMAIL_USERNAME, process.env.EMAIL_PASSWORD)
        .then((result) => {
          const { accepted, rejected, response } = result;
          expect(rejected.length).toBe(0);
          expect(accepted.length).toBe(2);
          const recipients = message.to.split(',');
          expect(accepted[0]).toBe(recipients[0]);
          expect(accepted[1]).toBe(recipients[1]);
          expect(response.includes('250 2.0.0 Ok: queued as')).toBeTruthy();
        })
        .catch((err) => {
          expect(err).not.toBeNull();
        });
    }
  });

  test('...send sends multiple emails through cc', async () => {
    if (isIntegrationTest) {
      const message = {
        from: process.env.EMAIL_USERNAME,
        to: process.env.EMAIL_USERNAME,
        cc: process.env.EMAIL_USERNAME2,
        subject: 'Testing EmailService',
        text: 'This email is the result of testing (emailService.integration.test.ts)',
      };

      EmailService.send(message, process.env.EMAIL_HOST, process.env.EMAIL_USERNAME, process.env.EMAIL_PASSWORD)
        .then((result) => {
          const { accepted, rejected, response } = result;
          expect(rejected.length).toBe(0);
          expect(accepted.length).toBe(2);
          expect(accepted[0]).toBe(message.to);
          expect(accepted[1]).toBe(message.cc);
          expect(response.includes('250 2.0.0 Ok: queued as')).toBeTruthy();
        })
        .catch((err) => {
          expect(err).not.toBeNull();
        });
    }
  });

  test('...send sends multiple emails through bcc', async () => {
    if (isIntegrationTest) {
      const message = {
        from: process.env.EMAIL_USERNAME,
        to: process.env.EMAIL_USERNAME,
        bcc: process.env.EMAIL_USERNAME2,
        subject: 'Testing EmailService',
        text: 'This email is the result of testing (emailService.integration.test.ts)',
      };

      EmailService.send(message, process.env.EMAIL_HOST, process.env.EMAIL_USERNAME, process.env.EMAIL_PASSWORD)
        .then((result) => {
          const { accepted, rejected, response } = result;
          expect(rejected.length).toBe(0);
          expect(accepted.length).toBe(2);
          expect(accepted[0]).toBe(message.to);
          expect(accepted[1]).toBe(message.bcc);
          expect(response.includes('250 2.0.0 Ok: queued as')).toBeTruthy();
        })
        .catch((err) => {
          expect(err).not.toBeNull();
        });
    }
  });
});
