# Contributing to reminder-app
Follow this guide to contribute to reminder-app.

## 1. Clone
Start by cloning the repository:
```bash
git clone https://github.com/priyankp10/reminder-app
cd reminder-app
```

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
