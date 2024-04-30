export default async function createBooking({
  company,
  job,
  date,
  token,
  resume,
}: {
  company: string;
  job: string;
  date: string;
  token: string;
  resume: File | null;
}) {
  const formData = new FormData();
  formData.append('company', company);
  formData.append('job', job);
  formData.append('date', date);
  formData.append('resume', resume as Blob);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sessions`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Create session failed');
  }

  console.log(response);

  return response.json();
}
