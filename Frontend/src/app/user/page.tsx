import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import UserBar from '@/components/UserBar';
import UserPanel from '@/components/UserPanel';

export default async function Session() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;

  return (
    <main>
      <UserBar />
      <UserPanel />
    </main>
  );
}
