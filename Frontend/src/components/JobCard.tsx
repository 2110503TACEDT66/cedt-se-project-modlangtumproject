'use client';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import getUserProfile from '@/libs/getUserProfile';
import { redirect } from 'next/navigation';
import deleteJob from '@/libs/deleteJob';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function JobCard({
  jobName,
  jobDesc,
  jobSalary,
  jid,
  cid,
  profile,
}: {
  jobName: string;
  jobDesc: string;
  jobSalary: string;
  jid: string;
  cid: string;
  profile: ProfileItem | null;
}) {
  const { data: session } = useSession();
  if (!session || !session.user.token || !profile) {
    alert('Please Login');
    redirect('/auth/login');
  }
  const handleDeleteJob = async () => {
    try {
      await deleteJob({ job_id: jid, token: session.user.token });
      alert('Job deleted successfully!');

      window.location.reload();
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Failed to delete job');
    }
  };

  return (
    <div className="my-200 mx-40 rounded-3xl border p-10 shadow-inner">
      <div>
        <div className="mb-auto mt-auto flex flex-row ">
          <Image src="/img/job.png" width={30} height={30} alt={'LOGO'} />
          <span className="margin-top: 20px mx-4 inline text-2xl font-bold ">
            {jobName}{' '}
          </span>
        </div>
        <div className="flex flex-row items-center justify-end">
          <Image src="/img/salary.png" width={25} height={25} alt={'LOGO'} />
          <span className=" right-aligned-text ml-1 flex justify-end rounded-full px-3 py-1 text-xl font-semibold">
            {jobSalary}
          </span>
          <span className=" right-aligned-text ml-1 flex justify-end">
            /Month
          </span>
        </div>
      </div>
      <div className="margin-top: 20px mx-20 mb-2 text-[18px] font-medium">
        Job Description <br></br>
        <p className=" mx-10 mb-4 text-gray-700">{jobDesc}</p>
      </div>
      <div className="job-card-actions flex justify-end">
        <div className="space-x-4">
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
        {profile.role == 'admin' ? (
            <button
              className="inline h-[3em] w-[10vw] rounded-3xl bg-indigo-600  py-2 text-white shadow-sm hover:bg-indigo-800"
              name="deleteButton"
              id="deleteButton"
              value="Delete Button"
              onClick={handleDeleteJob}
            >
              Delete
            </button>
        ) : null}
        </div>
      </div>
    </div>
  );
}
