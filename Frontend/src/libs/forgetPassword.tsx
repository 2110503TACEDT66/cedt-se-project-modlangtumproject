async function forgetPassword(userEmail: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/forget-password`,
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
