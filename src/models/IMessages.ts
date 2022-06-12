export interface IMessage  {
    userMessage: string;
    text: string;
    date: string;
}

export interface IMessages {
    users: string[];
    id: string;
    lastСhange: string;
    lastMessages?: string;
    messageArr?: IMessage[];
}