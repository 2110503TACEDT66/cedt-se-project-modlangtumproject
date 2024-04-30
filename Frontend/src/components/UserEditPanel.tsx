'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import updateUserProfile from '@/libs/updateUserProfile';

export default function UserEditPanel() {
  const { data: session } = useSession();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  if (!session || !session.user.token) return null;

  const editUser = async () => {
    try {
      const token = session.user.token;
      await updateUserProfile(username, password, token);
      console.log('Edit Profile success');
      alert('Edit UserProflie Successfully');
    } catch (error) {
      console.error('Error Edit Profile:', error);
    }
  };

  const handleCancel = () => {
    router.push('/user');
  };

  return (
    <div className="flex items-center justify-center py-6">
      <div className="w-full max-w-md rounded-xl bg-neutral-200 p-6">
        <div className="flex flex-col items-center space-y-3">
          <div className="p-5 text-5xl">Edit Account</div>
        </div>
        <form onSubmit={editUser}>
          <div className="flex flex-col items-center">
            <label htmlFor="username">New Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              className="rounded-md border border-gray-300 p-2"
              required
            />
          </div>
          <div className="flex flex-col items-center">
            <label htmlFor="password">New Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              className="rounded-md border border-gray-300 p-2"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="mt-4 rounded-md bg-white px-4 py-2 text-red-500 hover:bg-red-600 hover:text-white"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="mt-4 rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 hover:text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}