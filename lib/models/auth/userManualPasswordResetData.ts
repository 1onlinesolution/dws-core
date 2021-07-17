import { ObjectId } from 'mongodb';

export interface UserManualPasswordResetData {
  _id: ObjectId;
  password: string;
}
