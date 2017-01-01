import { Skill } from "./skill.model";

export class ProjectTask {

    constructor(public title: string,
                public description: string,
                public requiredSkills: Skill[]) { }
}
