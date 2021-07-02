import { ObjectId } from 'mongodb';

export interface IManualPasswordReset {
  _id: ObjectId;
  password: string;
}
