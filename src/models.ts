export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    user: UserInfo;
    token: string;
}

export interface UserInfo {
    age: number;
    _id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}