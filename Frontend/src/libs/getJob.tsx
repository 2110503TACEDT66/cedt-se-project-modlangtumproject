export default async function getJob(token: string , jid : string) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/job/${jid}`, 
    {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch all job');
    }
    return await response.json();
  }
  