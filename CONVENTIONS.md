# ixds-staffing
HTW Projekt WiSe 16/17 – IXDS Online Staffing Tool

## Version control
### Commit messages
Commit messages are formatted according to [AngularJS commit message guidelines](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit).
This enables automatic generation of the changelog from commit messages.
#### Commit message format
Each commit message consists of a **_header_**, a **_body_** and a **_footer_**. The header has a special format that includes a **type**, a **scope** and a **subject**:
```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```
The header is mandatory and the scope of the header is optional.
##### Type (required)
Must be one of the following:

*	**feat:**A new feature
*	**fix:**A bug fix
*	**refactor:**A code change that neither fixes a bug nor adds a feature
*	**perf:** A code change that improves performance
* **style:** Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
*	**docs:** Documentation only changes
*	**test:** Adding missing tests
*	**chore:** Changes to the build process or auxiliary tools and libraries such as documentation generation

##### Scope
The scope could be anything specifying place of the commit change. For example $location, $browser, $compile, $rootScope, ngHref, ngClick, ngView, etc...
You can use * if there isn't a more fitting scope.

##### Subject (required)
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

##### Body
Just as in the subject, use the **imperative**, **present** tense: "change" not "changed" nor "changes". The body should include the motivation for the change and contrast this with previous behavior. Focus on **what** and **why** vs how.
#### Footer
The footer is the place to reference issues that this commit closes.
```
fix(graphite): stop graphite breaking when width < 0.1

Closes #28
```
### Branching
*	master is the only eternal branch
* develop is branched of master and is also protected
* create a branch for each story
* story branches are branched (forked) of develop and fulfill a user story
*	naming of story branches:
    ```
    <IssueID>-<user type>-<keyword>-<keyword(optional)>- story

    ```
    ```
    28-user-profile-picture-story

    ```
* story branches always have 2 subbranches:


```
<IssueID>-<user type>-<keyword>-<keyword(optional)>-frontend
<IssueID>-<user type>-<keyword>-<keyword(optional)>-backend

```
```
28-user-profile-picture-frontend
28-user-profile-picture-backend

```
* the subbranches are eventually merged back to the issue branch
* the issue branches are eventually merged back to develop
* the develop branch is eventually merged back to master

### Merging
Feature branches are explicitly merged back using pull requests for code review. A local history clean-up rebase before sharing a feature branch for review is absolutely encouraged.


**How to rebase your feature branch with develop:**
```
git checkout develop
git pull
git checkout feature
git rebase develop
git checkout develop
git merge
git push
```
**If there are rebase conflicts, resolve them then continue rebasing with:**
```
git rebase --continue
```
**The Golden Rule of Rebasing: Never rebase on a public branch such as develop or master!**


**In general: Never work directly on public branches such as develop and master, to avoid fuckups!**
### Tagging
Release branches are tagged with the version number before merging.
### Versioning
Version numbers are incremented according to [Semantic Versioning](http://semver.org/).


Given a version number [MAJOR].[MINOR].[PATCH], increment the:


1.	MAJOR version when you make incompatible API changes,
2.	MINOR version when you add functionality in a backwards-compatible manner, and
3.	PATCH version when you make backwards-compatible bug fixes.
