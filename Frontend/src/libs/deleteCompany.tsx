export default async function deleteCompany({
  id,
  token,
}: {
  id: string;
  token: string;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/company/${id}`,
    {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error('Delete company failed');
  }
  return response.json();
}
