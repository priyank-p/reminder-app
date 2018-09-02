# Reminder App Docs

Reminder app runs locally on a server listening on the
port you can configure during installation. With a use
of a process manager, `pm2`, it can also start reminder-app
during your machine startup (we support all platform
Linux, Windows, and MacOS).

Reminder app allows you to setup up reminders and can notify you
when they are due using a web push notifications. The notification only
works if the browser is open, however, the reminder-app tab does not need to
be open to get those notifications. We also plan to write an extension
in near feature so you can enter reminder as easily as possible.

# Install reminder-app

Installation is pretty simple, just run the install script.
```bash
node scripts/install

# if you use git-bash for windows or not see a spinner
# on windows, you'll need to use `winpty` which is bundled with git
# If you dont use winpty the installtion will run just fine but
# the spinner we show will not output
winpty node scripts/install
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

This script other than running `pm2` commands on linux, macos will run a command
outputted by pm2 which will likely need `sudo` access to configure the startup system.
(Note: You do not need to run this script with `sudo`).
Window has the easiest setup just run the script, then to ensure the
app will start on boot type `startup` in the search bar and then look for reminder app
if the status says it disabled right click on it and enable it.

# Manually starting reminder-app

You can also manually start the reminder-app using `pm2`.
```bash
node scripts/start 

# or
npx pm2 start app --name reminder-app
```

# Stop running the reminder-app on startup:
To stop, or to reverse, the `script/startup` script you can run the
`unstartup` script:
```bash
node scripts/unstartup
```

### Documentation per subsystem/directory:
  * [More information about managing reminder-app](management.md)
  * [Some info about the reminder-app](about.md)
  * [App directory - all the backend stuff](app-directory.md)
  * [App routes](app-directory.md#routes-directory-and-adding-a-route)
  * [Backend-db - models, migrations and level-uplevel](app-directory.md#models-directory)
  * [npm scripts and dependencies](npm-scripts-and-dependencies.md)
  * [node tests](node-tests.md)
  * [tools](tools.md)
  * [var directory](var-directory.md)
  * [static directory - frontend files](static-directory.md)

