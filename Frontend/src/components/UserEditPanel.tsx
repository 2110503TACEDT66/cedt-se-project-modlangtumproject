"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import getUserProfile from '@/libs/getUserProfile';
import SessionItem from './SessionItem';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import updateUserProfile from '@/libs/updateUserProfile';


export default function UserEditPanel(){ 
  const { data: session } = useSession();
  //const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;
  const token = session.user.token 
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const editUser = async () => {
        
    try {
      const token = session.user.token;
      // alert(token)
      await updateUserProfile(username , password , token);
      console.log("Edit Profile success");
      alert('Edit UserProflie Successfully')
  } catch (error) {
      console.error("Error Edit Profile:", error);
      // Handle error
  }
  }
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
        <form onSubmit={editUser}>
          <div className="flex flex-col items-center">
            <label htmlFor="username">New Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(event) => {setUsername(event.target.value)}}
              className="border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="flex flex-col items-center">
            <label htmlFor="password">New Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => {setPassword(event.target.value)}}
              className="border border-gray-300 rounded-md p-2"
              required
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
