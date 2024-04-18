'use client';
import { useState } from 'react';
import Link from 'next/link';
import React from 'react';
import { FormEvent } from 'react';
import userLogIn from '@/libs/userLogIn';
import { signIn } from 'next-auth/react';
import router from 'next/router';

type FormDataState = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [formData, setFormData] = useState<FormDataState>({
    email: '',
    password: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = formData;

    try {
      const response = await userLogIn(email, password);
      const res = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });
  
      if (!res?.error) {
        //router.push(this.callbackUrl ?? "http://localhost:3000");
      }

      if (!response.success) {
        throw new Error('Network response was not ok');
      }
      alert('Login successful');
      window.location.href = '/';
    } catch (error) {
      console.error('An unexpected error happened:', error);
      alert('Login failed');
    }
  };

  return (
    <main className="flex flex-col items-center bg-white px-5">
      <div className="mt-16 flex flex-col items-center">
        <h2 className="text-3xl font-semibold text-gray-900">
          Login
        </h2>
      </div>
      
        <form
          className="mt-10 flex w-[50vh] flex-col space-y-4"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Email
              <input
                type="email"
                id="email"
                name="email"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 
                                  text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white 
                                  dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Enter your email address"
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Password
              <input
                type="password"
                id="password"
                name="password"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 
                              text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white 
                              dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Enter your password"
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <div className="flex flex-row-reverse">
            <Link href="/auth/reset" className="underline">
              Forgot Password?
            </Link>
          </div>
          <div className="mt-10 flex items-start">
            <button
              type="submit"
              className="w-full rounded-3xl bg-blue-200 px-5 py-2.5 text-center 
              text-sm font-medium text-white hover:bg-blue1"
            >
              Sign in with Credentials
            </button>
          </div>
        </form>

    </main>
  );
};

export default LoginPage;
