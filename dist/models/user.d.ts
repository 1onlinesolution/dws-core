import { ObjectId } from 'mongodb';
import { IUserStatistics, UserStatistics } from './userStatistics';
import { IMongoIndexType } from './mongoIndexType';
export declare enum UserRole {
    Customer = 0,
    Employee = 1,
    Manager = 2,
    SuperUser = 3,
    Admin = 4
}
export interface UserPayload {
    [key: string]: any;
}
export interface IUser {
    _id: ObjectId;
    first_name: string;
    last_name: string;
    user_name: string;
    email: string;
    password: string;
    company_name: string;
    api_client_id: string;
    license: string;
    verified: boolean;
    isAdmin: boolean;
    hasAccess: boolean;
    roles: UserRole[];
    verification_token: string;
    newsletter: boolean;
    stats: IUserStatistics;
    api_client_secret: string;
    jwt_access_token: string;
    jwt_refresh_token: string;
    created_at: Date;
    modified_at: Date;
}
export declare class User implements IUser {
    _id: ObjectId;
    hasAccess: boolean;
    first_name: string;
    last_name: string;
    user_name: string;
    email: string;
    password: string;
    company_name: string;
    license: string;
    roles: UserRole[];
    verified: boolean;
    verification_token: string;
    newsletter: boolean;
    stats: UserStatistics;
    api_client_id: string;
    api_client_secret: string;
    jwt_access_token: string;
    jwt_refresh_token: string;
    created_at: Date;
    modified_at: Date;
    constructor({ _id, hasAccess, first_name, last_name, user_name, email, password, company_name, license, roles, verified, verification_token, newsletter, stats, api_client_id, api_client_secret, jwt_access_token, jwt_refresh_token, }?: {
        _id?: ObjectId | undefined;
        hasAccess?: boolean | undefined;
        first_name?: string | undefined;
        last_name?: string | undefined;
        user_name?: string | undefined;
        email?: string | undefined;
        password?: string | undefined;
        company_name?: string | undefined;
        license?: string | undefined;
        roles?: UserRole[] | undefined;
        verified?: boolean | undefined;
        verification_token?: string | undefined;
        newsletter?: boolean | undefined;
        stats?: UserStatistics | undefined;
        api_client_id?: string | undefined;
        api_client_secret?: string | undefined;
        jwt_access_token?: string | undefined;
        jwt_refresh_token?: string | undefined;
    });
    static get indexMap(): Map<string, IMongoIndexType>;
    static checkForError(user: User): Error | null;
    static get clientIdLength(): number;
    get fullName(): string;
    get idAsString(): string;
    get isVerified(): boolean;
    get getPayloadForToken(): UserPayload;
    get isApiClient(): boolean;
    get isCustomer(): boolean;
    get isEmployee(): boolean;
    get isManager(): boolean;
    get isSuperUser(): boolean;
    get isAdmin(): boolean;
    get requiresVerification(): boolean;
    get isBanned(): boolean;
    banUser(): void;
}
