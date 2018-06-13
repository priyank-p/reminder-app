# reminder-app
Work In Progress - Reminder App

### Running the dev-server

Install the npm dependencies using `npm i` if you haven't already then:
```bash
node tools/dev-server

# if on unix you can also do, which works for almost
# most of our tools in tools/
./tools/dev-server
```

The dev server by default runs on `localhost:7213`, you can
customize this by setting the `PORT` enviorment variable to
whatever you want instead. And a sidenote there is also
webpack-dev-server that gets started when you run the dev-server
by default it will start on port `7214` or on the next port of (if
specified) `PORT`.
