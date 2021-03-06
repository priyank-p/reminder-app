# Reminder App Docs

# Start reminder-app on machine startup

The reminder-app will run in the background, though once you shut down
your machine the reminder-app will not auto start-up. There is a way to setup
auto startup.

```bash
node scripts/init-startup
```

This script on linux and macos will run a command outputted by pm2,
which is needed to configure auto-startup,
which will likely need `sudo` access to configure the startup system.
(Note: You do not need to run this script with `sudo`).
Window has the easiest setup just run the script, then to ensure the
app will start on boot type `startup` in the search bar and then look for reminder app
if the status says it disabled right click on it and enable it.

You can also do it manually by running `pm2 startup` and following its instructions, though this
command does not work on windows hence windows user need to run the script.

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

# Stop reminder-app
To stop reminder app run the stop script. It will stop the running
reminder-app process.
```bash
node scripts/stop
```

### Documentation per subsystem/directory:
  * [Some info about the reminder-app](about.md)
  * [App directory - all the backend stuff](app-directory.md)
  * [App routes](app-directory.md#routes-directory-and-adding-a-route)
  * [Backend-db - models, migrations and level-uplevel](app-directory.md#models-directory)
  * [npm scripts and dependencies](npm-scripts-and-dependencies.md)
  * [node tests](node-tests.md)
  * [tools](tools.md)
  * [var directory](var-directory.md)
  * [static directory - frontend files](static-directory.md)

