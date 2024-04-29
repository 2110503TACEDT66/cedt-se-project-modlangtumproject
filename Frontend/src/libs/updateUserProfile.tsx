export default async function updateUserProfile(
  name: string,
  password: string,
  token: string
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/update`,
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