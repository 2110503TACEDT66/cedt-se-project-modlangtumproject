export default async function updateSessionById({
  token,
  session_id,
  date,
}: {
  token: string;
  session_id: string;
  date: string;
}) {
  const response = await fetch(
    `http://localhost:5000/sessions/${session_id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        date: date,
      }),
    }
  );
  console.log(response);

  if (!response.ok) {
    throw new Error('Create company failed');
  }

  return response.json();
}
