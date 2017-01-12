import { Skill } from "./skill.model";
import { User } from "./user.model";

export class ProjectTask {

    constructor(public title: string,
                public description: string,
                public requiredSkills: Skill[],
                public assignedUsers?: User[],
                public interestedUsers?: User[]
              ) { }
}
