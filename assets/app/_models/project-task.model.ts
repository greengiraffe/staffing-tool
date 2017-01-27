import { Skill } from "./skill.model";
import { User } from "./user.model";

export class ProjectTask {

    constructor(public title: string,
                public description: string,
                public requiredSkills: Skill[],
                public status: string,
                public assignedUsers?: User[],
                public interestedUsers?: User[],
                public _id?: string
              ) { }
}
