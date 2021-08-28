import { Request, Response, NextFunction } from 'express';
import { body, check, ValidationChain, validationResult } from 'express-validator';
import { Validity } from '../tools';
import { RequestValidationError } from '../models';

const EMAIL_REQUIRED = 'email is required';
const EMAIL_NOT_VALID = 'not a valid email';
const EMAIL_OR_USERNAME_REQUIRED = 'email or user name is required';
const EMAIL_OR_USERNAME_NOT_VALID = 'not a valid email or user name';
const FIRST_NAME_REQUIRED = 'first name is required';
const FIRST_NAME_NOT_VALID = 'not a valid first name';
const LAST_NAME_REQUIRED = 'last name is required';
const LAST_NAME_NOT_VALID = 'not a valid last name';
const PASSWORD_CONFIRM_REQUIRED = 'confirmation password is required';
const PASSWORD_CONFIRM_NOT_VALID = 'passwords don\'t match';

export class FormFieldValidator {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static validateRequest(req: Request, res: Response, next: NextFunction): any {
    const errors = FormFieldValidator.getValidationErrors(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    next();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static getValidationErrors(req: Request): any {
    return validationResult(req);
  }

  static formInputContainsErrors(req: Request): boolean {
    const errors = FormFieldValidator.getValidationErrors(req);
    return errors.isEmpty();
  }

  // ===
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static validateEmail({ fields = 'email', messageRequired = EMAIL_REQUIRED, messageInvalid = EMAIL_NOT_VALID, escape = true }): ValidationChain {
    return escape
      ? check(fields).not().isEmpty().withMessage(messageRequired).trim().escape().isEmail().normalizeEmail().withMessage(messageInvalid)
      : check(fields).not().isEmpty().withMessage(messageRequired).trim().isEmail().normalizeEmail().withMessage(messageInvalid);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static validateBodyEmail({ fields = 'email', messageRequired = EMAIL_REQUIRED, messageInvalid = EMAIL_NOT_VALID, escape = true }): ValidationChain {
    return escape
      ? body(fields).not().isEmpty().withMessage(messageRequired).trim().escape().isEmail().normalizeEmail().withMessage(messageInvalid)
      : body(fields).not().isEmpty().withMessage(messageRequired).trim().isEmail().normalizeEmail().withMessage(messageInvalid);
  }

  // ===
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static validateBodyEmailOrUserName({
    fields = 'email',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    min = 6,
    messageRequired = EMAIL_OR_USERNAME_REQUIRED,
    messageInvalid = EMAIL_OR_USERNAME_NOT_VALID,
    escape = true,
  }): ValidationChain {
    return escape
      ? body(fields).not().isEmpty().withMessage(messageRequired).trim().escape().isLength({ min: min }).withMessage(messageInvalid)
      : body(fields).not().isEmpty().withMessage(messageRequired).trim().isLength({ min: min }).withMessage(messageInvalid);
  }

  // ===
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static validateBodyFirstName({
    fields = 'firstName',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    min = 2,
    messageRequired = FIRST_NAME_REQUIRED,
    messageInvalid = FIRST_NAME_NOT_VALID,
    escape = true,
  }): ValidationChain {
    return escape
      ? body(fields).not().isEmpty().withMessage(messageRequired).trim().escape().isLength({ min: min }).withMessage(messageInvalid)
      : body(fields).not().isEmpty().withMessage(messageRequired).trim().isLength({ min: min }).withMessage(messageInvalid);
  }

  // ===
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static validateBodyLastName({
    fields = 'lastName',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    min = 2,
    messageRequired = LAST_NAME_REQUIRED,
    messageInvalid = LAST_NAME_NOT_VALID,
    escape = true,
  }): ValidationChain {
    return escape
      ? body(fields).not().isEmpty().withMessage(messageRequired).trim().escape().isLength({ min: min }).withMessage(messageInvalid)
      : body(fields).not().isEmpty().withMessage(messageRequired).trim().isLength({ min: min }).withMessage(messageInvalid);
  }

  // ===
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static validateEmailWithCustomRule({
    fields = 'email',
    messageRequired = EMAIL_REQUIRED,
    messageInvalid = EMAIL_NOT_VALID,
    customAction = (value: string) => {
      if (!Validity.isValidEmail(value)) {
        return Promise.reject(new Error(messageInvalid));
      }
      return true;
    },
    escape = true,
  }): ValidationChain {
    return escape
      ? check(fields).not().isEmpty().withMessage(messageRequired).trim().escape().normalizeEmail().custom(customAction)
      : check(fields).not().isEmpty().withMessage(messageRequired).trim().normalizeEmail().custom(customAction);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static validateBodyEmailWithCustomRule({
    fields = 'email',
    messageRequired = EMAIL_REQUIRED,
    messageInvalid = EMAIL_NOT_VALID,
    customAction = (value: string) => {
      if (!Validity.isValidEmail(value)) {
        return Promise.reject(new Error(messageInvalid));
      }
      return true;
    },
    escape = true,
  }): ValidationChain {
    return escape
      ? body(fields).not().isEmpty().withMessage(messageRequired).trim().escape().normalizeEmail().custom(customAction)
      : body(fields).not().isEmpty().withMessage(messageRequired).trim().normalizeEmail().custom(customAction);
  }

  // ===
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static validateUserName({
    fields = 'userName',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    min = 6,
    messageRequired = 'User name is required',
    messageInvalid = `User name must be at least ${min} characters long`,
    escape = true,
  }): ValidationChain {
    return escape
      ? check(fields).not().isEmpty().trim().escape().withMessage(messageRequired).isLength({ min: min }).withMessage(messageInvalid)
      : check(fields).not().isEmpty().trim().withMessage(messageRequired).isLength({ min: min }).withMessage(messageInvalid);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static validateBodyUserName({
    fields = 'userName',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    min = 6,
    messageRequired = 'User name is required',
    messageInvalid = `User name must be at least ${min} characters long`,
    escape = true,
  }): ValidationChain {
    return escape
      ? body(fields).not().isEmpty().trim().escape().withMessage(messageRequired).isLength({ min: min }).withMessage(messageInvalid)
      : body(fields).not().isEmpty().trim().withMessage(messageRequired).isLength({ min: min }).withMessage(messageInvalid);
  }

  // ===
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static validatePassword({
    fields = 'password',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    min = 8,
    messageRequired = 'Password is required',
    messageInvalid = `Password be at least ${min} characters long`,
    escape = true,
  }): ValidationChain {
    return escape
      ? check(fields).not().isEmpty().trim().escape().withMessage(messageRequired).isLength({ min: min }).withMessage(messageInvalid)
      : check(fields).not().isEmpty().trim().withMessage(messageRequired).isLength({ min: min }).withMessage(messageInvalid);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static validateBodyPassword({
    fields = 'password',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    min = 8,
    messageRequired = 'Password is required',
    messageInvalid = `Password be at least ${min} characters long`,
    escape = true,
  }): ValidationChain {
    return escape
      ? body(fields).not().isEmpty().trim().escape().withMessage(messageRequired).isLength({ min: min }).withMessage(messageInvalid)
      : body(fields).not().isEmpty().trim().withMessage(messageRequired).isLength({ min: min }).withMessage(messageInvalid);
  }

  // ===
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static validateConfirmPassword({
    fields = 'passwordConfirm',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    min = 8,
    messageRequired = PASSWORD_CONFIRM_REQUIRED,
    messageInvalid = PASSWORD_CONFIRM_NOT_VALID,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/ban-ts-comment
    // @ts-ignore
    customAction = (value: string, { req }) => {
      if (value !== req.body.password) {
        return Promise.reject(new Error(messageInvalid));
      }

      return value;
    },
    escape = true,
  }): ValidationChain {
    return escape
      ? check(fields).not().isEmpty().trim().escape().withMessage(messageRequired).isLength({ min: min }).withMessage(messageInvalid).custom(customAction)
      : check(fields).not().isEmpty().trim().withMessage(messageRequired).isLength({ min: min }).withMessage(messageInvalid).custom(customAction);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static validateBodyConfirmPassword({
    fields = 'passwordConfirm',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    min = 8,
    messageRequired = PASSWORD_CONFIRM_REQUIRED,
    messageInvalid = PASSWORD_CONFIRM_NOT_VALID,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/ban-ts-comment
    // @ts-ignore
    customAction = (value: string, { req }) => {
      if (value !== req.body.password) {
        return Promise.reject(new Error(messageInvalid));
      }

      return value;
    },
    escape = true,
  }): ValidationChain {
    return escape
      ? body(fields).not().isEmpty().trim().escape().withMessage(messageRequired).isLength({ min: min }).withMessage(messageInvalid).custom(customAction)
      : body(fields).not().isEmpty().trim().withMessage(messageRequired).isLength({ min: min }).withMessage(messageInvalid).custom(customAction);
  }
}
