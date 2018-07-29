const defaultPostHeaders: object = {
  'Content-Type': 'application/json'
};

function handleError(res: Response): Promise<any> {
  return res.text()
    .then(text => {
      throw new Error(text);
    });
}

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
        return handleError(res);
      }

      return res;
    });

  return request;
}

export function get(url: string | Request, opts?: RequestInit): Promise<Response> {
  return fetch(url, opts)
    .then(res => {
      if (!res.ok) {
        return handleError(res);
      }

      return res;
    });
}
