export default async function getSession(token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/sessions`
    , {
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
