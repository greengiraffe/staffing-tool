let Project = require('../../models/project');

module.exports = {

    createProject: function(project) {
        let newProject = new Project({
          title: project.title,
          description: project.description,
          type: project.type,
          client: project.client,
          budget: project.budget,
          expbudget: project.expbudget,
          priority: project.priority,
          start: project.start,
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
        return Project.find().exec();
    }

};
