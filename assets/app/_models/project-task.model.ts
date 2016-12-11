export class ProjectTask {
    title: string;
    description: string;
    requiredSkills: string[];

    constructor(title: string, description: string, requiredSkills: string[]) {
        this.title = title;
        this.description = description;
        this.requiredSkills = requiredSkills;
    }
}
