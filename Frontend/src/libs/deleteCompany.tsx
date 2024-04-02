
export default async function deleteCompany({
  id, 
  token,
}: {
  id: string
  token: string;
}) {
  const response = await fetch(
    `https://job-fair-frontend-but-backend.vercel.app/company/${id}`,
    {
      method: 'DELETE',
      headers: {
        'authorization': `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error('Delete company failed');
  }
  return response.json();
}
