import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import CreateSessionPanel from '@/components/CreateSessionPanel';
import SideBar from '@/components/SideBar';
import { redirect } from 'next/navigation';

export default async function CreateSession() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) {
    redirect('/auth/login');
  }

  return (
    <main>
      <SideBar />
      <CreateSessionPanel />
    </main>
  );
}
