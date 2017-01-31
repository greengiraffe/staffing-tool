## IXDS HTW Staffing Tool

HTW Projekt WiSe 16/17 – IXDS Online Staffing Tool

A Student project from [HTW Berlin](https://www.htw-berlin.de) in cooperation with [IXDS](https://www.ixds.com), <br />
which is a first prototype of an online staffing tool to help with <br />
the organization of tasks in different projects including the assignment of users.

If you want to reuse the code, please ask.

<!-- TOC depthFrom:2 -->

- [Dependencies](#dependencies)
- [Usage](#usage)
  - [Autorestart server on file change](#autorestart-server-on-file-change)
  - [Project Structure](#project-structure)
  - [Troubleshooting](#troubleshooting)
- [Version control](#version-control)
  - [Commit messages](#commit-messages)
  - [Commit message format](#commit-message-format)
    - [Feature ID](#feature-id)
    - [Type](#type)
    - [Scope](#scope)
    - [Subject](#subject)
  - [Examples](#examples)
  - [Branching](#branching)
  - [Merging](#merging)
  - [Tagging](#tagging)
  - [Versioning](#versioning)

<!-- /TOC -->

## Dependencies
- MongoDB
- Node v6.9.1 (use nvm to mangage node versions)

## Usage

`npm install`

`npm run build`      (run build and file watcher)

`npm run build:prod` (run build process for production)

`npm start` (starts NodeJS server, separate terminal/ command line window)

### Autorestart server on file change

`npm install -g nodemon`

`nodemon start`


### Troubleshooting

After `npm start` an error occurs _MongoError: failed to connect to server_

> MongoDB Daemon is not running. Start with `mongod`

`mongod` doesn't work (_Data directory /data/db not found_)

> Create the missing `/data/db` directory: `sudo mkdir -p /data/db`. Set the necessary rights for the folder, for further instructions (OS X) see [Stackoverflow](https://stackoverflow.com/questions/7948789/mongodb-mongod-complains-that-there-is-no-data-db-folder)

## Version control

### Commit messages
Commit messages are inspired by the [AngularJS commit message guidelines](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit).
This enables automatic generation of the changelog from commit messages.

### Commit message format
Each commit message consists of a **featureId**, a **type**, a **scope** and a **subject**:

```
[<#featureId] <type> (<scope>) -> <subject>
```

#### Feature ID

If the Feature ID is unknown or not defined, use [#00].

#### Type

Must be one of the following:

*   **feat:** A new feature
*   **fix:** A bug fix
*   **refactor:** A code change that neither fixes a bug nor adds a feature
*   **perf:** A code change that improves performance
*   **style:** Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
*   **docs:** Documentation only changes
*   **test:** Adding missing tests
*   **chore:** Changes to the build process or auxiliary tools and libraries such as documentation generation

#### Scope

The scope could be anything specifying place of the commit change. For example $location, $browser, $compile, $rootScope, ngHref, ngClick, ngView, etc...
You can use * if there isn't a more fitting scope.

#### Subject

The subject contains short description (<50 characters) of the change:
*	use the imperative, present tense: **_"change"_** not *_"changed"_* nor *_"changes"_*
*	do not capitalize first letter
*	no dot (.) at the end

**A properly formed git commit subject line should always be able to complete the following sentence:**
*	If applied, this commit will **(your subject line here)**
*	If applied, this commit will **refactor subsystem X for readability**
*	If applied, this commit will **update getting started documentation**
*	If applied, this commit will **remove deprecated methods**
*	If applied, this commit will **release version 1.0.0**
*	If applied, this commit will **merge pull request #123 from user/branch**

### Examples

```
[#01]fix(graphite): stop graphite breaking when width < 0.1

[#00]feat(readme): add new conventions
```

### Branching

* master is the only eternal branch
* develop is branched of master and is also protected
* feature branches are branched of develop and should fullfill a feature
* the feature branches are eventually merged back to develop
* the develop branch is eventually merged back to master

### Merging

Feature branches are explicitly merged back using pull requests for code review. A local history clean-up rebase before sharing a feature branch for review is absolutely encouraged.

**How to rebase your feature branch with develop:**

```
git checkout develop        //go to develop
git pull                    //get the latest changes on develop
git checkout feature        //go back to feature branch
git rebase develop          //rebase feature with develop
git checkout develop        //go back to develop
git merge feature           //conflict-free merge of develop with feature
git push                    //push changes to servers
```

If there are rebase conflicts, resolve them. You have to add the resolved files - see it with __git status__. Finally continue rebasing with:

```
git rebase --continue
```

The Golden Rule of Rebasing: **Never rebase on a public branch such as develop or master!**

In general: **Never work directly on public branches such as develop and master, to avoid fuckups!**

### Tagging

Release branches are tagged with the version number before merging.

### Versioning

Version numbers are incremented according to [Semantic Versioning](http://semver.org/).

Given a version number [MAJOR].[MINOR].[PATCH], increment the:

1.	MAJOR version when you make incompatible API changes,
2.	MINOR version when you add functionality in a backwards-compatible manner, and
3.	PATCH version when you make backwards-compatible bug fixes.
