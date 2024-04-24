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
    `https://modlangtum-api.vercel.app/sessions/${session_id}`,
    {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );
  console.log(response);

  if (!response.ok) {
    throw new Error('Create company failed');
  }

  return response.json();
}
