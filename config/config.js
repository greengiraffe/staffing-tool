let config = {

    host: "localhost:3000",

    database: {
        uri: 'localhost:27017/ixds-staffing'
    },

    jwt: {
        secret: 'faTGzyz28BvQjh4anjHgP7hcR63Vhvr9',
        expire: 7200
    },

    // --- Sessions library ---
    sessions: {
        secret: process.env.SECRET_SESSION_KEY || '6j@hPmtCE%vdrRN8YPYZCM6MLmyfUzx2',
        resave: true,
        saveUninitialized: true,
        cookie: {
            path: '/',
            httpOnly: true,
            secure: false, // TODO: Must be set to true as soon as we haved switched to https
            maxAge: null
        }
    },

    // Path for user profile pictures
    img_path: 'datastore/user_avatar'
};

module.exports = config;
