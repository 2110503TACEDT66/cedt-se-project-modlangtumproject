export default async function getSession(token: string, id: string) {
  const response = await fetch(
    `https://modlangtum-api.vercel.app/sessions/${id}`
    //`http://localhost:5000/sessions/${id}
    ,{
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
