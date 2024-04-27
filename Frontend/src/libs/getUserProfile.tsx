async function getUserProfile(token: string) {
  const response = await fetch('http://localhost:5000/auth/me', {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to get user profile');
  }
  return await response.json();
}

export default getUserProfile;
