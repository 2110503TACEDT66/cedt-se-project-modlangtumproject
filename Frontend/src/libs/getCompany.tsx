export default async function getCompany(token: string, id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/company/${id}`,
    {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error('Failed to fetch company');
  }
  return await response.json();
}
