export default async function deleteAccount({
    id, 
    token,
  }: {
    id: string
    token: string;
  }) {
    const response = await fetch(
      `https://job-fair-frontend-but-backend.vercel.app/auth/delete`,
      {
        method: 'DELETE',
        headers: {
          'authorization': `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error('Delete account failed');
    }
    return response.json();
  }
  