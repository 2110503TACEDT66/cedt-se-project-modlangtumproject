import React from 'react';

export default async function createCompany({
  name,
  address,
  website,
  desc,
  tel,
  picture,
  token,
}: {
  name: string;
  address: string;
  website: string;
  desc?: string;
  tel?: string;
  picture?: string | null;
  token: string;
}) {
  const response = await fetch('http://localhost:5000/company', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: name,
      address: address,
      website: website,
      desc: desc,
      tel: tel,
      picture: picture,
    }),
  });
  if (!response.ok) {
    throw new Error('Create company failed');
  }
  return response.json();
}
