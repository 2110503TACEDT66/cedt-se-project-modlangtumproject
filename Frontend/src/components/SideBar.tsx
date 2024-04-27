import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import SideBarProfile from './SideBarProfile';
import SideBarItem from './SideBarItem';
import getUserProfile from '@/libs/getUserProfile';
import Link from 'next/link';

export default async function SideBar() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;
  const profile = await getUserProfile(session.user.token);

  return (
    <div
      className="fixed left-0 top-0 flex h-full 
      w-72 flex-col items-center bg-white px-3 py-20 shadow-lg"
    >
      <div className="absolute top-56">
        <SideBarItem route="Session" path="/session" />
        {profile.data.role == 'admin' ? (
          <div>
            <SideBarItem route="Create Company" path="/company/create" />
            <SideBarItem route="Create Job" path="/job/create" />
          </div>
          
        ) : null}
      </div>
    </div>
  );
}
