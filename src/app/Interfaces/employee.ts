import { Department } from "./department";
import { Location } from "./location";
import { Project } from "./project";
import { Role } from "./role";
import { Status } from "./Status";

export interface Employee {

    id: string,
    firstName: string,
    lastName: string,
    name: string,
    dob: Date | string,
    emailId: string,
    mobile?: string,
    statusId?:number,
    status? : Status,
    joinDate: Date | string,
    locationId : number,
    locationName? : string,
    location?: Location,
    roleID: number,
    roleName? : string,
    role? : Role,
    departmentId: number,
    departmentName? : string,
    department? : Department,
    manager: string,
    projectId? : number,
    project?:Project,
    image?:string | ArrayBuffer | null | undefined
}


