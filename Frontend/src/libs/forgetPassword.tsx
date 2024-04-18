async function forgetPassword(userEmail: string) {
    const response = await fetch(
      'https://job-fair-frontend-but-backend.vercel.app/auth/forget-password',
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
  