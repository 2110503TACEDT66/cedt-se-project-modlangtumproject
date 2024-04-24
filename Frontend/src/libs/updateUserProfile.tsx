export default async function updateUserProfile(
  name: string,
  password: string,
  token: string
) {
  const response = await fetch(
    //`https://job-fair-frontend-but-backend.vercel.app/auth/update`,

    'http://modlangtum-api.vercel.app/auth/update',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        password: password,
      }),
    }
  );
  if (!response.ok) {
    throw new Error('Update User proflie failed');
  }
  return response.json();
}
