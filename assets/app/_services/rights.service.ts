import { Injectable } from "@angular/core";
import { Project } from "../_models/project.model";
import { User } from "../_models/user.model";

@Injectable()
export class RightsService {

    canEditTask(project: Project, user: User): boolean {
        switch(user.role) {
            case "freelancer":
                return false;
        }
        return user.role === "admin" || project.creator._id === user._id || this.isAssignedUser(user, project);
    }

    canDeleteTask(project: Project, user: User): boolean {
        return this.canEditTask(project, user);
    }

    canDeleteProject(project: Project, user: User): boolean {
        return user.role === "admin" || project.creator._id === user._id;
    }

    canEditProject(project: Project, user: User): boolean {
        return user.role === 'admin' || project.creator._id === user._id;
    }

    canRemoveSkill(user: User): boolean {
        return user.role === 'admin' || user.role === 'user_creator';
    }

    canRemoveUser(user: User): boolean {
        return user.role === 'admin' || user.role === 'user_creator';
    }

    private isAssignedUser(user: User, project: Project): boolean {
        for(let task of project.projectTasks) {
            for(let assignedUser of task.assignedUsers) {
                if(assignedUser._id === user._id) {
                    return true;
                }
            }
        }
        return false;
    };

}
