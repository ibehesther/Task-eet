import { HydratedDocument } from "mongoose";
import { IUser } from "./user";

export interface IInput {
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    new_password?: string;
    tasks?: Types.ObjectId[];
}

export type IUserData ={
    user: HydratedDocument<IUser>;
    validInput: IInput;
}