import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import getUserProfile from '@/libs/getUserProfile';
import SessionItem from './SessionItem';
import Link from 'next/link';

export default async function SessionPanel({
  sessionsJson,
}: {
  sessionsJson: Promise<SessionJson>;
}) {
  const SessionJson = await sessionsJson;

  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;
  const profile = await getUserProfile(session.user.token);

  return (
    <div className="z-50 space-y-2 p-20 sm:ml-72">
      <div className="flex flex-row items-center justify-between border-b-2">
        <div className="p-5 text-5xl">Session</div>
      </div>
      {SessionJson.count === 0 && (
        <div className="pt-12 text-center">There is no session</div>
      )}
      <div>
        {SessionJson.data.map((sessionItem: SessionItem) => (
          <SessionItem
            key={sessionItem._id}
            id={sessionItem._id}
            company={sessionItem.company}
            user={sessionItem.user}
            date={sessionItem.date}
            admin={profile.data.role == 'admin' ? true : false}
          />
        ))}
      </div>
    </div>
  );
}
