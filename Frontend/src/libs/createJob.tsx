export default async function createJob({
  job_name,
  job_description,
  salary,
  company_id,
  hashtag,
  token,
}: {
  job_name: string;
  job_description: string;
  salary: string;
  company_id: string;
  hashtag: string[];
  token: string;
}) {
  try {
    // console.log(`${process.env.NEXT_PUBLIC_API_URL}/job`)
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/job`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: job_name,
        desc: job_description,
        salary: salary,
        company: company_id,
        hashtag: hashtag,
      }),
    });

    console.log(response);
    if (!response.ok) {
      throw new Error('Create job failed');
    }
    return response.json();
  } catch (error) {
    console.error('An unexpected error happened:', error);
    alert('Create failed');
  }
}
