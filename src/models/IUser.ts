export interface IUser {
    nikname: string;
    id: string;
    login?: string;
    password?: string;
    image?: string;
    friends?: string[];
    messages?: string[];
}