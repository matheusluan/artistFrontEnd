import { ICategory } from "./ICategory";

export interface ICategoriesEvent
 {
    categoryId: string;
    eventId: string;
    category: ICategory;
}