import * as mongoose from "mongoose"
import { Reports, ReportsSchema } from "src/reports/entities/report.entity";
import { User, UserSchema } from "src/user/entities/user.entity";
export enum ProjectStatus {
    Open = "Open",
    Inprogress = "InProgress",
    Blocked = "Blocked",
    Closed = "Closed",
}
export const ProjectSchema = new mongoose.Schema({
    id: String,
    name: String,
    description: String,
    startDate: Date,
    endDate: Date,
    status: {
        type: String,
        enum: Object.values(ProjectStatus),
        required: true
    },
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    members:  [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }],
    teamLead: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    reports: [
        ReportsSchema
    ]

});

export class Project {
    _id: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    status: ProjectStatus;
    createBy: User;
    members: User[];
    teamLead: User;
    reports: Reports[];
}


mongoose.model("users", UserSchema)