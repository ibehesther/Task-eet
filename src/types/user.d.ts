import { Types } from 'mongoose';

export interface IUser {
    _id: Types.ObjectId;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    tasks: Types.ObjectId[];
    isValidPassword:(password: string) => Promise<Boolean>
}

export interface IPayload {
    _id: Types.ObjectId;
    email: string;
}
