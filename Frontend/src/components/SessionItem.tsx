'use client';
import { useRouter} from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function SessionItem({
  id,
  company,
  user,
  job,
  date,
  admin,
}: {
  id: string;
  company: any;
  user: any;
  job: any;
  date: Date;
  admin: boolean;
}) {
  const [jobDetail, setJobDetail] = useState<any>(null);
  const router = useRouter();
  const { data: session } = useSession();
  useEffect(() => {
    if (session && session.user.token) {
      fetchJobDetail(session.user.token, job._id);
    }
  }, [session, job]);

  if (!session || !session.user.token) {
    return <p> Please Login</p>;
  }

  const fetchJobDetail = async (token: string, jobId: string) => {
    try {
      const jobDetailData = await getJob(token, jobId);
      setJobDetail(jobDetailData.data);
    } catch (error) {
      console.error('Error fetching job detail:', error);
    }
  };

  if(!jobDetail) {
    return null;
  }

  const deleteSession = async (id: string, token: string) => {
    try {
      const response = await fetch(
        `https://modlangtum-api.vercel.app/sessions/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to delete session');
      }
      alert('Delete successful');
      window.location.reload();
    } catch (error) {
      console.error('An unexpected error happened:', error);
      alert('Delete failed');
    }
  };

  return (
    <div className="flex h-[200px] w-full flex-col justify-between rounded-2xl p-5 shadow-lg">
      <div className="space-y-1">
        <div className="text-2xl font-bold">{company.name}</div>
        {admin && (
          <div className="flex flex-row font-semibold ">
            UserId :<p className="px-1 font-normal">{user}</p>
          </div>
        )}

        <div className="flex flex-row font-semibold">
          Date : 
          <p className="px-1 font-normal">{new Date(date).toLocaleString()}</p>
        </div>
      </div>
      
      
      
      <div className="flex flex-row self-end">
        <div
          className="mx-1 rounded-3xl border-2 border-blue3 bg-blue3 px-8 
                          py-1 text-white hover:bg-white hover:text-blue3"
        >
          <Link href={`session/${id}/edit`}>Edit</Link>
        </div>
        <button
          className="rounded-3xl border-2 border-blue1 bg-blue1 px-8
                          py-1 text-white hover:bg-white hover:text-blue1"
          onClick={() => deleteSession(id, session.user.token)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
