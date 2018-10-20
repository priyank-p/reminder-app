# reminder-app

#### Reminder app helps you to stay on top of you reminders!

Reminder app runs locally on a server listening on the
port you can configure during installation. With a use
of a process manager, `pm2`, it can also start reminder-app
during your machine startup (we support all platform
Linux, Windows, and MacOS).

Reminder app allows you to setup up reminders and can notify you,
when they are due, using web push notifications. The notification only
works if the browser is open, however, the reminder-app tab does not need to
be open to get those notifications. We also plan to write an extension
in near feature so you can add reminder's easily.

  * [Install reminder app](#install-reminder-app)
  * [Installing using docker](#docker-installation)
  * [Upgrading reminder-app](#upgrading-reminder-app)
  * [Devlopement - Running the dev server](#running-the-dev-server)

Useful documentation about [managing reminder-app is in `docs/index.md`](docs/index.md).
You can also checkout other documentation in [`docs/` directory](docs/)

To quickly test reminder-app out online we do have the project hosted on [glitch](https://glitch.com),
visit https://reminder-app.glitch.me/ to quickly test it out! Glitch does take some time to start up
so expect couple of seconds of waiting time. If you suspect that hosted app on glitch
is not up to date or doesn't work open an issue or post this at https://reminder-app.zulipchat.com and
we will fix it.

To provide feedback or get support we have a [reminder-app zulip server](https://reminder-app.zulipchat.com),
we recommend that you do join the reminder-app zulip server, introduce your self at
[#new-members stream](https://reminder-app.zulipchat.com/#narrow/stream/141123-new-members) and/or use the
[#test-stream](https://reminder-app.zulipchat.com/#narrow/stream/141125-test-stream) to try out zulip
and it's great thread modal (works really well!).

# Install reminder-app

Installing reminder-app will make it so you don't have to run
the server yourself (manually in a terminal or keep the terminal open to run the reminder-app!)
and installation also provides a option to configure
it so reminder-app starts on machine startup for all platforms (Windows,
MacOS, and Linux). If you decide not to choose that option at first
(during installation) you can later configure that by running the startup script
`node scripts/init-startup`. You can also start reminder-app manually by running
`node scripts/start`.

Installation is pretty simple, just run the install script:
```bash
node scripts/install

# if you use git-bash for windows or not see a spinner
# on windows, you'll need to use `winpty` which is bundled with git
# If you don't use winpty the installtion will run just fine but
# the spinner we show will not output
winpty node scripts/install
```

Installation script will do couple of things: install npm dependencies, build
frontend assets using webpack, and run database migrations. It also
starts the production process manager `pm2` that will make sure the app
runs in the background, so a terminal windows does not have to be open.

# Docker Installation

You can also install reminder-app using docker:
```bash
# build the reminder-app docker image
[sudo] docker build -t reminder-app .

# run the image; can be accessed through port 7000.
[sudo] docker run -p 7000:7000 -d reminder-app
```

Eventhough, you can install using docker you can't have
the start on machine startup feature of reminder-app unless
you [install reminder-app directly on you machine](#install-reminder-app).
If you don't want that feature and prefer docker this option
is for you and it is like running `node script/start` to start
reminder-app when you need it.

### Upgrading reminder-app

To upgrade reminder-app you'll need to fetch the latest
code from github. Pulling latest code does not upgrade the
reminder-app. To finish the upgrade run the upgrade script
`node scripts/upgrade` to finish the upgrade. It will involve
minor downtime (it yet needs some optimizations!).

```bash
# for to example upgrading to a specific tag v1.0.0-beta
# fetch all remote refs.
git fetch --all

# checkout out to sepecific tag
git checkout v1.0.0-beta

# run the upgrade script
node scripts/upgrade
```

### Running the dev-server

Install the npm dependencies using `npm i` if you haven't already then:
```bash
node tools/dev-server

# if you are using windows we recommend using `winpty`
# otherwise Ctrl+C does not kill dev-server depending on what you are
# using (specially git-bash for windows)
winpty node tools/dev-server

# if on unix you can also do, which works for almost
# most of our tools in tools/
./tools/dev-server
# or
tools/dev-server
```

The dev server by default runs on `localhost:7213`, you can
customize this by setting the `PORT` enviorment variable to
whatever you want instead. And also note that there is also
webpack-dev-server that gets started when you run the dev-server
by default it will start on port `7214` or on the next port of (if
specified) `PORT`.
