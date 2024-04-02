import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import getUserProfile from '@/libs/getUserProfile';

export default async function SideBarProfile() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;
  const profile = await getUserProfile(session.user.token);

  return (
    <div className="flex flex-col items-start items-center py-5">
      <Image
        src={profile.data.profile ? profile.data.profile : '/img/user.png'}
        alt="logo"
        width={100}
        height={100}
        sizes="100vh"
      ></Image>
      <div>
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
    </div>
  );
}
