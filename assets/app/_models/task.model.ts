import { Skill } from "./skill.model";

export class Task {
    taskId: string;
    projectId: string;
    title: string;
    description: string;
    requiredSkills: Skill[];

    constructor(title: string,
                projectId: string,
                description: string,
                requiredSkills: Skill[]) {
        this.title = title;
        this.projectId = projectId;
        this.description = description;
        this.requiredSkills = requiredSkills;
    }
}
