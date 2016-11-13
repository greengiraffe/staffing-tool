export class Skill {
    name: string;
    skillId?: string;
    rating: number;

    constructor(name: string, rating: number, skillId?: string,) {
        this.name = name;
        this.skillId = skillId;
        this.rating = rating;
    }
}