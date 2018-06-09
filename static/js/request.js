const defaultPostHeaders = {
  'Content-Type': 'application/json'
};

export function post(url, opts) {
  if (typeof opts.body === 'object') {
    opts.body = JSON.stringify(opts.body);
  }

  const requestData = {
    ...{
      method: 'POST',
      headers: defaultPostHeaders
    },
    ...opts
  };

  return fetch(url, requestData);
}
