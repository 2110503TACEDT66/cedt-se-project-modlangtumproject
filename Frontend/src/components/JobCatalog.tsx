'use client'
import { useEffect, useState } from 'react';
import JobCard from './JobCard';
import { TextField } from '@mui/material';
import getUserProfile from '@/libs/getUserProfile';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { Session } from 'next-auth';

export default function JobCatalog({
  allJobJson,
  cid,
}: {
  allJobJson: Promise<JobJson>;
  cid: string;
}) {
  const [allJobJsonReady, setAllJobJsonReady] = useState<JobJson | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const sessionData = await getServerSession(authOptions);
        setSession(sessionData);
      } catch (error) {
        console.error('Error fetching session:', error);
      }
    };

    fetchSession();
  }, []);

  useEffect(() => {
    const fetchJobJson = async () => {
      try {
        const jobJsonData = await allJobJson;
        setAllJobJsonReady(jobJsonData);
      } catch (error) {
        console.error('Error fetching job data:', error);
        // Handle error
      }
    };

    fetchJobJson();
  }, [allJobJson]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (!session || !session.user.token) {
          redirect('/auth/login');
          return;
        }
        const profileData = await getUserProfile(session.user.token);
        setProfile(profileData);
      } catch (error) {
        console.error('Error fetching profile:', error);

      }
    };

    fetchUserProfile();
  }, [session]);

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
        <div className="grid gap-8 p-4 rounded-3xl ">
          {allJobJsonReady &&
            allJobJsonReady.data.map((jobItem: JobItem) => (
              <JobCard key={jobItem._id} jobName={jobItem.name} jobDesc={jobItem.desc} jobSalary={jobItem.salary} jid={jobItem._id} cid={cid}/>
            ))}
        </div>
      </div>
    </>
  );
}
