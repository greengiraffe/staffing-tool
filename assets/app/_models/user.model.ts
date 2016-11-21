import {Skill} from "./skill.model";

export class User {
    constructor(public email: string,
                public password: string,
                public role: string,
                public location: string,

                public firstName?: string,
                public lastName?: string,
                public skype?: string,
                public phone?: string,
                public userSkill?: Skill
                ) {}
}
