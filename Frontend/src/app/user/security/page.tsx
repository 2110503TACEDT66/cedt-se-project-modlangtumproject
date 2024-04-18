import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import UserBar from '@/components/UserBar';
import { redirect } from 'next/navigation';
import getSession from '@/libs/getSession';
import UserDeletePanel from '@/components/UserDeletePanel';

export default async function Session() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) {
    redirect('/api/auth/login');
  }
  // get booking sessions
  const sessions = getSession(session.user.token);

  return (
    <main>
      <UserDeletePanel />
      <UserBar />
    </main>
  );
}
