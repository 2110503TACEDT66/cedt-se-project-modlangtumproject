'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import createJob from '@/libs/createJob';
import getAllCompany from '@/libs/getAllCompany';

type FormDataState = {
  job_name: string;
  job_description: string;
  salary: string;
  company_name: string;
  hashtag: Array<string>;
};

type Company = {
  id: string;
  name: string;
};

export default function CreateJob() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [formData, setFormData] = useState<FormDataState>({
    job_name: '',
    job_description: '',
    salary: '',
    company_name: '',
    hashtag: new Array<string>(),
  });

  useEffect(() => {
    if (session?.user?.token) {
      getAllCompany(session.user.token).then(setCompanies);
    }
  }, [session?.user?.token]);

  if (!session) {
    return <p>Please login to see the Company</p>;
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { job_name, job_description, salary, company_name, hashtag } = formData;

    try {
      const response = await createJob({
        ...formData,
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
      <div className="mb-5 border-b-2 p-5 text-5xl">Create Job</div>
      <div className="flex h-full flex-col items-center bg-white px-3">
        <form className="mt-5" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              className="mb-2 block text-sm font-medium text-gray-900"
              htmlFor="job_name"
            >
              Job name
              <input
                type="text"
                required
                id="job_name"
                name="job_name"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 
                                text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Job name"
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className="mb-3">
            <label
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="job_description"
            >
              Job description
              <input
                type="text"
                required
                id="job_description"
                name="job_description"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 
                                text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Job description"
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className="mb-3">
            <label
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="salary"
            >
              Salary
              <input
                type="text"
                required
                id="salary"
                name="salary"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 
                                text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Salary"
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className="mb-3">
            <label className="mb-2 block text-sm font-medium text-gray-900" htmlFor="company_name">
              Company name
              <select
                required
                id="company_name"
                name="company_name"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                onChange={handleInputChange}
                value={formData.company_name}
              >
                <option value="">Select a company</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.name}>
                    {company.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mb-3">
            <label
              className="mb-2 block text-sm font-medium text-gray-900"
              htmlFor="hashtag"
            >
              Hashtag
              <input
                type="text"
                id="hashtag"
                name="hashtag"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 
                                text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Hashtag"
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className="mb-6 flex items-start">
            <button
              className="w-full rounded-3xl bg-blue-200 px-5 py-2.5 text-center 
              text-sm font-medium text-white hover:bg-blue1"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
