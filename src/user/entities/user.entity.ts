import * as mongoose from "mongoose"
export enum Role {
    User = "User",
    Admin = "Admin",
    SuperAdmin = "SuperAdmin",
}
export const UserSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    username: {
        type: String,
        select:false
    },
    password: {
        type: String,
        select:false
    },
    firstName: String,
    lastName: String,
    role: {
        type: String,
        enum: Object.values(Role),
        required: true
    },
});

export interface User {
    id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    role: Role;
}

