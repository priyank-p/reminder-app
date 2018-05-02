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
    }, /^ArgumentRequiredError:/);
  });

  // test passing argument not described
  assert.throws(() => {
    const args = new argparser();
    args.parse(['-c', '--noargh']);
  }, /^ArgumentParsingError:/);
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

(function test_values_set() {
  const args = new argparser();
  args.add('--one');
  args.add('--two');
  args.parse(['--one=one_value', '--two', 'two_value']);

  assert.deepStrictEqual(args.one, 'one_value');
  assert.deepStrictEqual(args.two, 'two_value');
})();

(function test_nargs() {
  const args = new argparser();
  const nargs = ['one', 'two', 'three'];
  args.parse(nargs);
  assert.deepStrictEqual(args.nargs, nargs);
})();
