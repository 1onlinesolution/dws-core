import { IMongoIndexType } from './mongoIndexType';
export interface IUserLogin {
    ip: string;
    email: string;
    created_at: Date;
}
export declare class UserLogin implements IUserLogin {
    ip: string;
    email: string;
    created_at: Date;
    constructor({ ip, email }: {
        ip?: string | undefined;
        email?: string | undefined;
    });
    static checkForError(userLogin: IUserLogin): Error | null;
    static get indexMap(): Map<string, IMongoIndexType>;
}
