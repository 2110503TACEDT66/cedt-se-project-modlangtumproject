export default async function createJob({
  job_name,
  job_description,
  salary,
  company_name,
  hashtag,
}: {
    job_name: string;
    job_description: string;
    salary: string;
    company_name: string;
    hashtag: Array<string>;
    }) {
    const response = await fetch('http://localhost:5000/job', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        job_name: job_name,
        job_description: job_description,
        salary: salary,
        company_name: company_name,
        hashtag: hashtag,
        }),
    });
    
    if (!response.ok) {
        throw new Error('Create company failed');
    }
    
    return response.json();
}
