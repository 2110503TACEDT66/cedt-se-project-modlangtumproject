'use client';
import { useState } from 'react';
import React from 'react';
import { FormEvent } from 'react';
import resetPassword from '@/libs/resetPassword';

type FormDataState = {
  password: string;
  confirmPassword: string;
};

const ResetPage = ({ params }: { params: { resetToken: string } }) => {
  // const session = await getServerSession(authOptions);
  // if (!session || !session.user.token) redirect('/auth/login');

  // const profile = await getUserProfile(session.user.token);

  const [formData, setFormData] = useState<FormDataState>({
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      alert('Password does not match');
      return;
    }

    try {
      const response = await resetPassword(password, params.resetToken);
      alert('Reset password successful');
      window.location.href = '/';
    } catch (error) {
      console.error('An unexpected error happened:', error);
      alert('Failed to reset password');
    }
  };

  return (
    <main className="flex flex-col items-center bg-white px-5">
      <div className="mt-16 flex flex-col items-center">
        <h2 className="text-3xl font-[650] text-blue1">Reset Password</h2>
      </div>

      <form className="mt-5 flex w-[50vh] flex-col" onSubmit={handleSubmit}>
        <div>
          <label className="text-m mt-2 block font-medium text-gray-800">
            New Password
            <input
              type="password"
              id="password"
              name="password"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 
                              text-sm text-gray-700 focus:border-blue1 focus:ring-blue1 dark:border-gray-600 dark:bg-gray-700 dark:text-white 
                              dark:placeholder-gray-400 dark:focus:border-blue1 dark:focus:ring-blue1"
              placeholder="Enter your new password"
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label className="text-m mt-2 block font-medium text-gray-800">
            Confirm New Password
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 
                              text-sm text-gray-700 focus:border-blue1 focus:ring-blue1 dark:border-gray-600 dark:bg-gray-700 dark:text-white 
                              dark:placeholder-gray-400 dark:focus:border-blue1 dark:focus:ring-blue1"
              placeholder="Confirm your new password"
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div className="mt-10 flex items-start">
          <button
            type="submit"
            className="w-full rounded-3xl bg-blue-300 px-5 py-2.5 text-center 
              text-sm font-medium text-white hover:bg-blue2"
          >
            Reset
          </button>
        </div>
      </form>
    </main>
  );
};

export default ResetPage;
