export default async function createBooking({
  company,
  date,
  token,
}: {
  company: string;
  date: string;
  token: string;
}) {
  const response = await fetch(
    'https://job-fair-frontend-but-backend.vercel.app/sessions',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        company: company,
        date: date,
      }),
    }
  );

  if (!response.ok) {
    throw new Error('Create company failed');
  }

  return response.json();
}
