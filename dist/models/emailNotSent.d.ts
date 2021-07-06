import { ObjectId } from 'mongodb';
import { IMongoIndexType } from './mongoIndexType';
export interface IEmailNotSent {
    _id: ObjectId;
    user_id: ObjectId;
    ip: string;
    application_name: string;
    message: string;
    error: Error | null;
    created_at: Date;
}
export declare class EmailNotSent implements IEmailNotSent {
    _id: ObjectId;
    user_id: ObjectId;
    ip: string;
    application_name: string;
    message: string;
    error: null;
    created_at: Date;
    constructor({ _id, user_id, ip, application_name, message, error, }?: {
        _id?: ObjectId | undefined;
        user_id?: ObjectId | undefined;
        ip?: string | undefined;
        application_name?: string | undefined;
        message?: string | undefined;
        error?: null | undefined;
    });
    static checkForError(emailNotSent: IEmailNotSent): Error | null;
    static get indexMap(): Map<string, IMongoIndexType>;
}
