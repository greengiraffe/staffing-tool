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
            status: task.status,
            requiredSkills: task.requiredSkills.map(skill => skill._id),
            assignedUsers: task.assignedUsers,
            interestedUsers: task.interestedUsers
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
                    reject(err);
                } else {
                    resolve(result);
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
            .populate('projectTasks.interestedUsers', '-password -email -__v -role')
            .exec();
    },

    getProjectById: function(id) {
        return Project
            .findById(id)
            .populate('creator', '_id firstName lastName')
            .populate('projectTasks.requiredSkills')
            .populate('projectTasks.assignedUsers', '-password -email -__v -role')
            .populate('projectTasks.interestedUsers', '-password -email -__v -role')
            .exec();
    },

    createProjectTask: function(id, projectTask) {
        return new Promise(function (resolve, reject) {

            Project.findById(id, function (err, project) {
                if (err) return handleError(err);

                project.projectTasks = new Project.Task({
                    title: projectTask.title,
                    description: projectTask.description,
                    status: projectTask.status,
                    taskSkills: projectTask.taskSkill
                });

                project.save(function (err, result) {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });

            });
        });
    },

    removeProjectTask: function(projectId, projectTask) {
        return new Promise(function (resolve, reject) {
            Project.update(
              { '_id' : projectId },
              { $pull: { 'projectTasks': { _id: projectTask._id } } },
              { safe : true },
              function callback(err, result) {
                  if(err) {
                      reject({statusCode: 500, result: err});
                  } else if(result.nModified == 0) {
                      reject({
                          message: "No matching documents",
                          statusCode: 400
                      });
                  } else {
                      resolve(result);
                  }
              } )
        });
    },

    updateProjectTask: function(projectId, projectTask) {
        return new Promise(function (resolve, reject) {
            Project.update(
              { 'projectTasks._id' : projectTask._id },
              { $set: { 'projectTasks.$': projectTask } },
              { safe : true },
              function callback(err, result) {
                  if(err) {
                      reject({statusCode: 500, result: err});
                  } else if(result.nModified == 0) {
                      reject({
                          message: "No matching documents",
                          statusCode: 400
                      });
                  } else {
                      resolve(result);
                  }
              } )
        });
    },

    /**
     * Update Task Status
     * @param id of task
     * @param status can be 'upcoming', 'rejected', 'progress', 'done'
     * @returns {Promise|Promise<T>}
     */
    updateTaskStatus: function(id, status) {
        return new Promise(function (resolve, reject) {
            Project.findByIdAndUpdate(id, {status: status}, function(err, result) {
                if(err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },

    updateProject: function(updateData) {
        updateData.projectTasks = transformProjectTaskSkills(updateData.projectTasks);

        return new Promise(function(resolve, reject) {
            Project.findByIdAndUpdate(updateData._id, { $set: updateData}, function(err, project) {
                if(err) {
                    reject({statusCode: 500, obj: err});
                } else if(!project) {
                    reject({
                        message: "No project document for " + updateData._id,
                        statusCode: 400
                    })
                }
                else {
                    resolve(project);
                }
            });
        });
    },

    removeProject: function(id) {
        return new Promise(function(resolve, reject) {
            Project.findById(id, function(err, project) {
                if(err) {
                    reject({statusCode: 500, obj: err});
                } else if(!project) {
                    reject({
                        message : "No project document for " + id,
                        statusCode: 400
                    });
                } else {

                    project.remove(function(err, result) {
                        if(err) {
                            reject({statusCode: 500, obj: err});
                        } else {
                            resolve(result);
                        }
                    });

                }
            });
        });
    }

};
