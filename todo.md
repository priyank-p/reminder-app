# Todo list for the project.

- [ ] Add add reminder modal
- [ ] Add design and component for showing added reminders

  Expanding the todo, so for reminder the model should
  could add a reminder, it could have a deadline/due date or time.
  since the due date is optional people could set up stuff just to reminde
  them about something like, something they need to do everyday.

    - Model for it there is a due data:
      If there is a due date, send them desktop notification,
      If the tab is open, send out a alert tone,
      Highlight the reminder that will be due in 10 mins.

    - Model for thing thats don't have a set due date
      If this is something that they need to get remided on a specific
      day, or date then allow them to mark it done, on the day if the app
      is opened for the first time alert them about the reminder by design.

  Further expanding point one:
    - The due date picker should be a smart dropdown, It should have
    weekday, Monday, Tuesday... and a search bar to search stuff, along with that
    it should also have a input for inputing a date. The goal is make it short simple, easy and
    quick to use.

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
