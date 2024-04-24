export default async function updateSessionById({
  token,
  session_id,
  date,
  resume,
}: {
  token: string;
  session_id: string;
  date: string;
  resume: File | null;
}) {
  const response = await fetch(
    `https://modlangtum-api.vercel.app/sessions/${session_id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        date: date,
        resume: resume,
      }),
    }
  );
  console.log(response);

  if (!response.ok) {
    throw new Error('Create company failed');
  }

  return response.json();
}
