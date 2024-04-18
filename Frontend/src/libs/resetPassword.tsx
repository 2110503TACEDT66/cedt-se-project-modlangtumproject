async function resetPassword(newPassword: string, resetToken: string) {
  const response = await fetch(
    `https://modlangtum-api.vercel.app/auth/reset-password/${resetToken}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: newPassword }),
    }
  );
  if (!response.ok) {
    throw new Error('Failed to reset password');
  }
  return await response.json();
}

export default resetPassword;
