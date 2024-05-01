async function getUserProfile(token: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  try{
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to get user profile');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default getUserProfile;
