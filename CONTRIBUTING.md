# Contributing to reminder-app

Before you start contributing to this project we recommend you
join the reminder-app zulip server at https://reminder-app.zulipchat.com
and introduce youself at the [#new-members stream](https://reminder-app.zulipchat.com/#narrow/stream/141123-new-members) if you haven't already.

The below documentation should help you contributing to this project
if you are not familir with git or git command line.

## 1. Fork and Clone and Install Dependencies
First you should fork this repository on github using the fork button on the top right corner.
Then you should clone your forked repository locally by (replace `<Your-GitHub-Username>` with your username):
```bash
git clone https://github.com/<Your-GitHub-Username>/reminder-app.git
cd reminder-app
git remote add upstream https://github.com/priyankp10/reminder-app.git
```

Then install npm dependencies by running `npm i`. Once that's done you can run
the dev-server using `node tools/dev-server`.

## 2. Branch
Create a branch and make some changes:
```bash
git branch my-branch-name
git checkout my-branch-name
```

## 3. Commit
```bash
git commit -m "commit message here"
```

## Rebasing
Updating your local fork in important to make sure you are always up-to-date with
the current state of repo, and you should do often or before you make a PR.
```
git fetch upstream
git rebase upstream/master

# or 
git pull upstream master --rebase
```

### Commit Message Guidelines
Start the commit message with a subsystem, and have a good summary of changes
followed by a colon after subsystem.
If you're working on an issue, add `Fixed #<issue-number>` to the commit message's
description so that respective issue is closed once you commits are merged into master.

Good commit messages:
- `css: fix broken add reminder modal.`
- `app: use column css layout for better organizing the reminders.`

Bad commit messages:
- `Fixed #1`

## 4. Pull Request

Make a pull request by going to [reminder-app](https://github.com/priyankp10/reminder-app),
press "New pull request", add a title and a description and wait for the owner to
merge or close your PR.
