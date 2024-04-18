import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import getUserProfile from '@/libs/getUserProfile';
import SessionItem from './SessionItem';
import Link from 'next/link';
import Image from 'next/image';

export default async function UserPanel() {

  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;
  const profile = await getUserProfile(session.user.token);

  return (
      <div className="z-50 space-y-2 p-20 items-center flex flex-col">
        <div className="flex flex-col items-center justify-between space-y-3">
            <div className="p-5 text-5xl">Account</div>
        </div>
        <Image
        src={profile.data.profile ? profile.data.profile : '/img/user.png'}
        alt="logo"
        width={100}
        height={100}
        sizes="100vh"
        ></Image>
        <div className="py-1 text-lg">
          <span className="text-gray-500">Name:</span> {profile.data.name}
        </div>

        <div className="py-1 text-lg">
          <span className="text-gray-500">Tel:</span> {profile.data.tel}
        </div>
        <div className="py-1 text-lg">
          <span className="text-gray-500">Email:</span> {profile.data.email}
        </div>
      </div>
  );
}
