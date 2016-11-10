let config = {
    database: {
        uri: 'localhost:27017/ixds-staffing'
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
};

module.exports = config;
