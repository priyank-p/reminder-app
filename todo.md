# Todo list for the project.

- [ ] After thinking about the first model, we will need a settings
      page to customize diffrent stuff, ie alert types though not everything
      should be in settings or in working order until proper backend db is set.
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
- [ ] Allow a user to add comment on a reminder, this will be a awesome!
- [ ] Make the reminder due date picker smarter.
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
- [ ] Lastly re-ogranize parts of code base and refactor.

(As of writing Saturday May 14, 2018, it looks like a lot still needs to be done
even after 64 commits.)

### General plan

By the time most of the things in to-do list are implemented
make this repo privte on github with this additonal steps:
  - Setup linting (..no linting yet for simplicity ..or perhaps lazyness)
  - Setup CI Testing
  - Add a readme
  - Add docs (Yep, the biggest thing to do..)
