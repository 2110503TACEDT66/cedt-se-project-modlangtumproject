'use client';

import React from 'react';
import deleteAccount from '@/libs/deleteAccount';
import getUserProfile from '@/libs/getUserProfile';
import { useSession, signOut } from 'next-auth/react';

const UserDeletePanel: React.FC = () => {
  const { data: session } = useSession();
  const handleDeleteUser = async () => {
    try {
      if (!session || !session.user.token) return;

      const profile = await getUserProfile(session.user.token);
      const id = profile.data._id;
      const token = session.user.token;
      const response = await deleteAccount({ id, token});

      if (!response.success) {
        throw new Error('Network response was not ok');
      }
      await signOut({ redirect: false });      

      alert('Account deleted');
      window.location.href = '/';
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <div className="z-50 flex flex-col items-center space-y-2 p-20">
      <div className="flex flex-col items-center justify-between space-y-3">
        <div className="p-5 text-5xl">Security</div>
      </div>
      <button
        className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
        onClick={handleDeleteUser}
      >
        Delete User
      </button>
    </div>
  );
};

export default UserDeletePanel;
