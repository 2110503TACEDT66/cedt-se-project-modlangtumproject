
export default async function editCompany({
  id,
  name,
  address,
  website,
  desc,
  tel,
  picture,
  token,
}: {
  id: string
  name?: string;
  address?: string;
  website?: string;
  desc?: string;
  tel?: string;
  picture?: string | null;
  token: string;
}) {
  const response = await fetch(
    `https://job-fair-frontend-but-backend.vercel.app/company/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        address: address,
        website: website,
        desc: desc,
        tel: tel,
        picture: picture,
      }),
    }
  );
  if (!response.ok) {
    throw new Error('Edit company failed');
  }
  return response.json();
}
