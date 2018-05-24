function get(url, headers = {}) {
  const request = new Request(url, {
    method: 'GET',
    headers: new Headers(headers)
  });

  return fetch(request);
}

const defaultPostHeaders = {
  'Content-Type': 'application/json'
};

function post(url, body, _headers = {}) {
  const headers = { ...defaultPostHeaders, ..._headers };
  const request = new Request(url, {
    method: 'POST',
    headers: new Headers(headers),
    body: JSON.stringify(body)
  });

  return fetch(request);
}

module.exports = {
  post,
  get
};
