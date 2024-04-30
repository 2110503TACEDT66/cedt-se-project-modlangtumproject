import { Box, Rating } from '@mui/material';
import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
import React from 'react';
import Link from 'next/link';
import getUserProfile from '@/libs/getUserProfile';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import deleteJob from '@/libs/deleteJob';

export default async function JobCard({
  jobName,
  jobDesc,
  jobSalary,
  jid,
  cid,
}: {
  jobName: string;
  jobDesc: string;
  jobSalary: string;
  jid: string;
  cid: string;
}) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) {
      alert('Please Login');
      redirect('/auth/login');
    }
    const profile = await getUserProfile(session.user.token);
  // const [value, setValue] = React.useState<number | null>(5);

  const handleDeleteJob = async () => {
    console.log('aa');
    try {
      await deleteJob({ job_id: jid, token: session.user.token });
      alert('Job deleted successfully!')

        window.location.reload();
      
    } catch (error) { 
      console.error('Error deleting job:', error);
      alert('Failed to delete job');
      
    }
  };

  return (
      <div className= "my-200 mx-40 rounded-3xl border p-10 shadow-inner">
      <div>
           <div className="mb-auto mt-auto flex flex-row ">
           <Image src="/img/job.png" width={30} height={30} alt={'LOGO'}  />
            <span className="margin-top: 20px mx-4 text-2xl font-bold inline ">{jobName} </span>
           </div>
           <div className="flex flex-row items-center justify-end">
            <Image src="/img/salary.png" width={25} height={25} alt={'LOGO'} /> 
            <span className=" flex justify-end rounded-full text-xl px-3 py-1 font-semibold ml-1 right-aligned-text">
          {jobSalary}
        </span>
          <span className=" flex justify-end ml-1 right-aligned-text">
          /Month
          </span>
        </div>
      </div>
      <div className="mx-20 mb-2 text-[18px] font-medium margin-top: 20px">
            Job Description <br></br>
          <p className=" mx-10 text-gray-700 mb-4">{jobDesc}
        </p>
      </div>
      <div className="job-card-actions flex justify-end">
      {profile.data.role == 'user' ? (
        
        <Link href={`/company/${cid}/job/${jid}/booking`}>
          <button
              className=" inline h-[3em] w-[10vw] rounded-3xl bg-indigo-600  py-2 text-white shadow-sm hover:bg-indigo-800"
              name="applyButton"
              id="applyButton"
              value="Apply Button"
            >
              Apply
            </button>
          </Link>
            
            ) : null }
            {profile.data.role == 'admin' ? (
            <div>
              <Link href={`/company/${cid}/job/${jid}/booking`}>
                <button
                  className=" inline h-[3em] w-[10vw] rounded-3xl bg-indigo-600  py-2 text-white shadow-sm hover:bg-indigo-800 mr-2"
                  name="applyButton"
                  id="applyButton"
                  value="Apply Button"
                  >
                  Apply
                </button>
              </Link>
              <button 
              className="inline h-[3em] w-[10vw] rounded-3xl bg-indigo-600  py-2 text-white shadow-sm hover:bg-indigo-800"
                name="deleteButton"
                id="deleteButton"
                value="Delete Button"
                onClick={handleDeleteJob}
                >
                Delete
              </button>
            </div>
            
          ) : null }
      </div>
      </div>
  );
}
