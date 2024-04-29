import { getServerSession } from 'next-auth';
import JobCard from './JobCard';
import Card from './Card';
import { Link, TextField } from '@mui/material';
import getUserProfile from '@/libs/getUserProfile';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function JobCatalog({
  allJobJson,
}: {
  allJobJson: Promise<JobJson>;
}) {
  const allJobJsonReady = await allJobJson;
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) {
    alert('Please Login');
    redirect('/auth/login');
  }

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
      <main className="mx-30 my-10 rounded-3xl border p-10 shadow-inner">
      <div className="grid  gap-8 p-4 ">
        {allJobJsonReady.data.map((jobItem: JobItem) => (
          <Link
            key={jobItem._id}
            href={`/job/${jobItem._id}`}
            className="block overflow-hidden rounded-lg bg-white shadow-lg hover:bg-gray-100"
          >
            <JobCard jobName={jobItem.name} jobDesc={jobItem.desc} jobSalary={jobItem.salary} />
          </Link>
        ))}
      </div>
      </main>
    </>
  );
}

