import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import UserBar from '@/components/UserBar';
import { redirect } from 'next/navigation';
import getUserProfile from '@/libs/getUserProfile';
import UserEditPanel from '@/components/UserEditPanel';

export default async function Session() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) {
    redirect('/api/auth/login');
  }
  const profile = await getUserProfile(session.user.token);

  return (
    <main>
      <UserEditPanel userProfile={profile} />
      <UserBar />
    </main>
  );
}
