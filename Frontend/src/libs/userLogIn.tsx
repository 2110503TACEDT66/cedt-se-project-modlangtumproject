async function userLogIn(userEmail: string, userPassword: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
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
  } catch (error) {
    return null;
  }
}

export default userLogIn;
