# Reminder App Docs

Reminder App - still under development reminder app.

# Install reminder-app

Installation is pretty simple, just run the install script.
```bash
node scripts/install

# if you use git-bash for windows or not see a spinner
# on windows, you'll need to use `winpty` which is bundled with git
# If you dont use winpty the installtion will run just fine but
# the spinner we show will not output
winpty node scripts/intall
```

This will do couple of things, install npm dependencies, build
frontend assets using webpack, and run database migrations. And
start the production process manager `pm2` that will make sure the app
runs in the background, so a terminal windows does not have to be open.
By default the app starts on port `7000` you can customize this by passing
the `PORT` enviorment variable.

# Start reminder-app on machine startup

The reminder-app will run in the background, though once you shut down
your machine the reminder-app will not auto start-up. There is a way to setup
auto startup.

```bash
node scripts/init-startup
```

<!-- TODO: figure out what this does on macos -->
This scripts will print out a command to run on linux, you will
need to run it to setup auto-startup, you will likely need `sudo`
access for it to work. In windows there is nothing that needs to be done
just run the script.

### Documentation per subsystem/directory:
  * [app directory - all the backend stuff](app-directory.md)
  * [app routes](app-directory.md#routes-directory-and-adding-a-route)
  * [backend-db - models, migrations and level-uplevel](app-directory.md#models-directory)
  * [npm scripts and dependencies](npm-scripts-and-dependencies.md)
  * [node tests](node-tests.md)
  * [tools](tools.md)
  * [var directory](var-directory.md)
  * [static directory - frontend files](static-directory.md)

