export default async function createBooking({
  company,
  date,
  token,
  resume,
}: {
  company: string;
  date: string;
  token: string;
  resume: File | null;
}) {
  const response = await fetch('https://modlangtum-api.vercel.app/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      company: company,
      date: date,
      resume: resume,
    }),
  });

  if (!response.ok) {
    throw new Error('Create company failed');
  }

  return response.json();
}
