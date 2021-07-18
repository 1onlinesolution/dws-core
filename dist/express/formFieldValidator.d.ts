import { Request } from 'express';
import { ValidationChain } from 'express-validator';
export declare class FormFieldValidator {
    static getValidationErrors(req: Request): any;
    static formInputContainsErrors(req: Request): boolean;
    static validateEmail({ fields, messageRequired, messageInvalid, escape }: {
        fields?: string | undefined;
        messageRequired?: string | undefined;
        messageInvalid?: string | undefined;
        escape?: boolean | undefined;
    }): ValidationChain;
    static validateBodyEmail({ fields, messageRequired, messageInvalid, escape }: {
        fields?: string | undefined;
        messageRequired?: string | undefined;
        messageInvalid?: string | undefined;
        escape?: boolean | undefined;
    }): ValidationChain;
    static validateBodyFirstName({ fields, min, messageRequired, messageInvalid, escape, }: {
        fields?: string | undefined;
        min?: number | undefined;
        messageRequired?: string | undefined;
        messageInvalid?: string | undefined;
        escape?: boolean | undefined;
    }): ValidationChain;
    static validateBodyLastName({ fields, min, messageRequired, messageInvalid, escape, }: {
        fields?: string | undefined;
        min?: number | undefined;
        messageRequired?: string | undefined;
        messageInvalid?: string | undefined;
        escape?: boolean | undefined;
    }): ValidationChain;
    static validateEmailWithCustomRule({ fields, messageRequired, messageInvalid, customAction, escape, }: {
        fields?: string | undefined;
        messageRequired?: string | undefined;
        messageInvalid?: string | undefined;
        customAction?: ((value: string) => true | Promise<never>) | undefined;
        escape?: boolean | undefined;
    }): ValidationChain;
    static validateBodyEmailWithCustomRule({ fields, messageRequired, messageInvalid, customAction, escape, }: {
        fields?: string | undefined;
        messageRequired?: string | undefined;
        messageInvalid?: string | undefined;
        customAction?: ((value: string) => true | Promise<never>) | undefined;
        escape?: boolean | undefined;
    }): ValidationChain;
    static validateUserName({ fields, min, messageRequired, messageInvalid, escape, }: {
        fields?: string | undefined;
        min?: number | undefined;
        messageRequired?: string | undefined;
        messageInvalid?: string | undefined;
        escape?: boolean | undefined;
    }): ValidationChain;
    static validateBodyUserName({ fields, min, messageRequired, messageInvalid, escape, }: {
        fields?: string | undefined;
        min?: number | undefined;
        messageRequired?: string | undefined;
        messageInvalid?: string | undefined;
        escape?: boolean | undefined;
    }): ValidationChain;
    static validatePassword({ fields, min, messageRequired, messageInvalid, escape, }: {
        fields?: string | undefined;
        min?: number | undefined;
        messageRequired?: string | undefined;
        messageInvalid?: string | undefined;
        escape?: boolean | undefined;
    }): ValidationChain;
    static validateBodyPassword({ fields, min, messageRequired, messageInvalid, escape, }: {
        fields?: string | undefined;
        min?: number | undefined;
        messageRequired?: string | undefined;
        messageInvalid?: string | undefined;
        escape?: boolean | undefined;
    }): ValidationChain;
    static validateConfirmPassword({ fields, min, messageRequired, messageInvalid, customAction, escape, }: {
        fields?: string | undefined;
        min?: number | undefined;
        messageRequired?: string | undefined;
        messageInvalid?: string | undefined;
        customAction?: ((value: string, { req }: {
            req: any;
        }) => string | Promise<never>) | undefined;
        escape?: boolean | undefined;
    }): ValidationChain;
    static validateBodyConfirmPassword({ fields, min, messageRequired, messageInvalid, customAction, escape, }: {
        fields?: string | undefined;
        min?: number | undefined;
        messageRequired?: string | undefined;
        messageInvalid?: string | undefined;
        customAction?: ((value: string, { req }: {
            req: any;
        }) => string | Promise<never>) | undefined;
        escape?: boolean | undefined;
    }): ValidationChain;
}
