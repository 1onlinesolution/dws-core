import { Request } from 'express';
export declare class FormFieldValidator {
    static getValidationErrors(req: Request): any;
    static formInputContainsErrors(req: Request): any;
    static validateEmail({ fields, messageRequired, messageInvalid, escape }: {
        fields?: string | undefined;
        messageRequired?: string | undefined;
        messageInvalid?: string | undefined;
        escape?: boolean | undefined;
    }): import("express-validator").ValidationChain;
    static validateEmailWithCustomRule({ fields, messageRequired, messageInvalid, customAction, escape, }: {
        fields?: string | undefined;
        messageRequired?: string | undefined;
        messageInvalid?: string | undefined;
        customAction?: ((value: string) => true | Promise<never>) | undefined;
        escape?: boolean | undefined;
    }): import("express-validator").ValidationChain;
    static validateUserName({ fields, min, messageRequired, messageInvalid, escape, }: {
        fields?: string | undefined;
        min?: number | undefined;
        messageRequired?: string | undefined;
        messageInvalid?: string | undefined;
        escape?: boolean | undefined;
    }): import("express-validator").ValidationChain;
    static validatePassword({ fields, min, messageRequired, messageInvalid, escape, }: {
        fields?: string | undefined;
        min?: number | undefined;
        messageRequired?: string | undefined;
        messageInvalid?: string | undefined;
        escape?: boolean | undefined;
    }): import("express-validator").ValidationChain;
    static validateConfirmPassword({ fields, min, messageRequired, messageInvalid, customAction, escape, }: {
        fields?: string | undefined;
        min?: number | undefined;
        messageRequired?: string | undefined;
        messageInvalid?: string | undefined;
        customAction?: ((value: string, { req }: {
            req: any;
        }) => string | Promise<never>) | undefined;
        escape?: boolean | undefined;
    }): import("express-validator").ValidationChain;
}
