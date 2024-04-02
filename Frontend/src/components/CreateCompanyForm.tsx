'use client';
import { useState } from 'react';
import React from 'react';
import { FormEvent } from 'react';
import createCompany from '@/libs/createCompany';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type FormDataState = {
  name: string;
  address: string;
  website: string;
  desc: string;
  tel: string;
  picture: string | null;
};

// const fetcher = async ([url, token]: [string, string]): Promise<any> => {
//   const response = await fetch(url, {
//     method: 'GET',
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   if (!response.ok) throw new Error('Failed to fetch data');
//   return response.json();
// };

export default function CreateCompanyForm() {
  const [formData, setFormData] = useState<FormDataState>({
    name: '',
    address: '',
    website: '',
    desc: '',
    tel: '',
    picture: null,
  });

  const router = useRouter();
  const { data: session } = useSession();

  // const session = await getServerSession(authOptions);
  if (!session || !session.user.token) {
    return <p> Please Login to see the Company</p>;
  }
  // const [isAgreed, setIsAgreed] = useState(false);

  // const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setIsAgreed(event.target.checked);
  // };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, address, website, desc, tel, picture } = formData;

    try {
      const response = await createCompany({
        name,
        address,
        website,
        desc,
        tel,
        picture,
        token: session.user.token,
      });

      if (!response.success) {
        throw new Error('Network response was not ok');
      }
      alert('Create successful');
      router.push('/company');
    } catch (error) {
      console.error('An unexpected error happened:', error);
      alert('Create failed');
    }
  };

  return (
    <div className="z-50 space-y-2 p-20 sm:ml-72">
      <div className="mb-5 border-b-2 p-5 text-5xl">Create Company</div>
      <div className="flex h-full flex-col items-center bg-white px-3">
        <form className="mt-5" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              className="mb-2 block text-sm font-medium text-gray-900"
              htmlFor="picture"
            >
              Picture
              <input
                type="text"
                id="picture"
                name="picture"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 
                                    text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                placeholder="URL"
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="mb-3">
            <label
              className="mb-2 block text-sm font-medium text-gray-900"
              htmlFor="name"
            >
              Company name
              <input
                type="text"
                required
                id="name"
                name="name"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 
                                text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Company name"
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className="mb-3">
            <label
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="address"
            >
              Address
              <input
                type="text"
                required
                id="address"
                name="address"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 
                                text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Address"
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className="mb-3">
            <label
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="website"
            >
              Website
              <input
                type="text"
                required
                id="website"
                name="website"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 
                                text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Website"
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className="mb-3">
            <label
              className="mb-2 block text-sm font-medium text-gray-900"
              htmlFor="description"
            >
              Description
              <input
                type="text"
                id="desc"
                name="desc"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 
                                text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Description"
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className="mb-3">
            <label
              className="mb-2 block text-sm font-medium text-gray-900"
              htmlFor="tel"
            >
              Tel.
              <input
                type="text"
                id="tel"
                name="tel"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 
                                text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Tel."
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className="mb-6 flex items-start">
            <label className="ms-2 flex flex-row text-sm font-medium text-gray-900">
              <input
                id="remember"
                type="checkbox"
                value=""
                required
                className="focus:ring-3 mr-2 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300"
              />
              <div className="mt-1">
                I agree with the{' '}
                <a href="#" className="text-blue1 hover:underline">
                  terms and conditions
                </a>
              </div>
            </label>
          </div>

          <div className="mb-6 flex items-start">
            <button
              className="w-full rounded-3xl bg-blue-200 px-5 py-2.5 text-center 
              text-sm font-medium text-white hover:bg-blue1" 
              type='submit'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
