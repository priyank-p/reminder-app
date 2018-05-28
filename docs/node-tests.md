# Node Tests

All the node tests are located in `test` directory.
We don't use any testing frameworks like, mocha, jest or jasmine.
All the tests are run by the test runner located at `tools/run-tests`.

#### Structure of tests.

The `assert` module and `fixtures` located in `test/fixtures`
are already avaliable throught he test are not required to be `require`'ed,
because we set it to `global` in the test runner `tools/run-tests`.

The use IIFE's named with snake case that have long discriptive names such
as for eg.`test_the_function_throws_error`, inspired by [zulip](https://github.com/zulip/zulip)
or we also use js blocks `{}` to wrap the test code for simple thing as inspired by
[node's way of testing](https://github.com/nodejs/node).
