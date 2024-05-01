import JobCard from './JobCard';
import { TextField } from '@mui/material';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';
import getUserProfile from '@/libs/getUserProfile';
import { redirect } from 'next/navigation';

export default async function JobCatalog({
  allJobJson,
  cid,
}: {
  allJobJson: JobJson;
  cid: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) {
    alert('Please Login');
    redirect('/auth/login');
  }

  const profile = await getUserProfile(session.user.token);

  return (
    <>
      <div className="flex w-[100%] flex-row justify-between">
        <h1 className="order-first text-[35px] font-bold">Job List</h1>
        <TextField
          className="order-last mt-[20px] w-[25%]"
          label="View Available Job"
          name="jobName"
          id="jobName"
          placeholder="View Available Job"
          size="small"
          InputProps={{
            style: {
              borderRadius: '10px',
            },
          }}
        />
      </div>
      <div className="mx-30 my-10 rounded-3xl border p-10 shadow-inner ">
        <div className="grid gap-8 rounded-3xl p-4 ">
          {allJobJson &&
            allJobJson.data.map((jobItem: JobItem) => (
              <JobCard
                key={jobItem._id}
                jobName={jobItem.name}
                jobDesc={jobItem.desc}
                jobSalary={jobItem.salary}
                jid={jobItem._id}
                cid={cid}
                profile={profile.data}
              />
            ))}
        </div>
      </div>
    </>
  );
}
