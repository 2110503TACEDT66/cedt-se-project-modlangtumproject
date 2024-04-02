
export default async function deleteSession({
  id, 
  token,
}: {
  id: string
  token: string;
}) {
  const response = await fetch(
    `https://job-fair-frontend-but-backend.vercel.app/sessions/${id}`,
    {
      method: 'DELETE',
      headers: {
        'authorization': `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error('Delete session failed');
  }
  return response.json();
}
