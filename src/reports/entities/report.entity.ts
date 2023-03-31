import * as mongoose from "mongoose"
import { User, UserSchema } from "src/user/entities/user.entity";

export enum ReportsSeverity {
    Critical = "Critical",
    Major = "Major",
    Medium = "Medium",
    Low = "Low",
}

export enum ReportsPriority {
    Low = "Low",
    Medium = "Medium",
    High = "High",
}
export const ReportsSchema = new mongoose.Schema({
    title: String,
    description: String,
    createDate: Date,
    createBy:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    severity: {
        type: String,
        enum: Object.values(ReportsSeverity),
        required: true
    },
    priority: {
        type: String,
        enum: Object.values(ReportsPriority),
        required: true
    },
    filePath: String,

});

export class Reports {
    _id: string;
    title: string;
    description: string;
    createDate: string;
    createBy: User;
    severity: ReportsSeverity;
    priority: ReportsPriority;
    filePath: string;
}

mongoose.model("users", UserSchema)