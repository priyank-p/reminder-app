const defaultPostHeaders: object = {
  'Content-Type': 'application/json'
};

export function post(url: string, opts?): Promise<Response> {
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

  const request = fetch(url, requestData)
    .then((res) => {
      if (!res.ok) {
        throw Error();
      }

      return res;
    });

  return request;
}
