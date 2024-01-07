import { IAddressId } from "./IAddressId";
import { IRating } from "./IRating";

export interface IUser {
    id: string;
    name: string;
    username: string;
    password: string;
    status?: boolean;
    user_type: string;
    document?: string;
    email: string;
    profile_image?: string;
    cel_phone?: string;
    addressId?: string;
    address?: IAddressId;
    categories?: string[];
    rating?: string[];
    ratingsReceived?: IRating[];
    facebookUrl?:string;
    youtubeUrl?: string;
    instagramUrl?: string;
    tiktokUrl?: string;
}