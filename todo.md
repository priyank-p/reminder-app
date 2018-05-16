# Todo list for the project.

- [ ] After thinking about the first model, we will need a settings
      page to customize diffrent stuff, ie alert types though not everything
      should be in settings or in working order until proper backend db is set.
- [ ] Add backend database for reminders:
        It would have to be leveldb since other requires a db service running
        on one's computer, a jsondb would be suffice though level is written in c++ and
        is faster than any other node based json db, for simplicty and quick devlopment the
        decided db of choice is `LevelDB`
- [ ] Since leveldb is now to our db service, it needs promise support and error handling.
- [ ] Add hotkeys for all the thing you can do
- [ ] Add push notification support for due notifications.
- [ ] Setup rate limiting for request (express-rate-limiting)
- [ ] Add babel in middle for transpling down to es5
- [ ] Add post-css for automatic css vendors
- [ ] Use strongloop or any other process manager for running express process
- [ ] Help Tutorial
- [ ] Favicon for reminder app
- [ ] logos for reminder app
- [ ] better debug logging usign debug module
- [ ] Use the debug module in browser for debugging and:
        Automatically pass `<script>localStorage.debug = {theEnvDebugVariable}`
        for browser debugging. It will also pretty print in browser with is great.
- [ ] Internal stuff - Make argparser automactically create help for each argument
      By the help opt passed.
- [ ] Revise all the security and best pratices from express website
- [ ] Revisit the design of the page and improve
- [ ] Revist js file and tests
- [ ] Setup test that can run in browser using karma.
- [ ] Design a way, so a user can configure diffrent thing
- [ ] Maybe then provide /settings page to configure that
- [ ] Use a service-worker
- [ ] Improve performace on backend
- [ ] Improve css performance, i.e painting reflows
- [ ] Improve and check backend perf by checking time for a request route,
    and database query's.
- [ ] Lastly re-ogranize parts of code base and refactor.

(As of writing Saturday May 14, 2018, it looks like a lot still needs to be done
even after 64 commits.)

### General plan

By the time most of the things in to-do list are implemented
push the code to github with this additonal steps:
  - Setup linting (..no linting yet for simplicity ..or perhaps lazyness)
  - Setup CI Testing
  - Add a readme
  - Add docs (Yep, the biggest thing to do..)
