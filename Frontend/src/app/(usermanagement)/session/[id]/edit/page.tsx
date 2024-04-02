import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import SideBar from '@/components/SideBar';
import { redirect } from 'next/navigation';
import SessionEdit from '@/components/SessionEdit';

export default async function Session({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) {
    alert('Please login to see the session');
    redirect('/api/auth/login');
  }

  return (
    <main>
      <SideBar />
      <SessionEdit token={session.user.token} session_id={params.id} />
    </main>
  );
}
