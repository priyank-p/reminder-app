# Reminder App Docs

Reminder App - still under development reminder app.

# Install reminder-app

Installation is pretty simple, just run the install script.
```bash
node scripts/install

# if you use git-bash for windows or loading screen does now
# show up on windows, use `winpty` which is bundled with git
winpty node scripts/intall
```

This will do couple of things, install npm dependencies, build
frontend assets using webpack, and run database migrations. And
start the production process manager `pm2` that will make sure the app
runs in the background, so a terminal windows does not have to be open.
By default the app starts on port `7000` you can customize this by passing
the `PORT` enviorment variable.

### Documentation per subsystem/directory:
  * [app directory - all the backend stuff](app-directory.md)
  * [app routes](app-directory.md#routes-directory-and-adding-a-route)
  * [backend-db - models, migrations and level-uplevel](app-directory.md#models-directory)
  * [npm scripts and dependencies](npm-scripts-and-dependencies.md)
  * [node tests](node-tests.md)
  * [tools](tools.md)
  * [var directory](var-directory.md)
  * [static directory - frontend files](static-directory.md)

