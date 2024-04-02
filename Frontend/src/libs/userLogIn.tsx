async function userLogIn(userEmail: string, userPassword: string) {
  const response = await fetch(
    'https://job-fair-frontend-but-backend.vercel.app/auth/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: userEmail, password: userPassword }),
    }
  );
  if (!response.ok) {
    throw new Error('Failed to log in');
  }
  return await response.json();
}

export default userLogIn;
