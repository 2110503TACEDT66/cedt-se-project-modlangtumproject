'use client';
import { Box, Rating } from '@mui/material';
import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
import React from 'react';
import Link from 'next/link';
import getUserProfile from '@/libs/getUserProfile';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function JobCard({
  jobName,
  jobDesc,
  jobSalary
}: {
  jobName: string;
  jobDesc: string;
  jobSalary: string;
}) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) {
      alert('Please Login');
      redirect('/auth/login');
    }
    const profile = await getUserProfile(session.user.token);
  // const [value, setValue] = React.useState<number | null>(5);

  return (
    <InteractiveCard contentName={jobName}>
      <div>
            <h2 className=" margin-top: 20px mx-20  text-xl font-bold inline ">{jobName}</h2> 
      <span className=" rounded-full px-3 py-1 font-semibold ml-2 right-aligned-text">
          {jobSalary}
        </span>
      </div><br></br>
      <div className="mx-10 mb-2 text-[18px] font-medium margin-top: 20px">
            Job Description
          <p className=" mx-10 text-gray-700 mb-4">{jobDesc}
        </p>
      </div>
      {/* <Link href={`/company`}>
            <button
              className="inline h-[3em] w-[10vw] rounded-3xl bg-indigo-600  py-2 text-white shadow-sm hover:bg-indigo-800"
              name="applyButton"
              id="applyButton"
              value="Apply Button"
            >
              Apply
            </button>
          </Link>
          {profile.data.role == 'admin' ? (
            <button
              className="inline h-[3em] w-[10vw] rounded-3xl bg-indigo-600  py-2 text-white shadow-sm hover:bg-indigo-800"
              name="deleteButton"
              id="deleteButton"
              value="Delete Button"
            >
              Delete
            </button>
          ) : null } */}
    </InteractiveCard>
  );
}
