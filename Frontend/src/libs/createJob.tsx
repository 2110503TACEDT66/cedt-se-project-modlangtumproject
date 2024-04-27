export default async function createJob({
  job_name,
  job_description,
  salary,
  company,
  requirement,
}: {
    job_name: string;
    job_description: string;
    salary: string;
    company: string;
    requirement: string;
    }) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/job`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        name: job_name,
        desc: job_description,
        salary: salary,
        company: company,
        requirement: requirement,
        }),
    });
    
    if (!response.ok) {
        throw new Error('Create job failed');
    }
    
    return response.json();
}
