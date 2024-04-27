export default async function deleteSession({
  id,
  token,
}: {
  id: string;
  token: string;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/sessions/${id}`,
    {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error('Delete session failed');
  }
  return response.json();
}
