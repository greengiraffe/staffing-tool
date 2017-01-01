import { Skill } from "./skill.model";

export class UserSkill {

    constructor(
        public skill: Skill,
        public rating: number) {}
}
