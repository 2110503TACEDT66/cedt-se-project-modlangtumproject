export default async function getSession(token: string) {
  const response = await fetch('http://localhost:5000/sessions', {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Cannot get sessions');
  }

  return await response.json();
}
