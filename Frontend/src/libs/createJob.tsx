export default async function createJob({
  job_name,
  job_description,
  salary,
  company_name,
  hashtag,
  token,
}: {
    job_name: string;
    job_description: string;
    salary: string;
    company_name: any;
    hashtag: string[];
    token: string;
    }) {
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
        company: company_name,
        hashtag: hashtag,
        }),
    });
    
    if (!response.ok) {
        throw new Error('Create job failed');
    }
    
    return response.json();
}
