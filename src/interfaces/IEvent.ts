import { IAddressId } from "./IAddressId";
import { ICategories } from "./ICategories";
import { ICategoriesEvent } from "./ICategoriesEvent";
import { IEventArtist } from "./IEventArtist";

export interface IEvent {
    id: string;
    name: string,
    description: string,
    dh_expiration: string,
    dh_event: string,
    address: IAddressId,
    budget: string,
    people: string,
    user: {
        id: string;
        name: string;
        categories: ICategories[],
        profile_image: string,
        user_type: string
    },
    category: {
        categories: ICategoriesEvent[]
    },
    event_artist: IEventArtist[],
}