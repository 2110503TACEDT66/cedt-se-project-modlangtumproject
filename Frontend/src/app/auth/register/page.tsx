'use client';
import { useState } from 'react';
import Link from 'next/link';
import React from 'react';
import { FormEvent } from 'react';
import userRegister from '@/libs/userRegister';

type FormDataState = {
  name: string;
  tel: string;
  email: string;
  password: string;
  confirmPassword: string;
  profile: File | null;
};

const RegisterPage = () => {
  const [formData, setFormData] = useState<FormDataState>({
    name: '',
    tel: '',
    email: '',
    password: '',
    confirmPassword: '',
    profile: null,
  });
  const [isAgreed, setIsAgreed] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAgreed(event.target.checked);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, profile: event.target.files?.[0] || null });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, email, password, tel, profile, confirmPassword } = formData;
    if (password !== confirmPassword) {
      alert('Password does not match');
      return;
    }

    try {
      const response = await userRegister({ name, email, password, tel });

      if (!response.success) {
        throw new Error('Network response was not ok');
      }
      alert('Registration successful');
      window.location.href = '/api/auth/signin';
    } catch (error) {
      console.error('An unexpected error happened:', error);
      alert('Registration failed');
    }
  };

  return (
    <main className="flex flex-col items-center bg-white px-5">
      <div className="mt-10 flex flex-col items-center space-y-4">
        <h2 className="text-3xl font-medium text-gray-900">
          Create an account
        </h2>
        <div className="flex items-center space-x-1">
          <span className="text-sm text-gray-500">Already have an ccount?</span>
          <Link href="/auth/login" className="underline">
            Log in
          </Link>
        </div>
      </div>
      <form
        className="mt-10 flex w-[50vh] flex-col space-y-4"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Profile Picture
            <input
              type="file"
              id="profile"
              name="profile"
              className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
              onChange={handleFileChange} // You'll need to implement this
            />
          </label>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            What should we call you?
            <input
              type="text"
              id="name"
              name="name"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 
                                    text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white 
                                    dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="name"
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Email address
            <input
              type="email"
              id="email"
              name="email"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 
                                text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white 
                                dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="user@gmail.com"
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Phone number
            <input
              type="tel"
              id="tel"
              name="tel"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 
                                text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              placeholder="0811111111"
              pattern="[0-9]{10}"
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
              placeholder="•••••••••"
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Confirm password
            <input
              type="password"
              id="confirm_password"
              name="confirmPassword"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 
                            text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white 
                            dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="•••••••••"
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div className="jusitify-start flex items-start">
          <label className="ms-2 flex flex-row text-sm font-medium text-gray-900 dark:text-gray-300">
            <input
              id="remember"
              type="checkbox"
              value=""
              checked={isAgreed}
              onChange={handleCheckboxChange}
              className="focus:ring-3 mr-2 h-4 w-4 rounded border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            />
            <div>
              I agree with the{' '}
              <a
                href="#"
                className="text-blue1 hover:underline dark:text-blue1"
              >
                terms and conditions
              </a>
            </div>
          </label>
        </div>
        <div className="flex items-start">
          <button
            type="submit"
            onClick={() => {
              if (!isAgreed) {
                alert('Please confirm before submit.');
              }
            }}
            className="w-full rounded-3xl bg-blue-200 px-5 py-2.5 text-center 
            text-sm font-medium text-white hover:bg-blue1"
          >
            Submit
          </button>
        </div>
      </form>
    </main>
  );
};

export default RegisterPage;
