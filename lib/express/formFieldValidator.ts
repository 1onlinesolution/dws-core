import { Request } from 'express';
import { check, validationResult } from 'express-validator';
import { Validity } from '../tools';

export class FormFieldValidator {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static getValidationErrors(req: Request): any {
    return validationResult(req);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static formInputContainsErrors(req: Request) {
    const errors = FormFieldValidator.getValidationErrors(req);
    return errors.isEmpty();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static validateEmail({ fields = 'email', messageRequired = 'Email is required', messageInvalid = 'Not a valid email', escape = true }) {
    return escape
      ? check(fields).not().isEmpty().withMessage(messageRequired).trim().escape().isEmail().normalizeEmail().withMessage(messageInvalid)
      : check(fields).not().isEmpty().withMessage(messageRequired).trim().isEmail().normalizeEmail().withMessage(messageInvalid);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static validateEmailWithCustomRule({
    fields = 'email',
    messageRequired = 'Email is required',
    messageInvalid = 'Not a valid email',
    customAction = (value: string) => {
      if (!Validity.isValidEmail(value)) {
        return Promise.reject(new Error(messageInvalid));
      }
      return true;
    },
    escape = true,
  }) {
    return escape
      ? check(fields).not().isEmpty().withMessage(messageRequired).trim().escape().normalizeEmail().custom(customAction)
      : check(fields).not().isEmpty().withMessage(messageRequired).trim().normalizeEmail().custom(customAction);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static validateUserName({
    fields = 'userName',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    min = 6,
    messageRequired = 'User name is required',
    messageInvalid = `User name must be at least ${min} characters long`,
    escape = true,
  }) {
    return escape
      ? check(fields).not().isEmpty().trim().escape().withMessage(messageRequired).isLength({ min: min }).withMessage(messageInvalid)
      : check(fields).not().isEmpty().trim().withMessage(messageRequired).isLength({ min: min }).withMessage(messageInvalid);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static validatePassword({
    fields = 'password',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    min = 8,
    messageRequired = 'Password is required',
    messageInvalid = `Password be at least ${min} characters long`,
    escape = true,
  }) {
    return escape
      ? check(fields).not().isEmpty().trim().escape().withMessage(messageRequired).isLength({ min: min }).withMessage(messageInvalid)
      : check(fields).not().isEmpty().trim().withMessage(messageRequired).isLength({ min: min }).withMessage(messageInvalid);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static validateConfirmPassword({
    fields = 'passwordConfirm',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    min = 8,
    messageRequired = `Confirmation password is required and must be at least ${min} characters long`,
    messageInvalid = 'Passwords don\'t match',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/ban-ts-comment
    // @ts-ignore
    customAction = (value: string, { req }) => {
      if (value !== req.body.password) {
        return Promise.reject(new Error(messageInvalid));
      }

      return value;
    },
    escape = true,
  }) {
    return escape
      ? check(fields)
        .not()
        .isEmpty()
        .trim()
        .escape()
        .withMessage(messageRequired)
        .isLength({ min: min })
        .withMessage(messageInvalid)
        .custom(customAction)
      : check(fields).not().isEmpty().trim().withMessage(messageRequired).isLength({ min: min }).withMessage(messageInvalid).custom(customAction);
  }
}
