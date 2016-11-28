let Project = require('../../models/project');

module.exports = {

    createProject: function(name) {
        let project = new Project({
          name: name
        });

        return new Promise(function (resolve, reject) {
            project.save(function(err, result) {
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
    }

};
