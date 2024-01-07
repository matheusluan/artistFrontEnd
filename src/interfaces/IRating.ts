import { ICategory } from "./ICategory";
import { IUser } from "./IUser";

export interface IRating {
    id: string;
    ratedByUser: IUser;
    ratedByUserId: string;
    ratedUserId: string;
    value: number;
}