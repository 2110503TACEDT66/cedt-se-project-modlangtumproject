import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import SessionPanel from '@/components/SessionPanel';
import SideBar from '@/components/SideBar';
import { redirect } from 'next/navigation';
import getSession from '@/libs/getSession';

export default async function Session() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) {
    redirect('/api/auth/login');
  }
  // get booking sessions
  const sessions = getSession(session.user.token);

  return (
    <main>
      <SideBar />
      <SessionPanel sessionsJson={sessions} />
    </main>
  );
}
