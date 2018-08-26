# reminder-app
#### Reminder app helps you to stay on top of you reminders!

### Install reminder-app

To install reminder-app, consider
[the installation docs](docs/index.md#install-reminder-app).
Installing reminder-app will make it so you don't have to run
the server yourself and installation also provides a option to configure
it so reminder-app starts on machine startup for all platforms (Windows,
MacOS, and Linux). If you decide not to choose that option at first
you can later configure that by running the startup script
`node scripts/init-startup`.

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
