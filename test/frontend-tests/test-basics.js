async function add_modal_open_on_a_hotkey(page) {
  await page.type('body', 'a');
  const isOpen = await page.$eval('#add-reminder-modal', (e) => {
    return e.classList.contains('open');
  });

  assert(isOpen);
}

module.exports = {
  async puppeteerTest(page) {
    await add_modal_open_on_a_hotkey(page);
  }
};
