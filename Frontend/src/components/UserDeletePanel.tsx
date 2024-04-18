import React from 'react';
import deleteAccount from '@/libs/deleteAccount';
import getUserProfile from '@/libs/getUserProfile';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const UserDeletePanel: React.FC =  async () => {

    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;
    const profile = await getUserProfile(session.user.token);

    const handleDeleteUser = async () => {

        try {

            const id = profile.data.id;
            const token = session.user.token;
            await deleteAccount ({ id, token});

        } catch (error) {
            console.error('Error deleting account:', error);

        }
    }

    return (
        <div className="z-50 space-y-2 p-20 items-center flex flex-col">
            <div className="flex flex-col items-center justify-between space-y-3">
                <div className="p-5 text-5xl">Security</div>
            </div>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleDeleteUser}>
                Delete User
            </button>
        </div>
    );
};

export default UserDeletePanel;