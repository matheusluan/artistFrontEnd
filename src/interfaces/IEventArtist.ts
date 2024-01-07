import { IEvent } from "./IEvent";
import { IUser } from "./IUser";


export interface IEventArtist
 {
    id: string;
    artist: IUser;
    event: IEvent;
    userId: string;
    accept: boolean;
    dh_action: Date;
    artistId: string;
    eventId: string;
}