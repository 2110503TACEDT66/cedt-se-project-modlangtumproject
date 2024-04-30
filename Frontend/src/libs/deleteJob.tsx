export default async function deleteJob({ job_id, token }: { job_id: string; token: string; }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/job/${job_id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Delete job failed');
  }

  return response.json();
}