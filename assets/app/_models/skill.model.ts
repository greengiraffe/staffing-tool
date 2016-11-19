export class Skill {
    name: string;
    skillId?: string;

    constructor(name: string, skillId?: string) {
        this.name = name;
        this.skillId = skillId;
    }
}
