import { Skill } from "./skill.model";

export class Task {

    constructor(public title: string,
                public projectId: string,
                public description: string,
                public requiredSkills: Skill[]) { }


}
