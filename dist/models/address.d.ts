import { ObjectId } from 'mongodb';
import { IMongoIndexType } from './mongoIndexType';
export interface IAddress {
    _id: ObjectId;
    user_id: ObjectId;
    line1: string;
    line2: string;
    line3: string;
    postCode: string;
    city: string;
    state: string;
    country: string;
    isDefault: boolean;
    isBilling: boolean;
    isShipping: boolean;
    created_at: Date;
    modified_at: Date;
}
export declare class Address implements IAddress {
    _id: ObjectId;
    user_id: ObjectId;
    line1: string;
    line2: string;
    line3: string;
    postCode: string;
    city: string;
    state: string;
    country: string;
    isDefault: boolean;
    isBilling: boolean;
    isShipping: boolean;
    created_at: Date;
    modified_at: Date;
    constructor({ _id, user_id, line1, line2, line3, postCode, city, country, state, isDefault, isBilling, isShipping, }?: {
        _id?: ObjectId | undefined;
        user_id?: ObjectId | undefined;
        line1?: string | undefined;
        line2?: string | undefined;
        line3?: string | undefined;
        postCode?: string | undefined;
        city?: string | undefined;
        country?: string | undefined;
        state?: string | undefined;
        isDefault?: boolean | undefined;
        isBilling?: boolean | undefined;
        isShipping?: boolean | undefined;
    });
    toString(): string;
    static checkForError(address: IAddress): Error | null;
    static get indexMap(): Map<string, IMongoIndexType>;
}
