import React from 'react';

export default async function userRegister({
  name,
  email,
  password,
  tel,
  profile,
}: {
  name: string;
  email: string;
  password: string;
  tel: string;
  profile?: string | null;
}) {
  const response = await fetch(
    'https://job-fair-frontend-but-backend.vercel.app/auth/register',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        tel: tel,
        profile: profile,
      }),
    }
  );

  if (!response.ok) {
    throw new Error('Registration failed');
  }

  return response.json();
}
