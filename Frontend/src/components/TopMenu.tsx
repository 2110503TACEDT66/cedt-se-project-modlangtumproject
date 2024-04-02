'use client';
import TopMenuItem from './TopMenuItem';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const TopMenu = () => {
  const { data: session } = useSession();

  return (
    <div className="flex w-full flex-row flex-wrap">
      <div className="fixed left-0 top-0 z-20 mx-[5%] flex h-[100px] w-[90%] flex-row justify-between rounded-md border-b-[1px] border-black bg-white pl-5 pr-5 shadow-xl">
        <div className="mb-auto mt-auto flex flex-row items-center justify-center">
          <Image src="/img/logo.png" width={50} height={50} alt={'LOGO'} />
          <span className="ml-1 font-bold">Mu Hung</span>
        </div>
        <div className="jusitfy-center flex">
          <TopMenuItem title="Home" pageRef="/" />
          <TopMenuItem title="Company" pageRef="/company" />
          <TopMenuItem title="Session" pageRef="/session" />
        </div>
        <div className="text-bold mb-auto mt-auto flex flex-row space-x-5 text-white">
          {session ? null : (
            <div className="text-bold mb-auto mt-auto flex flex-row space-x-5 text-center text-white">
              <Link
                href="/api/auth/signin"
                className="h-[60px] w-[120px] items-center justify-center rounded-3xl bg-blue1 py-4"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="h-[60px] w-[120px] items-center justify-center rounded-3xl bg-blue1 py-4"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopMenu;
