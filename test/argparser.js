const argparser = require('../rapp/argparser');

// Test all the errors thrown
{
  // test no required passed in
  const errorData = [
    ['--one', { required: true }, []],
    ['--two', { required: true, alias: '-t' }, []],
    ['--three', { required: true, alias: '-t' }]
  ];
  errorData.forEach(([arg, opts, argv]) => {
    assert.throws(() => {
      const args = new argparser();
      args.add(arg, opts);
      args.parse(argv);
    });
  });

  // test passing argument not described
  assert.throws(() => {
    const args = new argsparser();
    args.parse(['-c', '--noargh']);
  });
}

(function test_dest_option() {
  const args = new argparser();
  args.add('--dest', { dest: 'new-dest' });
  args.parse(['--dest', 'destination']);

  assert.deepStrictEqual(args['dest'], undefined);
  assert.deepStrictEqual(args['new-dest'], 'destination')
})();

(function test_type_bool() {
  const args = new argparser();
  args.add('--bool', { type: 'boolean' });
  args.add('--another', { alias: '-a', type: 'boolean' });
  args.add('--third-one', { alias: '-t', type: 'boolean', dest: 'third' });
  args.parse(['--bool', '-a']);

  assert.deepStrictEqual(args.bool, true);
  assert.deepStrictEqual(args.another, true);
  assert.deepStrictEqual(args.third, false);
})();
