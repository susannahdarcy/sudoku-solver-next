const userSettingsFetch = async (
  path: string,
  method: string,
  body: string
) => {
  return fetch(`http://localhost:3000/${path}`, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body,
  });
};

export { userSettingsFetch };
