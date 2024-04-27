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
    //`https://modlangtum-api.vercel.app/sessions/${session_id}`
    `http://localhost:5000/sessions/${session_id}`
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
