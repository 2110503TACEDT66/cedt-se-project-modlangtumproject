async function forgetPassword(userEmail: string) {
  const response = await fetch(
    'http://localhost:5000/auth/forget-password',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: userEmail }),
    }
  );
  if (!response.ok) {
    throw new Error('Failed to send mail');
  }
  return await response.json();
}

export default forgetPassword;
