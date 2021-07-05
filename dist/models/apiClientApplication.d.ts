import { ObjectId } from 'mongodb';
import { IMongoIndexType } from './mongoIndexType';
export interface IApiClientApplicationPayload {
    _id: ObjectId;
    api_client_id: ObjectId;
    application_name: string;
    website_url: string;
    return_url: string;
}
export interface IApiClientApplication extends IApiClientApplicationPayload {
    application_description: string;
    authorization_code: string;
    authorization_code_expiration: Date;
    access_token: string;
    access_token_expires_in_seconds: number;
    refresh_token: string;
    refresh_token_expires_in_seconds: number;
    created_at: Date;
    modified_at: Date;
}
export declare class ApiClientApplication implements IApiClientApplication {
    private static ClientIdLength;
    _id: ObjectId;
    api_client_id: ObjectId;
    application_name: string;
    application_description: string;
    website_url: string;
    return_url: string;
    authorization_code: string;
    authorization_code_expiration: Date;
    access_token: string;
    access_token_expires_in_seconds: number;
    refresh_token: string;
    refresh_token_expires_in_seconds: number;
    created_at: Date;
    modified_at: Date;
    constructor({ _id, api_client_id, application_name, application_description, website_url, return_url, authorization_code, authorization_code_expiration, access_token, access_token_expires_in_seconds, refresh_token, refresh_token_expires_in_seconds, }?: {
        _id?: ObjectId | undefined;
        api_client_id?: ObjectId | undefined;
        application_name?: string | undefined;
        application_description?: string | undefined;
        website_url?: string | undefined;
        return_url?: string | undefined;
        authorization_code?: string | undefined;
        authorization_code_expiration?: Date | undefined;
        access_token?: string | undefined;
        access_token_expires_in_seconds?: number | undefined;
        refresh_token?: string | undefined;
        refresh_token_expires_in_seconds?: number | undefined;
    });
    static checkForError(apiClientApplication: IApiClientApplication): Error | null;
    static get indexMap(): Map<string, IMongoIndexType>;
}
