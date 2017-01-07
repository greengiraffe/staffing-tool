let Project = require('../../models/project');

/**
 * Transforms the Skill object array inside the projectTasks to an array of skillID strings.
 */
const transformProjectTaskSkills = function (projectTasks) {
    let transformedProjectTasks = [];

    projectTasks.forEach(task => {
        let projectTask = {
            title: task.title,
            description: task.description,
            requiredSkills: task.requiredSkills.map(skill => skill._id),
            assignedUsers: task.assignedUsers
        };

        transformedProjectTasks.push(projectTask);
    });

    return transformedProjectTasks;
};

module.exports = {

    createProject: function(project) {

        let newProject = new Project({
            creator: project.creator,
            title: project.title,
            description: project.description,
            type: project.type,
            client: project.client,
            budget: project.budget,
            expBudget: project.expBudget,
            isPriority: project.isPriority,
            start: project.start,
            projectTasks: transformProjectTaskSkills(project.projectTasks),
            end: project.end
        });

        return new Promise(function (resolve, reject) {
            newProject.save(function(err, result) {
                if(err) {
                    console.log(err);
                    reject({
                        message: "Database error",
                        statusCode: 500,
                        obj: err
                    });
                } else {
                    console.log(result);
                    resolve({
                        message: "Project successfully created",
                        statusCode: 201,
                        obj: result
                    });
                }
            })
        })
    },

    listProjects: function() {
        return Project
            .find()
            .populate('creator', '_id firstName lastName')
            .populate('projectTasks.requiredSkills')
            .populate('projectTasks.assignedUsers', '-password -email -__v -role')
            .exec();
    },

    getProjectById: function(id) {
        return Project
            .findById(id)
            .populate('creator', '_id firstName lastName')
            .populate('projectTasks.requiredSkills')
            .populate('projectTasks.assignedUsers', '-password -email -__v -role')
            .exec();
    },

    createProjectTask: function(id, projectTask) {
        return new Promise(function (resolve, reject) {

            Project.findById(id, function (err, project) {
                if (err) return handleError(err);

                project.projectTasks = new Project.Task({title: projectTask.title, description: projectTask.description,
                  taskSkills: projectTask.taskSkill
                });

                project.save(function (err, result) {
                    if(err) {
                        reject({
                            message: "Database error",
                            statusCode: 500,
                            obj: err
                        });
                    } else {
                        resolve({
                            message: "Project successfully created",
                            statusCode: 201,
                            obj: result
                        });
                    }
                });

            });
        });
    },

    updateProject: function(updateData) {
        updateData.projectTasks = transformProjectTaskSkills(updateData.projectTasks);

        return new Promise(function(resolve, reject) {
            Project.findByIdAndUpdate(updateData._id, { $set: updateData}, function(err, project) {
                if(err) {
                    reject({
                        message: "Database error",
                        statusCode: 500,
                        obj: err
                    });
                } else if(!project) {
                    reject({
                        message: "No project document for " + updateData._id,
                        statusCode: 404
                    })
                }
                else {
                    resolve({
                        message: "Project updated successfully"
                    });
                }
            });
        });
    },

    removeProject: function(id) {
        return new Promise(function(resolve, reject) {
            Project.findById(id, function(err, project) {
                if(err) {
                    reject({
                        message : "Database error",
                        statusCode: 500,
                        obj: err
                    });
                } else if(!project) {
                    reject({
                        message : "No project document for " + id,
                        statusCode: 404
                    });
                } else {
                    project.remove(function(err, result) {
                        if(err) {
                            reject({
                                message : "Database error",
                                statusCode: 500,
                                obj: err
                            });
                        } else {
                            resolve({
                                message : "Project deleted successfully",
                                statusCode: 200,
                                obj: result
                            });
                        }
                    });
                }

            });
        });
    }

};
