import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import SideBar from '@/components/SideBar';
import { redirect } from 'next/navigation';
import getUserProfile from '@/libs/getUserProfile';
import CreateCompanyForm from '@/components/CreateCompanyForm';

export default async function CreateCompany() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) redirect('/auth/login');

  const profile = await getUserProfile(session.user.token);

  return (
    <main>
      <SideBar />
      {profile.data.role == 'admin' ? (
        <CreateCompanyForm />
      ) : (
        <div className="mt-24 text-center sm:ml-72">
          You are not authorized to access this page
        </div>
      )}
    </main>
  );
}
