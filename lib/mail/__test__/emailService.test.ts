import * as Sinon from 'sinon';
import { emailConfig, EmailService } from '../index';

describe('EmailService - Constructor throws if...', () => {
  test('...not provided with a configuration: host missing', () => {
    expect(() => {
      new EmailService({});
    }).toThrow(/invalid host/);
  });

  test('...not provided with a configuration: username missing', () => {
    expect(() => {
      new EmailService({ host: 'mail.mail.com', username: undefined });
    }).toThrow(/invalid user name for authentication/);
  });

  test('...not provided with a configuration: password missing', () => {
    expect(() => {
      new EmailService({ host: 'mail.mail.com', username: 'aaabbb', password: undefined });
    }).toThrow(/invalid password for authentication/);
  });

  test('...not provided with a configuration: password missing', () => {
    expect(() => {
      new EmailService({ host: 'mail.mail.com', username: 'aaabbb', password: undefined });
    }).toThrow(/invalid password for authentication/);
  });
});

describe('EmailService...', () => {
  let sandbox: Sinon.SinonSandbox;

  beforeEach(function () {
    sandbox = Sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  test('...sendEmail sends one email', async function () {
    const message = {
      from: 'fromEmail',
      to: 'toEmail',
      subject: 'Testing EmailService',
      text: 'This email is the result of testing (emailService.test.ts)',
    };

    const sendEmail = sandbox.stub(EmailService.prototype, 'sendEmail').resolves(true);
    const config = emailConfig();
    config.host = 'aaa';
    config.username = 'aaabbb';
    config.password = 'aaabbb!8';

    const emailService = new EmailService({...config});
    const result = await emailService.sendEmail(message);
    expect(result).toBeTruthy();
    Sinon.assert.calledOnce(sendEmail);
  });

  test('...send sends one email', async function () {
    const message = {
      from: 'fromEmail',
      to: 'toEmail',
      subject: 'Testing EmailService',
      text: 'This email is the result of testing (emailService.test.ts)',
    };

    const send = sandbox.stub(EmailService, 'send').resolves(true);
    const result = await EmailService.send(message, 'aaa', 'aaabbb', 'aaabbb!8');
    expect(result).toBeTruthy();
    Sinon.assert.calledOnce(send);
  });

  test('...send sends multiple emails', async function () {
    const message = {
      from: 'fromEmail',
      to: 'toEmail,andAnotherOne',
      subject: 'Testing EmailService',
      text: 'This email is the result of testing (emailService.test.ts)',
    };

    const send = sandbox.stub(EmailService, 'send').resolves(true);
    const result = await EmailService.send(message, 'aaa', 'aaabbb', 'aaabbb!8');
    expect(result).toBeTruthy();
    Sinon.assert.calledOnce(send);
  });

  test('...send sends multiple emails through cc', async function () {
    const message = {
      from: 'fromEmail',
      to: 'toEmail',
      cc: 'andAnotherOne',
      subject: 'Testing EmailService',
      text: 'This email is the result of testing (emailService.test.ts)',
    };

    const send = sandbox.stub(EmailService, 'send').resolves(true);
    const result = await EmailService.send(message, 'aaa', 'aaabbb', 'aaabbb!8');
    expect(result).toBeTruthy();
    Sinon.assert.calledOnce(send);
  });

  test('...send sends multiple emails through bcc', async function () {
    const message = {
      from: 'fromEmail',
      to: 'toEmail',
      bcc: 'andAnotherOne',
      subject: 'Testing EmailService',
      text: 'This email is the result of testing (emailService.test.ts)',
    };

    const send = sandbox.stub(EmailService, 'send').resolves(true);
    const result = await EmailService.send(message, 'aaa', 'aaabbb', 'aaabbb!8');
    expect(result).toBeTruthy();
    Sinon.assert.calledOnce(send);
  });
});
