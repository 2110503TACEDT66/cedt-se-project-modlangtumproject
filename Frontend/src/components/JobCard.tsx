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
      <div className="h-[15%] w-full p-[10px]">{jobName}</div>
      <div className="mb-2 text-[18px] font-medium">
            Job Description
          </div>
      <div className="h-[15%] w-full p-[10px]">{jobDesc}</div>
      <div className="h-[15%] w-full p-[10px]">{jobSalary}</div>

      <Link href={`/company`}>
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
          ) : null }
    </InteractiveCard>
  );
}
