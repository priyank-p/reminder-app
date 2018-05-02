const argparser = require('../rapp/argparser');

{
  // Test all the errors thrown
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
    }, /^Error: ArgumentRequiredError/);
  });

  // test passing argument not described
  assert.throws(() => {
    const args = new argparser();
    args.parse(['-c', '--noargh']);
  }, /^Error: ArgumentParsingError/);
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
