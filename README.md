# IXDS_HTW_staffing-tool
Seed project for MEAN Stack. 

# Dependencies
- MongoDB
- Node v6.9.1

# Usage

`npm install`

`npm run gulp` (starts gulp for compilation, separate terminal/ command line window)

`npm start` (starts NodeJS server, separate terminal/ command line window)

## Autorestart server on file change

`npm install -g nodemon`

`nodemon start`


###Project Structure:
```
.
├── assets
│   └── app  (Angular App / TypeScript Assets)
├── bin      (Node Server Binary)
├── config   (Configuration)
│
├── public
│   ├── img
│   ├── js
│   │   ├── app     (Compiled Angular TS / created by gulp)
│   │   └── vendor  (node vendor files   / created by gulp)
│   │       
│   └── stylesheets
├── server          (express backend)
│   ├── components
│   │   └── user
│   ├── models      (database models / seeds)
│   ├── services
│   └── views       (index.hbs handlebar)
└── typings         (typescript)
```