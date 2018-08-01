async function test_add_reminder_route() {
  const url = '/api/reminders/add';
  const reminder = {
    title: 'Test Reminder',
    reminder: 'Test Reminder Body',
    due_date: new Date('January 12 2018')
  };

  await request.post(url, { body: reminder });
  const allReminders = await reminders.getReminders();
  const addedReminder = allReminders[allReminders.length - 1];
  assert.deepStrictEqual(addedReminder.title, reminder.title);
  assert.deepStrictEqual(addedReminder.reminder, reminder.reminder);
  assert.deepStrictEqual(addedReminder.due_date, reminder.due_date);

  await assertPromiseThrows(async () => {
    await request.post(url, { body: {} });
  }, /^Error: Reminder must be passed in!$/);

  await assertPromiseThrows(async () => {
    await request.post(url, {
      body: { invalidRequest: true }
    });
  }, /^Error: Incorrect reminder provided$/);
}

async function test_reminders_all_route() {
  const url = '/api/reminders/all';
  await reminders.addReminder({
    title: 'Just Another Reminder For Test',
    reminder: 'Test Reminder for testing /reminders/all',
    due_date: new Date('January 12 1999')
  });

  // we test the json here, since parsed json object seems to have
  // date not tranformed in actual one
  const actual = await request.get(url).then(r => r.text());
  const expected = JSON.stringify(await reminders.getReminders());
  assert.deepEqual(actual, expected);
}

async function test_delete_reminder_route() {
  const reminder = {
    title: 'Test',
    reminder: 'test'
  };

  const id = await reminders.addReminder(reminder);

  let url = `/api/reminders/delete/${id}`;
  await request.post(url, { method: 'DELETE' });
  assert.deepStrictEqual(await reminders.getReminderById(id), undefined);

  const allArchives = await archives.getArchives();
  const archive = allArchives.filter(archive => {
    return (archive.reminder.id === id);
  })[0];

  assert.deepStrictEqual(archive.reminder.title, reminder.title);
  assert.deepStrictEqual(archive.reminder.reminder, reminder.reminder);

  url = '/api/reminders/delete/ERROR';
  await assertPromiseThrows(async () => {
    await request.post(url, { method: 'DELETE' });
  }, /^Error: Reminder id to delete must be passed in, and must be valid integer$/);

  url = '/api/reminders/delete/89342839489324';
  await assertPromiseThrows(async () => {
    await await request.post(url, { method: 'DELETE' });
  }, /^Error: Cannot delete reminder with id:/);
}

async function test_update_reminder_route() {
  const id = await reminders.addReminder({
    title: 'Update Me',
    reminder: 'Test Updating reminder route!'
  });

  const updatedReminder = {
    title: 'Update Me (updated)',
    reminder: 'Updated Test Passed!'
  };

  let url = `/api/reminders/update/${id}`;
  await request.post(url, { body: updatedReminder });

  const actual = await reminders.getReminderById(id);
  assert.deepEqual(actual.title, updatedReminder.title);
  assert.deepEqual(actual.reminder, updatedReminder.reminder);

  url = '/api/reminders/update/ERROR';
  await assertPromiseThrows(async () => {
    await request.post(url, { body: {} });
  }, /^Error: Reminder id to delete must be passed in/);

  url = '/api/reminders/update/2323132';
  await assertPromiseThrows(async () => {
    await request.post(url, { body: {} });
  }, /^Error: Reminder must be passed in!$/);

  await assertPromiseThrows(async () => {
    await request.post(url, {
      body: {
        das: 'sd',
        ads: 'dsdasd'
      }
    });
  }, /^Error: Cannot update reminder with id:/);
}

async function test_all_archives_route() {
  const url = '/api/archives/all';
  const allArchives = await archives.getArchives();
  const actual = await request.get(url).then(r => r.text());
  assert.deepStrictEqual(JSON.stringify(allArchives), actual);
}

async function test_get_archive_by_id_route() {
  const reminderId = await reminders.addReminder({
    title: 'test archives',
    reminder: 'archives'
  });

  const archiveId = await archives.archive(reminderId);
  let url = `/api/archives/${archiveId}`;

  const expected = await archives.getArchiveById(archiveId);
  const actual = await request.get(url).then(r => r.text());
  assert.deepEqual(JSON.stringify(expected), actual);

  url = '/api/archives/ERROR';
  await assertPromiseThrows(async () => {
    await request.get(url);
  }, /^Error: A valid id must be passed in!$/);

  url = '/api/archives/12390123';
  await assertPromiseThrows(async () => {
    await request.get(url);
  }, /^Error: No archive with id: \d+.$/);
}

async function test_delete_archive_route() {
  const reminderId = await reminders.addReminder({
    title: 'Title',
    reminder: 'Reminder'
  });

  const archiveId = await archives.archive(reminderId);
  const url = `/api/archives/delete/${archiveId}`;
  await request.post(url, { method: 'DELETE' });
  await assertPromiseThrows(async () => {
    await archives.getArchiveById(archiveId);
  }, /^Error: No archive with id: 2.$/);
}

async function api_tests() {
  await test_add_reminder_route();
  await test_reminders_all_route();
  await test_delete_reminder_route();
  await test_update_reminder_route();
  await test_all_archives_route();
  await test_get_archive_by_id_route();
  await test_delete_archive_route();
}

module.exports = api_tests;
