export default async function getSession(token: string, id: string) {
  const response = await fetch(
    `https://job-fair-frontend-but-backend.vercel.app/sessions/${id}`,
    {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error('Cannot get sessions');
  }

  return await response.json();
}
