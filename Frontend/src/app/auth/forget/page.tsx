'use client';
import { useState } from 'react';
import Link from 'next/link';
import React from 'react';
import { FormEvent } from 'react';
// import { getServerSession } from 'next-auth';
// import getUserProfile from '@/libs/getUserProfile';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
// import { redirect } from 'next/navigation';
import forgetPassword from '@/libs/forgetPassword';

type FormDataState = {
  email: string;
};

const ForgetPage = () => {
  // const session = async () => { await getServerSession(authOptions); }
  // if (!session || !session.user.token) redirect('/auth/login');

  // const profile = async () => { await getUserProfile(session.user.token); }

  const [formData, setFormData] = useState<FormDataState>({
    email: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email } = formData;

    try {
      const response = await forgetPassword(email);

      //let jsonRes = await response.json();
      //console.log(jsonRes);

      alert('A reset link has been sent to your email');
      window.location.href = '/';
    } catch (error) {
      // console.log(error);
      console.error('An unexpected error happened:', error);
      alert('Failed to send a reset link');
    }
  };

  return (
    <main className="flex flex-col items-center bg-white px-5">
      <div className="mt-16 flex flex-col items-center">
        <h2 className="text-3xl font-[650] text-blue-500">Forgot Password</h2>
        <h6 className="text-m mt-5 w-[60vh] text-balance text-left font-light text-gray-900">
          Enter the email address you used when you joined and we'll send you
          instructions to reset your password.
        </h6>
      </div>

      <form className="mt-10 flex w-[60vh] flex-col" onSubmit={handleSubmit}>
        <div>
          <label className="text-m mb-2 block font-semibold text-gray-900">
            Email Address
            <input
              type="email"
              id="email"
              name="email"
              className="text-m mt-1 block h-[3em] w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5
                                  font-normal text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white 
                                  dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Enter your email address"
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div className="mt-3 flex items-start">
          <button
            type="submit"
            className="text-m h-[3em] w-full rounded-lg bg-blue-200 px-5 py-2.5 
              text-center font-medium text-white hover:bg-blue1"
          >
            Continue
          </button>
        </div>
        <div className="mt-5 flex flex-row justify-center space-x-2">
          <p className="font-light text-gray-900">Don't have an account?</p>
          <Link
            href="/auth/register"
            className="font-light text-blue-400 underline"
          >
            Register
          </Link>
        </div>
      </form>
    </main>
  );
};

export default ForgetPage;
