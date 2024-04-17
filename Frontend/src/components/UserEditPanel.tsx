"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const UserEditPanel: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Implement the logic to update the user's username and password
    console.log('Username:', username);
    console.log('Password:', password);
  };

  const handleCancel = () => {
    // Navigate to the /user route
    router.push('/user');
  };

  return (
    <div className="flex items-center justify-center py-6">
      <div className="max-w-md w-full p-6 bg-neutral-200 rounded-xl">
        <div className="flex flex-col items-center space-y-3">
          <div className="p-5 text-5xl">Edit Account</div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="flex flex-col items-center">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-white text-red-500 px-4 py-2 rounded-md mt-4 hover:bg-red-600 hover:text-white"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gray-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-gray-600 hover:text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEditPanel;