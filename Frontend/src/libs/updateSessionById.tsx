export default async function updateSessionById({
  token,
  session_id,
  date,
  resume,
}: {
  token: string;
  session_id: string;
  date: string;
  resume: File;
}) {
  const formData = new FormData();
  formData.append('date', date);
  formData.append('resume', resume);
  
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/sessions/${session_id}`
    ,
    {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error('Update session failed');
  }

  return response.json();
}
