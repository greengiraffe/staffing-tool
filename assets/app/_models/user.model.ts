import { UserSkill } from "./user-skill.model";

export class User {
    constructor(public email: string,
                public password: string,
                public role?: string,
                public location?: string,

                public firstName?: string,
                public lastName?: string,
                public phone?: string,
                public userSkills?: UserSkill[],
                public userId?: string
                ) {}
}
