async function getUserProfile(token: string) {
  const response = await fetch(
    'https://job-fair-frontend-but-backend.vercel.app/auth/me',
    {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error('Failed to get user profile');
  }
  return await response.json();
}

export default getUserProfile;
