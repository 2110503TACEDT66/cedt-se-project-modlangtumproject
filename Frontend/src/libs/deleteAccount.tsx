export default async function deleteAccount({
    id, 
    token,
  }: {
    id: string,
    token: string
  }) {
    const response = await fetch(
      `http://localhost:5000/auth/delete/${id}`,
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
  