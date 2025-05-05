export interface IUser {
    id: number;
    name: string;
    email: string;
}

export interface IAuth {
    user: IUser | null;
    status: string | null;
}
